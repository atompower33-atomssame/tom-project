const WIDTH = 800;
const HEIGHT = 760;
const PAD = 28;

const stateUrl = "data/gyeonggi-state.json";
const cityUrl = "data/gyeonggi-city.json";

const selectedName = document.getElementById("selectedName");
const interactiveMap = document.getElementById("interactiveMap");
const mapStage = document.getElementById("mapStage");

const infoRegionName = document.getElementById("infoRegionName");
const infoSummary = document.getElementById("infoSummary");
const previewTag = document.getElementById("previewTag");
const previewTitle = document.getElementById("previewTitle");
const previewBody = document.getElementById("previewBody");
const factButtons = document.getElementById("factButtons");
const detailTitle = document.getElementById("detailTitle");
const detailBody = document.getElementById("detailBody");
const sourceList = document.getElementById("sourceList");
const closeInfoBtn = document.getElementById("closeInfoBtn");
const quizForm = document.getElementById("quizForm");
const gradeQuizBtn = document.getElementById("gradeQuizBtn");
const quizResult = document.getElementById("quizResult");
const showAllNamesBtn = document.getElementById("showAllNamesBtn");
const hideAllNamesBtn = document.getElementById("hideAllNamesBtn");

let datasets = null;
let projectPoint = null;
let activePath = null;
let currentCityName = null;
let currentQuizItems = [];
let allCityLabelsVisible = false;

function walkCoordinates(coords, cb) {
  if (!Array.isArray(coords)) return;
  if (typeof coords[0] === "number" && typeof coords[1] === "number") {
    cb(coords[0], coords[1]);
    return;
  }
  coords.forEach((part) => walkCoordinates(part, cb));
}

function getBBox(featureCollections) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  featureCollections.forEach((fc) => {
    fc.features.forEach((feature) => {
      walkCoordinates(feature.geometry.coordinates, (x, y) => {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      });
    });
  });

  return { minX, maxX, minY, maxY };
}

function makeProjector(bbox) {
  const lonRange = bbox.maxX - bbox.minX;
  const latRange = bbox.maxY - bbox.minY;
  const sx = (WIDTH - PAD * 2) / lonRange;
  const sy = (HEIGHT - PAD * 2) / latRange;
  const scale = Math.min(sx, sy);
  const drawWidth = lonRange * scale;
  const drawHeight = latRange * scale;
  const xOffset = (WIDTH - drawWidth) / 2;
  const yOffset = (HEIGHT - drawHeight) / 2;

  return (lon, lat) => {
    const x = xOffset + (lon - bbox.minX) * scale;
    const y = HEIGHT - (yOffset + (lat - bbox.minY) * scale);
    return [x, y];
  };
}

function ringPath(ring, projector) {
  if (!ring.length) return "";
  const [sx, sy] = projector(ring[0][0], ring[0][1]);
  let d = `M ${sx.toFixed(2)} ${sy.toFixed(2)}`;
  for (let i = 1; i < ring.length; i += 1) {
    const [x, y] = projector(ring[i][0], ring[i][1]);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d} Z`;
}

function geometryPath(geometry, projector) {
  if (!geometry) return "";
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) => ringPath(ring, projector)).join(" ");
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .map((polygon) => polygon.map((ring) => ringPath(ring, projector)).join(" "))
      .join(" ");
  }
  return "";
}

function getFirstRing(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return geometry.coordinates[0] || [];
  if (geometry.type === "MultiPolygon") return geometry.coordinates[0]?.[0] || [];
  return [];
}

function centroid(feature, projector) {
  const ring = getFirstRing(feature.geometry);
  if (!ring.length) return [WIDTH / 2, HEIGHT / 2];
  let x = 0;
  let y = 0;
  ring.forEach((p) => {
    const projected = projector(p[0], p[1]);
    x += projected[0];
    y += projected[1];
  });
  return [x / ring.length, y / ring.length];
}

function clearSvg(svgEl) {
  while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
}

function removeAllCityLabels() {
  interactiveMap.querySelectorAll(".all-city-label").forEach((el) => el.remove());
}

function renderAllCityLabels() {
  removeAllCityLabels();
  if (!allCityLabelsVisible || !datasets?.city) return;

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  datasets.city.features.forEach((feature) => {
    const [x, y] = centroid(feature, projectPoint);
    const cityName = normalizeCityName(feature.properties.name);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "all-city-label");
    label.setAttribute("x", x.toFixed(1));
    label.setAttribute("y", y.toFixed(1));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "11");
    label.setAttribute("font-weight", "700");
    label.setAttribute("fill", "#204a34");
    label.setAttribute("paint-order", "stroke");
    label.setAttribute("stroke", "#eef8f0");
    label.setAttribute("stroke-width", "3");
    label.textContent = cityName;
    group.appendChild(label);
  });

  interactiveMap.appendChild(group);
}

function normalizeCityName(name) {
  if (name === "여주군") return "여주시";
  return name;
}

function fallbackProfile(cityName) {
  return {
    summary: `${cityName}는 경기도의 생활·산업·문화가 어우러진 지역입니다.`,
    image: `https://placehold.co/640x360/f3f9f4/1a3422?text=${encodeURIComponent(cityName)}`,
    person: `${cityName} 관련 대표 인물은 시청 역사·인물 자료에서 확인할 수 있습니다.`,
    specialty: `${cityName}의 대표 특산물은 시청 또는 문화관광 사이트 특산물 안내에서 확인할 수 있습니다.`,
    festival: `${cityName}의 대표 문화제는 시청 문화관광 축제 안내에서 확인할 수 있습니다.`,
    current: `${cityName}는 지역 특성에 맞춘 생활 인프라와 문화 정책을 추진하고 있습니다.`,
    sources: []
  };
}

