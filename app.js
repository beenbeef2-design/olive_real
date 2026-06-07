// ========================================================
// CORE LOGIC: OLIVE YOUNG AI BEAUTY HUMAN KIOSK
// ========================================================

// 1. PRODUCT DATABASE & INGREDIENT RATINGS
const PRODUCTS_DATABASE = [
  {
    id: "drg_soothing_cream",
    image: "assets/prod_drg.png",
    name: "닥터지 레드 블레미쉬 클리어 수딩 크림",
    category: "수분 크림",
    desc: "민감해진 피부를 촉촉하게 진정시키는 올리브영 1위 수분 크림",
    zone: "C",
    shelf: "C-6",
    coords: [160, 400],
    route: "M 400 480 L 300 480 L 300 400 L 160 400",
    ingredientsSummary: { green: 18, yellow: 2, red: 0 },
    suitability: {
      dry: "추천 (글리세린 등 수분 보호 성분 풍부)",
      oily: "매우 추천 (논코메도제닉, 오일프리 젤 제형)",
      sensitive: "매우 추천 (피부 진정 특화 성분 함유)"
    },
    ingredientsList: [
      { name: "Centella Asiatica Extract (병풀추출물)", ewg: 1, desc: "강력한 피부 진정 및 상처 치유 촉진" },
      { name: "Glycerin (글리세린)", ewg: 1, desc: "천연 보습 인자로 우수한 수분 결합력 제공" },
      { name: "Butylene Glycol (부틸렌글라이콜)", ewg: 1, desc: "피부 수분 유지 및 화장품 점도 조절" },
      { name: "Niacinamide (나이아신아마이드)", ewg: 1, desc: "비타민 B3 유도체로 미백 및 장벽 강화" },
      { name: "1,2-Hexanediol (1,2-헥산다이올)", ewg: 1, desc: "안전한 보존제 역할을 겸하는 보습 성분" },
      { name: "Panthenol (판테놀)", ewg: 1, desc: "피부 비타민 B5로 변환되어 장벽 리페어" },
      { name: "Xanthan Gum (잔탄검)", ewg: 1, desc: "천연 다당류 천연 증점 및 유화 안정화제" },
      { name: "Phenoxyethanol (페녹시에탄올)", ewg: 2, desc: "화장품 방부제 (피부 자극성 최소화 수준 함유)" }
    ]
  },
  {
    id: "physiogel_dmt",
    image: "assets/prod_physiogel.png",
    name: "피지오겔 DMT 페이셜 크림",
    category: "고보습 크림",
    desc: "피부 지질 구조와 유사한 성분으로 장벽을 채우는 72시간 보습 크림",
    zone: "C",
    shelf: "C-6",
    coords: [160, 400],
    route: "M 400 480 L 300 480 L 300 400 L 160 400",
    ingredientsSummary: { green: 12, yellow: 1, red: 0 },
    suitability: {
      dry: "매우 추천 (지질막 장벽 강화 및 고보습 작용)",
      oily: "보통 (코코넛오일 함유로 모공 폐쇄 우려 존재)",
      sensitive: "매우 추천 (저자극 순한 포뮬러 설계)"
    },
    ingredientsList: [
      { name: "Water (정제수)", ewg: 1, desc: "화장품의 기본 용제" },
      { name: "Caprylic/Capric Triglyceride (카프릴릭/카프릭트라이글리세라이드)", ewg: 1, desc: "코코넛 추출 보습 유연제" },
      { name: "Glycerin (글리세린)", ewg: 1, desc: "수분 보습 유지제" },
      { name: "Pentylene Glycol (펜틸렌글라이콜)", ewg: 1, desc: "화장품 흡수 촉진 및 향균 보조 보습 성분" },
      { name: "Cocos Nucifera Oil (코코넛야자오일)", ewg: 1, desc: "피부 연화 및 수분 손실 차단용 고영양 오일" },
      { name: "Hydrogenated Lecithin (수소첨가레시틴)", ewg: 1, desc: "세포막 유사 천연 유화제 및 장벽 복구" },
      { name: "Squalane (스쿠알란)", ewg: 1, desc: "천연 피지 유사 성분으로 탄력 보습 부여" },
      { name: "Ceramide NP (세라마이드엔피)", ewg: 1, desc: "피부 장벽의 메인 구성 물질로 손상 복구" }
    ]
  },
  {
    id: "ideal_allinone",
    image: "assets/prod_ideal_men.png",
    name: "아이디얼 포 맨 퍼펙트 올인원",
    category: "남성 올인원",
    desc: "탄력, 주름 개선, 수분, 장벽, 피지 조절을 하나로 해결하는 남성 베스트 올인원 로션",
    zone: "C",
    shelf: "C-5",
    coords: [160, 360],
    route: "M 400 480 L 300 480 L 300 360 L 160 360",
    ingredientsSummary: { green: 16, yellow: 3, red: 0 },
    suitability: {
      dry: "추천 (히알루론산과 콜라겐 성분으로 당김 해결)",
      oily: "매우 추천 (피지 흡착 및 산뜻한 수분 흡수)",
      sensitive: "보통 (인공향료 성분이 일부 포함되어 있음)"
    },
    ingredientsList: [
      { name: "Water (정제수)", ewg: 1, desc: "정제된 용제" },
      { name: "Glycerin (글리세린)", ewg: 1, desc: "강력 보습막 유지" },
      { name: "Methylpropanediol (메틸프로판다이올)", ewg: 1, desc: "수분 흡수 극대화 유기 화합 성분" },
      { name: "Niacinamide (나이아신아마이드)", ewg: 1, desc: "톤 개선 및 미백, 피지 조절" },
      { name: "Centella Asiatica Extract (병풀추출물)", ewg: 1, desc: "잦은 면도로 거칠어진 피부 진정 작용" },
      { name: "Panthenol (판테놀)", ewg: 1, desc: "비타민 장벽 보습 케어" },
      { name: "Adenosine (아데노신)", ewg: 1, desc: "주름 개선 기능성 식약처 인증 성분" },
      { name: "Dimethicone (다이메티콘)", ewg: 3, desc: "실리콘계 피부 보습 장벽 성분 (발림성 완화용)" }
    ]
  },
  {
    id: "singmulnara_sun",
    image: "assets/prod_sungel.png",
    name: "식물나라 산소수 가벼운 선젤",
    category: "선 케어",
    desc: "백탁 없이 물처럼 투명하게 가볍게 밀착되는 수분 자외선 차단 젤",
    zone: "C",
    shelf: "C-5",
    coords: [160, 360],
    route: "M 400 480 L 300 480 L 300 360 L 160 360",
    ingredientsSummary: { green: 10, yellow: 4, red: 1 },
    suitability: {
      dry: "매우 추천 (선크림의 답답함 없는 물광 수분 선젤)",
      oily: "매우 추천 (피지 끈적임이 없어 화장 방해 안 됨)",
      sensitive: "보통 (유기자차 차단 성분 함유로 눈시림 우려 가능)"
    },
    ingredientsList: [
      { name: "Water (정제수)", ewg: 1, desc: "수분 베이스 베이스" },
      { name: "Ethylhexyl Methoxycinnamate (에틸헥실메톡시신나메이트)", ewg: 6, desc: "화학적 자외선 UVB 차단 필터 (자극 주의 필요)" },
      { name: "Butylene Glycol (부틸렌글라이콜)", ewg: 1, desc: "제형 수분 유지 성분" },
      { name: "Ethanol (에탄올)", ewg: 3, desc: "쿨링감 및 산뜻한 발림성 부여 (민감성 건조감 우려)" },
      { name: "Zinc Oxide (징크옥사이드)", ewg: 2, desc: "물리적 무기자차 차단 필터 및 진정 보조" },
      { name: "Sod. Hyaluronate (소듐하이알루로네이트)", ewg: 1, desc: "천연 히알루론산 수분 유인막" },
      { name: "Oxygen (산소)", ewg: 1, desc: "피부 산소 공급 및 활력 개선" }
    ]
  },
  {
    id: "anua_toner",
    image: "assets/prod_anua.png",
    name: "아누아 어성초 77 수딩 토너",
    category: "진정 토너",
    desc: "어성초 추출물 77%로 붉어진 트러블 피부를 즉각 잠재우는 진정 토너",
    zone: "A",
    shelf: "A-2",
    coords: [140, 160],
    route: "M 400 480 L 300 480 L 300 160 L 140 160",
    ingredientsSummary: { green: 15, yellow: 1, red: 0 },
    suitability: {
      dry: "보통 (산뜻한 워터 타입으로 건성에게는 겹토너 권장)",
      oily: "매우 추천 (유수분 밸런싱 최적 및 논코메도제닉)",
      sensitive: "매우 추천 (무색, 무취 순한 77% 자연 진정 추출물)"
    },
    ingredientsList: [
      { name: "Houttuynia Cordata Extract (약모밀추출물 77%)", ewg: 1, desc: "트러블 케어 및 항염 진정 우수 성분" },
      { name: "Water (정제수)", ewg: 1, desc: "배합 성분 용제" },
      { name: "Glycerin (글리세린)", ewg: 1, desc: "수분 보습 작용" },
      { name: "1,2-Hexanediol (1,2-헥산다이올)", ewg: 1, desc: "안전 방부 및 피부 유연 보습제" },
      { name: "Centella Asiatica Extract (병풀추출물)", ewg: 1, desc: "마데카소사이드 원료로 장벽 진정 보강" },
      { name: "Chamomilla Recutita Flower Extract (캐모마일꽃추출물)", ewg: 1, desc: "피부 스트레스 완화 및 수딩 보호" },
      { name: "Disodium EDTA (다이소듐이디티에이)", ewg: 1, desc: "침전물 방지용 킬레이트제" }
    ]
  },
  {
    id: "iope_retinol",
    image: "assets/prod_iope.png",
    name: "아이오페 레티놀 슈퍼 바운스 세럼",
    category: "안티에이징 세럼",
    desc: "4중 레티놀 성분으로 단 7일 만에 모공 탄력을 개선하는 슬로우에이징 세럼",
    zone: "B",
    shelf: "B-3",
    coords: [660, 120],
    route: "M 400 480 L 500 480 L 500 120 L 660 120",
    ingredientsSummary: { green: 17, yellow: 5, red: 0 },
    suitability: {
      dry: "매우 추천 (펩타이드와 히알루론산 복합 배합으로 촉촉함)",
      oily: "추천 (모공 수축 효과로 피지/늘어짐 개선에 용이)",
      sensitive: "주의 (레티놀 고함량은 피부 자극 및 광민감성 유발 가능)"
    },
    ingredientsList: [
      { name: "Water (정제수)", ewg: 1, desc: "베이스 용제" },
      { name: "Glycerin (글리세린)", ewg: 1, desc: "풍부한 기초 보습" },
      { name: "Retinol (레티놀)", ewg: 2, desc: "주름, 모공, 탄력 개선의 대표적인 기능성 비타민 A" },
      { name: "Adenosine (아데노신)", ewg: 1, desc: "식약처 승인 노화 방지 기능성 성분" },
      { name: "Hydrolyzed Collagen (가수분해콜라겐)", ewg: 1, desc: "피부 진피 구성 유사 보습 단백질 성분" },
      { name: "Butylated Hydroxytoluene (BHT)", ewg: 4, desc: "레티놀 산화 방지 안정화제 (약간의 피부 자극성 우려)" },
      { name: "Fragrance (향료)", ewg: 5, desc: "화장품 향 조율 성분 (알레르기 예민성 피부 확인 요망)" }
    ]
  }
];

