/* ========= Helper Data ========= */
const CREW = [
  { name: "Monkey D. Luffy", role: "Captain", bounty: 3000000000, img: "Photos/luffy14.jpg",dream:"I’m gonna be King of the Pirates!" },
  { name: "Roronoa Zoro", role: "Swordsman", bounty: 1111000000, img: "Photos/Zoro2.jpg", dream:"I’m going to be the world’s greatest swordsman." },
  { name: "Nami", role: "Navigator", bounty: 366000000, img: "Photos/nami.jpeg", dream:"I’m going to draw a map of the entire world!"},
  { name: "Usopp", role: "Sniper", bounty: 500000000, img: "Photos/usopp.jpeg", dream:"I want to become a brave warrior of the sea!" },
  { name: "Sanji", role: "Cook", bounty: 1032000000, img: "Photos/sanji.jpg",dream:"I’ll find the All Blue!" },
  { name: "Tony Tony Chopper", role: "Doctor", bounty: 1000, img: "Photos/chopper.jpeg",dream:"I want to cure every disease!" },
  { name: "Nico Robin", role: "Archaeologist", bounty: 930000000, img: "Photos/nico.jpeg" ,dream:"I want to learn the true history of the world." },
  { name: "Franky", role: "Shipwright", bounty: 394000000, img: "Photos/franky.jpeg",dream:"I’ll build a ship that sails to the end of the world!" },
  { name: "Brook", role: "Musician", bounty: 383000000, img: "Photos/brook.jpeg",dream:"I want to see Laboon again." },
  { name: "Jinbe", role: "Helmsman", bounty: 1100000000, img: "Photos/jinbe.jpeg",dream:"I want to see humans and fishmen live as equals." }   
];

const FRUITS = [
  { name: "Gomu Gomu no Mi", type: "Paramecia", emoji: "🍬" },
  { name: "Hito Hito no Mi", type: "Zoan", emoji: "🧸" },
  { name: "Yami Yami no Mi", type: "Logia", emoji: "🌑" },
  { name: "Mera Mera no Mi", type: "Logia", emoji: "🔥" },
  { name: "Gura Gura no Mi", type: "Paramecia", emoji: "🌊" },
  { name: "Tori Tori no Mi", type: "Mythical Zoan", emoji: "🕊️" },
  { name: "Ope Ope no Mi", type: "Paramecia", emoji: "⚕️" },
  { name: "Hana Hana no Mi", type: "Paramecia", emoji: "🌸" },
  { name: "Suna Suna no Mi", type: "Logia", emoji: "🏜️" },
  { name: "Bari Bari no Mi", type: "Paramecia", emoji: "🛡️" }
];

const FACTS = [
  "Oda originally planned One Piece to last 5 years—look how that turned out!",
  "Zoro was almost part of Buggy’s crew in early drafts.",
  "Chopper’s bounty is hilariously low because the Marines think he’s a pet.",
  "Robin can read Poneglyphs—a key to the Void Century.",
  "Luffy’s favorite food is meat. All of it.",
  "Sanji was named ‘Naruto’ in early drafts before the manga ‘Naruto’ came out.",
];

const TIMELINE = [
  { arc: "East Blue", tag: "Start", desc: "Recruiting the first crew and setting sail." },
  { arc: "Alabasta", tag: "Baroque Works", desc: "Stopping a kingdom’s civil war." },
  { arc: "Enies Lobby", tag: "CP9", desc: "Declaring war on the World Government." },
  { arc: "Marineford", tag: "Paramount War", desc: "The world shakes." },
  { arc: "Dressrosa", tag: "Warlord", desc: "Breaking Doflamingo’s rule." },
  { arc: "Wano", tag: "Yonko", desc: "Toppling Kaido and changing the balance." },
];

/* ========= DOM Shortcuts ========= */
const $ = (sel, parent=document) => parent.querySelector(sel);
const $$ = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