function getCityProfile(cityName) {
  return (window.CITY_PROFILES && window.CITY_PROFILES[cityName]) || fallbackProfile(cityName);
}

function keywordOf(text) {
  if (!text) return "";
  return text.split(":")[0].trim();
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleOtherCities(cityName, count) {
  const names = Object.keys(window.CITY_PROFILES || {}).filter((name) => name !== cityName);
  return shuffle(names).slice(0, count);
}

function buildCityQuiz(cityName) {
  const profile = getCityProfile(cityName);
  const others = sampleOtherCities(cityName, 6);
  const otherProfiles = others.map((name) => ({ name, profile: getCityProfile(name) }));

  const person = keywordOf(profile.person);
  const specialty = keywordOf(profile.specialty);
  const festival = keywordOf(profile.festival);

  const otherPersons = shuffle(otherProfiles.map((p) => keywordOf(p.profile.person))).slice(0, 3);
  const otherSpecialties = shuffle(otherProfiles.map((p) => keywordOf(p.profile.specialty))).slice(0, 3);
  const otherFestivals = shuffle(otherProfiles.map((p) => keywordOf(p.profile.festival))).slice(0, 3);
  const otherCurrents = shuffle(otherProfiles.map((p) => p.profile.current)).slice(0, 3);
  const comboCorrect = `${person} / ${specialty} / ${festival}`;
  const comboWrong1 = `${person} / ${otherSpecialties[0]} / ${otherFestivals[0]}`;
  const comboWrong2 = `${otherPersons[0]} / ${specialty} / ${otherFestivals[1]}`;
  const comboWrong3 = `${otherPersons[1]} / ${otherSpecialties[1]} / ${festival}`;
  const pairPSCorrect = `${person} - ${specialty}`;
  const pairPSWrong1 = `${person} - ${otherSpecialties[0]}`;
  const pairPSWrong2 = `${otherPersons[0]} - ${specialty}`;
  const pairPSWrong3 = `${otherPersons[1]} - ${otherSpecialties[1]}`;
  const pairSFCorrect = `${specialty} - ${festival}`;
  const pairSFWrong1 = `${specialty} - ${otherFestivals[0]}`;
  const pairSFWrong2 = `${otherSpecialties[0]} - ${festival}`;
  const pairSFWrong3 = `${otherSpecialties[1]} - ${otherFestivals[1]}`;

  function makeChoiceQuestion(q, correct, wrongs, explain) {
    const choices = shuffle([correct, ...wrongs]);
    return { q, choices, answer: choices.indexOf(correct), explain };
  }

  return [
    makeChoiceQuestion(
      "1. 학습한 지역의 대표 인물로 가장 알맞은 것은?",
      person,
      otherPersons,
      `${cityName}의 대표 인물은 ${person}입니다.`
    ),
    makeChoiceQuestion(
      "2. 학습한 지역의 대표 특산물로 가장 알맞은 것은?",
      specialty,
      otherSpecialties,
      `${cityName}의 대표 특산물은 ${specialty}입니다.`
    ),
    makeChoiceQuestion(
      "3. 학습한 지역의 대표 문화제로 가장 알맞은 것은?",
      festival,
      otherFestivals,
      `${cityName}의 대표 문화제는 ${festival}입니다.`
    ),
    makeChoiceQuestion(
      "4. 학습한 지역의 설명으로 가장 알맞은 것은?",
      profile.current,
      otherCurrents,
      `${cityName}의 지역 특징 설명은 "${profile.current}"입니다.`
    ),
    makeChoiceQuestion(
      "5. 학습한 지역에 대한 인물-특산물 연결로 옳은 것은?",
      pairPSCorrect,
      [pairPSWrong1, pairPSWrong2, pairPSWrong3],
      `${cityName}의 올바른 인물-특산물 연결은 "${pairPSCorrect}"입니다.`
    ),
    makeChoiceQuestion(
      "6. 학습한 지역에 대한 특산물-문화제 연결로 옳은 것은?",
      pairSFCorrect,
      [pairSFWrong1, pairSFWrong2, pairSFWrong3],
      `${cityName}의 올바른 특산물-문화제 연결은 "${pairSFCorrect}"입니다.`
    ),
    makeChoiceQuestion(
      "7. 다음 중 학습한 지역의 핵심 3요소(인물/특산물/문화제) 조합으로 맞는 것은?",
      comboCorrect,
      [comboWrong1, comboWrong2, comboWrong3],
      `${cityName}의 올바른 조합은 "${comboCorrect}"입니다.`
    ),
    makeChoiceQuestion(
      `8. 다음 단서와 가장 관련 있는 항목을 고르세요: 인물 '${person}', 특산물 '${specialty}'`,
      festival,
      otherFestivals,
      `주어진 단서와 연결되는 대표 문화제는 ${festival}입니다.`
    ),
    makeChoiceQuestion(
      `9. 다음 단서와 가장 관련 있는 항목을 고르세요: 인물 '${person}', 문화제 '${festival}'`,
      specialty,
      otherSpecialties,
      `주어진 단서와 연결되는 대표 특산물은 ${specialty}입니다.`
    ),
    makeChoiceQuestion(
      `10. 다음 단서와 가장 관련 있는 항목을 고르세요: 특산물 '${specialty}', 문화제 '${festival}'`,
      person,
      [
        otherPersons[0],
        otherPersons[1],
        otherPersons[2]
      ],
      `주어진 단서와 연결되는 대표 인물은 ${person}입니다.`
    )
  ];
}

function updateDetail(item) {
  previewTag.textContent = `학습 키워드: ${item.label}`;
  previewTitle.textContent = item.title;
  previewBody.textContent = item.body;
  detailTitle.textContent = item.title;
  detailBody.textContent = item.body;
}

function renderSources(sources) {
  sourceList.innerHTML = "";
  if (!sources || !sources.length) {
    const li = document.createElement("li");
    li.className = "news-item";
    li.textContent = "출처 링크가 등록되지 않았습니다.";
    sourceList.appendChild(li);
    return;
  }

  sources.forEach((src) => {
    const li = document.createElement("li");
    li.className = "news-item";
    const a = document.createElement("a");
    a.href = src.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = src.label;
    li.appendChild(a);
    sourceList.appendChild(li);
  });
}

function showRegionInfo(cityName, sideClass) {
  const profile = getCityProfile(cityName);

  infoRegionName.textContent = cityName;
  infoSummary.textContent = profile.summary;

  const keywordItems = [
    { label: "대표 인물", title: `${cityName} 대표 인물`, body: profile.person },
    { label: "대표 특산물", title: `${cityName} 대표 특산물`, body: profile.specialty },
    { label: "대표 문화제", title: `${cityName} 대표 문화제`, body: profile.festival }
  ];

  factButtons.innerHTML = "";
  keywordItems.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `fact-btn${idx === 0 ? " is-on" : ""}`;
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      [...factButtons.querySelectorAll(".fact-btn")].forEach((el) => el.classList.remove("is-on"));
      btn.classList.add("is-on");
      updateDetail(item);
    });
    factButtons.appendChild(btn);
  });

  updateDetail(keywordItems[0]);
  renderSources(profile.sources);

  mapStage.classList.add("show-info");
  mapStage.classList.remove("side-left", "side-right");
  mapStage.classList.add(sideClass);
}