// Virtual Olive Young Product Generation Engine
function generateVirtualProduct(queryText) {
  let cleanName = queryText
    .replace(/(어디|위치|있어|찾아줘|추천|진열대|매대|코너|지도|보여|의|에|에서|알려|주세요|해줘|알려줘|분석|\?|\!)/g, "")
    .replace(/\s+/g, " ")
    .trim();
  
  if (!cleanName || cleanName.length < 2) return null;

  // Prevent skin type queries from being treated as product names
  const invalidKeywords = [
    "건성", "지성", "복합성", "수부지", "민감성", "여드름", "트러블", 
    "붉은", "홍조", "피부", "화장품", "고민", "세안", "얼굴", 
    "타입", "스킨케어", "사야돼", "해야돼", "루틴", "시작", 
    "추천", "어떻게", "어떡해", "뭘", "뭐", "질문", "진단",
    "타입인데", "건조", "당김", "기름", "번들", "케어",
    "건성타입", "지성타입", "복합성타입", "수부지타입",
    "건성용", "지성용", "복합성용", "수부지용", "건조용"
  ];
  
  const lowerName = cleanName.toLowerCase();
  // Core skin type keywords bypass virtual product creation to trigger natural consultation
  const hasSkinTypeKeyword = ["건성", "지성", "복합성", "수부지", "건조", "당김", "기름", "번들", "속건조", "속당김"].some(k => lowerName.includes(k));
  if (hasSkinTypeKeyword) return null;
  
  const isInvalid = invalidKeywords.some(word => {
    return cleanName === word || (cleanName.length < 12 && cleanName.includes(word));
  });
  
  if (isInvalid) return null;

  let category = "스킨케어 기초";
  let zone = "C";
  let shelf = "C-6";
  let coords = [160, 400];
  let route = "M 400 480 L 300 480 L 300 400 L 160 400";
  let desc = `올리브영 인기 실시간 케어 제품인 '${cleanName}'입니다. 끈적임 없는 부드러운 사용감과 수분 및 피부 건강에 필요한 보습 성분을 고루 갖추어 많은 고객님들께서 만족하시는 대중적인 베스트 제품입니다.`;
  let suitability = {
    dry: "추천 (피부 속당김 완화 및 보습 유지)",
    oily: "추천 (피지 끈적임이 없어 유수분 밸런싱 우수)",
    sensitive: "매우 추천 (EWG 그린 등급 원료 위주 설계)"
  };
  let image = "assets/character.png"; 
  
  const lowerQ = cleanName.toLowerCase();
  
  if (lowerQ.includes("토너") || lowerQ.includes("스킨") || lowerQ.includes("패드") || lowerQ.includes("미스트") || lowerQ.includes("물")) {
    category = "스킨케어 토너";
    zone = "C";
    shelf = "C-7";
    coords = [160, 440];
    route = "M 400 480 L 300 480 L 300 440 L 160 440";
    desc = `피부 결을 편안하게 정돈하고 첫 수분을 층층이 채워주는 '${cleanName}' 저자극 진정 토너 제품입니다.`;
  } else if (lowerQ.includes("크림") || lowerQ.includes("로션") || lowerQ.includes("젤") || lowerQ.includes("모이스처")) {
    category = "스킨케어 보습크림";
    zone = "C";
    shelf = "C-6";
    coords = [160, 400];
    route = "M 400 480 L 300 480 L 300 400 L 160 400";
    desc = `건조한 피부 겉과 속에 풍부한 영양과 수분막을 씌워 오랫동안 당김 없이 가꿔주는 '${cleanName}' 크림입니다.`;
  } else if (lowerQ.includes("세럼") || lowerQ.includes("앰플") || lowerQ.includes("에센스")) {
    category = "기능성 앰플/세럼";
    zone = "B";
    shelf = "B-4";
    coords = [660, 160];
    route = "M 400 480 L 500 480 L 500 160 L 660 160";
    desc = `피부 속 탄력 및 장벽 컨디션을 한층 고밀도로 다져주는 안티에이징 기능성 '${cleanName}' 앰플 세럼입니다.`;
  } else if (lowerQ.includes("여드름") || lowerQ.includes("트러블") || lowerQ.includes("시카") || lowerQ.includes("티트리") || lowerQ.includes("수딩")) {
    category = "더마 트러블 케어";
    zone = "A";
    shelf = "A-2";
    coords = [140, 160];
    route = "M 400 480 L 300 480 L 300 160 L 140 160";
    desc = `붉어지거나 자극받은 얇은 민감성 피부를 빠르게 급속 진정시키고 장벽 보습을 제공하는 '${cleanName}' 시카 수딩 케어입니다.`;
  } else if (lowerQ.includes("선크림") || lowerQ.includes("선젤") || lowerQ.includes("선블록") || lowerQ.includes("선스틱") || lowerQ.includes("썬") || lowerQ.includes("자외선")) {
    category = "자외선 차단 선크림";
    zone = "C";
    shelf = "C-5";
    coords = [160, 360];
    route = "M 400 480 L 300 480 L 300 360 L 160 360";
    desc = `자외선을 완벽 차단하면서도 스킨케어처럼 가볍고 밀착감 있게 피부결을 연출해주는 데일리 '${cleanName}' 자외선 차단제입니다.`;
  } else if (lowerQ.includes("남성") || lowerQ.includes("올인원") || lowerQ.includes("포맨") || lowerQ.includes("맨")) {
    category = "남성 스킨케어";
    zone = "C";
    shelf = "C-5";
    coords = [160, 360];
    route = "M 400 480 L 300 480 L 300 360 L 160 360";
    desc = `바쁜 현대 남성들을 위해 스킨, 로션, 에센스의 영양을 하나에 모아 피지 컨트롤과 고보습을 한 번에 해주는 '${cleanName}' 남성 올인원입니다.`;
  } else if (lowerQ.includes("쿠션") || lowerQ.includes("파운데이션") || lowerQ.includes("색조") || lowerQ.includes("팩트") || lowerQ.includes("비비") || lowerQ.includes("립") || lowerQ.includes("틴트") || lowerQ.includes("섀도") || lowerQ.includes("아이")) {
    category = "메이크업 색조";
    zone = "D";
    shelf = "D-8";
    coords = [640, 360];
    route = "M 400 480 L 500 480 L 500 360 L 640 360";
    desc = `밀착력 있는 커버와 화사한 생기를 선사하는 올리브영 화제의 메이크업 아이템 '${cleanName}'입니다.`;
  } else if (lowerQ.includes("클렌징") || lowerQ.includes("폼") || lowerQ.includes("워터") || lowerQ.includes("오일") || lowerQ.includes("필링")) {
    category = "클렌징 & 딥클린";
    zone = "A";
    shelf = "A-1";
    coords = [140, 120];
    route = "M 400 480 L 300 480 L 300 120 L 140 120";
    desc = `피부 자극은 최소화하고 모공 깊숙한 노폐물과 미세 잔여물까지 깨끗하게 녹여내는 저자극 클렌저 '${cleanName}'입니다.`;
  }

  const virtualIngredients = [
    { name: "정제수 (Water)", ewg: 1, desc: "화장품의 주성분이 되는 깨끗이 여과된 물" },
    { name: "글리세린 (Glycerin)", ewg: 1, desc: "대기 중의 수분을 자석처럼 당겨주는 훌륭한 천연 보습 인자" },
    { name: "부틸렌글라이콜 (Butylene Glcol)", ewg: 1, desc: "피부 연화감과 화장품의 수분 유지 성분" },
    { name: "병풀추출물 (Centella Asiatica Extract)", ewg: 1, desc: "마데카소사이드의 자연 유래 원료로 붉은 기 완화와 장벽 재생에 매우 우수" },
    { name: "소듐하이알루로네이트 (Hyaluronic Acid)", ewg: 1, desc: "피부 결마다 고밀도로 수분을 충전하여 건조함을 근본적으로 예방" },
    { name: "판테놀 (Panthenol)", ewg: 1, desc: "장벽의 손상을 메우고 건강하게 복구하는 비타민 B5 안정 성분" },
    { name: "1,2-헥산다이올 (1,2-Hexanediol)", ewg: 1, desc: "방부 효과와 무자극 보습을 겸하는 자연 친화 보존제" }
  ];

  return {
    id: "virtual_" + Math.random().toString(36).substr(2, 9),
    image: image,
    name: cleanName,
    category: category,
    desc: desc,
    zone: zone,
    shelf: shelf,
    coords: coords,
    route: route,
    ingredientsSummary: { green: 14, yellow: 2, red: 0 },
    suitability: suitability,
    ingredientsList: virtualIngredients
  };
}

// 2. CONVERSATION FLOW ENGINE (CONTEXT)
let conversationState = {
  gender: "female", // Active AI avatar: 'female' or 'male'
  step: "idle",     // 'idle', 'wait_dry_oily', 'diagnose_wait', 'diagnosed'
  skinType: null,   // diagnosed skin type
  recs: [],         // list of current recommended products
  voiceActive: false // Mic is enabled or not
};

// 3. UI ELEMENT REFERENCES
const clockEl = document.getElementById("kiosk-clock");
const voiceWaves = document.getElementById("voice-waves");
const avatarFemaleImg = document.getElementById("avatar-female-img");
const avatarMaleImg = document.getElementById("avatar-male-img");
const activeNameEl = document.getElementById("active-consultant-name");
const inputQuery = document.getElementById("customer-query-input");
const btnSend = document.getElementById("send-query-btn");
const btnVoiceToggle = document.getElementById("voice-mode-btn");
const voicePromptEl = document.getElementById("voice-speech-prompt");
const voicePromptTxt = document.getElementById("speech-prompt-text");
const dialogueTimeline = document.getElementById("dialogue-timeline-list");
const suggestionsContainer = document.getElementById("suggestions-container");
const aiStatusTxt = document.getElementById("ai-status-text");
const volumeToggle = document.getElementById("volume-toggle");

