let galleryIndex = 0;
const qs = (id) => document.getElementById(id);
const enc = (text) => encodeURIComponent(text);

function initContent(){
  qs("heroGroom").textContent = WEDDING.groomEn;
  qs("heroBride").textContent = WEDDING.brideEn;
  qs("dateDisplayKo").textContent = WEDDING.displayDateKo;
  qs("timeDisplayKo").textContent = WEDDING.displayTimeKo;
  qs("groomKo").textContent = WEDDING.groomKo;
  qs("brideKo").textContent = WEDDING.brideKo;
  qs("venueName").textContent = WEDDING.venue;
  qs("venueAddress").textContent = WEDDING.address;
  qs("endingNames").textContent = `${WEDDING.groomEn} · ${WEDDING.brideEn}`;
  qs("phoneButton").href = `tel:${WEDDING.phone}`;
}

function initCalendar(){
  const date = new Date(`${WEDDING.date}T${WEDDING.time}:00`);
  const year = date.getFullYear();
  const month = date.getMonth();
  const weddingDay = date.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  qs("calendarMonthTitle").textContent = date.toLocaleString("en-US", { month: "long" });
  const grid = qs("calendarGrid");
  grid.innerHTML = "";
  for(let i=0;i<firstDay;i++) grid.insertAdjacentHTML("beforeend", `<span class="calendar-day empty"></span>`);
  for(let day=1;day<=lastDate;day++){
    grid.insertAdjacentHTML("beforeend", `<span class="${day===weddingDay ? "calendar-day wedding" : "calendar-day"}">${day}</span>`);
  }
  const today = new Date();
  const diff = date - today;
  const dday = Math.ceil(diff / (1000*60*60*24));
  qs("dday").textContent = dday > 0 ? `예식까지 D-${dday}` : "오늘이 예식일입니다";
}

function initTimeline(){
  const list = qs("timelineList");
  if(!list) return;
  list.innerHTML = "";
  WEDDING.timeline.forEach(item=>{
    list.insertAdjacentHTML("beforeend", `
      <article class="story-item">
        <div class="story-image"><img src="${item.img}" alt="${item.title}"></div>
        <div class="story-copy"><span>${item.label}</span><h3>${item.title}</h3><p>${item.text}</p></div>
      </article>
    `);
  });
}

function initGallery(){
  const list = qs("galleryList");
  list.innerHTML = "";
  WEDDING.gallery.forEach((src,i)=>{
    const card = document.createElement("button");
    card.className = "film-card";
    card.type = "button";
    card.onclick = () => openGallery(i);
    card.innerHTML = `<img src="${src}" alt="gallery ${i+1}"><div class="film-caption">SCENE ${String(i+1).padStart(2,"0")}</div>`;
    list.appendChild(card);
  });
}