function renderQuiz(cityName) {
  if (!cityName) {
    quizForm.innerHTML = "<p>시·군을 먼저 선택하면 해당 지역 문제 10개가 생성됩니다.</p>";
    quizResult.innerHTML = "<h4>결과 안내</h4><p>시·군 선택 후 문제를 풀어 주세요.</p>";
    return;
  }

  currentCityName = cityName;
  currentQuizItems = buildCityQuiz(cityName);

  quizForm.innerHTML = "";
  currentQuizItems.forEach((item, idx) => {
    const wrap = document.createElement("section");
    wrap.className = "quiz-item";
    wrap.dataset.idx = String(idx);

    const q = document.createElement("p");
    q.className = "quiz-q";
    q.textContent = item.q;

    const options = document.createElement("div");
    options.className = "quiz-options";

    item.choices.forEach((choice, cIdx) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `quiz_${idx}`;
      input.value = String(cIdx);
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      options.appendChild(label);
    });

    wrap.appendChild(q);
    wrap.appendChild(options);
    quizForm.appendChild(wrap);
  });

  quizResult.innerHTML = `<h4>결과 안내</h4><p>${cityName} 문제를 모두 풀고 채점하기를 눌러 주세요.</p>`;
}

function gradeQuiz() {
  if (!currentCityName || !currentQuizItems.length) {
    quizResult.innerHTML = "<h4>결과 안내</h4><p>먼저 시·군을 선택해 문제를 생성해 주세요.</p>";
    return;
  }

  let score = 0;
  currentQuizItems.forEach((item, idx) => {
    const wrap = quizForm.querySelector(`.quiz-item[data-idx="${idx}"]`);
    if (!wrap) return;
    const checked = quizForm.querySelector(`input[name="quiz_${idx}"]:checked`);
    const old = wrap.querySelector(".quiz-feedback");
    if (old) old.remove();

    const feedback = document.createElement("div");
    feedback.className = "quiz-feedback";

    if (checked && Number(checked.value) === item.answer) {
      score += 1;
      feedback.classList.add("ok");
      feedback.textContent = `정답입니다. ${item.explain}`;
    } else {
      feedback.classList.add("no");
      const correct = item.choices[item.answer];
      feedback.textContent = `오답입니다. 정답: ${correct}. ${item.explain}`;
    }

    wrap.appendChild(feedback);
  });

  quizResult.innerHTML = `
    <h4>결과 안내</h4>
    <p><strong>${currentCityName}</strong> 총점: <strong>${score} / ${currentQuizItems.length}</strong></p>
    <p>오답 피드백을 확인하고 ${currentCityName} 내용을 다시 복습해 보세요.</p>
  `;
}

