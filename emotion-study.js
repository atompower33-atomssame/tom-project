const EMOTIONS = [
  {
    word: "기쁘다",
    tone: "positive",
    easy: "좋은 일이 생겨서 마음이 환해지는 느낌이에요.",
    example: "친구가 내 손을 잡아 줘서 정말 기뻤어요.",
    related: ["즐겁다", "행복하다", "신나다"],
    face: "joy",
    mission: "입꼬리를 크게 올리고 눈을 반달처럼 웃어 보세요.",
  },
  {
    word: "행복하다",
    tone: "positive",
    easy: "마음이 따뜻하고 편해서 웃음이 나는 감정이에요.",
    example: "가족과 함께 저녁을 먹어서 행복했어요.",
    related: ["포근하다", "만족스럽다", "흐뭇하다"],
    face: "love",
    mission: "손으로 하트를 만들고 환하게 웃어 보세요.",
  },
  {
    word: "신나다",
    tone: "positive",
    easy: "몸이 들썩들썩할 만큼 재미있고 기분이 좋아요.",
    example: "체육 시간에 달리기를 해서 신났어요.",
    related: ["들뜨다", "짜릿하다", "즐겁다"],
    face: "excited",
    mission: "양손을 위로 들고 점프하는 표정을 해 보세요.",
  },
  {
    word: "뿌듯하다",
    tone: "positive",
    easy: "내가 해낸 일이 자랑스러워서 마음이 꽉 차는 느낌이에요.",
    example: "받아쓰기를 열심히 해서 뿌듯했어요.",
    related: ["자랑스럽다", "대견하다", "후련하다"],
    face: "proud",
    mission: "가슴을 펴고 '내가 해냈다!' 표정을 지어 보세요.",
  },
  {
    word: "고맙다",
    tone: "positive",
    easy: "도움을 받아서 마음이 따뜻해지는 감정이에요.",
    example: "친구가 지우개를 빌려줘서 고마웠어요.",
    related: ["감사하다", "반갑다", "흐뭇하다"],
    face: "grateful",
    mission: "두 손을 모으고 '고마워'라고 말해 보세요.",
  },
  {
    word: "편안하다",
    tone: "positive",
    easy: "걱정이 줄고 몸과 마음이 조용해지는 느낌이에요.",
    example: "따뜻한 이불을 덮으니 편안했어요.",
    related: ["차분하다", "평온하다", "포근하다"],
    face: "calm",
    mission: "천천히 숨을 들이마시고 내쉬며 미소 지어 보세요.",
  },
  {
    word: "든든하다",
    tone: "positive",
    easy: "옆에 누군가 있어 마음이 강해지는 감정이에요.",
    example: "선생님이 같이 해 준다고 해서 든든했어요.",
    related: ["안심되다", "믿음직하다", "편안하다"],
    face: "confident",
    mission: "엄지를 들고 '할 수 있어!'라고 말해 보세요.",
  },
  {
    word: "반갑다",
    tone: "positive",
    easy: "보고 싶던 사람을 만나서 기분이 좋아지는 감정이에요.",
    example: "오랜만에 사촌을 만나서 반가웠어요.",
    related: ["기쁘다", "설레다", "좋아하다"],
    face: "joy",
    mission: "손을 흔들며 밝은 목소리로 인사해 보세요.",
  },
  {
    word: "설레다",
    tone: "positive",
    easy: "좋은 일이 생길 것 같아 가슴이 콩닥콩닥해요.",
    example: "소풍 전날이라 설레서 잠이 안 왔어요.",
    related: ["기대되다", "두근거리다", "신나다"],
    face: "excited",
    mission: "가슴에 손을 얹고 콩닥콩닥 느낌을 표현해 보세요.",
  },
  {
    word: "호기심이 생기다",
    tone: "positive",
    easy: "궁금한 것이 생겨서 알고 싶은 마음이 커져요.",
    example: "씨앗이 어떻게 자라는지 호기심이 생겼어요.",
    related: ["궁금하다", "신기하다", "집중하다"],
    face: "curious",
    mission: "눈을 크게 뜨고 고개를 살짝 기울여 보세요.",
  },
  {
    word: "감탄하다",
    tone: "positive",
    easy: "정말 멋진 것을 보고 '와!' 하고 놀라며 기뻐해요.",
    example: "무지개를 보고 감탄했어요.",
    related: ["놀랍다", "신기하다", "대단하다"],
    face: "surprised",
    mission: "입을 동그랗게 열고 '와!' 표정을 지어 보세요.",
  },
  {
    word: "공감하다",
    tone: "positive",
    easy: "다른 사람 마음을 이해하고 함께 느끼는 감정이에요.",
    example: "친구가 속상하다고 해서 같이 공감했어요.",
    related: ["이해하다", "배려하다", "마음이 통하다"],
    face: "empathy",
    mission: "고개를 끄덕이며 '그랬구나'라고 말해 보세요.",
  },
  {
    word: "차분하다",
    tone: "positive",
    easy: "급하지 않고 조용하게 마음이 정리된 상태예요.",
    example: "책을 읽으며 차분한 마음이 되었어요.",
    related: ["평온하다", "편안하다", "침착하다"],
    face: "calm",
    mission: "양손을 무릎에 두고 편안하게 미소 지어 보세요.",
  },
  {
    word: "자신 있다",
    tone: "positive",
    easy: "내가 잘할 수 있다고 믿는 힘이 생긴 감정이에요.",
    example: "연습을 많이 해서 발표가 자신 있었어요.",
    related: ["든든하다", "당당하다", "용기 있다"],
    face: "confident",
    mission: "어깨를 펴고 당당하게 앞을 바라보세요.",
  },
  {
    word: "슬프다",
    tone: "negative",
    easy: "마음이 무겁고 눈물이 날 것 같은 감정이에요.",
    example: "친한 친구가 전학 가서 슬펐어요.",
    related: ["서운하다", "속상하다", "울적하다"],
    face: "sad",
    mission: "입꼬리를 살짝 내리고 눈가를 촉촉하게 표현해 보세요.",
  },
  {
    word: "속상하다",
    tone: "negative",
    easy: "마음대로 되지 않아 마음이 아픈 감정이에요.",
    example: "준비한 그림이 찢어져서 속상했어요.",
    related: ["아쉽다", "서운하다", "슬프다"],
    face: "upset",
    mission: "한숨을 쉬듯 어깨를 조금 내려 보세요.",
  },
  {
    word: "서운하다",
    tone: "negative",
    easy: "기대했던 만큼 마음이 채워지지 않아 아쉬운 감정이에요.",
    example: "친구가 약속을 못 지켜서 서운했어요.",
    related: ["아쉽다", "속상하다", "섭섭하다"],
    face: "sad",
    mission: "눈썹을 살짝 내리고 조용히 말해 보세요.",
  },
  {
    word: "화나다",
    tone: "negative",
    easy: "마음이 뜨겁게 올라오고 짜증이 나는 감정이에요.",
    example: "줄을 새치기해서 화가 났어요.",
    related: ["분하다", "짜증나다", "억울하다"],
    face: "angry",
    mission: "눈썹을 모으고 '멈춰 주세요'를 차분히 말해 보세요.",
  },
  {
    word: "짜증나다",
    tone: "negative",
    easy: "작은 일도 자꾸 거슬려서 불편한 감정이에요.",
    example: "소음이 계속 나서 짜증이 났어요.",
    related: ["화나다", "답답하다", "불쾌하다"],
    face: "angry",
    mission: "찡그린 얼굴을 하고, 바로 깊게 숨을 쉬어 보세요.",
  },
  {
    word: "걱정되다",
    tone: "negative",
    easy: "앞으로 일이 잘될지 불안해서 마음이 조마조마해요.",
    example: "내일 발표를 생각하니 걱정됐어요.",
    related: ["불안하다", "긴장되다", "조마조마하다"],
    face: "worried",
    mission: "이마에 손을 대고 생각하는 표정을 해 보세요.",
  },
  {
    word: "긴장되다",
    tone: "negative",
    easy: "중요한 일을 앞두고 몸이 딱딱해지는 느낌이에요.",
    example: "앞에서 발표하려니 긴장됐어요.",
    related: ["떨리다", "불안하다", "걱정되다"],
    face: "anxious",
    mission: "어깨를 올렸다 내리며 '천천히 할 수 있어'를 말해 보세요.",
  },
  {
    word: "불안하다",
    tone: "negative",
    easy: "무슨 일이 생길까 봐 마음이 편하지 않은 감정이에요.",
    example: "길을 잠깐 잃어버려서 불안했어요.",
    related: ["초조하다", "걱정되다", "긴장되다"],
    face: "anxious",
    mission: "가슴에 손을 얹고 천천히 숫자 3까지 세어 보세요.",
  },
  {
    word: "무섭다",
    tone: "negative",
    easy: "위험하거나 낯선 상황에서 겁이 나는 감정이에요.",
    example: "천둥소리가 커서 무서웠어요.",
    related: ["겁나다", "두렵다", "떨리다"],
    face: "scared",
    mission: "눈을 크게 뜨고 몸을 살짝 웅크려 보세요.",
  },
  {
    word: "부끄럽다",
    tone: "negative",
    easy: "사람들 앞에서 얼굴이 뜨거워지고 숨고 싶은 감정이에요.",
    example: "많은 친구 앞에서 칭찬받아 부끄러웠어요.",
    related: ["쑥스럽다", "민망하다", "당황스럽다"],
    face: "embarrassed",
    mission: "양손으로 볼을 살짝 가리며 웃어 보세요.",
  },
  {
    word: "당황스럽다",
    tone: "negative",
    easy: "갑자기 예상 못 한 일이 생겨 어찌할지 모르는 감정이에요.",
    example: "준비물이 빠져서 당황스러웠어요.",
    related: ["어리둥절하다", "난처하다", "부끄럽다"],
    face: "worried",
    mission: "눈을 크게 뜨고 '어? 어떡하지?'를 말해 보세요.",
  },
  {
    word: "실망스럽다",
    tone: "negative",
    easy: "기대했던 결과가 아니어서 힘이 빠지는 감정이에요.",
    example: "기다린 장난감이 품절이라 실망했어요.",
    related: ["아쉽다", "속상하다", "풀이 죽다"],
    face: "disappointed",
    mission: "고개를 살짝 숙이고 한숨 표정을 지어 보세요.",
  },
  {
    word: "외롭다",
    tone: "negative",
    easy: "함께 이야기할 사람이 없어 마음이 쓸쓸한 감정이에요.",
    example: "혼자 놀이터에 있으니 외로웠어요.",
    related: ["쓸쓸하다", "허전하다", "울적하다"],
    face: "lonely",
    mission: "양팔을 스스로 감싸 안는 동작을 해 보세요.",
  },
  {
    word: "답답하다",
    tone: "negative",
    easy: "하고 싶은 말을 못 하거나 일이 막혀서 불편한 감정이에요.",
    example: "문제가 안 풀려서 답답했어요.",
    related: ["갑갑하다", "짜증나다", "속상하다"],
    face: "upset",
    mission: "가슴을 톡톡 두드리고 천천히 숨 쉬어 보세요.",
  },
  {
    word: "미안하다",
    tone: "negative",
    easy: "내 행동 때문에 상대가 힘들었을까 봐 마음이 무거운 감정이에요.",
    example: "친구 물건을 떨어뜨려서 미안했어요.",
    related: ["죄송하다", "안타깝다", "걱정되다"],
    face: "disappointed",
    mission: "고개를 살짝 숙이고 '미안해'를 진심으로 말해 보세요.",
  },
  {
    word: "지겹다",
    tone: "negative",
    easy: "같은 일이 오래 계속되어 흥미가 줄어든 감정이에요.",
    example: "비가 계속 와서 지겨웠어요.",
    related: ["심심하다", "따분하다", "지루하다"],
    face: "tired",
    mission: "어깨를 늘어뜨리고 하품하는 표정을 해 보세요.",
  },
];

