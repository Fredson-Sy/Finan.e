// ========================================
// QUESTIONÁRIO SOBRE JUROS
// ========================================

const questions = [
    {
        question: "O que são juros?",
        answers: [
            "Um desconto dado em compras à vista.",
            "Uma taxa cobrada apenas por bancos digitais.",
            "O valor cobrado ou recebido pelo uso do dinheiro ao longo do tempo.",
            "Um imposto pago ao governo sobre o salário."
        ],
        correct: 2,
        explanation: "Juros são o valor pago ou recebido pelo uso do dinheiro durante um período de tempo."
    },
    {
        question: "Um capital de R$ 1.000 rende juros simples de 2% ao mês. Quanto de juros será acumulado após 3 meses?",
        answers: [
            "R$ 20,00",
            "R$ 60,00",
            "R$ 61,21",
            "R$ 120,00"
        ],
        correct: 1,
        explanation: "Nos juros simples, os 2% incidem sempre sobre os R$ 1.000: R$ 20 por mês, ou R$ 60 em três meses."
    },
    {
        question: "O que caracteriza os juros compostos?",
        answers: [
            "Os juros são sempre calculados apenas sobre o valor inicial.",
            "Os juros deixam de ser cobrados depois do primeiro mês.",
            "O valor dos juros nunca muda ao longo do tempo.",
            "Os juros incidem sobre o valor inicial somado aos juros já acumulados."
        ],
        correct: 3,
        explanation: "Nos juros compostos, os juros de cada período entram na base de cálculo do período seguinte, o chamado juros sobre juros."
    },
    {
        question: "O que costuma acontecer com uma dívida com juros compostos que não é paga?",
        answers: [
            "Ela cresce cada vez mais rápido com o passar do tempo.",
            "Ela permanece sempre com o mesmo valor.",
            "Ela diminui sozinha com o tempo.",
            "Ela é cancelada automaticamente depois de alguns meses."
        ],
        correct: 0,
        explanation: "Como os juros incidem também sobre os juros acumulados, quanto mais tempo a dívida fica em aberto, maior ela tende a ficar."
    },
    {
        question: "Em qual situação os juros trabalham a seu favor?",
        answers: [
            "Quando você paga uma fatura do cartão de crédito com atraso.",
            "Quando você faz um empréstimo com taxa alta.",
            "Quando você investe ou aplica seu dinheiro e recebe rendimentos.",
            "Quando você parcela uma compra com acréscimo no valor final."
        ],
        correct: 2,
        explanation: "Ao investir, você recebe juros pelo dinheiro aplicado, e o tempo ajuda o valor a crescer."
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
        resultMessage.textContent = "Excelente! Você demonstrou que compreende muito bem os conceitos básicos de juros.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Muito bem! Você já possui uma boa compreensão sobre juros. Continue aprendendo!";
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