// Modals
const modalDiagnose = document.getElementById("modal-diagnostic");
const modalMap = document.getElementById("modal-map");
const modalIngredients = document.getElementById("modal-ingredients");
const modalReceipt = document.getElementById("modal-receipt");

// Webcam / Scan
const videoWebcam = document.getElementById("webcam-stream");
const fallbackScreen = document.getElementById("webcam-fallback");
const scanOverlay = document.getElementById("webcam-scan-overlay");
const hologramBracket = document.getElementById("hologram-bracket");
const scannerReadout = document.getElementById("scanner-state-readout");
const telemetryReadout = document.getElementById("telemetry-readout");
const scanInitialControls = document.getElementById("scan-initial-controls");
const scanProgressBox = document.getElementById("scan-progress-box");
const scanProgressFill = document.getElementById("scan-progress-fill");
const scanPercentage = document.getElementById("scan-percentage");
const scanTaskName = document.getElementById("scan-task-name");
const scanResultsBox = document.getElementById("scan-results-box");
const scoreRingTotal = document.getElementById("score-ring-total");
const resultScoreVal = document.getElementById("result-score-val");
const metricHydroVal = document.getElementById("metric-hydro-val");
const metricHydroBar = document.getElementById("metric-hydro-bar");
const metricSebumVal = document.getElementById("metric-sebum-val");
const metricSebumBar = document.getElementById("metric-sebum-bar");
const metricTroubleVal = document.getElementById("metric-trouble-val");
const metricTroubleBar = document.getElementById("metric-trouble-bar");
const skinTypeConclusion = document.getElementById("skin-type-conclusion");
const diagnoseRecsContainer = document.getElementById("diagnose-recs-container");

// SVG Store Map
const routeLine = document.getElementById("map-route-line");
const targetRing = document.getElementById("map-target-ring");
const directionInfoBox = document.getElementById("direction-info-box");
const directionZoneBadge = document.getElementById("direction-zone-badge");
const directionShelfDetail = document.getElementById("direction-shelf-detail");
const pathDescText = document.getElementById("path-desc-text");

// Ingredients
const ingredientSearchInput = document.getElementById("ingredient-search-input");
const btnIngredientSearch = document.getElementById("btn-ingredient-search");
const ingredientResultBox = document.getElementById("ingredient-result-box");
const analyzedProductName = document.getElementById("analyzed-product-name");
const ewgGreenCount = document.getElementById("ewg-green-count");
const ewgYellowCount = document.getElementById("ewg-yellow-count");
const ewgRedCount = document.getElementById("ewg-red-count");
const ingredientsTableBody = document.getElementById("ingredients-table-body");

// Receipt
const receiptDateTime = document.getElementById("receipt-date-time");
const receiptSkinScore = document.getElementById("receipt-skin-score");
const receiptSkinType = document.getElementById("receipt-skin-type");
const receiptItemsList = document.getElementById("receipt-items-list");
const btnTriggerPrint = document.getElementById("btn-trigger-print");
const printSuccessFeedback = document.getElementById("print-success-feedback");

// 4. SPEECH INIT (STT / TTS)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let speechVolume = true; // Synthesize voice back by default

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'ko-KR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.onstart = () => {
    btnVoiceToggle.classList.add("listening");
    voicePromptEl.classList.remove("hidden");
    voicePromptTxt.textContent = "고객님의 목소리를 듣고 있어요... 말씀해 주세요.";
    updateStatusBadge("listening");
  };
  
  recognition.onerror = (e) => {
    console.error("STT Error:", e);
    voicePromptTxt.textContent = "목소리가 잘 들리지 않아요. 다시 시도해 주세요.";
    setTimeout(() => {
      stopListening();
    }, 2000);
  };
  
  recognition.onend = () => {
    btnVoiceToggle.classList.remove("listening");
    voicePromptEl.classList.add("hidden");
    updateStatusBadge("online");
  };
  
  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    if (transcript.trim()) {
      stopListening(); // Shut down mic immediately upon receiving result to prevent synth overlap
      handleUserQuery(transcript);
    }
  };
}

// 5. HELPER ACTIONS

// Move modal overlays inside the kiosk screen container so they are bounded correctly
document.querySelectorAll(".modal-overlay").forEach(modal => {
  const container = document.getElementById("main-kiosk-screen");
  if (container) {
    container.appendChild(modal);
  }
});

// Set current clock
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

// Toggle sound speakVolume
volumeToggle.addEventListener("click", () => {
  speechVolume = !speechVolume;
  if (speechVolume) {
    volumeToggle.setAttribute("data-lucide", "volume-2");
    volumeToggle.classList.remove("text-muted");
    showSystemBubble("음성 피드백 안내가 켜졌습니다. 상담원의 답변을 소리로 들으실 수 있습니다.");
  } else {
    volumeToggle.setAttribute("data-lucide", "volume-x");
    volumeToggle.classList.add("text-muted");
    showSystemBubble("음성 피드백이 음소거되었습니다.");
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (typeof AvatarAnimator !== 'undefined') {
        AvatarAnimator.setSpeaking(false);
      }
      voiceWaves.classList.remove("speaking");
      document.querySelectorAll(".avatar-img").forEach(img => {
        img.classList.remove("speaking");
      });
    }
  }
  lucide.createIcons();
});

// Update top header status badge
function updateStatusBadge(state) {
  if (state === "online") {
    aiStatusTxt.textContent = "대기 중 (ONLINE)";
    document.querySelector(".pulse-dot").style.backgroundColor = "var(--color-olive-glow)";
    document.querySelector(".pulse-dot").style.boxShadow = "var(--neon-glow-olive)";
  } else if (state === "listening") {
    aiStatusTxt.textContent = "경청 중 (LISTENING)";
    document.querySelector(".pulse-dot").style.backgroundColor = "#ef4444";
    document.querySelector(".pulse-dot").style.boxShadow = "0 0 10px #ef4444";
  } else if (state === "speaking") {
    aiStatusTxt.textContent = "답변 중 (SPEAKING)";
    document.querySelector(".pulse-dot").style.backgroundColor = "var(--color-olive-glow)";
    document.querySelector(".pulse-dot").style.boxShadow = "var(--neon-glow-olive)";
  } else if (state === "diagnosing") {
    aiStatusTxt.textContent = "피부 진단 중 (DIAGNOSING)";
    document.querySelector(".pulse-dot").style.backgroundColor = "var(--color-purple-glow)";
    document.querySelector(".pulse-dot").style.boxShadow = "var(--neon-glow-purple)";
  }
}

// Pre-process text to replace English terms, codes, and numbers with natural Korean phonetic equivalents to eliminate mechanical gaps
function preprocessTextForTTS(text) {
  let clean = text;
  
  // Strip HTML tags (like <br>, <strong>, etc.)
  clean = clean.replace(/<[^>]*>/g, ' ');
  
  // Clean emojis
  clean = clean.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "");
  
  // Replace English terms/codes with Korean phonetics
  const replacements = [
    { pattern: /\bAI\b/gi, replace: "에이아이" },
    { pattern: /\bEWG\b/gi, replace: "이더블유지" },
    { pattern: /\bTTS\b/gi, replace: "티티에스" },
    { pattern: /\bSTT\b/gi, replace: "에스티티" },
    { pattern: /\bKiosk\b/gi, replace: "키오스크" },
    { pattern: /\bDMT\b/gi, replace: "디엠티" },
    { pattern: /\bCica\b/gi, replace: "시카" },
    { pattern: /\bUVB\b/gi, replace: "유브이비" },
    { pattern: /\bEDTA\b/gi, replace: "이디티에이" },
    { pattern: /\bBHT\b/gi, replace: "비에이치티" },
    { pattern: /\bOnline\b/gi, replace: "온라인" },
    { pattern: /\bPhysiogel\b/gi, replace: "피지오겔" },
    { pattern: /\bDr\.G\b/gi, replace: "닥터지" },
    { pattern: /\bDr\s+G\b/gi, replace: "닥터지" },
    { pattern: /\bAnua\b/gi, replace: "아누아" },
    { pattern: /\bIOPE\b/gi, replace: "아이오페" },
    { pattern: /\bRetinol\b/gi, replace: "레티놀" },
    
    // Zones and Shelves
    { pattern: /A구역/g, replace: "에이구역" },
    { pattern: /B구역/g, replace: "비구역" },
    { pattern: /C구역/g, replace: "씨구역" },
    { pattern: /D구역/g, replace: "디구역" },
    
    { pattern: /A-1/g, replace: "에이 일번" },
    { pattern: /A-2/g, replace: "에이 이번" },
    { pattern: /B-3/g, replace: "비 삼번" },
    { pattern: /B-4/g, replace: "비 사번" },
    { pattern: /C-5/g, replace: "씨 오번" },
    { pattern: /C-6/g, replace: "씨 육번" },
    { pattern: /C-7/g, replace: "씨 칠번" },
    { pattern: /D-8/g, replace: "디 팔번" },
    { pattern: /D-9/g, replace: "디 구번" },
    
    // Single alphabet letters
    { pattern: /\bA\b/gi, replace: "에이" },
    { pattern: /\bB\b/gi, replace: "비" },
    { pattern: /\bC\b/gi, replace: "씨" },
    { pattern: /\bD\b/gi, replace: "디" },

    // Special signs and numbers
    { pattern: /%/g, replace: " 퍼센트" },
    { pattern: /~/g, replace: " 에서 " },
    { pattern: /1위/g, replace: "일위" },
    { pattern: /72시간/g, replace: "칠십이시간" },
    { pattern: /77%/g, replace: "칠십칠퍼센트" },
    { pattern: /7일/g, replace: "칠일" },
    { pattern: /4중/g, replace: "사중" },
    { pattern: /10%/g, replace: "십퍼센트" },
    { pattern: /82점/g, replace: "팔십이점" },
    { pattern: /42%/g, replace: "사십이퍼센트" },
    { pattern: /18%/g, replace: "십팔퍼센트" },
    { pattern: /52%/g, replace: "오십이퍼센트" }
  ];
  
  replacements.forEach(r => {
    clean = clean.replace(r.pattern, r.replace);
  });
  
  return clean.trim();
}