const FACE_PRESETS = {
  joy: {
    bg: "#ffd875",
    eyes: '<circle cx="128" cy="122" r="6"/><circle cx="172" cy="122" r="6"/>',
    brows: '<path d="M118 105 Q128 98 138 105"/><path d="M162 105 Q172 98 182 105"/>',
    mouth: '<path d="M124 150 Q150 172 176 150"/>',
    extras: '<circle cx="98" cy="74" r="7" fill="#fff4d3"/><circle cx="200" cy="84" r="5" fill="#fff4d3"/>',
  },
  excited: {
    bg: "#9bdcf6",
    eyes: '<path d="M120 122 L132 110 L140 122"/><path d="M160 122 L168 110 L180 122"/>',
    brows: '<path d="M116 104 L140 97"/><path d="M160 97 L184 104"/>',
    mouth: '<path d="M125 152 Q150 184 175 152"/>',
    extras: '<path d="M94 90 l10 -8 l10 8 l-10 8 z" fill="#ffe26f"/><path d="M206 88 l8 -7 l8 7 l-8 7 z" fill="#ffe26f"/>',
  },
  proud: {
    bg: "#ffbf8d",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M116 106 L138 106"/><path d="M162 106 L184 106"/>',
    mouth: '<path d="M124 154 Q150 165 176 154"/>',
    extras: '<path d="M150 78 l6 12 h13 l-10 8 l4 13 l-13 -8 l-13 8 l4 -13 l-10 -8 h13 z" fill="#fff1b7"/>',
  },
  calm: {
    bg: "#b9d7d2",
    eyes: '<path d="M119 123 Q128 130 137 123"/><path d="M163 123 Q172 130 181 123"/>',
    brows: '<path d="M116 108 L138 110"/><path d="M162 110 L184 108"/>',
    mouth: '<path d="M128 152 Q150 160 172 152"/>',
    extras: '<circle cx="85" cy="100" r="9" fill="#e9f6f4"/><circle cx="214" cy="100" r="9" fill="#e9f6f4"/>',
  },
  grateful: {
    bg: "#f7c8cb",
    eyes: '<circle cx="128" cy="123" r="6"/><circle cx="172" cy="123" r="6"/>',
    brows: '<path d="M118 106 Q128 99 138 106"/><path d="M162 106 Q172 99 182 106"/>',
    mouth: '<path d="M127 151 Q150 170 173 151"/>',
    extras: '<path d="M99 90 c6 -10 18 -10 24 0 c-4 10 -12 14 -12 14 s-8 -4 -12 -14z" fill="#f1faff"/><path d="M177 84 c6 -10 18 -10 24 0 c-4 10 -12 14 -12 14 s-8 -4 -12 -14z" fill="#f1faff"/>',
  },
  love: {
    bg: "#ffc2d4",
    eyes: '<path d="M118 117 c0 -9 12 -13 17 -4 c5 -9 17 -5 17 4 c0 11 -17 17 -17 17 s-17 -6 -17 -17z"/><path d="M154 117 c0 -9 12 -13 17 -4 c5 -9 17 -5 17 4 c0 11 -17 17 -17 17 s-17 -6 -17 -17z"/>',
    brows: '<path d="M116 103 L140 103"/><path d="M160 103 L184 103"/>',
    mouth: '<path d="M127 151 Q150 176 173 151"/>',
    extras: '<path d="M90 92 c0 -8 10 -12 15 -4 c5 -8 15 -4 15 4 c0 10 -15 15 -15 15 s-15 -5 -15 -15z" fill="#ff7ca3"/><path d="M200 92 c0 -8 10 -12 15 -4 c5 -8 15 -4 15 4 c0 10 -15 15 -15 15 s-15 -5 -15 -15z" fill="#ff7ca3"/>',
  },
  curious: {
    bg: "#9fd6f8",
    eyes: '<circle cx="126" cy="123" r="7"/><circle cx="176" cy="123" r="5"/>',
    brows: '<path d="M112 103 L136 95"/><path d="M166 101 L186 108"/>',
    mouth: '<path d="M132 154 Q150 146 168 154"/>',
    extras: '<circle cx="88" cy="150" r="18" fill="none" stroke="#4c6787" stroke-width="5"/><line x1="101" y1="164" x2="112" y2="176" stroke="#4c6787" stroke-width="5" stroke-linecap="round"/>',
  },
  confident: {
    bg: "#a6e4c8",
    eyes: '<circle cx="128" cy="123" r="6"/><circle cx="172" cy="123" r="6"/>',
    brows: '<path d="M115 106 L138 102"/><path d="M162 102 L185 106"/>',
    mouth: '<path d="M126 154 Q150 164 174 154"/>',
    extras: '<path d="M89 88 l7 -7 l7 7 l-7 7 z" fill="#fff3be"/><path d="M208 83 l9 -9 l9 9 l-9 9 z" fill="#fff3be"/>',
  },
  surprised: {
    bg: "#ffe5a0",
    eyes: '<circle cx="128" cy="121" r="8"/><circle cx="172" cy="121" r="8"/>',
    brows: '<path d="M114 98 L138 94"/><path d="M162 94 L186 98"/>',
    mouth: '<ellipse cx="150" cy="154" rx="14" ry="18"/>',
    extras: '<path d="M85 84 L95 64 L105 84 Z" fill="#fff6d1"/><path d="M205 80 L214 60 L223 80 Z" fill="#fff6d1"/>',
  },
  empathy: {
    bg: "#d7c7ff",
    eyes: '<path d="M118 124 Q128 115 138 124"/><path d="M162 124 Q172 115 182 124"/>',
    brows: '<path d="M117 105 Q128 99 139 105"/><path d="M161 105 Q172 99 183 105"/>',
    mouth: '<path d="M128 154 Q150 168 172 154"/>',
    extras: '<path d="M94 87 c6 -10 18 -10 24 0 c-4 10 -12 14 -12 14 s-8 -4 -12 -14z" fill="#ffffff"/><path d="M182 94 c6 -10 18 -10 24 0 c-4 10 -12 14 -12 14 s-8 -4 -12 -14z" fill="#ffffff"/>',
  },
  sad: {
    bg: "#9fc2e8",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M114 108 L138 102"/><path d="M162 102 L186 108"/>',
    mouth: '<path d="M126 162 Q150 145 174 162"/>',
    extras: '<ellipse cx="118" cy="144" rx="4" ry="8" fill="#79b8ff"/><ellipse cx="182" cy="144" rx="4" ry="8" fill="#79b8ff"/>',
  },
  angry: {
    bg: "#ffb4a7",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M112 106 L138 96"/><path d="M162 96 L188 106"/>',
    mouth: '<path d="M126 160 L174 160"/>',
    extras: '<path d="M205 82 l12 -8 l-6 14 l13 0 l-15 9" stroke="#d84d45" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  worried: {
    bg: "#b9d0e8",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M112 110 Q126 96 140 110"/><path d="M160 110 Q174 96 188 110"/>',
    mouth: '<path d="M129 160 Q150 150 171 160"/>',
    extras: '<ellipse cx="188" cy="144" rx="5" ry="9" fill="#75a5d8"/>',
  },
  anxious: {
    bg: "#bfd6df",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M113 108 L138 101"/><path d="M162 101 L187 108"/>',
    mouth: '<path d="M125 161 Q150 151 175 161"/>',
    extras: '<ellipse cx="187" cy="143" rx="5" ry="10" fill="#7bb3c8"/><path d="M90 170 q10 -8 20 0" stroke="#6f9db4" stroke-width="4" fill="none"/>',
  },
  scared: {
    bg: "#b8d9e5",
    eyes: '<circle cx="128" cy="121" r="8"/><circle cx="172" cy="121" r="8"/>',
    brows: '<path d="M114 102 L138 97"/><path d="M162 97 L186 102"/>',
    mouth: '<ellipse cx="150" cy="156" rx="13" ry="15"/>',
    extras: '<ellipse cx="184" cy="145" rx="5" ry="11" fill="#65a6c7"/>',
  },
  embarrassed: {
    bg: "#f7c7cf",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M116 107 L138 106"/><path d="M162 106 L184 107"/>',
    mouth: '<path d="M133 156 Q150 149 167 156"/>',
    extras: '<ellipse cx="114" cy="147" rx="13" ry="8" fill="#ef8ea2"/><ellipse cx="186" cy="147" rx="13" ry="8" fill="#ef8ea2"/>',
  },
  disappointed: {
    bg: "#d6c8b2",
    eyes: '<path d="M118 125 Q128 116 138 125"/><path d="M162 125 Q172 116 182 125"/>',
    brows: '<path d="M114 106 L138 103"/><path d="M162 103 L186 106"/>',
    mouth: '<path d="M126 161 Q150 149 174 161"/>',
    extras: '<path d="M88 174 q8 8 16 0" stroke="#8a7d67" stroke-width="4" fill="none"/><path d="M198 174 q8 8 16 0" stroke="#8a7d67" stroke-width="4" fill="none"/>',
  },
  lonely: {
    bg: "#cfd6db",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M115 108 L139 106"/><path d="M161 106 L185 108"/>',
    mouth: '<path d="M128 160 Q150 151 172 160"/>',
    extras: '<path d="M88 100 q20 -18 40 0" stroke="#8aa0b0" stroke-width="4" fill="none"/><path d="M172 100 q20 -18 40 0" stroke="#8aa0b0" stroke-width="4" fill="none"/>',
  },
  upset: {
    bg: "#c9d4e6",
    eyes: '<circle cx="128" cy="124" r="6"/><circle cx="172" cy="124" r="6"/>',
    brows: '<path d="M112 108 L138 101"/><path d="M162 101 L188 108"/>',
    mouth: '<path d="M126 162 Q150 148 174 162"/>',
    extras: '<path d="M84 176 q10 -10 20 0" stroke="#6f84a2" stroke-width="4" fill="none"/><path d="M196 176 q10 -10 20 0" stroke="#6f84a2" stroke-width="4" fill="none"/>',
  },
  tired: {
    bg: "#d1d8dd",
    eyes: '<path d="M118 124 L138 124"/><path d="M162 124 L182 124"/>',
    brows: '<path d="M115 108 L139 109"/><path d="M161 109 L185 108"/>',
    mouth: '<path d="M130 158 Q150 166 170 158"/>',
    extras: '<path d="M210 90 q10 10 0 20 q-10 -10 0 -20z" fill="#f3f7fa"/><path d="M218 98 q10 10 0 20 q-10 -10 0 -20z" fill="#f3f7fa"/>',
  },
};

