const STORAGE_KEY = "atomban25_little_prince_state_v3";
const DEFAULT_URL = "./little_prince_full.pdf";
const CHAPTER_COUNT = 27;
const QUESTIONS_PER_CHAPTER = 10;
const CURATED_CHAPTER_ITEMS = {
  c1: { focus: "그림과 어른의 시선", items: ["보아뱀", "모자 그림", "코끼리", "색연필", "그림 1호", "그림 2호", "여섯 살 화가 꿈", "어른은 모자라 했다.", "나는 그림을 포기했다.", "본질은 눈에 안 보인다."] },
  c2: { focus: "사막에서의 첫 만남", items: ["사하라 사막", "비행기 고장", "양 한 마리", "꼬마 목소리", "첫날 밤", "일주일 물", "혼자서 수리", "양을 그려 달라.", "나는 깜짝 놀랐다.", "사막에서 아이를 만났다."] },
  c3: { focus: "상자 속 양과 작은 별", items: ["상자 속 양", "작은 별", "줄과 말뚝", "잠든 양", "다른 별", "네 집", "양을 묶다", "우리 집은 아주 작아.", "양은 상자 안에 있어.", "나는 어디서 왔을까."] },
  c4: { focus: "소행성 B612와 숫자", items: ["소행성 B612", "터키 학자", "번호 붙이기", "어른의 질문", "친구의 본질", "숫자 좋아", "분홍 벽돌집", "어른들은 숫자를 좋아해.", "본질은 잘 묻지 않는다.", "웃는 아이가 더 중요해."] },
  c5: { focus: "바오밥과 규율", items: ["바오밥", "씨앗", "좋은 풀", "나쁜 풀", "아침 규율", "솎아 내기", "작은 행성", "늦으면 큰일 난다.", "바오밥은 미리 뽑아야 해.", "작은 습관이 별을 지킨다."] },
  c6: { focus: "석양과 슬픔", items: ["석양", "의자 끌기", "마흔네 번", "슬픈 날", "작은 행성", "기다리는 마음", "해 지는 빛", "슬프면 석양이 좋아.", "나는 석양을 사랑해.", "작은 별은 더 빨리 저문다."] },
  c7: { focus: "꽃의 가시와 눈물", items: ["꽃의 가시", "양과 꽃", "심각한 일", "망치와 나사", "꽃의 전쟁", "별의 불빛", "눈물", "꽃은 약하고 순진해.", "꽃이 사라지면 슬퍼.", "나는 어린 왕자를 달랬다."] },
  c8: { focus: "장미를 이해하기", items: ["장미 봉오리", "유리 덮개", "바람막이", "네 개의 가시", "꽃의 허영", "향기", "다정함", "꽃은 말보다 행동이야.", "나는 너무 어려서 몰랐다.", "장미는 모순이 많았다."] },
  c9: { focus: "떠나는 아침", items: ["철새 이동", "떠나는 날", "화산 청소", "바오밥 싹", "잘 있어", "행복해", "울음 참기", "꽃은 사랑을 고백했다.", "어린 왕자는 길을 떠났다.", "작별은 늘 어렵다."] },
  c10: { focus: "왕의 별", items: ["왕의 별", "신하", "어명", "권위", "하품", "법무 장관", "석양 명령", "지당한 명령이 중요해.", "왕은 복종을 원했다.", "권위는 이성에 근거한다."] },
  c11: { focus: "허영쟁이의 별", items: ["허영쟁이", "숭배자", "모자 답례", "박수", "칭찬", "혼자 사는 별", "단조로운 놀이", "허영쟁이는 칭찬만 들었다.", "어린 왕자는 지루해졌다.", "어른들은 참 이상했다."] },
  c12: { focus: "술 아저씨의 슬픔", items: ["술 아저씨", "빈 병", "가득한 병", "부끄러움", "잊어버리기", "짧은 방문", "침울한 표정", "그는 술을 마셨다.", "부끄러워서 또 마셨다.", "어린 왕자는 떠나갔다."] },
  c13: { focus: "사업가와 별의 소유", items: ["사업가", "계산", "오억 개", "별 소유", "착실한 사람", "숫자 세기", "서랍", "그는 별을 소유했다.", "별을 세고 또 세었다.", "어린 왕자는 이해 못 했다."] },
  c14: { focus: "가로등지기의 성실함", items: ["가로등지기", "명령", "켜고 끄기", "일 분 하루", "손수건", "잠", "작은 별", "명령은 바뀌지 않았다.", "그는 쉬지 못했다.", "성실한 사람이었다."] },
  c15: { focus: "지리학자의 질문", items: ["지리학자", "탐험가", "증거", "암석", "덧없는 것", "꽃", "지구", "꽃은 덧없는 존재다.", "지리학자는 꽃을 안 적었다.", "어린 왕자는 지구로 갔다."] },
  c16: { focus: "지구라는 큰 별", items: ["지구", "어른들", "왕", "사업가", "술 아저씨", "가로등지기", "여섯 대륙", "지구는 아주 큰 별이다.", "사람은 생각보다 작다.", "수많은 불빛이 켜졌다."] },
  c17: { focus: "뱀과의 만남", items: ["아프리카", "사막", "뱀", "외로움", "수수께끼", "되돌아가기", "순진함", "사막에는 사람이 없다.", "사람들끼리도 외롭다.", "뱀은 조용히 말했다."] },
  c18: { focus: "사막의 작은 꽃", items: ["꽃잎 세 장", "사막 꽃", "바람", "뿌리", "사람들", "홀로 여행", "잘 가", "사람들은 떠돌아다닌다.", "뿌리가 없어 힘들다.", "어린 왕자는 다시 걸었다."] },
  c19: { focus: "메아리와 외로움", items: ["높은 산", "메아리", "안녕", "되풀이", "외로운 별", "상상력", "내 꽃", "산은 말만 돌려줬다.", "사람은 보이지 않았다.", "어린 왕자는 더 외로웠다."] },
  c20: { focus: "장미 정원의 충격", items: ["장미 정원", "오천 송이", "놀람", "풀밭", "눈물", "비교", "부자 아님", "내 꽃만 특별한 줄 알았다.", "정원의 장미를 보고 울었다.", "어린 왕자는 슬펐다."] },
  c21: { focus: "여우와 길들이기", items: ["여우", "길들이다", "관계 맺기", "의례", "밀밭", "약속 시간", "책임", "마음으로 봐야 잘 보여.", "본질은 눈에 안 보여.", "네 장미를 책임져야 해."] },
  c22: { focus: "선로통제원과 아이들", items: ["선로통제원", "급행열차", "승객", "자리 바꾸기", "유리창", "인형", "아이들", "아이들만 찾는 걸 알아.", "어른들은 늘 바쁘다.", "기차는 계속 달렸다."] },
  c23: { focus: "갈증 알약 상인", items: ["상인", "갈증 알약", "시간 절약", "오십삼 분", "샘", "걷기", "물 한 모금", "알약은 시간을 아껴 준다.", "나는 샘으로 걷고 싶다.", "물은 아주 소중하다."] },
  c24: { focus: "사막 속 우물 찾기", items: ["목마름", "사막 길", "별빛", "우물", "모래 언덕", "달빛", "침묵", "사막은 우물을 숨긴다.", "눈에 안 보여도 있다.", "우리는 함께 걸었다."] },
  c25: { focus: "우물물의 의미", items: ["도르래", "두레박", "우물물", "노랫소리", "달콤한 물", "선물", "마음", "물은 마음에도 좋다.", "눈은 본질을 못 본다.", "마음으로 찾아야 한다."] },
  c26: { focus: "작별의 밤", items: ["돌담", "노란 뱀", "일주년", "돌아갈 시간", "껍데기", "웃는 별", "작별", "몸은 껍데기일 뿐이야.", "오늘 밤은 슬픈 밤이다.", "나는 너를 잊지 않을게."] },
  c27: { focus: "별과 기억", items: ["육 년 후", "별의 웃음", "양", "장미", "하늘", "질문", "편지", "양이 꽃을 먹었을까.", "하늘을 보며 생각해 봐.", "어린 왕자를 기억해 줘."] }
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function createDefaultChapters() {
  return Array.from({ length: CHAPTER_COUNT }, (_, i) => ({
    id: `c${i + 1}`,
    number: i + 1,
    title: `${i + 1}장`,
    content: ""
  }));
}

const defaultState = {
  ebookUrl: DEFAULT_URL,
  bookText: "",
  chapters: createDefaultChapters(),
  readChecks: {},
  dictationByChapter: {},
  dictationVersion: 7,
  selectedChapter: 1,
  weekLabel: "",
  testDate: "",
  schoolYear: new Date().getFullYear(),
  termStartDate: "",
  weekSchedule: [],
  readingRecords: [],
  readingDraft: { studentName: "", readingDate: "", oneLineFeeling: "" },
  fontScale: 1.35
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    const merged = { ...structuredClone(defaultState), ...parsed };
    const legacyDefault = "http://songtaihyo.com/wp-content/uploads/2018/04/le_Petit_Prince_%EB%B3%B8%EB%AC%B8.pdf";
    if (!merged.ebookUrl || merged.ebookUrl === legacyDefault) merged.ebookUrl = DEFAULT_URL;
    merged.bookText = cleanBookText(merged.bookText || "");
    merged.chapters = normalizeChapters(parsed.chapters || []);
    merged.selectedChapter = Math.min(Math.max(Number(merged.selectedChapter) || 1, 1), CHAPTER_COUNT);
    merged.dictationVersion = Number(merged.dictationVersion) || 1;
    merged.schoolYear = Number(merged.schoolYear) || new Date().getFullYear();
    if (!Array.isArray(merged.readingRecords)) merged.readingRecords = [];
    if (!merged.readingDraft) merged.readingDraft = { studentName: "", readingDate: "", oneLineFeeling: "" };
    if (!merged.termStartDate) merged.termStartDate = getDefaultTermStartDate(merged.schoolYear);
    if (!Array.isArray(merged.weekSchedule) || merged.weekSchedule.length !== CHAPTER_COUNT) {
      merged.weekSchedule = buildWeekSchedule(merged.termStartDate);
    }
    // If stale/short chapter data existed in storage, rebuild chapters from cleaned text.
    if ((merged.bookText || "").trim() && chaptersNeedRebuild(merged.chapters)) {
      merged.chapters = build27Chapters(merged.bookText);
    }
    return merged;
  } catch {
    const fallback = structuredClone(defaultState);
    fallback.termStartDate = getDefaultTermStartDate(fallback.schoolYear);
    fallback.weekSchedule = buildWeekSchedule(fallback.termStartDate);
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeChapters(input) {
  const result = createDefaultChapters();
  for (let i = 0; i < CHAPTER_COUNT; i++) {
    if (input[i]) {
      result[i] = {
        id: `c${i + 1}`,
        number: i + 1,
        title: input[i].title || `${i + 1}장`,
        content: (input[i].content || "").trim()
      };
    }
  }
  return result;
}

function chaptersNeedRebuild(chapters) {
  if (!Array.isArray(chapters) || chapters.length !== CHAPTER_COUNT) return true;
  const lengths = chapters.map((c) => (c?.content || "").replace(/\s+/g, " ").trim().length);
  const nonEmpty = lengths.filter((n) => n >= 60).length;
  const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / CHAPTER_COUNT);
  return nonEmpty < 20 || avg < 600;
}

function initTabs() {
  $$(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      $$(".tab").forEach((b) => b.classList.remove("is-active"));
      $$(".panel").forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      $(`#tab-${tab}`).classList.add("is-active");
    });
  });
}

