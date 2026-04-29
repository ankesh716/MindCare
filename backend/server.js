const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Max score = 9 * 11 = 99
app.post("/api/analyze", (req, res) => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11 } = req.body;

    if ([q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11].some(v => v == null)) {
        return res.status(400).json({ error: "All questions are required!" });
    }

    const score = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9 + q10 + q11;
    const percentage = Math.round((score / 99) * 100);

    let status = "";
    let description = "";

    if (score <= 28) {
        status = "You're having a good day! 😊";
        description = "Things seem to be going well for you today. You're handling your day with a positive mindset. Keep it up — small good days add up to a great life.";
    } else if (score <= 60) {
        status = "Your day has been a mixed bag. 😐";
        description = "Some parts of your day went okay, but a few things weighed you down. That's completely normal. Try to wind down tonight — maybe a walk, some music, or just rest.";
    } else {
        status = "Today seems tough for you. 😟";
        description = "It looks like today has been quite hard. You're not alone in feeling this way. Take it one step at a time. Talk to someone you trust, take a break, and be kind to yourself today.";
    }

    res.json({ score, percentage, status, description });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