const STORAGE_KEY = "emotion_study_sentences_v1";

const state = {
  filter: "all",
  visibleIndexes: [],
  currentEmotionIndex: 0,
  savedSentences: [],
};

const els = {
  emotionType: document.getElementById("emotionType"),
  emotionWord: document.getElementById("emotionWord"),
  emotionEasy: document.getElementById("emotionEasy"),
  emotionExample: document.getElementById("emotionExample"),
  relatedWords: document.getElementById("relatedWords"),
  missionText: document.getElementById("missionText"),
  expressionCard: document.getElementById("expressionCard"),
  readingSentence: document.getElementById("readingSentence"),
  writingBox: document.getElementById("writingBox"),
  savedList: document.getElementById("savedList"),
  wordWall: document.getElementById("wordWall"),
  randomBtn: document.getElementById("randomBtn"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  useExampleBtn: document.getElementById("useExampleBtn"),
  saveSentenceBtn: document.getElementById("saveSentenceBtn"),
  filterButtons: Array.from(document.querySelectorAll(".filter-btn")),
};

function init() {
  state.savedSentences = loadSavedSentences();
  buildWordWall();
  bindEvents();
  applyFilter("all", true);
  renderSavedSentences();
}

function bindEvents() {
  els.randomBtn.addEventListener("click", selectRandomEmotion);
  els.prevBtn.addEventListener("click", moveEmotion.bind(null, -1));
  els.nextBtn.addEventListener("click", moveEmotion.bind(null, 1));

  els.useExampleBtn.addEventListener("click", () => {
    const current = getCurrentEmotion();
    els.writingBox.value = current.example;
    els.writingBox.focus();
  });

  els.saveSentenceBtn.addEventListener("click", saveSentence);

  els.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter, false);
    });
  });
}

