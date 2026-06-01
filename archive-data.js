// This database maps every group to the pages they appear on
const concertArchiveDatabase = {
    "seventeen": {
        displayName: "SEVENTEEN",
        links: [
            { label: "Be The Sun Tour (2022)", url: "svt-bets.html" },
            { label: "KCON LA 2023 D1", url: "bts-details.html?stop=kcon-2023-d1" } // Points to your KCON page
        ]
    },
    "bts": {
        displayName: "BTS",
        links: [
            { label: "KCON LA 2023 D1", url: "bts-details.html?stop=kcon-2023-d1" }
        ]
    },
    "stray kids": {
        displayName: "Stray Kids",
        links: [
            { label: "KCON LA 2025 D3", url: "bts-details.html?stop=kcon-2025-d3" }
        ]
    }
};

// This maps specific KCON days to the lineup list of tags
const kconLineups = {
    "kcon-2023-d1": ["SEVENTEEN", "BTS"],
    "kcon-2023-d2": ["NMIXX", "Kep1er"],
    "kcon-2025-d1": ["ATEEZ", "STAYC"],
    "kcon-2025-d3": ["Stray Kids", "Zico"]
};