// Speak AI Response via TTS
function speakText(text) {
  if (!speechVolume) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const cleanText = preprocessTextForTTS(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    
    // Choose gender voice properties
    const voices = window.speechSynthesis.getVoices();
    const koVoices = voices.filter(voice => voice.lang.includes('ko') || voice.lang.includes('KO'));
    
    let selectedVoice = null;
    let pitchVal = 1.0;
    let rateVal = 0.98; // Relaxed, natural human conversational rate
    
    // Sort Korean voices prioritizing Neural, Natural, and Online high-quality voices
    const sortedKoVoices = [...koVoices].sort((a, b) => {
      const getScore = (v) => {
        const name = v.name.toLowerCase();
        if (name.includes("natural") || name.includes("neural") || name.includes("online")) return 100;
        if (name.includes("google")) return 50;
        return 0;
      };
      return getScore(b) - getScore(a);
    });
    
    if (conversationState.gender === "female") {
      // Find 20s bright neural/natural female voice (e.g. Microsoft SunHi Online)
      selectedVoice = sortedKoVoices.find(v => {
        const n = v.name.toLowerCase();
        return (n.includes("sunhi") || n.includes("female") || n.includes("여성") || n.includes("heami")) && 
               (n.includes("natural") || n.includes("neural") || n.includes("online") || n.includes("google"));
      });
      
      if (!selectedVoice) {
        selectedVoice = sortedKoVoices.find(v => v.name.includes("Heami") || v.name.includes("Google") || v.name.includes("female") || v.name.includes("Female") || v.name.includes("여성"));
      }
      if (!selectedVoice) {
        selectedVoice = sortedKoVoices[0];
      }
      
      // Keep pitch completely natural (1.0) for Neural/Natural voices so they don't sound synthesized
      const isNeural = selectedVoice && (selectedVoice.name.toLowerCase().includes("natural") || selectedVoice.name.toLowerCase().includes("neural") || selectedVoice.name.toLowerCase().includes("online"));
      if (isNeural) {
        pitchVal = 1.0; 
      } else {
        pitchVal = 1.08; // Slight pitch boost ONLY on mechanical local fallback engines
      }
    } else {
      // Find 20s gentle neural/natural male voice (e.g. Microsoft InJoon Online)
      selectedVoice = sortedKoVoices.find(v => {
        const n = v.name.toLowerCase();
        return (n.includes("injoon") || n.includes("male") || n.includes("남성") || n.includes("yujin")) && 
               (n.includes("natural") || n.includes("neural") || n.includes("online") || n.includes("google"));
      });
      
      if (!selectedVoice) {
        selectedVoice = sortedKoVoices.find(v => v.name.includes("male") || v.name.includes("남성") || v.name.includes("Yujin"));
      }
      if (!selectedVoice) {
        selectedVoice = sortedKoVoices.length > 1 ? sortedKoVoices[1] : sortedKoVoices[0];
      }
      
      const isNeural = selectedVoice && (selectedVoice.name.toLowerCase().includes("natural") || selectedVoice.name.toLowerCase().includes("neural") || selectedVoice.name.toLowerCase().includes("online"));
      const isMaleVoice = selectedVoice && (selectedVoice.name.toLowerCase().includes("injoon") || selectedVoice.name.toLowerCase().includes("male") || selectedVoice.name.toLowerCase().includes("yujin") || selectedVoice.name.toLowerCase().includes("남성"));
      
      if (isNeural) {
        pitchVal = 1.0; // Keep neural voices natural
      } else if (isMaleVoice) {
        pitchVal = 0.95;
      } else {
        pitchVal = 0.82; // Lower pitch to simulate male voice from fallback female engine
      }
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.pitch = pitchVal;
    utterance.rate = rateVal;
    
    utterance.onstart = () => {
      voiceWaves.classList.add("speaking");
      updateStatusBadge("speaking");
      const activeVideo = document.querySelector(".avatar-video.active");
      if (activeVideo) {
        activeVideo.classList.add("speaking");
        activeVideo.playbackRate = 1.25; // Speed up active video slightly when speaking
      }
      const activeBackdrop = document.querySelector(".avatar-video-backdrop.active");
      if (activeBackdrop) {
        activeBackdrop.playbackRate = 1.25;
      }
      if (typeof AvatarAnimator !== 'undefined') {
        AvatarAnimator.setSpeaking(true);
      }
      document.querySelectorAll(".avatar-img").forEach(img => {
        if (img.classList.contains("active")) {
          img.classList.add("speaking");
        }
      });
    };
    
    utterance.onend = () => {
      voiceWaves.classList.remove("speaking");
      updateStatusBadge("online");
      document.querySelectorAll(".avatar-video").forEach(v => {
        v.classList.remove("speaking");
        v.playbackRate = 1.0; // Reset speed
      });
      document.querySelectorAll(".avatar-video-backdrop").forEach(v => {
        v.playbackRate = 1.0; // Reset backdrop speed
      });
      if (typeof AvatarAnimator !== 'undefined') {
        AvatarAnimator.setSpeaking(false);
      }
      document.querySelectorAll(".avatar-img").forEach(img => {
        img.classList.remove("speaking");
      });
    };
    
    utterance.onerror = () => {
      voiceWaves.classList.remove("speaking");
      updateStatusBadge("online");
      document.querySelectorAll(".avatar-video").forEach(v => {
        v.classList.remove("speaking");
        v.playbackRate = 1.0; // Reset speed
      });
      document.querySelectorAll(".avatar-video-backdrop").forEach(v => {
        v.playbackRate = 1.0; // Reset backdrop speed
      });
      if (typeof AvatarAnimator !== 'undefined') {
        AvatarAnimator.setSpeaking(false);
      }
      document.querySelectorAll(".avatar-img").forEach(img => {
        img.classList.remove("speaking");
      });
    };
    
    window.speechSynthesis.speak(utterance);
  }
}

// Start and Stop listening
function startListening() {
  if (recognition) {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Mute ongoing TTS when client speaks
        if (typeof AvatarAnimator !== 'undefined') {
          AvatarAnimator.setSpeaking(false);
        }
      }
      recognition.start();
      conversationState.voiceActive = true;
    } catch(err) {
      console.log("Recognition already running:", err);
    }
  } else {
    showSystemBubble("사용하시는 기기에서 마이크 권한 또는 음성 분석 브라우저 기능이 비활성화되어 있습니다. 키보드 타이핑을 이용해 주세요.");
  }
}

function stopListening() {
  if (recognition) {
    try {
      recognition.stop();
    } catch(err) {
      console.log("Recognition stop bypass:", err);
    }
    conversationState.voiceActive = false;
    btnVoiceToggle.classList.remove("listening");
    voicePromptEl.classList.add("hidden");
    updateStatusBadge("online");
  }
}

// Switch consultant Gender avatar
document.querySelectorAll(".btn-avatar-select").forEach(btn => {
  btn.addEventListener("click", () => {
    const gender = btn.getAttribute("data-gender");
    if (gender === conversationState.gender) return;
    
    // Switch state
    conversationState.gender = gender;
    document.querySelectorAll(".btn-avatar-select").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const femaleVideo = document.getElementById("avatar-female-video");
    const maleVideo = document.getElementById("avatar-male-video");
    const femaleBackdrop = document.getElementById("avatar-female-backdrop");
    const maleBackdrop = document.getElementById("avatar-male-backdrop");
    
    if (gender === "female") {
      avatarFemaleImg.classList.add("active");
      avatarMaleImg.classList.remove("active");
      
      if (femaleVideo) {
        femaleVideo.classList.add("active");
        femaleVideo.play().catch(err => console.log("Female video play failed:", err));
      }
      if (femaleBackdrop) {
        femaleBackdrop.classList.add("active");
        femaleBackdrop.play().catch(err => console.log("Female backdrop play failed:", err));
      }
      
      if (maleVideo) {
        maleVideo.classList.remove("active");
        maleVideo.pause();
      }
      if (maleBackdrop) {
        maleBackdrop.classList.remove("active");
        maleBackdrop.pause();
      }
      
      activeNameEl.textContent = "이지아 뷰티 컨설턴트";
      showSystemBubble("이지아 컨설턴트로 파트너가 전환되었습니다.");
      appendAIBubble("안녕하세요! 이지아 컨설턴트입니다. 만나서 반갑습니다!");
    } else {
      avatarFemaleImg.classList.remove("active");
      avatarMaleImg.classList.add("active");
      
      if (maleVideo) {
        maleVideo.classList.add("active");
        maleVideo.play().catch(err => console.log("Male video play failed:", err));
      }
      if (maleBackdrop) {
        maleBackdrop.classList.add("active");
        maleBackdrop.play().catch(err => console.log("Male backdrop play failed:", err));
      }
      
      if (femaleVideo) {
        femaleVideo.classList.remove("active");
        femaleVideo.pause();
      }
      if (femaleBackdrop) {
        femaleBackdrop.classList.remove("active");
        femaleBackdrop.pause();
      }
      
      activeNameEl.textContent = "민준우 뷰티 컨설턴트";
      showSystemBubble("민준우 컨설턴트로 파트너가 전환되었습니다.");
      appendAIBubble("안녕하세요! 민준우 컨설턴트입니다. 스킨케어 고민을 저에게 말씀해 주세요!");
    }
    
    if (typeof AvatarAnimator !== 'undefined') {
      AvatarAnimator.setGender(gender);
    }
  });
});

// Sound loading check for TTS
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    // Trigger voices list update for browsers
  };
}

// ========================================================
// 6. CHAT LAYOUT WRITING & TYPEWRITER ENGINE
// ========================================================

function appendUserBubble(text) {
  const msgHtml = `
    <div class="chat-message user-msg">
      <div class="message-sender">
        <span class="sender-name">고객</span>
        <i data-lucide="user" class="sender-icon"></i>
      </div>
      <div class="message-bubble">${text}</div>
    </div>
  `;
  dialogueTimeline.insertAdjacentHTML('beforeend', msgHtml);
  lucide.createIcons();
  scrollToBottom();
}