function closeInfoPanel() {
  mapStage.classList.remove("show-info", "side-left", "side-right");
}

function drawCityLayer() {
  clearSvg(interactiveMap);
  activePath = null;
  selectedName.textContent = "지도에서 시·군을 눌러 보세요.";
  closeInfoPanel();

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  datasets.city.features.forEach((feature) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "region");
    path.setAttribute("d", geometryPath(feature.geometry, projectPoint));

    path.addEventListener("click", () => {
      if (activePath) activePath.classList.remove("active");
      path.classList.add("active");
      activePath = path;

      const [x, y] = centroid(feature, projectPoint);
      const cityName = normalizeCityName(feature.properties.name);
      const sideClass = x < WIDTH * 0.5 ? "side-right" : "side-left";

      selectedName.textContent = cityName;

      const oldLabel = interactiveMap.querySelector("text.selected-label");
      if (oldLabel) oldLabel.remove();

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("class", "selected-label");
      label.setAttribute("x", x.toFixed(1));
      label.setAttribute("y", y.toFixed(1));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "16");
      label.setAttribute("font-weight", "700");
      label.setAttribute("fill", "#102a1b");
      label.setAttribute("paint-order", "stroke");
      label.setAttribute("stroke", "#fff");
      label.setAttribute("stroke-width", "4");
      label.textContent = cityName;
      interactiveMap.appendChild(label);

      showRegionInfo(cityName, sideClass);
      renderQuiz(cityName);
    });

    group.appendChild(path);
  });

  interactiveMap.appendChild(group);
  renderAllCityLabels();
}

function drawTraceMap(svgId, dataKey) {
  const svg = document.getElementById(svgId);
  clearSvg(svg);
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  datasets[dataKey].features.forEach((feature) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "trace-outline");
    path.setAttribute("d", geometryPath(feature.geometry, projectPoint));
    g.appendChild(path);
  });

  if (dataKey === "city") {
    datasets.city.features.forEach((feature) => {
      const [x, y] = centroid(feature, projectPoint);
      const name = normalizeCityName(feature.properties.name);
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("class", "trace-city-label");
      label.setAttribute("x", x.toFixed(1));
      label.setAttribute("y", y.toFixed(1));
      label.setAttribute("text-anchor", "middle");
      label.textContent = name;
      g.appendChild(label);
    });
  }

  svg.appendChild(g);
}

