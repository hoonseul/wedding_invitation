/* =====================================================
   WEDDING CONFIG
   여기만 수정하면 사이트 전체 정보가 바뀝니다.
===================================================== */
const WEDDING = {
  groomKo: "김종훈",
  brideKo: "박예슬",
  groomEn: "Jonghoon",
  brideEn: "Yeseul",

  date: "2027-08-21", // YYYY-MM-DD
  time: "16:20",      // 24시간 기준 HH:MM
  displayDateKo: "2027.08.21 토요일",
  displayTimeKo: "오후 4시 20분",

  venue: "웨딩시그니처 2F 트리니티홀",
  address: "서울 마포구 양화로 87",
  phone: "02-0000-0000",
  mapSearch: "웨딩시그니처",

  // 네이버 지도 API 사용 시 입력. 비워두면 images/map-preview.jpg를 사용합니다.
  naverMapClientId: "",
  mapLat: 37.549626,
  mapLng: 126.918139,

  transportation: {
    subway: [
      { station: "2호선 · 6호선 합정역", exit: "2번 출구에서 도보 4분" },
      { station: "공항철도, 경의선 홍대입구역", exit: "1번 출구에서 도보 11분" }
    ],
    busStops: "서교동 · 우리은행 서교동지점 · 합정역",
    busGroups: [
      { label: "BLUE", name: "간선", color: "#2f62b7", routes: "271, 602, 603, 604, 761, 921, N26, N51, N62, N72" },
      { label: "GREEN", name: "지선", color: "#2f9b58", routes: "마포08, 마포09, 마포15, 마포16, 5712, 5714, 6712, 6716, 7612, 7734, 7739" },
      { label: "RED", name: "광역", color: "#c94554", routes: "3100, 3100N, 1000, 1100, 1101, 1200, 1300, 1301, 1302, 1601" }
    ],
    express: "삼화고속 : 인천 ↔ 서울 (합정 전철역)",
    parking: "주차 공간이 협소하여 가급적 대중교통 이용을 부탁드립니다.\n자가용 이용 시 예식장 주차장의 혼잡이 예상될 수 있습니다."
  },

  afterParty: {
    show: true,
    title: "뒤풀이 안내",
    message: "예식 후 가까운 분들과 함께하는 작은 자리를 준비했습니다.",
    time: "예식 후 오후 7시 30분",
    place: "장소를 입력해주세요",
    address: "주소를 입력해주세요",
    mapSearch: "뒤풀이 장소 검색어를 입력해주세요"
  },

  // 하객 사진 업로드용 구글드라이브 링크
  // 본식 전 구글드라이브 폴더를 만들고 '링크가 있는 모든 사용자 편집자'로 설정한 뒤 링크를 넣어주세요.
  photoUpload: {
    show: true,
    title: "Share Your Photos",
    message: "본식에서 담아주신 소중한 순간을 이곳에 올려주세요. 두고두고 감사히 간직하겠습니다.",
    buttonText: "사진 업로드하기",
    url: "여기에_구글드라이브_업로드_링크를_넣어주세요"
  },

  notice: [
    {
      title: "화환 안내",
      text: "예식장 사정으로 화환은 정중히 사양합니다. 축하해주시는 따뜻한 마음만 감사히 받겠습니다."
    }
  ],

  // 계좌번호는 신랑측/신부측으로 접어서 보여집니다.
  // label, name, bank, number, copyNumber만 실제 정보로 수정하면 됩니다.
  accountGroups: [
    {
      title: "신랑측 계좌번호",
      people: [
        { label: "신랑", name: "김종훈", bank: "신한은행", number: "000000-00-000000", copyNumber: "00000000000000" },
        { label: "신랑 아버님", name: "김○○", bank: "국민은행", number: "000000-00-000000", copyNumber: "00000000000000" },
        { label: "신랑 어머님", name: "이○○", bank: "우리은행", number: "000000-00-000000", copyNumber: "00000000000000" }
      ]
    },
    {
      title: "신부측 계좌번호",
      people: [
        { label: "신부", name: "박예슬", bank: "우리은행", number: "1002-537-268030", copyNumber: "00000000000000" },
        { label: "신부 아버님", name: "박만행", bank: "하나은행", number: "000000-00-000000", copyNumber: "00000000000000" },
        { label: "신부 어머님", name: "김수연", bank: "농협은행", number: "000000-00-000000", copyNumber: "00000000000000" }
      ]
    }
  ],

  timeline: [
    { label: "CHAPTER 01", title: "운명 같은 첫 만남", text: "작은 우연이 가장 소중한 인연이 된 날", img: "images/timeline01.jpg" },
    { label: "CHAPTER 02", title: "당연해진 우리", text: "서로의 하루가 되어 자연스럽게 쌓여간 마음", img: "images/timeline02.jpg" },
    { label: "CHAPTER 03", title: "평생을 약속한 날", text: "같은 마음으로 같은 미래를 바라본 순간", img: "images/timeline03.jpg" },
    { label: "CHAPTER 04", title: "Wedding Day", text: "너와 나, 우리 새로운 장면이 시작되는 날", img: "images/timeline04.jpg" }
  ],

  gallery: [
    "images/gallery01.jpg",
    "images/gallery02.jpg",
    "images/gallery03.jpg",
    "images/gallery04.jpg",
    "images/gallery05.jpg",
    "images/gallery06.jpg"
  ]
};