function appendAIBubble(text, interactiveCallbacks = null) {
  const id = "ai-bubble-" + Date.now();
  const consultantName = conversationState.gender === "female" ? "이지아 뷰티 컨설턴트" : "민준우 뷰티 컨설턴트";
  
  // Clean text for data-text attribute to avoid HTML tags and double quotes issues
  const cleanSpeakText = text.replace(/<[^>]*>/g, ' ').replace(/"/g, '&quot;');
  
  const msgHtml = `
    <div class="chat-message ai-msg">
      <div class="message-sender">
        <div class="sender-info">
          <i data-lucide="sparkles" class="sender-icon"></i>
          <span class="sender-name">${consultantName}</span>
        </div>
        <button class="btn-bubble-speak" data-text="${cleanSpeakText}" aria-label="답변 음성 듣기" title="음성 듣기">
          <i data-lucide="volume-2"></i>
          <span>음성 듣기</span>
        </button>
      </div>
      <div class="message-bubble" id="${id}"></div>
    </div>
  `;
  dialogueTimeline.insertAdjacentHTML('beforeend', msgHtml);
  lucide.createIcons();
  
  const bubbleEl = document.getElementById(id);
  
  // HTML Tag-aware Typewriter effect
  let idx = 0;
  const speed = 15; // Slightly faster typing speed for smoother flow (15ms per character)
  
  function type() {
    if (idx < text.length) {
      if (text.charAt(idx) === "<") {
        // Find closing angle bracket for HTML tag
        const tagEnd = text.indexOf(">", idx);
        if (tagEnd !== -1) {
          const tag = text.substring(idx, tagEnd + 1);
          bubbleEl.innerHTML += tag;
          idx = tagEnd + 1;
        } else {
          bubbleEl.innerHTML += text.charAt(idx);
          idx++;
        }
      } else {
        bubbleEl.innerHTML += text.charAt(idx);
        idx++;
      }
      scrollToBottom();
      setTimeout(type, speed);
    } else {
      // Finished typing
      if (interactiveCallbacks) {
        interactiveCallbacks(bubbleEl);
      }
      scrollToBottom();
    }
  }
  
  type();
}

function showSystemBubble(text) {
  const msgHtml = `
    <div class="dialogue-intro-card mt-2" style="background: rgba(255, 255, 255, 0.02); border-color: rgba(255, 255, 255, 0.1);">
      <p style="font-size: 9px; color: var(--color-olive-glow);">${text}</p>
    </div>
  `;
  dialogueTimeline.insertAdjacentHTML('beforeend', msgHtml);
  scrollToBottom();
}

function scrollToBottom() {
  const scroller = document.getElementById("chat-scroller");
  scroller.scrollTop = scroller.scrollHeight;
}

// ========================================================
// 7. DIALOGUE NATURAL SCENARIO ROUTER (SMART AGENT)
// ========================================================

function handleUserQuery(query) {
  if (!query.trim()) return;
  
  appendUserBubble(query);
  inputQuery.value = "";
  
  // Basic keyword parsing
  const cleanQ = query.toLowerCase();
  
  setTimeout(() => {
    // 1. Initial Skincare Male beginner scenario
    if (cleanQ.includes("남자") && (cleanQ.includes("처음") || cleanQ.includes("스킨케어") || cleanQ.includes("시작"))) {
      appendAIBubble("안녕하세요! 올리브영에 오신 것을 환영합니다. 남성 스킨케어를 처음 시작하시는군요!<br><br>스킨케어 추천을 위해 한 가지만 여쭤볼게요. 평소 세안 후에 피부가 건조하고 당기는 편이신가요? 아니면 유분이 많아 번들거리는 편이신가요?");
      conversationState.step = "wait_dry_oily";
      
      // Update quick tags for next step
      updateQuickTags([
        { text: "조금 건성(건조해요)", query: "조금 건조하고 가끔은 각질도 올라오는 것 같아요." },
        { text: "지성(개기름/유분이 많아요)", query: "유분이 많아서 항상 얼굴이 번들거려요." },
        { text: "피부 진단 먼저 받을게", query: "내 피부를 먼저 진단해줘." }
      ]);
      return;
    }
    
    // 1.5 Direct Product Search / Location Matcher (Voice & Text search)
    let matchedProduct = null;
    const realBrands = ["피지오겔", "닥터지", "아이디얼", "식물나라", "아누아", "아이오페", "physiogel", "dr.g", "drg", "ideal", "anua", "iope"];
    const hasRealBrand = realBrands.some(brand => cleanQ.includes(brand));
    const hasSkinType = ["건성", "지성", "복합성", "수부지", "건조", "당김", "기름", "번들", "속건조", "속당김"].some(k => cleanQ.includes(k));
    
    const isSearchQuery = cleanQ.includes("어디") || cleanQ.includes("위치") || cleanQ.includes("찾") || cleanQ.includes("추천") || cleanQ.includes("있") || cleanQ.includes("제품") || cleanQ.includes("상품") || cleanQ.includes("코너") || cleanQ.includes("매대") || cleanQ.includes("진열대") || cleanQ.includes("보여") || cleanQ.includes("약도") || cleanQ.includes("지도");
    
    // Only perform product-specific lookup if a real brand is specified OR if it's not a generic skin-type question
    if (hasRealBrand || !hasSkinType) {
      for (let p of PRODUCTS_DATABASE) {
        const brand = p.name.split(" ")[0].toLowerCase(); // e.g. "닥터지", "피지오겔", "아이디얼"
        if (cleanQ.includes(p.id) || 
            cleanQ.includes(brand) || 
            (cleanQ.includes("선젤") && p.id === "singmulnara_sun") ||
            (cleanQ.includes("선크림") && p.id === "singmulnara_sun") ||
            (cleanQ.includes("토너") && p.id === "anua_toner") ||
            (cleanQ.includes("어성초") && p.id === "anua_toner") ||
            (cleanQ.includes("올인원") && p.id === "ideal_allinone") ||
            (cleanQ.includes("레티놀") && p.id === "iope_retinol") ||
            (cleanQ.includes("수딩크림") && p.id === "drg_soothing_cream") ||
            (cleanQ.includes("피지오겔") && p.id === "physiogel_dmt")
        ) {
          matchedProduct = p;
          break;
        }
      }
      
      // If not matched in existing DB, try to generate a virtual product
      if (!matchedProduct && (isSearchQuery || cleanQ.length < 20)) {
        const virtualP = generateVirtualProduct(query);
        if (virtualP) {
          PRODUCTS_DATABASE.push(virtualP);
          matchedProduct = virtualP;
        }
      }
      
      if (matchedProduct && (isSearchQuery || cleanQ.length < 20)) {
        conversationState.recs = [matchedProduct];
        appendAIBubble(
          `문의하신 제품은 <strong>${matchedProduct.name}</strong>이군요!<br>해당 제품은 매장 내 **[${matchedProduct.zone}구역 ${matchedProduct.shelf} 진열대]**에 위치해 있습니다.<br>아래 제품 카드를 클릭하시면 매장 입구에서부터의 이동 동선이 지도에 실시간으로 표시됩니다.`,
          (bubbleEl) => {
            appendProductInteractionCards(bubbleEl, [matchedProduct]);
          }
        );
        return;
      }
    }
    
    // 2. Multi-turn step for dry/oily feedback
    if (conversationState.step === "wait_dry_oily") {
      if (cleanQ.includes("건조") || cleanQ.includes("건성")) {
        conversationState.step = "diagnosed";
        conversationState.skinType = "dry";
        
        // Find products
        const ideal = PRODUCTS_DATABASE.find(p => p.id === "ideal_allinone");
        const sun = PRODUCTS_DATABASE.find(p => p.id === "singmulnara_sun");
        conversationState.recs = [ideal, sun];
        
        appendAIBubble(
          "피부가 다소 건조하시군요! 그렇다면 첫 루틴으로는 무겁지 않은 세럼 제형 올인원 로션과 차단제를 추천드립니다.<br><br>1. <strong>아이디얼 포 맨 퍼펙트 올인원</strong> (간편 보습 로션)<br>2. <strong>식물나라 산소수 가벼운 선젤</strong> (촉촉한 물광 자외선 차단)<br><br>이 추천 제품들은 매장의 <strong>[스킨케어 존 C구역 5번 진열대]</strong>에 나란히 진열되어 있습니다. 아래 '매장 지도' 버튼을 누르시면 C구역 진열대까지의 동선을 바로 확인하실 수 있습니다.",
          (bubbleEl) => {
            appendProductInteractionCards(bubbleEl, conversationState.recs);
          }
        );
        resetQuickTagsToDefault();
        return;
      }
      
      if (cleanQ.includes("유분") || cleanQ.includes("지성") || cleanQ.includes("번들") || cleanQ.includes("기름")) {
        conversationState.step = "diagnosed";
        conversationState.skinType = "oily";
        
        const cream = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
        const toner = PRODUCTS_DATABASE.find(p => p.id === "anua_toner");
        conversationState.recs = [cream, toner];
        
        appendAIBubble(
          "유분이 많아 기름지면서 속당김이 있으신 전형적인 수부지 지성 타입이시군요. 피지 조절과 수분 공급을 동시에 할 수 있는 가벼운 진정 크림과 토너 조합을 추천해 드립니다.<br><br>1. <strong>아누아 어성초 77 토너</strong> (피지 정리 및 진정)<br>2. <strong>닥터지 레드 블레미쉬 수딩 크림</strong> (오일프리 수분 충전)<br><br>아누아 토너는 <strong>더마 케어 A구역 2번 매대</strong>에, 닥터지 크림은 <strong>스킨케어 존 C구역 6번 매대</strong>에 있습니다. 매장 안내가 필요하시면 제품 카드를 터치해 주세요!",
          (bubbleEl) => {
            appendProductInteractionCards(bubbleEl, conversationState.recs);
          }
        );
        resetQuickTagsToDefault();
        return;
      }
    }
    
    // 2.5 General Dry skin type query (Independent of step)
    if ((cleanQ.includes("건조") || cleanQ.includes("건성") || cleanQ.includes("당김")) && !cleanQ.includes("수부지") && !cleanQ.includes("속건조") && !cleanQ.includes("속당김")) {
      const cream = PRODUCTS_DATABASE.find(p => p.id === "physiogel_dmt");
      const ideal = PRODUCTS_DATABASE.find(p => p.id === "ideal_allinone");
      conversationState.recs = [cream, ideal];
      
      appendAIBubble(
        "건성 피부 고민이시군요! 당김과 각질을 해결하기 위해 피부 장벽 복구 및 탄탄한 유수분막 공급이 최우선입니다.<br><br>올리브영 대표 건성 추천 제품을 소개해 드립니다.<br>1. <strong>피지오겔 DMT 페이셜 크림</strong> (초장시간 장벽 고보습)<br>2. <strong>아이디얼 포 맨 퍼펙트 올인원</strong> (남성 건성용 촉촉 멀티로션)<br><br>피지오겔 크림은 <strong>C구역 6번 매대</strong>에, 올인원 로션은 <strong>C구역 5번 매대</strong>에 있습니다. 매장 안내가 필요하시면 아래 카드를 터치해 주세요!",
        (bubbleEl) => {
          appendProductInteractionCards(bubbleEl, conversationState.recs);
        }
      );
      return;
    }

    // 2.6 General Oily skin type query (Independent of step)
    if ((cleanQ.includes("지성") || cleanQ.includes("유분") || cleanQ.includes("기름") || cleanQ.includes("번들")) && !cleanQ.includes("수부지")) {
      const cream = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
      const toner = PRODUCTS_DATABASE.find(p => p.id === "anua_toner");
      conversationState.recs = [cream, toner];
      
      appendAIBubble(
        "유분과 번들거림이 심한 지성 피부 고민이시군요! 유분은 잡으면서 속수분을 채우는 가벼운 진정 크림과 모공 피지를 정돈하는 토너가 제격입니다.<br><br>올리브영 지성 대표 추천 제품입니다.<br>1. <strong>아누아 어성초 77 토너</strong> (피지 억제 및 결 진정)<br>2. <strong>닥터지 RED 블레미쉬 수딩 크림</strong> (오일프리 수분 수딩젤)<br><br>아누아 토너는 <strong>A구역 2번 매대</strong>에, 닥터지 크림은 <strong>C구역 6번 매대</strong>에 있습니다. 매대 동선을 확인하시려면 아래 제품 카드를 터치해 주세요!",
        (bubbleEl) => {
          appendProductInteractionCards(bubbleEl, conversationState.recs);
        }
      );
      return;
    }

    // 2.7 General Combination skin type query (Independent of step)
    if (cleanQ.includes("복합성") || cleanQ.includes("복합") || cleanQ.includes("t존") || cleanQ.includes("유수분")) {
      const cream = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
      const retinol = PRODUCTS_DATABASE.find(p => p.id === "iope_retinol");
      conversationState.recs = [cream, retinol];
      
      appendAIBubble(
        "T존(이마, 코)은 번들거리고 U존(볼, 턱)은 건조한 복합성 피부이시군요! 부위별 유수분 균형을 다르게 맞추는 똑똑한 스킨케어가 중요합니다.<br><br>올리브영 대표 복합성 추천 제품입니다.<br>1. <strong>닥터지 레드 블레미쉬 수딩 크림</strong> (U존 수분 케어 및 T존 저자극 유수분 밸런싱)<br>2. <strong>아이오페 레티놀 슈퍼 바운스 세럼</strong> (T존 모공 수축 및 전체 탄력 부스팅)<br><br>닥터지 크림은 <strong>C구역 6번 매대</strong>에, 아이오페 레티놀 세럼은 <strong>B구역 3번 매대</strong>에 있습니다. 매대 정보를 보시려면 아래 제품 카드를 터치해 주세요!",
        (bubbleEl) => {
          appendProductInteractionCards(bubbleEl, conversationState.recs);
        }
      );
      return;
    }

    // 2.8 General Dehydrated Oily skin type query (Independent of step)
    if (cleanQ.includes("수부지") || cleanQ.includes("속건조") || cleanQ.includes("속당김")) {
      const toner = PRODUCTS_DATABASE.find(p => p.id === "anua_toner");
      const cream = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
      conversationState.recs = [toner, cream];
      
      appendAIBubble(
        "피부 겉은 기름지지만 속은 바짝 당기는 '수분 부족형 지성(수부지)' 피부이시군요! 모공을 막지 않는 오일프리 수분 제품과 피지를 잡는 진정 수분 레이어링이 필수입니다.<br><br>올리브영 대표 수부지 추천 조합입니다.<br>1. <strong>아누아 어성초 77 토너</strong> (속수분 다지고 각질/피지 케어)<br>2. <strong>닥터지 레드 블레미쉬 수딩 크림</strong> (답답함 없이 젤 제형으로 산뜻하게 속건조 해결)<br><br>아누아 토너는 <strong>A구역 2번 매대</strong>에, 닥터지 크림은 <strong>C구역 6번 매대</strong>에 있습니다. 매대 위치를 지도로 보시려면 아래 상품을 클릭해 주세요!",
        (bubbleEl) => {
          appendProductInteractionCards(bubbleEl, conversationState.recs);
        }
      );
      return;
    }
    
    // 3. Acne / Redness/ Trouble skin query
    if (cleanQ.includes("여드름") || cleanQ.includes("트러블") || cleanQ.includes("붉") || cleanQ.includes("진정") || cleanQ.includes("아토피")) {
      const toner = PRODUCTS_DATABASE.find(p => p.id === "anua_toner");
      const cream = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
      conversationState.recs = [toner, cream];
      
      appendAIBubble(
        "트러블과 홍조 피부에는 염증 완화 및 모공 폐쇄율이 낮은 논코메도제닉(Non-comedogenic) 자연유래 진정 화장품을 써야 합니다. 닥터지 수딩크림과 아누아 어성초 토너를 집중 추천드립니다.<br><br>안내해 드릴까요?<br>- 아누아 토너: <strong>더마케어 존 A-2 매대</strong><br>- 닥터지 크림: <strong>스킨케어 존 C-6 매대</strong>",
        (bubbleEl) => {
          appendProductInteractionCards(bubbleEl, conversationState.recs);
        }
      );
      return;
    }
    
    // 4. Aging / Wrinkle / elasticity / whitening
    if (cleanQ.includes("탄력") || cleanQ.includes("주름") || cleanQ.includes("미백") || cleanQ.includes("잡티") || cleanQ.includes("레티놀")) {
      const retinol = PRODUCTS_DATABASE.find(p => p.id === "iope_retinol");
      conversationState.recs = [retinol];
      
      appendAIBubble(
        "피부 미백 및 슬로우 에이징 케어를 원하시는군요! 주름과 모공을 탄탄하게 잡아주는 레티놀 앰플이 제격입니다.<br><br><strong>아이오페 레티놀 슈퍼 바운스 세럼</strong>을 추천해 드립니다. 기능성 케어 <strong>[B구역 3번 진열대]</strong>에 진열되어 있습니다. ⚠️ 레티놀은 피부 자극이 있을 수 있으니 밤에 소량씩 시작하시기 바랍니다.",
        (bubbleEl) => {
          appendProductInteractionCards(bubbleEl, conversationState.recs);
        }
      );
      return;
    }
    
    // 5. Skin Diagnose direct call
    if (cleanQ.includes("피부") && cleanQ.includes("진단")) {
      appendAIBubble("AI 피부 분석 모듈을 활성화합니다. 하단의 '피부 측정 시작하기' 버튼을 누르고 카메라를 응시해 주세요.");
      openModal("modal-diagnostic");
      return;
    }
    
    // 6. Ingredients analyzer trigger
    if (cleanQ.includes("성분") || cleanQ.includes("분석")) {
      // Check if product specific name is in cleanQ
      let match = null;
      for (let p of PRODUCTS_DATABASE) {
        if (cleanQ.includes(p.name.split(" ")[0].toLowerCase())) {
          match = p;
          break;
        }
      }
      
      if (match) {
        appendAIBubble(`${match.name} 제품의 EWG 분석 등급 및 전성분을 찾아냈습니다. 분석 창에서 확인하시겠습니까?`);
        openModal("modal-ingredients");
        loadIngredientReport(match.id);
      } else {
        appendAIBubble("스마트 성분 분석 연구소를 활성화하겠습니다. 검색창에 제품명을 적거나 우측의 추천 검색어를 터치해 성분을 분석해 보세요!");
        openModal("modal-ingredients");
      }
      return;
    }
    
    // 7. Dynamic search for ingredients query directly (e.g. "페녹시에탄올 성분 어때?")
    if (cleanQ.includes("페녹시에탄올")) {
      appendAIBubble("<strong>페녹시에탄올 (Phenoxyethanol)</strong>은 화장품 유통 시 세균 번식을 막기 위한 살균 보존제 성분입니다.<br><br>EWG 위험도는 2~4등급(Moderate) 수준입니다. 과거 논란이 된 파라벤을 대체해 널리 쓰이나, 1% 고농도 배합 시 눈이나 피부 자극을 유발할 수 있으므로 극도로 민감하거나 아토피 상처가 있는 피부에는 차방 함량을 꼼꼼히 대조해 보시는 걸 권장합니다.");
      return;
    }
    
    // 8. General fallback
    appendAIBubble("죄송해요, 제가 정확하게 이해하지 못했어요. 😅 피부 트러블, 화장법, 올인원 추천, 진열대 경로 등 궁금한 점을 간략히 여쭤봐 주시면 정성껏 안내해 드릴게요. 혹은 아래의 '피부 진단' 도구를 실행해 보세요!");
    
  }, 1000);
}

// Append clickable mini cards to the chat dialog bubble
function appendProductInteractionCards(parentBubble, list) {
  const container = document.createElement("div");
  container.className = "diagnostic-products-row mt-2";
  
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "rec-product-card-mini";
    card.innerHTML = `
      <div class="prod-img-mini">${p.category}</div>
      <div class="prod-meta-mini">
        <span class="prod-name-mini">${p.name}</span>
        <span class="prod-pos-mini"><i data-lucide="map-pin" style="width:8px;height:8px;display:inline-block;vertical-align:middle;margin-right:2px;"></i>${p.shelf} 매대</span>
      </div>
    `;
    
    card.addEventListener("click", () => {
      // Trigger map overlay showing path
      openModal("modal-map");
      drawStoreRoute(p);
    });
    
    container.appendChild(card);
  });
  
  parentBubble.appendChild(container);
  lucide.createIcons();
}

