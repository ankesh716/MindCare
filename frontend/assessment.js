// ── Slide Logic (assessment.html only) ──
const totalSlides = 11;
let currentSlide = 0;
const answers = {};

function updateProgress() {
    const fill  = document.getElementById("progressFill");
    const label = document.getElementById("progressLabel");
    fill.style.width = ((currentSlide + 1) / totalSlides * 100) + "%";
    label.textContent = (currentSlide + 1) + " of " + totalSlides;
}

function showSlide(index) {
    document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
    document.querySelectorAll(".slide")[index].classList.add("active");

    const prevBtn   = document.getElementById("prevBtn");
    const nextBtn   = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    prevBtn.disabled = index === 0;

    const qName = "q" + (index + 1);
    nextBtn.disabled = !answers[qName];

    if (index === totalSlides - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = answers[qName] ? "inline-block" : "none";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }

    updateProgress();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Option button clicks
document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const name  = this.dataset.name;
        const value = this.dataset.value;

        answers[name] = parseInt(value);

        // Highlight selected
        document.querySelectorAll(`.option-btn[data-name="${name}"]`)
            .forEach(b => b.classList.remove("selected"));
        this.classList.add("selected");

        setTimeout(() => {
            if (currentSlide === totalSlides - 1) {
                document.getElementById("submitBtn").style.display = "inline-block";
                document.getElementById("nextBtn").style.display   = "none";
            } else {
                document.getElementById("nextBtn").disabled = false;
                setTimeout(() => nextSlide(), 350);
            }
        }, 300);
    });
});

// Init
showSlide(0);

// ── Submit ──
async function submitAnswers() {
    if (Object.keys(answers).length < totalSlides) {
        alert("Please answer all questions!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers)
        });

        const result = await response.json();

        if (result.error) {
            alert(result.error);
            return;
        }

        localStorage.setItem("assessmentResult", JSON.stringify(result));
        window.location.href = "result.html";

    } catch (error) {
        alert("Backend not running! Please start the backend server first.");
        console.log(error);
    }
}