function buildWordWall() {
  const fragment = document.createDocumentFragment();

  EMOTIONS.forEach((emotion, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "word-chip";
    button.textContent = emotion.word;
    button.dataset.index = String(index);
    button.addEventListener("click", () => {
      state.currentEmotionIndex = index;
      renderCurrentEmotion();
    });
    fragment.appendChild(button);
  });

  els.wordWall.appendChild(fragment);
}

function applyFilter(filter, keepCurrent) {
  state.filter = filter;
  state.visibleIndexes = EMOTIONS.map((_, index) => index).filter((index) => {
    if (filter === "all") {
      return true;
    }
    return EMOTIONS[index].tone === filter;
  });

  if (!state.visibleIndexes.length) {
    return;
  }

  if (!keepCurrent || !state.visibleIndexes.includes(state.currentEmotionIndex)) {
    state.currentEmotionIndex = state.visibleIndexes[0];
  }

  els.filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  renderCurrentEmotion();
}

function moveEmotion(step) {
  if (!state.visibleIndexes.length) {
    return;
  }

  const currentVisiblePosition = state.visibleIndexes.indexOf(state.currentEmotionIndex);
  const nextPosition = (currentVisiblePosition + step + state.visibleIndexes.length) % state.visibleIndexes.length;
  state.currentEmotionIndex = state.visibleIndexes[nextPosition];
  renderCurrentEmotion();
}