/* ========= On Load ========= */
document.addEventListener("DOMContentLoaded", () => {
  // Build dynamic content
  buildCrew();
  buildBounty();
  buildFacts();
  buildTimeline();
  buildGallery();

  // Init behaviors
  initHeader();
  initYear();
  initScrollTop();
  initLightbox();
  initFormValidation();
  initActiveLink();
  initParallax();
  initReveal();
  initCrewControls();
  initFruitRandomizer();
  initGallerySlider();
  initTheme();
  initMusic();
  initKonami();
});

/* ========= 1) Header / Menu ========= */
function initHeader(){
  const toggle = $("#menu-toggle");
  const navList = $("#navbar ul");
  toggle?.addEventListener("click", () => navList.classList.toggle("show"));
}

/* ========= 2) Year ========= */
function initYear(){ $("#year").textContent = new Date().getFullYear(); }

/* ========= 3) Scroll Top ========= */
function initScrollTop(){
  const btn = $("#scrollTopBtn");
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "inline-flex" : "none";
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ========= 4) Lightbox ========= */
function initLightbox(){
  const lightbox = $("#lightbox");
  const imgEl = $("#lightboxImg");
  const closeBtn = $("#closeLightbox");
  closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => { if(e.target === lightbox) lightbox.classList.remove("open"); });

  // Open from gallery grid
  $("#galleryGrid").addEventListener("click", (e)=>{
    const target = e.target;
    if(target.tagName === "IMG"){
      imgEl.src = target.dataset.full || target.src;
      lightbox.classList.add("open");
    }
  });
}

/* ========= 5) Form Validation ========= */
function initFormValidation(){
  $("#contactForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();
    const msg = $("#formMsg");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if(name.length < 3){ showMsg("Name must be at least 3 characters.", "error"); return; }
    if(!emailOk){ showMsg("Please enter a valid email.", "error"); return; }
    if(message.length < 5){ showMsg("Message must be at least 5 characters.", "error"); return; }

    showMsg("Message sent successfully! 🚢", "ok");
    e.target.reset();

    function showMsg(text, type){
      msg.textContent = text;
      msg.style.color = (type === "ok") ? "#22c55e" : "#ef4444";
    }
  });
}

/* ========= 6) Active Link on Scroll ========= */
function initActiveLink(){
  const sections = $$("section");
  const links = $$("#navbar a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec=>{
      const offsetTop = sec.offsetTop - 120;
      if(scrollY >= offsetTop) current = sec.id;
    });
    links.forEach(a=>{
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  });
}

/* ========= 7) Parallax ========= */
function initParallax(){
  const hero = $("#hero");
  window.addEventListener("scroll", () => {
    const y = window.scrollY * 0.3;
    hero.style.setProperty("--parallax-y", y + "px");
    hero.style.backgroundPositionY = `calc(50% + ${y}px)`;
    // The ::before is used for image; we keep it subtle via opacity.
  }, { passive: true });
}

/* ========= 8) Scroll Reveal ========= */
function initReveal(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add("in"); obs.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -50px 0px", threshold: .15 });

  $$(".reveal").forEach(el => obs.observe(el));
}

