// ── Result Page Logic (result.html only) ──
const storedData = localStorage.getItem("assessmentResult");

if (storedData) {
    const result = JSON.parse(storedData);

    document.getElementById("statusText").textContent      = result.status;
    document.getElementById("descriptionText").textContent = result.description;
    document.getElementById("scoreText").textContent       = "Score: " + result.score + " / 99";

    const bar = document.getElementById("progressBar");

    setTimeout(() => {
        bar.style.width = result.percentage + "%";
    }, 200);

    if (result.score <= 28) {
        bar.style.backgroundColor = "#22c55e";
    } else if (result.score <= 60) {
        bar.style.backgroundColor = "#f59e0b";
    } else {
        bar.style.backgroundColor = "#ef4444";
    }
} else {
    // No data found — redirect back
    window.location.href = "assessment.html";
}