// Quick suggestions helper
function updateQuickTags(list) {
  suggestionsContainer.innerHTML = "";
  list.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "btn-suggest-tag";
    btn.innerHTML = `
      <i data-lucide="help-circle" class="tag-icon"></i>
      <span>${item.text}</span>
    `;
    btn.addEventListener("click", () => {
      handleUserQuery(item.query);
    });
    suggestionsContainer.appendChild(btn);
  });
  lucide.createIcons();
}

function resetQuickTagsToDefault() {
  const defaults = [
    { text: "남자 첫 스킨케어 루틴", query: "남자인데 스킨케어를 처음 시작하려고 해요." },
    { text: "트러블 진정 케어", query: "피부가 붉어지고 여드름이 자주 나요. 진정 제품 추천해줘." },
    { text: "속건조/수분 충전", query: "요즘 건조해서 화장이 뜨고 얼굴이 당겨요." },
    { text: "EWG 주의 성분 분석", query: "페녹시에탄올 성분은 피부에 많이 해롭나요?" }
  ];
  
  suggestionsContainer.innerHTML = "";
  defaults.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "btn-suggest-tag";
    
    let icon = "sparkles";
    if (item.text.includes("트러블")) icon = "shield-alert";
    if (item.text.includes("건조")) icon = "droplet";
    if (item.text.includes("성분")) icon = "microscope";
    
    btn.innerHTML = `
      <i data-lucide="${icon}" class="tag-icon"></i>
      <span>${item.text}</span>
    `;
    btn.addEventListener("click", () => {
      handleUserQuery(item.query);
    });
    suggestionsContainer.appendChild(btn);
  });
  lucide.createIcons();
}