/* ========= 9) Crew Builder + Controls ========= */
function buildCrew(list = CREW){
  const grid = $("#crewGrid");
  grid.innerHTML = "";
  list.forEach(member=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face front" style="--img: url('${member.img}');">
          <div class="role">${member.role}</div>
          <div class="name">${member.name}</div>
          <div class="bounty">Bounty: ${formatBeli(member.bounty)}</div>
        </div>
        <div class="card-face back">
          <h3>${member.name}</h3>
          <p class="muted">${member.role}</p>
          <p>“${member.dream}”</p>
          <button class="btn btn-outline" onclick="alert('🚢 All aboard!')">Recruit</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function initCrewControls(){
  const search = $("#crewSearch");
  const sort = $("#crewSort");

  function apply(){
    let list = CREW.filter(m =>
      m.name.toLowerCase().includes(search.value.toLowerCase()) ||
      m.role.toLowerCase().includes(search.value.toLowerCase())
    );
    if(sort.value === "name") list.sort((a,b)=> a.name.localeCompare(b.name));
    if(sort.value === "bounty") list.sort((a,b)=> b.bounty - a.bounty);
    buildCrew(list);
  }
  search.addEventListener("input", apply);
  sort.addEventListener("change", apply);
}

/* ========= 10) Bounty Posters ========= */
function buildBounty(){
  const grid = $("#bountyGrid");
  grid.innerHTML = "";
  CREW.forEach(m=>{
    const poster = document.createElement("div");
    poster.className = "poster";
    poster.innerHTML = `
      <div class="wanted">W A N T E D</div>
      <img src="${m.img}" alt="${m.name}" style="width:100%; height:220px; object-fit:cover; border: 3px solid #b08b57; border-radius:8px; margin:.5rem 0;">
      <h3>${m.name}</h3>
      <p>${m.role}</p>
      <div class="amount">${formatBeli(m.bounty)}</div>
      <div class="marine-stamp">MARINE</div>
    `;
    grid.appendChild(poster);
  });
}

/* ========= 11) Fruit Randomizer ========= */
function initFruitRandomizer(){
  const spin = $("#spinFruit");
  const reset = $("#resetFruit");
  const name = $("#fruitName");
  const type = $("#fruitType");
  const emoji = $("#fruitEmoji");

  let spinning = false;
  spin.addEventListener("click", ()=>{
    if(spinning) return;
    spinning = true;

    let ticks = 18 + Math.floor(Math.random()*10);
    const interval = setInterval(()=>{
      const f = FRUITS[Math.floor(Math.random()*FRUITS.length)];
      emoji.textContent = f.emoji;
      name.textContent = f.name;
      type.textContent = f.type;
      ticks--;
      if(ticks <= 0){
        clearInterval(interval);
        spinning = false;
      }
    }, 90);
  });

  reset.addEventListener("click", ()=>{
    name.textContent = "Tap “Spin Fruit”";
    type.textContent = "—";
    emoji.textContent = "❓";
  });
}

/* ========= 12) Facts Carousel ========= */
function buildFacts(){
  const track = $("#factsTrack");
  track.innerHTML = "";
  FACTS.forEach(f=>{
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.textContent = f;
    track.appendChild(slide);
  });
}
function initGallerySlider(){
  // Also handles facts slider controls
  let idx = 0;
  const track = $("#factsTrack");
  const slides = ()=> $$(".slide", track);
  const prev = $("#factsPrev");
  const next = $("#factsNext");

  const update = ()=>{
    const w = slides()[0]?.getBoundingClientRect().width || 300;
    track.style.transform = `translateX(${-(w + 12) * idx}px)`;
  };
  prev.addEventListener("click", ()=>{ idx = Math.max(0, idx-1); update(); });
  next.addEventListener("click", ()=>{ idx = Math.min(slides().length-1, idx+1); update(); });
  window.addEventListener("resize", update);
}

/* ========= 13) Timeline ========= */
function buildTimeline(){
  const wrap = $(".timeline");
  wrap.innerHTML = "";
  TIMELINE.forEach(t=>{
    const card = document.createElement("div");
    card.className = "time-card";
    card.innerHTML = `<span class="tag">${t.tag}</span><h4>${t.arc}</h4><p class="muted">${t.desc}</p>`;
    wrap.appendChild(card);
  });
}

/* ========= 14) Gallery ========= */
const GALLERY = [
   { src: "Photos/onepiece.png", alt: "Logo" },
  { src: "Photos/luffy5.jpg", full: "Photos/luffy.jpg", alt: "Luffy" },
  { src: "Photos/zoro8.jpg", alt: "" },
 
  { src: "Photos/Zoro2.jpg", alt: "Zoro Sword Pose" },
  { src: "Photos/zoro1.jpg", alt: "Zoro Action Scene" },
  { src: "Photos/z-d.jpg", alt: "Zoro Dramatic" },
  { src: "Photos/skull1.png", alt: "Zoro Action Scene" },
  { src: "Photos/crew.jpeg", alt: "Zoro Dramatic" }
  ,
  { src: "Photos/crew1.jpeg", alt: "Logo" },
  { src: "Photos/luffy200.jpeg", alt: "Zoro Sword Pose" },
  { src: "Photos/flag.jpeg", alt: "Zoro Action Scene" },
  { src: "Photos/all.jpeg", alt: "Zoro Dramatic" },
  { src: "Photos/crew3.jpeg", alt: "Zoro Action Scene" },
  { src: "Photos/zoro14.jpg", alt: "Zoro Dramatic" }
  
];

function buildGallery(){
  const grid = $("#galleryGrid");
  grid.innerHTML = "";
  GALLERY.forEach(g=>{
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = g.src;
    if(g.full) img.dataset.full = g.full;
    img.alt = g.alt || "Gallery";
    grid.appendChild(img);
  });

  // Prev/Next simple scroller
  $("#galleryPrev").addEventListener("click", ()=> grid.scrollBy({ left: -window.innerWidth*.6, behavior: "smooth" }));
  $("#galleryNext").addEventListener("click", ()=> grid.scrollBy({ left: window.innerWidth*.6, behavior: "smooth" }));
}

/* ========= 15) Theme Toggle ========= */
function initTheme(){
  const root = document.documentElement;
  const btn = $("#themeToggle");
  const saved = localStorage.getItem("theme") || "dark";
  if(saved === "light") root.classList.add("light");
  btn.addEventListener("click", ()=>{
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  });
}

/* ========= 16) Music Toggle ========= */
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgm");
  const btn = document.getElementById("musicToggle");
  let playing = false;

  function setIcon() {
    btn.textContent = playing ? "🔇" : "🎵";
  }

  btn.addEventListener("click", () => {
    if (!playing) {
      audio.play()
        .then(() => {
          playing = true;
          setIcon();
        })
        .catch(err => {
          console.log("Autoplay blocked or error:", err);
        });
    } else {
      audio.pause();
      playing = false;
      setIcon();
    }
  });

  audio.addEventListener("ended", () => {
    playing = false;
    setIcon();
  });

  setIcon();
});

