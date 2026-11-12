const questions = [
    {
        question: "O que é inflação?",
        answers: [
            "A queda geral dos preços de produtos e serviços.",
            "O aumento generalizado e contínuo dos preços ao longo do tempo.",
            "Um imposto cobrado sobre as compras.",
            "O valor que o banco paga pelo dinheiro guardado."
        ],
        correct: 1,
        explanation: "Inflação é o aumento generalizado e contínuo dos preços de produtos e serviços, o que faz o dinheiro comprar menos."
    },
    {
        question: "Se a inflação é de 10% no ano e o seu salário não muda, o que acontece com o seu poder de compra?",
        answers: [
            "Ele aumenta, porque os preços estão maiores.",
            "Ele permanece exatamente o mesmo.",
            "Ele diminui, porque o mesmo salário compra menos.",
            "Ele deixa de existir."
        ],
        correct: 2,
        explanation: "Com os preços subindo e o salário parado, o mesmo valor compra uma quantidade menor de produtos e serviços."
    },
    {
        question: "Uma compra custava R$ 100,00 e os preços subiram 5%. Quanto ela passa a custar?",
        answers: [
            "R$ 95,00",
            "R$ 100,05",
            "R$ 105,00",
            "R$ 150,00"
        ],
        correct: 2,
        explanation: "Um aumento de 5% sobre R$ 100 equivale a R$ 5, então a compra passa a custar R$ 105."
    },
    {
        question: "Qual índice mede a inflação oficial no Brasil?",
        answers: [
            "IPCA",
            "Selic",
            "CDI",
            "Poupança"
        ],
        correct: 0,
        explanation: "O IPCA, calculado pelo IBGE, é o índice usado como medida oficial da inflação no Brasil."
    },
    {
        question: "Para o dinheiro guardado não perder valor com o tempo, o que é importante?",
        answers: [
            "Deixá-lo parado em casa, sem render.",
            "Gastar tudo o quanto antes.",
            "Escolher aplicações que rendam acima da inflação.",
            "Ignorar a variação dos preços."
        ],
        correct: 2,
        explanation: "Se o rendimento for menor que a inflação, o dinheiro perde poder de compra. O ideal é buscar aplicações que rendam acima dela."
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
        resultMessage.textContent = "Excelente! Você demonstrou que compreende muito bem os conceitos básicos de inflação.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Muito bem! Você já possui uma boa compreensão sobre inflação. Continue aprendendo!";
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

// menu-mobile.js — abre/fecha o menu hambúrguer das páginas de conteúdo
(function () {
  "use strict";

  const menuButton = document.getElementById("mobile-menu-button");
  const mobileNav = document.getElementById("mobile-navigation");
  if (!menuButton || !mobileNav) return;

  // Atualiza o estado do botão (o CSS abre o painel por aria-expanded)
  function setMenu(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  // Fecha ao clicar em qualquer link do menu
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Fecha com Esc
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  // Fecha ao voltar para a tela grande
  window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });
})();

// Eventos

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Inicialização

showQuestion();