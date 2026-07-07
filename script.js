/* =====================================================
  Wedding Invitation 기능 파일
  수정하기 쉬운 곳은 '기본 정보' 영역에 모아두었습니다.
===================================================== */

/* =====================================================
  01. 기본 정보
===================================================== */
const WEDDING_DATE = "2027-08-21T16:20:00";
const MAP_SEARCH = "웨딩시그니처";
const VENUE_LAT = 37.549626; // 네이버 지도 API 좌표: 필요하면 수정
const VENUE_LNG = 126.918139; // 네이버 지도 API 좌표: 필요하면 수정

/* =====================================================
  02. D-DAY 계산
===================================================== */
const ddayEl = document.getElementById("dday");

if (ddayEl) {
  const weddingDate = new Date(WEDDING_DATE);
  const today = new Date();
  const diff = weddingDate - today;
  const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));

  ddayEl.innerText = dday > 0 ? `예식까지 D-${dday}` : "오늘이 예식일입니다";
}

/* =====================================================
  03. 스크롤 등장 애니메이션
===================================================== */
const fadeEls = document.querySelectorAll(".fade");
const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.18 });

fadeEls.forEach((el) => observer.observe(el));
timelineItems.forEach((el) => observer.observe(el));

/* =====================================================
  04. 계좌번호 복사
===================================================== */
function copyAccount(account) {
  navigator.clipboard.writeText(account).then(() => {
    alert("계좌번호가 복사되었습니다.");
  });
}

/* =====================================================
  05. BGM ON/OFF
===================================================== */
const bgm = document.getElementById("bgm");
const soundBtn = document.getElementById("soundBtn");
let isPlaying = false;

if (bgm && soundBtn) {
  soundBtn.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        await bgm.play();
        isPlaying = true;
        soundBtn.innerText = "BGM ON";
      } else {
        bgm.pause();
        isPlaying = false;
        soundBtn.innerText = "BGM OFF";
      }
    } catch (error) {
      alert("브라우저 설정상 음악을 재생할 수 없습니다.");
    }
  });
}

/* =====================================================
  06. 캘린더 저장
===================================================== */
const calendarBtn = document.getElementById("calendarBtn");

if (calendarBtn) {
  calendarBtn.addEventListener("click", () => {
    const title = encodeURIComponent("종훈 & 예슬 결혼식");
    const location = encodeURIComponent("웨딩시그니처, 서울 마포구 양화로 87");
    const details = encodeURIComponent("종훈 그리고 예슬의 결혼식에 초대합니다.");

    // Google Calendar 형식: 20270821T162000/20270821T182000
    const googleCalendarUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270821T162000/20270821T182000&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, "_blank");
  });
}

/* =====================================================
  07. 지도 버튼 검색어 자동 세팅
===================================================== */
const naverBtn = document.getElementById("naverBtn");
const kakaoBtn = document.getElementById("kakaoBtn");
const mapFallback = document.getElementById("mapFallback");

if (naverBtn) {
  naverBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(MAP_SEARCH)}`;
}

if (kakaoBtn) {
  kakaoBtn.href = `https://map.kakao.com/link/search/${encodeURIComponent(MAP_SEARCH)}`;
}

if (mapFallback) {
  mapFallback.href = `https://map.naver.com/p/search/${encodeURIComponent(MAP_SEARCH)}`;
}

/* =====================================================
  08. 네이버 지도 API
  - API 키를 넣으면 확대/축소 가능한 지도가 표시됩니다.
  - API 키가 없거나 오류가 나면 이미지 지도(images/naver-map.jpg)가 표시됩니다.
===================================================== */
function initNaverMap() {
  const mapEl = document.getElementById("naverMap");
  const fallbackEl = document.getElementById("mapFallback");

  if (!mapEl) return;

  if (window.naver && window.naver.maps) {
    const venuePosition = new naver.maps.LatLng(VENUE_LAT, VENUE_LNG);

    const map = new naver.maps.Map("naverMap", {
      center: venuePosition,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_CENTER
      }
    });

    new naver.maps.Marker({
      position: venuePosition,
      map: map
    });

    mapEl.classList.add("active");
    if (fallbackEl) fallbackEl.classList.add("hide");
  } else {
    mapEl.classList.remove("active");
    if (fallbackEl) fallbackEl.classList.remove("hide");
  }
}

window.addEventListener("load", initNaverMap);

/* =====================================================
  09. 갤러리 전체화면 확대 보기
===================================================== */
const galleryModal = document.getElementById("galleryModal");
const galleryModalImg = document.getElementById("galleryModalImg");
const galleryClose = document.getElementById("galleryClose");
const zoomableImages = document.querySelectorAll(".zoomable");

function openGallery(src, alt) {
  if (!galleryModal || !galleryModalImg) return;

  galleryModalImg.src = src;
  galleryModalImg.alt = alt || "확대된 갤러리 이미지";
  galleryModal.classList.add("show");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeGallery() {
  if (!galleryModal || !galleryModalImg) return;

  galleryModal.classList.remove("show");
  galleryModal.setAttribute("aria-hidden", "true");
  galleryModalImg.src = "";
  document.body.classList.remove("modal-open");
}

zoomableImages.forEach((img) => {
  img.addEventListener("click", () => {
    openGallery(img.src, img.alt);
  });
});

if (galleryClose) {
  galleryClose.addEventListener("click", closeGallery);
}

if (galleryModal) {
  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
      closeGallery();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGallery();
  }
});
