const questions = [
    {
        question: "O que é uma reserva de emergência?",
        answers: [
            "Um dinheiro guardado para cobrir imprevistos, como uma despesa médica ou a perda de renda.",
            "Um valor separado para as compras de fim de ano.",
            "Um investimento de risco para ganhar o máximo possível.",
            "Um empréstimo que o banco deixa disponível."
        ],
        correct: 0,
        explanation: "A reserva de emergência é um valor guardado para imprevistos, evitando que você precise recorrer a dívidas."
    },
    {
        question: "Qual é a recomendação mais comum para o tamanho da reserva de emergência?",
        answers: [
            "O equivalente a 1 semana de gastos.",
            "O equivalente a 3 a 6 meses de gastos essenciais.",
            "Exatamente o valor do salário de um mês.",
            "Todo o dinheiro que sobra no fim do mês."
        ],
        correct: 1,
        explanation: "O mais comum é guardar de 3 a 6 meses de gastos essenciais, e quem tem renda variável costuma buscar um valor maior."
    },
    {
        question: "Os gastos essenciais de uma pessoa são de R$ 1.200 por mês. Qual seria uma reserva de 6 meses?",
        answers: [
            "R$ 2.400",
            "R$ 6.000",
            "R$ 7.200",
            "R$ 12.000"
        ],
        correct: 2,
        explanation: "Multiplicando os gastos essenciais pelo número de meses: R$ 1.200 x 6 = R$ 7.200."
    },
    {
        question: "Quais características a reserva de emergência deve ter?",
        answers: [
            "Alto risco e resgate somente após alguns anos.",
            "Liquidez diária e baixo risco.",
            "Rendimento muito alto, mesmo que o valor oscile bastante.",
            "Ficar guardada em casa, sem render."
        ],
        correct: 1,
        explanation: "A reserva precisa estar segura e disponível quando você precisar, por isso se busca liquidez diária e baixo risco."
    },
    {
        question: "Qual destes é um exemplo de emergência que justifica usar a reserva?",
        answers: [
            "Uma promoção de celular novo.",
            "Uma viagem de férias com os amigos.",
            "Uma despesa médica inesperada.",
            "A compra de roupas da moda."
        ],
        correct: 2,
        explanation: "A reserva deve ser usada apenas em imprevistos reais, como uma despesa médica. Depois de usá-la, o ideal é repor o valor."
    }
];

// Elementos da página

const quizForm = document.querySelector("#quiz-form");
const questionTitle = document.querySelector("#question-title");
const answerOptions = document.querySelector("#answer-options");
const questionCounter = document.querySelector("#question-counter");
const progressText = document.querySelector("#question-progress-text");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector("#progress-track");
const feedback = document.querySelector("#quiz-feedback");
const nextButton = document.querySelector("#next-button");
const quizResult = document.querySelector("#quiz-result");
const resultMessage = document.querySelector("#result-message");
const resultScore = document.querySelector("#result-score");
const restartButton = document.querySelector("#restart-button");

// Estado do questionário

let currentQuestion = 0;
let score = 0;
let answered = false;

// Exibe uma questão

function showQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    questionCounter.textContent = `Questão ${currentQuestion + 1} de ${questions.length}`;
    progressText.textContent = `${Math.round(progress)}%`;
    progressFill.style.width = `${progress}%`;
    progressTrack.setAttribute("aria-valuenow", Math.round(progress));

    questionTitle.textContent = question.question;
    answerOptions.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    answered = false;
    nextButton.disabled = true;

    question.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        label.className = "answer-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = index;
        input.addEventListener("change", checkAnswer);

        const span = document.createElement("span");
        span.textContent = answer;

        label.append(input, span);
        answerOptions.appendChild(label);
    });

    nextButton.textContent = currentQuestion === questions.length - 1
        ? "Ver resultado"
        : "Próxima questão";
}

// Verifica a resposta selecionada

function checkAnswer(event) {
    if (answered) return;

    answered = true;

    const selectedAnswer = Number(event.target.value);
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;

    if (isCorrect) {
        score++;
        feedback.textContent = `Resposta correta! ${question.explanation}`;
        feedback.classList.add("correct");
    } else {
        feedback.textContent = `Resposta incorreta. ${question.explanation}`;
        feedback.classList.add("incorrect");
    }

    nextButton.disabled = false;

    document.querySelectorAll(".answer-option input").forEach(input => {
        input.disabled = true;
    });
}

// Avança para a próxima questão

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Apresenta o resultado final

function showResult() {
    quizForm.hidden = true;
    quizResult.hidden = false;

    const percentage = (score / questions.length) * 100;

    resultScore.textContent = `${score} de ${questions.length} acertos`;

    if (percentage === 100) {
        resultMessage.textContent = "Excelente! Você demonstrou que compreende muito bem os conceitos básicos de reserva de emergência.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Muito bem! Você já possui uma boa compreensão sobre reserva de emergência. Continue aprendendo!";
    } else {
        resultMessage.textContent = "Não desanime! Aproveite o conteúdo da aula para aprender mais e tente novamente.";
    }

    progressFill.style.width = "100%";
    progressText.textContent = "100%";
    progressTrack.setAttribute("aria-valuenow", 100);
    questionCounter.textContent = "Questionário concluído";
}

// Reinicia o questionário

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizForm.hidden = false;
    quizResult.hidden = true;

    showQuestion();
}

// Eventos

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Inicialização

showQuestion();