function initEbookControls() {
  const urlInput = $("#ebookUrl");
  const frame = $("#ebookFrame");
  const objectEl = $("#ebookObject");
  const textInput = $("#bookText");
  const directLink = $("#ebookDirectLink");
  const objectLink = $("#ebookObjectLink");

  urlInput.value = state.ebookUrl;
  textInput.value = state.bookText;
  if (state.ebookUrl) {
    renderEbookViewer(state.ebookUrl, frame, objectEl);
    if (directLink) directLink.href = state.ebookUrl;
    if (objectLink) objectLink.href = state.ebookUrl;
  }

  $("#openEbookBtn").addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!url) return;
    state.ebookUrl = url;
    saveState();
    renderEbookViewer(url, frame, objectEl);
    if (directLink) directLink.href = url;
    if (objectLink) objectLink.href = url;
  });

  $("#openNewTabBtn").addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  $("#textFile").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    textInput.value = text;
    state.bookText = text;
    saveState();
  });

  $("#saveTextBtn").addEventListener("click", () => {
    state.bookText = textInput.value.trim();
    saveState();
    alert("본문을 저장했습니다.");
  });

  $("#analyzeTextBtn").addEventListener("click", () => {
    const text = textInput.value.trim();
    if (!text) {
      alert("먼저 본문 텍스트를 넣어주세요.");
      return;
    }

    state.bookText = text;
    state.chapters = build27Chapters(text);
    state.readChecks = {};
    generateAllDictations();
    saveState();

    renderChapterSelectors();
    renderSections();
    renderReadingBoard();
    applyWeekInfoByChapter(state.selectedChapter);
    updateProgress();
    renderDictationInputs();
    renderWorksheetPreview();
    alert("27장 자동 구성과 장별 10문항 출제가 완료되었습니다.");
  });
}