function openGallery(index){
  galleryIndex = index;
  qs("modalImage").src = WEDDING.gallery[galleryIndex];
  qs("galleryModal").classList.add("show");
  qs("galleryModal").setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeGallery(){
  qs("galleryModal").classList.remove("show");
  qs("galleryModal").setAttribute("aria-hidden","true");
  qs("modalImage").src = "";
  document.body.style.overflow = "";
}
function moveGallery(direction){
  galleryIndex = (galleryIndex + direction + WEDDING.gallery.length) % WEDDING.gallery.length;
  qs("modalImage").src = WEDDING.gallery[galleryIndex];
}

function initMapLinks(){
  qs("naverBtn").href = `https://map.naver.com/p/search/${enc(WEDDING.mapSearch)}`;
  qs("kakaoBtn").href = `https://map.kakao.com/link/search/${enc(WEDDING.mapSearch)}`;
  qs("tmapBtn").href = `https://apis.openapi.sk.com/tmap/app/routes?name=${enc(WEDDING.mapSearch)}`;
  qs("mapFallback").href = `https://map.naver.com/p/search/${enc(WEDDING.mapSearch)}`;

  if(WEDDING.naverMapClientId){
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${WEDDING.naverMapClientId}`;
    script.onload = initNaverMap;
    document.head.appendChild(script);
  }
}
function initNaverMap(){
  if(!window.naver) return;
  qs("naverMap").style.display = "block";
  qs("mapFallback").style.display = "none";
  const position = new naver.maps.LatLng(WEDDING.mapLat, WEDDING.mapLng);
  const map = new naver.maps.Map("naverMap", {center: position, zoom: 16, zoomControl: true, zoomControlOptions:{position: naver.maps.Position.RIGHT_CENTER}});
  new naver.maps.Marker({position, map});
}

function initTransportation(){
  const transport = WEDDING.transportation;

  qs("subwayList").innerHTML = (transport.subway || []).map(item=>{
    const station = item.station || item.text || "";
    const exit = item.exit || item.walk || "";
    return `
      <div class="subway-item">
        <strong>${station}</strong>
        <span>${exit}</span>
      </div>
    `;
  }).join("");

  qs("walkInfo").textContent = "";

  const busStops = transport.busStops
    ? `<p class="bus-stop"><span>정류장</span>${transport.busStops}</p>`
    : "";

  const busGroups = (transport.busGroups || []).map(item=>`
    <div class="bus-route-group">
      <div class="bus-route-label" style="--route-color:${item.color}">
        <span>${item.label}</span><strong>${item.name}</strong>
      </div>
      <p>${item.routes}</p>
    </div>
  `).join("");

  const express = transport.express
    ? `<p class="express-bus">${transport.express}</p>`
    : "";

  qs("busList").innerHTML = busStops + busGroups + express;
  qs("parkingNote").textContent = transport.parking;
}

function initAfterParty(){
  // V7.1: 뒤풀이 안내는 별도 섹션이 아니라 Notice 안에 함께 표시합니다.
  const section = qs("afterPartySection");
  if(section) section.style.display = "none";
}

function initNotice(){
  const items = [...(WEDDING.notice || [])];
  const party = WEDDING.afterParty;

  if(party && party.show){
    const partyText = [
      party.message,
      `시간 : ${party.time}`,
      `장소 : ${party.place}`,
      `주소 : ${party.address}`
    ].filter(Boolean).join("<br>");

    items.push({
      title: "뒤풀이 안내",
      text: partyText,
      mapSearch: party.mapSearch || party.place
    });
  }

  qs("noticeList").innerHTML = items.map(item=>`
    <div class="notice-item">
      <strong>${item.title}</strong>
      <p>${item.text}</p>
      ${item.mapSearch ? `<a class="notice-map-button" href="https://map.naver.com/p/search/${enc(item.mapSearch)}" target="_blank" rel="noopener">뒤풀이 장소 지도 보기</a>` : ""}
    </div>
  `).join("");
}

function initAccounts(){
  const list = qs("accountList");
  list.innerHTML = "";

  const groups = WEDDING.accountGroups || [];

  groups.forEach((group, index)=>{
    const groupEl = document.createElement("article");
    groupEl.className = "account-group";

    const peopleHtml = group.people.map(person=>`
      <div class="account-person">
        <div>
          <span class="account-role">${person.label}</span>
          <strong>${person.name}</strong>
          <p>${person.bank} ${person.number}</p>
        </div>
        <button class="copy-small" type="button" data-copy="${person.copyNumber}">복사</button>
      </div>
    `).join("");

    groupEl.innerHTML = `
      <button class="account-toggle" type="button" aria-expanded="false">
        <span>${group.title}</span>
        <em>+</em>
      </button>
      <div class="account-panel">
        ${peopleHtml}
      </div>
    `;

    const toggle = groupEl.querySelector(".account-toggle");
    toggle.addEventListener("click", ()=>{
      const isOpen = groupEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    groupEl.querySelectorAll(".copy-small").forEach(button=>{
      button.addEventListener("click", (event)=>{
        event.stopPropagation();
        copyText(button.dataset.copy, "계좌번호가 복사되었습니다.");
      });
    });

    // 첫 번째 신랑측 계좌는 기본으로 닫힌 상태가 더 깔끔합니다.
    if(index === 0) {
      groupEl.classList.remove("open");
    }

    list.appendChild(groupEl);
  });
}

function copyText(text, message){ navigator.clipboard.writeText(text).then(()=>alert(message)); }
function initPhotoUpload(){
  const section = qs("photoUploadSection");
  const data = WEDDING.photoUpload || {};
  if(!section) return;
  if(data.show === false){ section.style.display = "none"; return; }
  qs("photoUploadTitle").textContent = data.title || "Share Your Photos";
  qs("photoUploadMessage").textContent = data.message || "본식에서 담아주신 소중한 순간을 이곳에 올려주세요.";
  const btn = qs("photoUploadBtn");
  btn.textContent = data.buttonText || "사진 업로드하기";
  btn.href = data.url || "#";
  btn.addEventListener("click", (e)=>{
    if(!data.url || data.url.includes("여기에_")){
      e.preventDefault();
      alert("config.js의 photoUpload.url에 구글드라이브 업로드 링크를 넣어주세요.");
    }
  });
}

function initShare(){
  qs("copyLinkBtn").onclick = () => copyText(location.href, "청첩장 링크가 복사되었습니다.");
  qs("kakaoShareBtn").onclick = () => {
    const text = `${WEDDING.groomKo} ♥ ${WEDDING.brideKo} 결혼합니다.\n${WEDDING.displayDateKo} ${WEDDING.displayTimeKo}\n${WEDDING.venue}\n${location.href}`;
    copyText(text, "카카오톡에 붙여넣을 초대 문구가 복사되었습니다.");
  };
}
function initBgm(){
  const bgm = qs("bgm"), btn = qs("bgmButton");
  let playing = false;
  btn.onclick = async()=>{
    if(!playing){
      try{ await bgm.play(); playing=true; btn.textContent="♫"; }
      catch(e){ alert("음악 파일을 music/bgm.mp3로 넣으면 재생됩니다."); }
    } else { bgm.pause(); playing=false; btn.textContent="♪"; }
  };
}
function initReveal(){
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("show");}),{threshold:.16});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}
function initScrollProgress(){
  const bar = qs("scrollProgress");
  window.addEventListener("scroll",()=>{
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.height = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  });
}
function initModalEvents(){
  qs("modalClose").onclick = closeGallery;
  qs("modalPrev").onclick = () => moveGallery(-1);
  qs("modalNext").onclick = () => moveGallery(1);
  qs("galleryModal").addEventListener("click",e=>{ if(e.target.id === "galleryModal") closeGallery(); });
  document.addEventListener("keydown",e=>{
    if(!qs("galleryModal").classList.contains("show")) return;
    if(e.key === "Escape") closeGallery();
    if(e.key === "ArrowLeft") moveGallery(-1);
    if(e.key === "ArrowRight") moveGallery(1);
  });

  let touchStartX = 0;
  qs("galleryModal").addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive:true });
  qs("galleryModal").addEventListener("touchend", e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if(Math.abs(diff) < 50) return;
    diff > 0 ? moveGallery(-1) : moveGallery(1);
  }, { passive:true });
}

window.addEventListener("DOMContentLoaded",()=>{
  initContent(); initCalendar(); initGallery(); initMapLinks(); initTransportation(); initAfterParty(); initNotice(); initAccounts(); initPhotoUpload(); initShare(); initBgm(); initReveal(); initScrollProgress(); initModalEvents();
});


/* =====================================================
   V4 상단 고정 미니 메뉴
===================================================== */
function initMiniNav(){
  const nav = document.getElementById("miniNav");
  if(!nav) return;
  const links = Array.from(nav.querySelectorAll("a"));
  const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  window.addEventListener("scroll", () => {
    nav.classList.toggle("show", window.scrollY > window.innerHeight * 0.55);

    let current = sections[0];
    sections.forEach(section => {
      if(section.getBoundingClientRect().top < 140) current = section;
    });
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`));
  }, { passive:true });
}

window.addEventListener("DOMContentLoaded", initMiniNav);