// Default bindings for suggestions
document.querySelectorAll(".btn-suggest-tag").forEach(btn => {
  btn.addEventListener("click", () => {
    const query = btn.getAttribute("data-query");
    handleUserQuery(query);
  });
});

// Bind speak buttons on dialogue timeline
dialogueTimeline.addEventListener("click", (e) => {
  const speakBtn = e.target.closest(".btn-bubble-speak");
  if (speakBtn) {
    const text = speakBtn.getAttribute("data-text");
    if (text) {
      speakText(text);
    }
  }
});

// ========================================================
// 8. MODAL WINDOWS CONTROLLER
// ========================================================

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
    
    // Re-render Lucide icons inside newly visible modal
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
    
    // Custom triggers per modal
    if (id === "modal-diagnostic") {
      startWebcamStream();
      // Reset scan to initial state every time modal opens
      scanInitialControls.classList.remove("hidden");
      scanProgressBox.classList.add("hidden");
      scanResultsBox.classList.add("hidden");
      const btnWrap = document.getElementById("scan-start-btn-wrap");
      if (btnWrap) btnWrap.classList.remove("hidden");
    }
    
    if (id === "modal-ingredients") {
      // Auto-load first product so the analyze button has context
      loadIngredientReport("drg_soothing_cream");
    }
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    
    // Stop camera if closing diagnostic
    if (id === "modal-diagnostic") {
      stopWebcamStream();
    }
  }
}

// Bind close triggers
document.querySelectorAll(".btn-close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-close");
    closeModal(target);
  });
});

// Bind footer tool buttons
document.getElementById("tool-diagnose").addEventListener("click", () => openModal("modal-diagnostic"));
document.getElementById("tool-map").addEventListener("click", () => {
  openModal("modal-map");
  // Default path showing to Skincare Zone C
  const product = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
  drawStoreRoute(product);
});
document.getElementById("tool-ingredients").addEventListener("click", () => {
  openModal("modal-ingredients");
  loadIngredientReport("drg_soothing_cream"); // Pre-load first item
});
document.getElementById("tool-receipt").addEventListener("click", () => {
  setupPrintReceipt();
  openModal("modal-receipt");
});

// Input bar actions
btnSend.addEventListener("click", () => {
  const val = inputQuery.value.trim();
  if (val) handleUserQuery(val);
});

inputQuery.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = inputQuery.value.trim();
    if (val) handleUserQuery(val);
  }
});

// Mic toggle button actions
btnVoiceToggle.addEventListener("click", () => {
  if (btnVoiceToggle.classList.contains("listening")) {
    stopListening();
  } else {
    startListening();
  }
});

// ========================================================
// 8A. WEBCAM SKIN SCANNERS & CALC ENGINE
// ========================================================

let webcamStreamObj = null;

function startWebcamStream() {
  // Show scanner brackets
  hologramBracket.classList.add("active");
  scannerReadout.textContent = "READY TO SCAN";
  telemetryReadout.textContent = "FACE TARGET MATCHED";
  
  // Show initial start controls
  scanInitialControls.classList.remove("hidden");
  scanProgressBox.classList.add("hidden");
  scanResultsBox.classList.add("hidden");
  
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      .then(stream => {
        webcamStreamObj = stream;
        videoWebcam.srcObject = stream;
        fallbackScreen.classList.add("hidden");
        videoWebcam.classList.remove("hidden");
        scanOverlay.classList.add("active");
      })
      .catch(err => {
        console.warn("Webcam access denied/unavailable. Using fallback hologram radar.", err);
        showWebcamFallback();
      });
  } else {
    showWebcamFallback();
  }
}

function showWebcamFallback() {
  fallbackScreen.classList.remove("hidden");
  videoWebcam.classList.add("hidden");
  scanOverlay.classList.remove("active");
}

function stopWebcamStream() {
  hologramBracket.classList.remove("active");
  if (webcamStreamObj) {
    webcamStreamObj.getTracks().forEach(track => track.stop());
    webcamStreamObj = null;
  }
}

// Trigger diagnostic scan progress
document.getElementById("btn-start-scan").addEventListener("click", () => {
  // 안내 오버레이와 버튼 영역 숨기기
  const btnWrap = document.getElementById("scan-start-btn-wrap");
  if (btnWrap) btnWrap.classList.add("hidden");
  scanInitialControls.classList.add("hidden");
  scanProgressBox.classList.remove("hidden");
  
  let percentage = 0;
  scanProgressFill.style.width = "0%";
  scannerReadout.textContent = "SCANNING SKIN...";
  telemetryReadout.textContent = "GRIDING FACIAL ZONES";
  updateStatusBadge("diagnosing");

  const tasks = [
    { threshold: 10, label: "T존 이마 피지선 활성 측정 중..." },
    { threshold: 35, label: "볼 부위 멜라닌/잡티 스폿 진단 중..." },
    { threshold: 60, label: "눈가 주름 및 진피 탄력 정밀 스캔 중..." },
    { threshold: 85, label: "피부 수분 보유 상태 평가 중..." },
    { threshold: 100, label: "최적의 뷰티 솔루션 도출 중..." }
  ];

  const interval = setInterval(() => {
    percentage += 1;
    scanPercentage.textContent = `${percentage}%`;
    scanProgressFill.style.width = `${percentage}%`;

    const activeTask = tasks.find(t => percentage <= t.threshold);
    if (activeTask) {
      scanTaskName.textContent = activeTask.label;
    }

    if (percentage >= 100) {
      clearInterval(interval);
      displayDiagnosticReport();
    }
  }, 40);
});

// Render simulated skin report
function displayDiagnosticReport() {
  scanProgressBox.classList.add("hidden");
  scanResultsBox.classList.remove("hidden");
  
  // Random score calculations
  const totalScore = 78 + Math.floor(Math.random() * 10); // 78 ~ 87
  const hydroPercent = 35 + Math.floor(Math.random() * 15); // 35% ~ 50%
  const sebumPercent = 15 + Math.floor(Math.random() * 10); // 15% ~ 25% (dry)
  const troublePercent = 45 + Math.floor(Math.random() * 15); // 45% ~ 60%
  
  scannerReadout.textContent = "SCAN COMPLETE";
  telemetryReadout.textContent = "DIAGNOSTIC REPORT LOADED";
  updateStatusBadge("online");

  // Animate values
  resultScoreVal.textContent = totalScore;
  
  // Ring offset calculation (Circumference is 251.2)
  const offset = 251.2 - (251.2 * totalScore) / 100;
  scoreRingTotal.style.strokeDashoffset = offset;
  
  // Bars
  metricHydroVal.textContent = `${hydroPercent}% (수분 부족)`;
  metricHydroBar.style.width = `${hydroPercent}%`;
  
  metricSebumVal.textContent = `${sebumPercent}% (건성/조금 건조)`;
  metricSebumBar.style.width = `${sebumPercent}%`;
  
  metricTroubleVal.textContent = `${troublePercent}% (보통/민감 우려)`;
  metricTroubleBar.style.width = `${troublePercent}%`;
  
  // Conclusion
  skinTypeConclusion.textContent = "수분 부족성 건성 (건성/민감성)";
  conversationState.skinType = "dry";
  
  // Save diagnostic findings
  conversationState.step = "diagnosed";
  
  // Populate matching recommendations
  const drg = PRODUCTS_DATABASE.find(p => p.id === "drg_soothing_cream");
  const physio = PRODUCTS_DATABASE.find(p => p.id === "physiogel_dmt");
  conversationState.recs = [drg, physio];
  
  diagnoseRecsContainer.innerHTML = "";
  conversationState.recs.forEach(p => {
    const card = document.createElement("div");
    card.className = "rec-product-card-mini";
    card.innerHTML = `
      <div class="prod-img-mini">${p.category}</div>
      <div class="prod-meta-mini">
        <span class="prod-name-mini">${p.name}</span>
        <span class="prod-pos-mini">${p.shelf} 매대</span>
      </div>
    `;
    card.addEventListener("click", () => {
      closeModal("modal-diagnostic");
      openModal("modal-map");
      drawStoreRoute(p);
    });
    diagnoseRecsContainer.appendChild(card);
  });
}

// Feed diagnostic values back into AI consultation
document.getElementById("btn-diagnose-send-chat").addEventListener("click", () => {
  closeModal("modal-diagnostic");
  
  const score = resultScoreVal.textContent;
  const type = skinTypeConclusion.textContent;
  
  showSystemBubble(`[시스템 통신] AI 뷰티 휴먼에게 피부 진단 데이터(종합점수: ${score}점, 판정타입: ${type})를 전송하였습니다.`);
  
  setTimeout(() => {
    appendAIBubble(
      `피부 스캔 결과를 수신했습니다. 종합 피부 점수 <strong>${score}점</strong>으로, 세안 후 뺨 주변 당김이 심한 <strong>${type}</strong>으로 판정되셨습니다.<br><br>각질이 가끔 뜨실 수 있어, 올리브영 스테디셀러인 <strong>닥터지 수딩 크림</strong>과 <strong>피지오겔 DMT 크림</strong>을 활용해 속보습을 충분히 잠그시는 걸 강력 권해 드립니다. 두 제품 모두 <strong>C구역 6번 매대</strong>에 진열되어 있습니다. 💚`
    );
  }, 1000);
});

// ========================================================
// 8B. INTERACTIVE SVG STORE ROUTE NAVIGATORS
// ========================================================

function drawStoreRoute(product) {
  if (!product) return;
  
  // Set route drawing path
  routeLine.setAttribute("d", product.route);
  
  // Highlight target ring
  targetRing.classList.remove("hidden");
  targetRing.setAttribute("cx", product.coords[0]);
  targetRing.setAttribute("cy", product.coords[1]);
  
  // Reset other highlights
  document.querySelectorAll(".map-shelf-group").forEach(el => el.classList.remove("highlighted"));
  
  // Highlight matching shelf zone
  const zoneEl = document.getElementById(`zone-${product.zone}`);
  if (zoneEl) {
    zoneEl.classList.add("highlighted");
  }
  
  // Populate directions card details
  directionInfoBox.classList.remove("hidden");
  directionZoneBadge.textContent = `${product.shelf} 진열대 (${product.category})`;
  directionShelfDetail.textContent = `${product.name} 제품의 현재 위치입니다. Kiosk 현위치 노드에서 주황색 가이드라인을 따라 ${product.zone}구역 ${product.shelf.split('-')[1]}번 매대로 이동하시면 곧바로 찾으실 수 있습니다.`;
  pathDescText.textContent = `현재 ${product.name}의 위치 경로가 지도에 실시간 연동되어 있습니다.`;
}