function renderEbookViewer(url, frame, objectEl) {
  const normalized = (url || "").trim();
  if (!normalized) {
    frame.src = "about:blank";
    if (objectEl) objectEl.data = "";
    return;
  }

  const isPdf = /\.pdf(\?|$)/i.test(normalized);
  const isExternal = /^https?:\/\//i.test(normalized);

  // For local PDF on GitHub Pages, <object> rendering is more stable than iframe.
  if (isPdf && !isExternal && objectEl) {
    frame.style.display = "none";
    objectEl.style.display = "block";
    objectEl.data = normalized;
    frame.src = "about:blank";
    return;
  }

  frame.style.display = "block";
  if (objectEl) {
    objectEl.style.display = "none";
    objectEl.data = "";
  }
  frame.src = toEmbeddableViewerUrl(normalized);
}

function toEmbeddableViewerUrl(url) {
  const normalized = (url || "").trim();
  if (!normalized) return "about:blank";
  if (/\.pdf(\?|$)/i.test(normalized)) {
    // Local/same-origin PDF can be embedded directly.
    if (!/^https?:\/\//i.test(normalized)) return normalized;
    return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(normalized)}`;
  }
  return normalized;
}

function build27Chapters(text) {
  const raw = normalizeExtractedText(text);
  if (!raw) return createDefaultChapters();

  const matches = findChapterMarkers(raw);

  if (matches.length >= 5) {
    const chapters = createDefaultChapters();
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const next = matches[i + 1];
      const start = current.index;
      const end = next ? next.index : raw.length;
      const block = raw.slice(start, end).trim();
      const number = current.number;
      if (!Number.isNaN(number) && number >= 1 && number <= CHAPTER_COUNT) {
        const lines = block.split("\n").map((v) => v.trim()).filter(Boolean);
        const title = lines[0] || `${number}장`;
        const content = sanitizeChapterText(lines.slice(1).join(" ").trim() || block);
        chapters[number - 1] = { id: `c${number}`, number, title, content };
      }
    }
    return chapters;
  }

  const sliceLen = Math.ceil(raw.length / CHAPTER_COUNT);
  return Array.from({ length: CHAPTER_COUNT }, (_, i) => {
    const content = raw.slice(i * sliceLen, (i + 1) * sliceLen).trim();
    return { id: `c${i + 1}`, number: i + 1, title: `${i + 1}장`, content };
  });
}

function cleanBookText(text) {
  if (!text) return "";
  return text
    .replace(/\r/g, "")
    .replace(/^[ \t]*={3,}\s*PAGE\s*\d+\s*={3,}[ \t]*$/gim, "")
    .replace(/^[ \t]*[0-9]{1,8}[ \t]*$/gm, "")
    .replace(/^[\u00A0\s]*[0-9]{1,8}[\u00A0\s]*$/gm, "")
    .replace(/^[ \t]*[0-9]{2,4}\s+[0-9]{2,4}[ \t]*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractSentences(text) {
  const cleaned = sanitizeChapterText(text).replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const chunks = cleaned.match(/[^.!?。！？\n]+[.!?。！？]?/g) || [];
  const unique = [];
  const seen = new Set();

  for (const raw of chunks) {
    const sentence = raw.trim().replace(/^["“”'‘’「」]/, "").replace(/["“”'‘’「」]$/, "");
    if (!sentence) continue;
    if (!/[가-힣]/.test(sentence)) continue;
    if (sentence.length < 14 || sentence.length > 140) continue;
    if (/^(어린 왕자|역자 후기|작가 연보|===== PAGE)/.test(sentence)) continue;
    if (seen.has(sentence)) continue;
    seen.add(sentence);
    unique.push(sentence);
  }

  return unique;
}

function isValidQuestionItem(item) {
  if (!item) return false;
  const compact = item.replace(/\s+/g, "");
  if (compact.length > 18) return false;
  if (!/[가-힣]/.test(item)) return false;
  if (/page|isbn|초판|발행|인쇄|역자|후기|작가|연보/i.test(item)) return false;
  if (/=/.test(item)) return false;
  return true;
}

function normalizeQuestionItem(item) {
  return item
    .replace(/[^가-힣0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildGrade2QuestionItems(content, chapterNumber) {
  const cleaned = sanitizeChapterText(content)
    .replace(/=====PAGE\d+=====/gi, " ")
    .replace(/page\s*\d+/gi, " ")
    .replace(/어린\s*왕자/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const stopWords = new Set([
    "그리고", "하지만", "그러나", "그래서", "정말", "아주", "그런데", "이렇게", "저렇게", "그렇게",
    "했다", "했다가", "있다", "있는", "없는", "하는", "하게", "되었다", "되어", "것이다", "것을",
    "어른들", "어린이", "아저씨", "그림", "이야기", "행성", "별들", "친구들", "사람들"
  ]);

  const words = cleaned.match(/[가-힣]{2,6}/g) || [];
  const freq = new Map();
  for (const w of words) {
    if (stopWords.has(w)) continue;
    if (/^[가-힣]{1}$/.test(w)) continue;
    if (w.length > 6) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }

  const singles = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .map(([w]) => normalizeQuestionItem(w))
    .filter(isValidQuestionItem);

  const phrase2 = [];
  const phrase3 = [];
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i];
    const b = words[i + 1];
    if (stopWords.has(a) || stopWords.has(b)) continue;
    const joined2 = normalizeQuestionItem(`${a} ${b}`);
    if (isValidQuestionItem(joined2) && joined2.replace(/\s+/g, "").length >= 4) {
      phrase2.push(joined2);
    }
    if (i < words.length - 2) {
      const c = words[i + 2];
      if (!stopWords.has(c)) {
        const joined3 = normalizeQuestionItem(`${a} ${b} ${c}`);
        if (isValidQuestionItem(joined3) && joined3.replace(/\s+/g, "").length >= 5) {
          phrase3.push(joined3);
        }
      }
    }
  }

  const unique = [];
  const seen = new Set();

  const pushUnique = (arr) => {
    for (const item of arr) {
      if (!isValidQuestionItem(item)) continue;
      if (seen.has(item)) continue;
      seen.add(item);
      unique.push(item);
      if (unique.length >= QUESTIONS_PER_CHAPTER) return;
    }
  };

  pushUnique(phrase3);
  pushUnique(phrase2);
  pushUnique(singles);

  const fallbackByChapter = [
    "사막 여행", "비행기 수리", "양 그림", "작은 별", "장미 꽃",
    "여우 약속", "석양 보기", "별빛 웃음", "따뜻한 마음", "친구 사랑"
  ];
  pushUnique(fallbackByChapter.map((w) => normalizeQuestionItem(w)));

  const backupWords = [
    "사막", "비행기", "양", "장미", "여우",
    "약속", "마음", "친구", "별빛", "웃음",
    "바오밥", "석양", "우물", "모래", "행복"
  ];
  let bi = 0;
  while (unique.length < QUESTIONS_PER_CHAPTER) {
    const candidate = backupWords[bi % backupWords.length];
    bi += 1;
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    unique.push(candidate);
  }

  return unique.slice(0, QUESTIONS_PER_CHAPTER);
}

function generateDictationForChapter(chapterNumber) {
  const chapter = state.chapters[chapterNumber - 1];
  const curatedSet = CURATED_CHAPTER_ITEMS[`c${chapterNumber}`];
  const picked = curatedSet?.items?.length
    ? curatedSet.items.map((v) => normalizeQuestionItem(v)).filter(isValidQuestionItem)
    : buildGrade2QuestionItems(chapter?.content || "", chapterNumber);
  while (picked.length < QUESTIONS_PER_CHAPTER) {
    picked.push("핵심낱말");
  }
  state.dictationByChapter[`c${chapterNumber}`] = picked;
}

function getChapterFocus(chapterNumber) {
  return CURATED_CHAPTER_ITEMS[`c${chapterNumber}`]?.focus || "핵심 낱말과 문장";
}

function normalizeExtractedText(text) {
  return cleanBookText(text)
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sanitizeChapterText(text) {
  return cleanBookText(text)
    .replace(/\s+/g, " ")
    .replace(/\s([,.!?])/g, "$1")
    .trim();
}

function romanToNumber(roman) {
  const values = { I: 1, V: 5, X: 10 };
  let total = 0;
  let prev = 0;
  const chars = roman.toUpperCase().split("").reverse();
  for (const ch of chars) {
    const curr = values[ch] || 0;
    if (curr < prev) total -= curr;
    else total += curr;
    prev = curr;
  }
  return total;
}

function normalizeRomanToken(token) {
  const unicodeMap = {
    "Ⅰ": "I",
    "Ⅱ": "II",
    "Ⅲ": "III",
    "Ⅳ": "IV",
    "Ⅴ": "V",
    "Ⅵ": "VI",
    "Ⅶ": "VII",
    "Ⅷ": "VIII",
    "Ⅸ": "IX",
    "Ⅹ": "X",
    "Ⅺ": "XI",
    "Ⅻ": "XII",
    "ⅰ": "I",
    "ⅱ": "II",
    "ⅲ": "III",
    "ⅳ": "IV",
    "ⅴ": "V",
    "ⅵ": "VI",
    "ⅶ": "VII",
    "ⅷ": "VIII",
    "ⅸ": "IX",
    "ⅹ": "X",
    "Ⅼ": "L",
    "Ⅽ": "C"
  };
  return [...token].map((ch) => unicodeMap[ch] || ch).join("").replace(/\s+/g, "");
}

function findChapterMarkers(raw) {
  const lines = raw.split("\n");
  const markers = [];
  let offset = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const numMatch = trimmed.match(/^(?:제\s*)?([0-9]{1,2})\s*장$/i);
    const romanMatch = trimmed.match(/^([IVXⅰ-ⅻⅠ-Ⅻ\s]{1,8})$/i);
    let number = null;

    if (numMatch) number = Number(numMatch[1]);
    if (!number && romanMatch) {
      const romanAscii = normalizeRomanToken(romanMatch[1]);
      number = romanToNumber(romanAscii);
    }
    if (number && number >= 1 && number <= CHAPTER_COUNT) {
      markers.push({ index: offset, number });
    }
    offset += line.length + 1;
  }

  const unique = [];
  const seen = new Set();
  for (const marker of markers) {
    if (seen.has(marker.number)) continue;
    seen.add(marker.number);
    unique.push(marker);
  }
  return unique.sort((a, b) => a.index - b.index);
}

function buildDictationSentences(content) {
  const base = extractSentences(content);
  const expanded = [];
  const seen = new Set();

  for (const sentence of base) {
    if (!seen.has(sentence)) {
      seen.add(sentence);
      expanded.push(sentence);
    }

    if (sentence.length >= 60) {
      const clauses = sentence.split(/[,，;:]/).map((v) => v.trim()).filter((v) => v.length >= 14 && v.length <= 80);
      for (const clause of clauses) {
        const clauseSentence = clause.endsWith(".") || clause.endsWith("다") ? clause : `${clause}.`;
        if (seen.has(clauseSentence)) continue;
        seen.add(clauseSentence);
        expanded.push(clauseSentence);
        if (expanded.length >= 18) break;
      }
    }
    if (expanded.length >= 18) break;
  }

  return expanded;
}

function generateAllDictations() {
  for (let i = 1; i <= CHAPTER_COUNT; i++) generateDictationForChapter(i);
}

function getDefaultTermStartDate(year) {
  const d = new Date(year, 2, 1);
  const day = d.getDay();
  const add = (8 - (day || 7)) % 7;
  d.setDate(d.getDate() + add);
  return d.toISOString().slice(0, 10);
}

function buildWeekSchedule(startDate) {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return [];
  const schedule = [];
  for (let i = 0; i < CHAPTER_COUNT; i++) {
    const monday = new Date(start);
    monday.setDate(start.getDate() + i * 7);
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    schedule.push({
      chapter: i + 1,
      weekLabel: `${i + 1}주차`,
      startDate: monday.toISOString().slice(0, 10),
      testDate: friday.toISOString().slice(0, 10)
    });
  }
  return schedule;
}

function renderChapterSelectors() {
  const readingSelect = $("#readingChapterSelect");
  const dictationSelect = $("#dictationChapterSelect");

  const optionsHtml = state.chapters
    .map((c) => `<option value="${c.number}">${c.number}장</option>`)
    .join("");

  readingSelect.innerHTML = optionsHtml;
  dictationSelect.innerHTML = optionsHtml;

  readingSelect.value = String(state.selectedChapter);
  dictationSelect.value = String(state.selectedChapter);
}

function renderWeekPlanner() {
  const planner = $("#weekPlanner");
  if (!planner) return;
  planner.innerHTML = "";

  const rows = state.weekSchedule.length ? state.weekSchedule : buildWeekSchedule(state.termStartDate);
  rows.forEach((w) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "week-chip";
    btn.textContent = `${w.weekLabel} · ${w.chapter}장 · ${w.startDate}`;
    if (w.chapter === state.selectedChapter) btn.classList.add("is-active");
    btn.addEventListener("click", () => {
      state.selectedChapter = w.chapter;
      syncSelectedChapterUI();
      applyWeekInfoByChapter(w.chapter);
      renderReadingBoard();
      renderDictationInputs();
      renderWorksheetPreview();
      renderWeekPlanner();
      saveState();
    });
    planner.appendChild(btn);
  });
}

function applyWeekInfoByChapter(chapterNumber) {
  const entry = state.weekSchedule.find((w) => w.chapter === chapterNumber);
  if (!entry) return;
  state.weekLabel = entry.weekLabel;
  state.testDate = entry.testDate;
  $("#testDate").value = state.testDate;
  const note = $("#currentWeekInfo");
  if (note) note.textContent = `${entry.weekLabel} (${entry.startDate} 시작) · ${entry.chapter}장 · 주제: ${getChapterFocus(chapterNumber)}`;
}

function renderReadingBoard() {
  const chapter = state.chapters[state.selectedChapter - 1];
  $("#readingTitle").textContent = `${chapter.number}장 | ${chapter.title}`;

  if (chapter.content.trim()) {
    $("#readingText").textContent = chapter.content;
  } else {
    $("#readingText").textContent = "이 장의 본문이 아직 없습니다. 본문을 붙여넣고 27장 자동 구성을 눌러주세요.";
  }

  const board = $("#readingBoard");
  board.style.fontSize = `${state.fontScale}rem`;
  $("#fontScale").value = String(state.fontScale);
}

function renderSections() {
  const wrap = $("#sectionList");
  const template = $("#sectionItemTemplate");
  wrap.innerHTML = "";

  for (const chapter of state.chapters) {
    const node = template.content.firstElementChild.cloneNode(true);
    const checkbox = node.querySelector("input");
    const title = node.querySelector(".title");
    const excerpt = node.querySelector(".excerpt");

    title.textContent = `${chapter.number}장`;
    excerpt.textContent = chapter.content ? chapter.content.slice(0, 80) + "..." : "본문 미입력";

    checkbox.checked = !!state.readChecks[chapter.id];
    checkbox.addEventListener("change", () => {
      state.readChecks[chapter.id] = checkbox.checked;
      saveState();
      updateProgress();
    });

    node.addEventListener("dblclick", () => {
      state.selectedChapter = chapter.number;
      saveState();
      syncSelectedChapterUI();
      renderReadingBoard();
      renderDictationInputs();
      renderWorksheetPreview();
    });

    wrap.appendChild(node);
  }
}

function updateProgress() {
  const done = state.chapters.filter((c) => state.readChecks[c.id]).length;
  const percent = Math.round((done / CHAPTER_COUNT) * 100);
  $("#progressPercent").textContent = `${percent}%`;
  $("#progressText").textContent = `${done} / ${CHAPTER_COUNT} 장 완료`;
  $("#progressFill").style.width = `${percent}%`;
}

function syncSelectedChapterUI() {
  $("#readingChapterSelect").value = String(state.selectedChapter);
  $("#dictationChapterSelect").value = String(state.selectedChapter);
}

function getCurrentQuestions() {
  const key = `c${state.selectedChapter}`;
  if (!state.dictationByChapter[key]) generateDictationForChapter(state.selectedChapter);
  return state.dictationByChapter[key];
}

function renderDictationInputs() {
  const wrap = $("#dictationList");
  const template = $("#dictationItemTemplate");
  const questions = getCurrentQuestions();
  wrap.innerHTML = "";

  questions.forEach((question, i) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const label = node.querySelector("label");
    const textarea = node.querySelector("textarea");
    label.textContent = `${i + 1}번`;
    textarea.value = question;
    textarea.addEventListener("input", () => {
      state.dictationByChapter[`c${state.selectedChapter}`][i] = textarea.value.trim();
      renderWorksheetPreview();
    });
    wrap.appendChild(node);
  });
}

function renderWorksheetPreview() {
  const chapter = state.chapters[state.selectedChapter - 1];
  const week = state.weekLabel || "-";
  const date = $("#testDate").value || "-";
  const questions = getCurrentQuestions();

  $("#sheetChapter").textContent = `장: ${chapter.number}장`;
  $("#sheetWeek").textContent = `주차: ${week}`;
  $("#sheetDate").textContent = `시험일: ${date}`;

  const ol = $("#sheetQuestions");
  ol.innerHTML = "";
  questions.forEach((q) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="question-sentence">${escapeHtml(q)}</div>
      <div class="practice-line"></div>
      <div class="practice-line"></div>
    `;
    ol.appendChild(li);
  });
}