function selectRandomEmotion() {
  if (!state.visibleIndexes.length) {
    return;
  }

  if (state.visibleIndexes.length === 1) {
    renderCurrentEmotion();
    return;
  }

  let picked = state.currentEmotionIndex;
  while (picked === state.currentEmotionIndex) {
    const randomPosition = Math.floor(Math.random() * state.visibleIndexes.length);
    picked = state.visibleIndexes[randomPosition];
  }

  state.currentEmotionIndex = picked;
  renderCurrentEmotion();
}

function renderCurrentEmotion() {
  const emotion = getCurrentEmotion();
  const typeLabel = emotion.tone === "positive" ? "기분 좋은 감정" : "힘든 감정";

  els.emotionType.textContent = typeLabel;
  els.emotionType.className = `emotion-type ${emotion.tone}`;
  els.emotionWord.textContent = emotion.word;
  els.emotionEasy.textContent = emotion.easy;
  els.emotionExample.textContent = `예) ${emotion.example}`;
  els.missionText.textContent = emotion.mission;
  els.readingSentence.textContent = `읽어 보기: "나는 지금 ${emotion.word} 마음이 들어요."`;

  renderRelatedWords(emotion);
  renderExpressionCard(emotion);
  highlightWordChip();
}

function renderRelatedWords(emotion) {
  const fromSameTone = EMOTIONS.filter((item) => item.tone === emotion.tone && item.word !== emotion.word)
    .map((item) => item.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const mergedWords = [...emotion.related, ...fromSameTone].slice(0, 5);

  els.relatedWords.innerHTML = "";

  mergedWords.forEach((word) => {
    const chip = document.createElement("span");
    chip.className = "related-chip";
    chip.textContent = word;
    els.relatedWords.appendChild(chip);
  });
}

function renderExpressionCard(emotion) {
  const preset = FACE_PRESETS[emotion.face] || FACE_PRESETS.calm;

  els.expressionCard.innerHTML = `
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${emotion.word} 표정">
      <rect x="0" y="0" width="300" height="300" fill="${preset.bg}" />
      <g fill="none" stroke="#243044" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M110 228 Q150 196 190 228" />
        <path d="M128 195 Q150 204 172 195" />
      </g>
      <ellipse cx="150" cy="118" rx="68" ry="63" fill="#ffe3cc" stroke="#243044" stroke-width="4" />
      <path d="M102 88 Q150 42 198 88" fill="#7a4a2f" stroke="#243044" stroke-width="4" stroke-linejoin="round" />
      <g fill="none" stroke="#243044" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        ${preset.brows}
      </g>
      <g fill="#243044" stroke="none">
        ${preset.eyes}
      </g>
      <g fill="none" stroke="#243044" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        ${preset.mouth}
      </g>
      <g>
        ${preset.extras}
      </g>
      <g fill="#ffffff" stroke="#243044" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M118 183 Q150 167 182 183 L182 236 Q150 248 118 236 Z" />
      </g>
      <g fill="none" stroke="#243044" stroke-width="4" stroke-linecap="round">
        <path d="M118 193 Q150 206 182 193" />
      </g>
    </svg>
  `;
}

function highlightWordChip() {
  const chips = Array.from(document.querySelectorAll(".word-chip"));
  chips.forEach((chip) => {
    chip.classList.toggle("active", Number(chip.dataset.index) === state.currentEmotionIndex);
  });
}

function getCurrentEmotion() {
  return EMOTIONS[state.currentEmotionIndex];
}

function saveSentence() {
  const text = els.writingBox.value.trim();
  if (!text) {
    alert("문장을 먼저 써 주세요.");
    return;
  }

  const emotion = getCurrentEmotion();
  const record = `[${emotion.word}] ${text}`;

  state.savedSentences.unshift(record);
  state.savedSentences = state.savedSentences.slice(0, 8);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedSentences));
  renderSavedSentences();

  els.writingBox.value = "";
}

function loadSavedSentences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function renderSavedSentences() {
  els.savedList.innerHTML = "";

  if (!state.savedSentences.length) {
    const li = document.createElement("li");
    li.className = "saved-empty";
    li.textContent = "아직 저장한 문장이 없어요.";
    els.savedList.appendChild(li);
    return;
  }

  state.savedSentences.forEach((sentence) => {
    const li = document.createElement("li");
    li.textContent = sentence;
    els.savedList.appendChild(li);
  });
}

init();
