/* =====================================================
   WEDDING INVITATION SCRIPT
   정보 수정은 대부분 여기에서 관리
===================================================== */

const wedding = {
  dateTime: "2027-08-21T16:20:00",
  title: "종훈과 예슬의 결혼식",
  venue: "웨딩시그니처",
  address: "서울 마포구 양화로 87",
  mapSearch: "웨딩시그니처",

  // 웨딩시그니처 근처 좌표. 정확한 위치로 바꾸려면 네이버지도에서 좌표 확인 후 수정.
  lat: 37.549626,
  lng: 126.918139
};

/* D-DAY 계산 */
const weddingDate = new Date(wedding.dateTime);
const today = new Date();
const diff = weddingDate - today;
const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));
const ddayEl = document.getElementById("dday");
if (ddayEl) ddayEl.innerText = dday > 0 ? `예식까지 D-${dday}` : "오늘이 예식일입니다";

/* 스크롤 등장 애니메이션 */
const revealEls = document.querySelectorAll(".fade, .slide-left, .slide-right");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.18 });
revealEls.forEach(el => observer.observe(el));

/* 계좌번호 복사 */
function copyAccount(account) {
  navigator.clipboard.writeText(account);
  alert("계좌번호가 복사되었습니다.");
}
window.copyAccount = copyAccount;

/* BGM ON/OFF */
const bgm = document.getElementById("bgm");
const soundBtn = document.getElementById("soundBtn");
if (bgm && soundBtn) {
  soundBtn.addEventListener("click", async () => {
    if (bgm.paused) {
      await bgm.play();
      soundBtn.innerText = "BGM ON";
    } else {
      bgm.pause();
      soundBtn.innerText = "BGM OFF";
    }
  });
}

/* 지도 버튼 검색어 자동 설정 */
const naverBtn = document.getElementById("naverBtn");
const kakaoBtn = document.getElementById("kakaoBtn");
if (naverBtn) naverBtn.href = `https://map.naver.com/p/search/${encodeURIComponent(wedding.mapSearch)}`;
if (kakaoBtn) kakaoBtn.href = `https://map.kakao.com/link/search/${encodeURIComponent(wedding.mapSearch)}`;

/* 네이버 지도 API */
function initNaverMap() {
  const mapTarget = document.getElementById("naverMap");
  if (!mapTarget || typeof naver === "undefined") {
    if (mapTarget) {
      mapTarget.innerHTML = `<a class="map-fallback" href="https://map.naver.com/p/search/${encodeURIComponent(wedding.mapSearch)}" target="_blank">네이버지도에서 위치 보기</a>`;
    }
    return;
  }

  const position = new naver.maps.LatLng(wedding.lat, wedding.lng);
  const map = new naver.maps.Map("naverMap", {
    center: position,
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: { position: naver.maps.Position.RIGHT_CENTER }
  });

  new naver.maps.Marker({ position, map });
}
window.addEventListener("load", initNaverMap);

/* 캘린더 저장 파일 생성 */
const calendarBtn = document.getElementById("calendarBtn");
if (calendarBtn) {
  calendarBtn.addEventListener("click", () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "SUMMARY:" + wedding.title,
      "DTSTART:20270821T162000",
      "DTEND:20270821T182000",
      "LOCATION:" + wedding.address + " " + wedding.venue,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-day.ics";
    a.click();
    URL.revokeObjectURL(url);
  });
}