function initReadingControls() {
  $("#readingChapterSelect").addEventListener("change", (e) => {
    state.selectedChapter = Number(e.target.value);
    saveState();
    syncSelectedChapterUI();
    applyWeekInfoByChapter(state.selectedChapter);
    renderReadingBoard();
    renderDictationInputs();
    renderWorksheetPreview();
    renderWeekPlanner();
  });

  $("#prevChapterBtn").addEventListener("click", () => {
    state.selectedChapter = Math.max(1, state.selectedChapter - 1);
    saveState();
    syncSelectedChapterUI();
    applyWeekInfoByChapter(state.selectedChapter);
    renderReadingBoard();
    renderDictationInputs();
    renderWorksheetPreview();
    renderWeekPlanner();
  });

  $("#nextChapterBtn").addEventListener("click", () => {
    state.selectedChapter = Math.min(CHAPTER_COUNT, state.selectedChapter + 1);
    saveState();
    syncSelectedChapterUI();
    applyWeekInfoByChapter(state.selectedChapter);
    renderReadingBoard();
    renderDictationInputs();
    renderWorksheetPreview();
    renderWeekPlanner();
  });

  $("#fontScale").addEventListener("input", (e) => {
    state.fontScale = Number(e.target.value);
    saveState();
    renderReadingBoard();
  });
}