function svgToImage(svgEl) {
  return new Promise((resolve, reject) => {
    const clone = svgEl.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", String(WIDTH));
    clone.setAttribute("height", String(HEIGHT));
    const svgText = new XMLSerializer().serializeToString(clone);
    const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = svgUrl;
  });
}

async function buildTraceImageDataUrl(target) {
  const svg = document.getElementById(target);
  const canvas = document.getElementById(`${target}Canvas`);
  if (!svg || !canvas) throw new Error("연습판 요소를 찾을 수 없습니다.");

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = WIDTH;
  exportCanvas.height = HEIGHT;
  const ctx = exportCanvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const svgImg = await svgToImage(svg);
  ctx.drawImage(svgImg, 0, 0, WIDTH, HEIGHT);
  ctx.drawImage(canvas, 0, 0, WIDTH, HEIGHT);

  return exportCanvas.toDataURL("image/png");
}

async function downloadTraceImage(target) {
  const dataUrl = await buildTraceImageDataUrl(target);
  const a = document.createElement("a");
  const fileTag = target === "traceState" ? "전체지도" : "시군구역도";
  a.href = dataUrl;
  a.download = `경기도_따라그리기_${fileTag}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function printTraceImage(target) {
  const dataUrl = await buildTraceImageDataUrl(target);
  const title = target === "traceState" ? "경기도 전체지도 따라그리기" : "경기도 시군구역도 따라그리기";
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`<!doctype html><html><head><title>${title}</title><style>body{margin:0;padding:16px;font-family:sans-serif}img{max-width:100%;height:auto;display:block;margin:0 auto}</style></head><body><img src="${dataUrl}" alt="${title}" /></body></html>`);
  win.document.close();
  win.onload = () => {
    win.focus();
    win.print();
  };
}

function setupCanvasDraw(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1f6feb";
  ctx.lineWidth = 2.8;

  let drawing = false;

  function point(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  }

  canvas.addEventListener("pointerdown", (evt) => {
    drawing = true;
    canvas.setPointerCapture(evt.pointerId);
    const p = point(evt);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  });

  canvas.addEventListener("pointermove", (evt) => {
    if (!drawing) return;
    const p = point(evt);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });

  const stop = () => {
    drawing = false;
    ctx.closePath();
  };

  canvas.addEventListener("pointerup", stop);
  canvas.addEventListener("pointercancel", stop);

  return () => ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function loadJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} 로드 실패`);
  return res.json();
}

async function init() {
  try {
    let state;
    let city;

    if (window.GYEONGGI_DATA?.state && window.GYEONGGI_DATA?.city) {
      ({ state, city } = window.GYEONGGI_DATA);
    } else {
      [state, city] = await Promise.all([loadJson(stateUrl), loadJson(cityUrl)]);
    }

    datasets = { state, city };

    const bbox = getBBox([state, city]);
    projectPoint = makeProjector(bbox);

    drawCityLayer();
    drawTraceMap("traceState", "state");
    drawTraceMap("traceCity", "city");

    const clearState = setupCanvasDraw("traceStateCanvas");
    const clearCity = setupCanvasDraw("traceCityCanvas");

    document.querySelectorAll(".clear-btn[data-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        if (target === "traceState") clearState();
        if (target === "traceCity") clearCity();
      });
    });

    document.querySelectorAll(".export-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          await downloadTraceImage(btn.dataset.exportTarget);
        } catch (err) {
          console.error(err);
          alert("이미지 다운로드에 실패했습니다.");
        }
      });
    });

    document.querySelectorAll(".print-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          await printTraceImage(btn.dataset.printTarget);
        } catch (err) {
          console.error(err);
          alert("프린트 준비에 실패했습니다.");
        }
      });
    });

    closeInfoBtn.addEventListener("click", closeInfoPanel);
    gradeQuizBtn.addEventListener("click", gradeQuiz);
    showAllNamesBtn.addEventListener("click", () => {
      allCityLabelsVisible = true;
      renderAllCityLabels();
    });
    hideAllNamesBtn.addEventListener("click", () => {
      allCityLabelsVisible = false;
      removeAllCityLabels();
    });
    renderQuiz(null);
  } catch (err) {
    selectedName.textContent = "데이터 로드에 실패했습니다. 콘솔 오류를 확인해 주세요.";
    console.error(err);
  }
}

init();