// Bind shelf location quick buttons
document.querySelectorAll(".btn-shelf-locate").forEach(btn => {
  btn.addEventListener("click", () => {
    const zone = btn.getAttribute("data-zone");
    const shelf = btn.getAttribute("data-shelf");
    const coordsStr = btn.getAttribute("data-coords");
    const desc = btn.getAttribute("data-desc");
    
    const coords = coordsStr.split(',').map(Number);
    
    // Draw dummy route path based on coordinates
    let pathD = `M 400 480 L 300 480 L 300 ${coords[1]} L ${coords[0]} ${coords[1]}`;
    if (coords[0] > 400) {
      pathD = `M 400 480 L 500 480 L 500 ${coords[1]} L ${coords[0]} ${coords[1]}`;
    }
    
    // Set route
    routeLine.setAttribute("d", pathD);
    
    // Ring
    targetRing.classList.remove("hidden");
    targetRing.setAttribute("cx", coords[0]);
    targetRing.setAttribute("cy", coords[1]);
    
    // Highlight
    document.querySelectorAll(".map-shelf-group").forEach(el => el.classList.remove("highlighted"));
    const zoneEl = document.getElementById(`zone-${zone}`);
    if (zoneEl) zoneEl.classList.add("highlighted");
    
    // Info
    directionInfoBox.classList.remove("hidden");
    directionZoneBadge.textContent = `${shelf} 진열대`;
    directionShelfDetail.textContent = desc;
    pathDescText.textContent = `지정하신 ${shelf} 구역의 실시간 매대 동선이 표시되었습니다.`;
  });
});

// ========================================================
// 8C. EWG INGREDIENT DYNAMIC TABLE GENERATORS
// ========================================================

function loadIngredientReport(prodId) {
  const p = PRODUCTS_DATABASE.find(item => item.id === prodId);
  if (!p) return;
  
  analyzedProductName.textContent = p.name;
  ewgGreenCount.textContent = p.ingredientsSummary.green;
  ewgYellowCount.textContent = p.ingredientsSummary.yellow;
  ewgRedCount.textContent = p.ingredientsSummary.red;
  
  // Suitability labels
  document.querySelector(".compat-row .dry").nextElementSibling.textContent = p.suitability.dry;
  document.querySelector(".compat-row .oily").nextElementSibling.textContent = p.suitability.oily;
  document.querySelector(".compat-row .sensitive").nextElementSibling.textContent = p.suitability.sensitive;
  
  // Set table
  ingredientsTableBody.innerHTML = "";
  p.ingredientsList.forEach(ing => {
    let ewgClass = "ewg-green";
    if (ing.ewg >= 3 && ing.ewg <= 5) ewgClass = "ewg-yellow";
    if (ing.ewg >= 6) ewgClass = "ewg-red";
    
    const row = `
      <tr>
        <td>
          <div style="font-weight: 600; color: #fff;">${ing.name.split(" ")[1] || ing.name}</div>
          <div class="ingred-eng-name">${ing.name.split(" ")[0]}</div>
        </td>
        <td style="text-align: center;">
          <span class="ewg-badge-label ${ewgClass}">${ing.ewg}</span>
        </td>
        <td style="color: var(--text-muted);">${ing.desc}</td>
      </tr>
    `;
    ingredientsTableBody.insertAdjacentHTML("beforeend", row);
  });
  
  ingredientResultBox.classList.remove("hidden");
}

// Bind ingredients search tool
btnIngredientSearch.addEventListener("click", () => {
  const searchVal = ingredientSearchInput.value.trim().toLowerCase();
  
  let found = null;
  for (let p of PRODUCTS_DATABASE) {
    if (p.name.toLowerCase().includes(searchVal) || searchVal.includes(p.name.split(" ")[0].toLowerCase())) {
      found = p;
      break;
    }
  }
  
  if (!found && searchVal.length >= 2) {
    const virtualP = generateVirtualProduct(ingredientSearchInput.value);
    if (virtualP) {
      PRODUCTS_DATABASE.push(virtualP);
      found = virtualP;
    }
  }
  
  if (found) {
    loadIngredientReport(found.id);
  } else {
    showSystemBubble(`[알림] 입력하신 '${ingredientSearchInput.value}'와 일치하는 올리브영 데이터베이스가 발견되지 않았습니다. 브랜드 및 제품명을 정확하게 입력해 보세요!`);
  }
});

// Bind suggest query links
document.querySelectorAll(".btn-suggest-search").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.getAttribute("data-value");
    ingredientSearchInput.value = val;
    
    let found = PRODUCTS_DATABASE.find(p => p.name.includes(val.split(" ")[0]) || p.id === "drg_soothing_cream");
    if (found) {
      loadIngredientReport(found.id);
    }
  });
});

// ========================================================
// 8D. SMART CONSULTATION TICKET PRINT DRIVER
// ========================================================

function setupPrintReceipt() {
  // Set date
  const now = new Date();
  const formatStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  receiptDateTime.textContent = `${formatStr} | NO. ${Math.floor(10000 + Math.random()*90000)}`;
  
  // Set details
  receiptSkinScore.textContent = resultScoreVal.textContent ? `${resultScoreVal.textContent}점` : "진단 안 됨 (기본 권장)";
  receiptSkinType.textContent = skinTypeConclusion.textContent || "상담 기반 추천";
  
  // Items list
  receiptItemsList.innerHTML = "";
  const activeRecs = conversationState.recs.length > 0 ? conversationState.recs : [PRODUCTS_DATABASE[0], PRODUCTS_DATABASE[2]];
  
  activeRecs.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = "receipt-item-row";
    item.innerHTML = `
      <div class="receipt-item-name">${index + 1}. [${p.category}] ${p.name}</div>
      <div class="receipt-item-pos">▶ ${p.shelf} 진열대 (${p.zone}구역)</div>
    `;
    receiptItemsList.appendChild(item);
  });
  
  printSuccessFeedback.classList.add("hidden");
}

// Thermal print simulator (Web Audio Synthesized sound effect)
btnTriggerPrint.addEventListener("click", () => {
  playPrintSoundEffect();
  
  // Slide animation receipt reprint
  const receiptObj = document.getElementById("thermal-receipt");
  receiptObj.style.animation = "none";
  // Trigger reflow
  void receiptObj.offsetWidth;
  receiptObj.style.animation = "receipt-extrude 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards";
  
  setTimeout(() => {
    printSuccessFeedback.classList.remove("hidden");
  }, 1000);
});

// Synthesise realistic Pulsed Thermal Matrix print sound ("chk-chk-chk-zzzz") using Web Audio API
function playPrintSoundEffect() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 1.8; // Duration of print
    const time = audioCtx.currentTime;
    
    // Create pulse sounds sequentially
    for (let i = 0; i < duration * 9; i++) {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'triangle';
      // Vary frequencies to mimic mechanical printer gear stepping
      osc.frequency.setValueAtTime(600 + Math.random() * 500, time + i * 0.1);
      
      gainNode.gain.setValueAtTime(0.06, time + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + i * 0.1 + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(time + i * 0.1);
      osc.stop(time + i * 0.1 + 0.09);
    }
  } catch (e) {
    console.error("Audio Context synthesize failed", e);
  }
}

// Welcome Splash Screen transition click handler
document.getElementById("btn-start-kiosk").addEventListener("click", () => {
  document.getElementById("welcome-view").classList.add("hidden");
  document.getElementById("workspace-view").classList.remove("hidden");
  
  // Explicitly trigger playing on active videos to bypass browser autoplay blocks
  const activeVideos = document.querySelectorAll(".avatar-video.active, .avatar-video-backdrop.active");
  activeVideos.forEach(v => {
    v.play().catch(err => console.log("Video auto-play triggered after user interaction:", err));
  });
  
  // Ensure that Lucide icons in the workspace view are correctly generated once it becomes visible
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
});

// Dynamic Multi-language Translation Engine for Welcome Splash Screen
const welcomeTranslations = {
  ko: {
    title: "올리브영 가상 뷰티 연구소",
    subtitle: "스킨케어 고민을 1대1 전문 상담원과 이야기하듯<br>편안하게 대화로 분석받고 처방받으세요.",
    btn: "가상 뷰티 컨설팅 시작"
  },
  en: {
    title: "Olive Young Virtual Beauty Lab",
    subtitle: "Analyze and prescribe your skincare concerns<br>comfortably with a 1:1 professional AI advisor.",
    btn: "Start AI Consultation"
  },
  zh: {
    title: "欧乐芙洋 虚拟美容研究所",
    subtitle: "像与一对一专业顾问交流一样，<br>通过对话分析并获取您的护肤处方。",
    btn: "开始虚拟美容咨询"
  },
  ja: {
    title: "オリーブヤング 仮想ビューティー研究所",
    subtitle: "1対1の専門カウンセラーと話すように、<br>会話でスキンケアの悩みを分析して処方を受けましょう。",
    btn: "ビューティーコンサルティング開始"
  }
};

document.querySelectorAll(".btn-welcome-lang").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const lang = btn.getAttribute("data-lang");
    
    // Toggle active state
    document.querySelectorAll(".btn-welcome-lang").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    // Translate text elements on welcome view
    const translation = welcomeTranslations[lang];
    if (translation) {
      const titleEl = document.querySelector(".welcome-title");
      const subtitleEl = document.querySelector(".welcome-subtitle");
      
      titleEl.innerHTML = translation.title;
      subtitleEl.innerHTML = translation.subtitle;
      document.querySelector("#btn-start-kiosk span").textContent = translation.btn;
      
      // Apply language classes to trigger responsive font styling
      const welcomeView = document.getElementById("welcome-view");
      welcomeView.className = `kiosk-welcome-view lang-${lang}`;
      
      titleEl.classList.remove("lang-ko", "lang-en", "lang-zh", "lang-ja");
      titleEl.classList.add(`lang-${lang}`);
      
      subtitleEl.classList.remove("lang-ko", "lang-en", "lang-zh", "lang-ja");
      subtitleEl.classList.add(`lang-${lang}`);
    }
  });
});

// Initialize Lucide icons on initial page load
if (typeof lucide !== 'undefined' && lucide.createIcons) {
  lucide.createIcons();
}