function initDictationControls() {
  $("#schoolYear").value = String(state.schoolYear);
  if (!state.termStartDate) state.termStartDate = getDefaultTermStartDate(state.schoolYear);
  $("#termStartDate").value = state.termStartDate;
  $("#testDate").value = state.testDate || "";

  $("#buildScheduleBtn").addEventListener("click", () => {
    state.schoolYear = Number($("#schoolYear").value) || new Date().getFullYear();
    state.termStartDate = $("#termStartDate").value || getDefaultTermStartDate(state.schoolYear);
    state.weekSchedule = buildWeekSchedule(state.termStartDate);
    applyWeekInfoByChapter(state.selectedChapter);
    renderWeekPlanner();
    renderWorksheetPreview();
    saveState();
    alert("27주 운영표를 생성했습니다.");
  });

  $("#dictationChapterSelect").addEventListener("change", (e) => {
    state.selectedChapter = Number(e.target.value);
    saveState();
    syncSelectedChapterUI();
    applyWeekInfoByChapter(state.selectedChapter);
    renderReadingBoard();
    renderDictationInputs();
    renderWorksheetPreview();
    renderWeekPlanner();
  });

  $("#generateChapterBtn").addEventListener("click", () => {
    generateDictationForChapter(state.selectedChapter);
    saveState();
    renderDictationInputs();
    renderWorksheetPreview();
    alert(`${state.selectedChapter}장 10문항을 재생성했습니다.`);
  });

  $("#generateAllBtn").addEventListener("click", () => {
    generateAllDictations();
    saveState();
    renderDictationInputs();
    renderWorksheetPreview();
    alert("1~27장 전체 10문항 출제를 생성했습니다.");
  });

  $("#saveWorksheetBtn").addEventListener("click", () => {
    state.testDate = $("#testDate").value;
    const edited = $$("#dictationList textarea").map((el) => el.value.trim());
    state.dictationByChapter[`c${state.selectedChapter}`] = edited;
    saveState();
    renderWorksheetPreview();
    alert(`${state.selectedChapter}장 학습지를 저장했습니다.`);
  });

  $("#printPdfBtn").addEventListener("click", () => {
    state.testDate = $("#testDate").value;
    saveState();
    renderWorksheetPreview();
    printAsA4(`어린왕자 ${state.selectedChapter}장 학습지`, $("#worksheetPage").innerHTML);
  });
}

