// =========================================================================
// 1. Central Databases (Media Layout Matrix & KCON Exclusives)
// =========================================================================
const tourMediaDatabase = {
    "permission-to-dance": {
        yearPage: "2022.html",
        pictures: ["images/bts.jpg","images/ptd1.jpg","images/bts.jpg"],
        videos: [],
        extra: []
    },
    "kcon-2023-d1": {  
        yearPage: "2023.html",
        pictures: ["images/kcon1.jpg"],
        videos: [],
        extra: []
    },
    "kcon-2023-d2": {  
        yearPage: "2023.html",
        pictures: [], 
        videos: [],
        extra: []
    },
    "synk-showcase-la": { 
        yearPage: "2022.html",
        pictures: [], 
        videos: [],
        extra: []
    }, 
    "ready-to-be": {
        yearPage: "2023.html", 
        pictures: ["images/rtb.jpg"], 
        videos: [],
        extra: []
    }, 
    "this-is-for": {
        yearPage: "2026.html", 
        pictures: [], 
        videos: [],
        extra: []
    }, 
    "fate-plus": {
        yearPage: "2024.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "blood-saga": {
        yearPage: "2026.html", 
        pictures: [], 
        videos: [],
        extra: []
    }, 
    "hope-on-the-stage": {
        yearPage: "2025.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "run-seokjin": {
        yearPage: "2025.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "arirang-lv1": {
        yearPage: "2026.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "arirang-lv2": {
        yearPage: "2026.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "kcon-2025-d1": {
        yearPage: "2025.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "kcon-2025-d3": {
        yearPage: "2025.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "act-promise": {
        yearPage: "2024.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "act-tomorrow": {
        yearPage: "2024.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "bets-oak": {
        yearPage: "2022.html", 
        pictures: ["images/bets1.PNG", "images/bets3.PNG", "images/bets4.PNG"], 
        videos: ["videos/bets1.mp4", "videos/bets2.mp4", "videos/bets3.mp4"],
        extra: []
    },
    "followseoul": {
        yearPage: "2023.html", 
        pictures: ["images/follow1.JPG",], 
        videos: [],
        extra: []
    },
    "rh-sa": {
        yearPage: "2024.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "rh-la": {
        yearPage: "2024.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "new-ta": {
        yearPage: "2025.html", 
        pictures: [], 
        videos: [],
        extra: []
    },
    "new-la": {
        yearPage: "2025.html", 
        pictures: [], 
        videos: [],
        extra: []
    }       
};

// Target dictionary used exclusively to render artist tags on KCON page profiles
const kconLineups = {
    "kcon-2023-d1": ["WayV", "Taemin", "IVE", "CRAVITY", "NMIXX", "TAEYONG"],
    "kcon-2023-d2": ["NMIXX", "Kep1er"],
    "kcon-2025-d1": ["NCT 127", "STAYC"],
    "kcon-2025-d3": ["HxW", "Zico"]
};

// =========================================================================
// 2. Application State Tracking Configurations
// =========================================================================
let currentTour = "none";
let currentCategory = "pictures"; 
let currentMediaIndex = 0;

const tourSelect = document.getElementById('tour-select');
const concertImg = document.getElementById('concert-display-img');
const concertVideo = document.getElementById('concert-display-video');
const placeholderText = document.getElementById('image-placeholder-text');
const controlsRow = document.getElementById('media-controls');
const counterText = document.getElementById('media-counter');
const backBtn = document.getElementById('dynamic-back-btn');
const tagsWrapper = document.getElementById('lineup-tags-wrapper');

const btnPictures = document.getElementById('btn-pictures');
const btnVideos = document.getElementById('btn-videos');
const btnExtra = document.getElementById('btn-extra');

