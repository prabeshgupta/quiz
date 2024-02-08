const questions = [
    {
        question: "What's the capital city of Thailand?",
        answers: [
            { text: "Paris", correct: false },
            { text: "Bangkok", correct: true },
            { text: "Moscow", correct: false },
            { text: "Dhakas", correct: false }
        ]
    },
    {
        question: "What's atomic number of Mercury element?",
        answers: [
            { text: "85", correct: false },
            { text: "88", correct: false },
            { text: "83", correct: false },
            { text: "80", correct: true }
        ]
    },
    {
        question: "How many total number of chromosomes does a human have?",
        answers: [
            { text: "46", correct: true },
            { text: "48", correct: false },
            { text: "42", correct: false },
            { text: "44", correct: false }
        ]
    },
    {
        question: "Solution of 2+2/2 is",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "5", correct: false },
            { text: "4", correct: false }
        ]
    },
    {
        question: "What's your identity?",
        answers: [
            { text: "Straight", correct: false },
            { text: "Gay", correct: true },
            { text: "Lesbian", correct: false },
            { text: "Transgender", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

//Remove previous answers
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You have scored ${score} points.`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();