function printAsA4(title, innerHtml) {
  const win = window.open("", "_blank", "width=1000,height=900");
  if (!win) {
    alert("팝업 차단을 해제해 주세요.");
    return;
  }

  win.document.write(`
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: 'Noto Sans KR', sans-serif; color: #1f2a44; }
          .page { width: 100%; min-height: 260mm; border: 1px solid #dce6f8; padding: 10mm; box-sizing: border-box; }
          h3 { margin: 0 0 8px; font-size: 24px; }
          p { display: flex; justify-content: space-between; font-weight: 700; }
          ol { margin: 0; padding-left: 26px; }
          li { margin-bottom: 12px; }
          .question-sentence { font-size: 18px; line-height: 1.4; margin-bottom: 8px; }
          .practice-line { border-bottom: 1px solid #96a6c9; height: 20px; margin-bottom: 4px; }
        </style>
      </head>
      <body>
        <div class="page">${innerHtml}</div>
        <script>window.onload = () => window.print();</script>
      </body>
    </html>
  `);
  win.document.close();
}

function renderReadingRecordList() {
  const wrap = $("#readingRecordList");
  if (!wrap) return;
  wrap.innerHTML = "";
  const rows = [...(state.readingRecords || [])].reverse();
  if (!rows.length) {
    wrap.innerHTML = `<p class="helper">아직 저장된 기록이 없습니다.</p>`;
    return;
  }
  rows.forEach((r) => {
    const item = document.createElement("article");
    item.className = "record-item";
    item.innerHTML = `
      <p class="meta">${escapeHtml(r.readingDate || "-")} · ${escapeHtml(r.studentName || "-")} · ${escapeHtml(r.chapterLabel || "-")}</p>
      <p class="feeling">${escapeHtml(r.oneLineFeeling || "")}</p>
    `;
    wrap.appendChild(item);
  });
}