// =========================================================================
// 3. Render Engine Logic
// =========================================================================
function renderMedia() {
    if (currentTour === "none" || !tourMediaDatabase[currentTour]) {
        concertImg.style.display = 'none';
        concertVideo.style.display = 'none';
        controlsRow.style.display = 'none';
        placeholderText.style.display = 'block';
        if (tagsWrapper) tagsWrapper.innerHTML = ""; 
        return;
    }

    // =========================================================================
    // SMART DYNAMIC BACK BUTTON ROUTING (Universal History Tracker)
    // =========================================================================
    if (backBtn) {
        const previousPage = document.referrer;

        // If there is an active historical browsing chain context trail
        if (previousPage && window.history.length > 1) {
            backBtn.onclick = function(e) {
                e.preventDefault(); 
                window.history.back(); // Reverses exact path user navigated through
            };
        } 
        // Fallback: If page was direct-linked or hard reloaded
        else {
            if (currentTour.includes("kcon")) {
                backBtn.href = "kcon.html";
            } else if (
                currentTour === "bets-oak" || 
                currentTour === "followseoul" || 
                currentTour === "rh-sa" || 
                currentTour === "rh-la" ||
                currentTour === "new-ta" ||
                currentTour === "new-la"
            ) {
                backBtn.href = "svtland.html"; 
            } else if (tourMediaDatabase[currentTour] && tourMediaDatabase[currentTour].yearPage) {
                backBtn.href = tourMediaDatabase[currentTour].yearPage;
            } else {
                backBtn.href = "index.html";
            }
        }
    }

    // =========================================================================
    // DYNAMIC TAG RENDERING ENGINE (Isolates and prints tags only on KCON stops)
    // =========================================================================
    if (tagsWrapper) {
        tagsWrapper.innerHTML = ""; 

        if (currentTour.includes("kcon") && kconLineups[currentTour]) {
            tagsWrapper.style.display = "flex"; 
            const lineupArray = kconLineups[currentTour];
            
            lineupArray.forEach(artist => {
                const tagChip = document.createElement("span");
                tagChip.className = "artist-tag-chip";
                tagChip.textContent = artist;
                tagsWrapper.appendChild(tagChip);
            });
        } else {
            tagsWrapper.style.display = "none"; // Hard hide tags on normal solo group views
        }
    }

    const mediaArray = tourMediaDatabase[currentTour][currentCategory];
    
    if (!mediaArray || mediaArray.length === 0) {
        concertImg.style.display = 'none';
        concertVideo.style.display = 'none';
        controlsRow.style.display = 'none';
        placeholderText.innerText = "No media file links available in this slot category.";
        placeholderText.style.display = 'block';
        return;
    }

    placeholderText.style.display = 'none';

    if (currentCategory === "videos") {
        concertImg.style.display = 'none';
        concertVideo.src = mediaArray[currentMediaIndex];
        concertVideo.style.display = 'block';
    } else {
        concertVideo.style.display = 'none';
        concertVideo.pause(); 
        concertImg.src = mediaArray[currentMediaIndex];
        concertImg.style.display = 'block';
    }

    counterText.innerText = `${currentMediaIndex + 1} / ${mediaArray.length}`;
    controlsRow.style.display = mediaArray.length > 1 ? 'flex' : 'none';
}

// =========================================================================
// 4. State Mutation Functions
// =========================================================================
function setCategory(newCategory, activeBtn) {
    currentCategory = newCategory;
    currentMediaIndex = 0; 
    [btnPictures, btnVideos, btnExtra].forEach(btn => {
        if(btn) btn.classList.remove('active-category');
    });
    if (activeBtn) activeBtn.classList.add('active-category');
    renderMedia();
}

function navigateMedia(direction) {
    const mediaArray = tourMediaDatabase[currentTour][currentCategory];
    if (!mediaArray) return;

    currentMediaIndex += direction;

    if (currentMediaIndex >= mediaArray.length) {
        currentMediaIndex = 0; 
    } else if (currentMediaIndex < 0) {
        currentMediaIndex = mediaArray.length - 1; 
    }

    renderMedia();
}

// =========================================================================
// 5. Wiring Event Listeners
// =========================================================================
if (tourSelect) {
    tourSelect.addEventListener('change', (e) => {
        currentTour = e.target.value;
        currentMediaIndex = 0;
        renderMedia();
    });
}

if (btnPictures) btnPictures.addEventListener('click', () => setCategory('pictures', btnPictures));
if (btnVideos) btnVideos.addEventListener('click', () => setCategory('videos', btnVideos));
if (btnExtra) btnExtra.addEventListener('click', () => setCategory('extra', btnExtra));

const prevBtn = document.getElementById('prev-media-btn');
const nextBtn = document.getElementById('next-media-btn');

if (prevBtn) prevBtn.addEventListener('click', () => navigateMedia(-1));
if (nextBtn) nextBtn.addEventListener('click', () => navigateMedia(1));

// =========================================================================
// 6. Application Initialization Engine (Hash State Synchronization Sync)
// =========================================================================
function initializePageLayout() {
    setTimeout(() => {
        const targetTour = window.location.hash.substring(1); 
        
        if (targetTour && tourMediaDatabase[targetTour]) {
            currentTour = targetTour;
            if (tourSelect) tourSelect.value = targetTour;
        } 
        else if (tourSelect && tourSelect.value !== "none" && tourSelect.value !== "") {
            currentTour = tourSelect.value;
        } else {
            currentTour = "none";
        }

        currentMediaIndex = 0;
        setCategory('pictures', btnPictures);
    }, 50); 
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePageLayout);
} else {
    initializePageLayout();
}

window.addEventListener('hashchange', initializePageLayout);