/* ========= 17) Konami -> Gear Fifth ========= */
function initKonami(){
  const code = [38,38,40,40,37,39,37,39,66,65]; // up up down down left right left right b a
  let buf = [];
  window.addEventListener("keydown", (e)=>{
    buf.push(e.keyCode);
    if(buf.length > code.length) buf.shift();
    if(code.every((v,i)=> v === buf[i])){
      document.documentElement.classList.toggle("gear5");
      buf = [];
      // Subtle flash
      flash();
    }
  });
}
function flash(){
  const el = document.createElement("div");
  Object.assign(el.style, {
    position:"fixed", inset:"0", background:"white", opacity:"0.0", zIndex:"3000", pointerEvents:"none"
  });
  document.body.appendChild(el);
  let o = 0.0; const id = setInterval(()=>{
    o += .12; el.style.opacity = String(o);
    if(o >= .9){ clearInterval(id); setTimeout(()=>{
      let o2 = .9; const id2 = setInterval(()=>{
        o2 -= .1; el.style.opacity = String(o2);
        if(o2 <= 0){ clearInterval(id2); el.remove(); }
      }, 30);
    }, 100); }
  }, 16);
}

/* ========= Misc ========= */
function formatBeli(n){
  const s = n.toLocaleString("en-IN");
  return `${s} ベリ`;
}

// Join button
function showAlert(){
  alert("Welcome aboard the Going Merry! You're now part of the Straw Hat crew!");
}
window.showAlert = showAlert; // expose for inline onclick