function initExtras() {
  const nameInput = $("#studentName");
  const dateInput = $("#readingDate");
  const feelingInput = $("#oneLineFeeling");

  const draft = state.readingDraft || {};
  nameInput.value = draft.studentName || "";
  dateInput.value = draft.readingDate || new Date().toISOString().slice(0, 10);
  feelingInput.value = draft.oneLineFeeling || "";

  const syncDraft = () => {
    state.readingDraft = {
      studentName: nameInput.value.trim(),
      readingDate: dateInput.value,
      oneLineFeeling: feelingInput.value.trim()
    };
    saveState();
  };

  nameInput.addEventListener("input", syncDraft);
  dateInput.addEventListener("change", syncDraft);
  feelingInput.addEventListener("input", syncDraft);

  $("#saveReadingRecordBtn").addEventListener("click", () => {
    const studentName = nameInput.value.trim();
    const readingDate = dateInput.value;
    const oneLineFeeling = feelingInput.value.trim();
    if (!studentName) {
      alert("학생 이름을 입력해 주세요.");
      return;
    }
    if (!readingDate) {
      alert("읽은 날짜를 입력해 주세요.");
      return;
    }
    if (!oneLineFeeling) {
      alert("한 줄 느낌을 입력해 주세요.");
      return;
    }
    state.readingRecords = state.readingRecords || [];
    state.readingRecords.push({
      studentName,
      readingDate,
      oneLineFeeling,
      chapter: state.selectedChapter,
      chapterLabel: `${state.selectedChapter}장`
    });
    state.readingDraft = { studentName, readingDate, oneLineFeeling: "" };
    feelingInput.value = "";
    saveState();
    renderReadingRecordList();
    alert("읽기 기록을 저장했습니다.");
  });

  $("#clearReadingRecordBtn").addEventListener("click", () => {
    state.readingDraft = { studentName: "", readingDate: new Date().toISOString().slice(0, 10), oneLineFeeling: "" };
    nameInput.value = "";
    dateInput.value = state.readingDraft.readingDate;
    feelingInput.value = "";
    saveState();
  });

  renderReadingRecordList();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function preloadBundledTextIfEmpty() {
  const current = (state.bookText || "").trim();
  const needsRefresh =
    !current ||
    current.length < 25000 ||
    /={3,}\s*PAGE\s*\d+\s*={3,}/i.test(current) ||
    /\n[\u00A0\s]*[0-9]{4,8}[\u00A0\s]*\n/.test(current) ||
    chaptersNeedRebuild(state.chapters);
  if (!needsRefresh) return;
  try {
    const res = await fetch("./little_prince_paste_source.txt", { cache: "no-store" });
    if (!res.ok) return;
    const text = cleanBookText((await res.text()).trim());
    if (!text) return;
    state.bookText = text;
    state.chapters = build27Chapters(text);
    generateAllDictations();
    saveState();
  } catch {
    // ignore preload failure and keep manual input flow
  }
}

async function boot() {
  await preloadBundledTextIfEmpty();

  if (!Object.keys(state.dictationByChapter).length || state.dictationVersion < 7) {
    generateAllDictations();
    state.dictationVersion = 7;
  }
  if (!state.termStartDate) state.termStartDate = getDefaultTermStartDate(state.schoolYear);
  if (!state.weekSchedule.length) state.weekSchedule = buildWeekSchedule(state.termStartDate);

  initTabs();
  initEbookControls();

  renderChapterSelectors();
  initReadingControls();
  initDictationControls();

  renderSections();
  updateProgress();
  syncSelectedChapterUI();
  applyWeekInfoByChapter(state.selectedChapter);
  renderWeekPlanner();
  renderReadingBoard();
  renderDictationInputs();
  renderWorksheetPreview();
  initExtras();

  saveState();
}

boot();
