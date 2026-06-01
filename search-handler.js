// =========================================================================
// 1. Search Database Mapping Configuration (Separate Page Routing)
// =========================================================================
const concertArchiveDatabase = {
    "seventeen": {
        displayName: "SEVENTEEN",
        links: [
            { label: "BE THE SUN in Oakland", url: "bethesun.html#bets-oak" },
            { label: "FOLLOW TO SEOUL D1", url: "follow.html#followseoul" },
            { label: "SEVENTEEN RIGHT HERE in San Antonio", url: "righthere.html#rh-sa" },
            { label: "SEVENTEEN RIGHT HERE in Los Angeles", url: "righthere.html#rh-la" },
            { label: "NEW_ in Tacoma", url: "new.html#new-ta" },
            { label: "NEW_ in Los Angeles", url: "new.html#new-la" },
            { label: "KCON LA 2025 D3", url: "kcon.html#kcon-2025-d3" }
        ]
    },
    "bts": {
        displayName: "BTS",
        links: [
            { label: "Permission to Dance On Stage D3", url: "bts.html#permission-to-dance" },
            { label: "HOPE ON THE STAGE", url: "bts.html#hope-on-the-stage" },
            { label: "#RUNSEOKJIN_EP.TOUR", url: "bts.html#run-seokjin" },
            { label: "ARIRANG in Las Vegas D1", url: "bts.html#arirang-lv1" },
            { label: "ARIRANG in Las Vegas D2", url: "bts.html#arirang-lv2" },
            { label: "ARIRANG in Los Angeles D1", url: "bts.html#arirang-la1" },
        ]
    },
    "stray kids": {
        displayName: "Stray Kids",
        links: [
            { label: "KCON LA 2025 D3", url: "kcon.html#kcon-2025-d3" }
        ]
    },
    "enhypen": {
        displayName: "Enhypen",
        links: [
            { label: "Fate Plus Tour (2024)", url: "enhypen.html#fate-plus" }
        ]
    },
    "twice": {
        displayName: "TWICE",
        links: [
            { label: "Ready To Be Tour (2023)", url: "twice.html#ready-to-be" }
        ]
    },
    "txt": {
        displayName: "TXT",
        links: [
            { label: "Act: Promise (2024)", url: "txt.html#act-promise" },
            { label: "Act: Tomorrow (2024)", url: "txt.html#act-tomorrow" }
        ]
    },
    "xg": {
        displayName: "XG",
        links: [
            { label: "The First Howl (2024)", url: "xg.html#this-is-for" }
        ]
    }
};

// =========================================================================
// 2. Interactive Filtering Search Dropdown Engine
// =========================================================================
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("group-search");
    const resultsDropdown = document.getElementById("search-results");

    if (!searchInput || !resultsDropdown) return;

    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase().trim();
        resultsDropdown.innerHTML = "";

        if (query === "") {
            resultsDropdown.style.display = "none";
            return;
        }

        let hasResults = false;

        for (let groupKey in concertArchiveDatabase) {
            if (groupKey.includes(query)) {
                hasResults = true;
                const groupData = concertArchiveDatabase[groupKey];
                
                const item = document.createElement("div");
                item.className = "search-result-item";
                
                let html = `<div class="search-result-group">${groupData.displayName}</div>`;
                html += `<div class="search-result-links">`;
                
                groupData.links.forEach(link => {
                    html += `<a href="${link.url}">${link.label}</a>`;
                });
                
                html += `</div>`;
                item.innerHTML = html;
                resultsDropdown.appendChild(item);
            }
        }

        resultsDropdown.style.display = hasResults ? "block" : "none";
    });

    // Dismiss dropdown upon clicking outside the target bounds
    document.addEventListener("click", function(e) {
        if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.style.display = "none";
        }
    });
});