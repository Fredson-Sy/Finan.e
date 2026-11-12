
// ========================================
// QUESTIONÁRIO SOBRE POUPANÇA
// ========================================

const questions = [
    {
        question: "O que significa poupar dinheiro?",
        answers: [
            "Gastar todo o dinheiro recebido.",
            "Guardar uma parte do dinheiro para utilizar no futuro.",
            "Pedir dinheiro emprestado frequentemente.",
            "Comprar produtos sempre que possível."
        ],
        correct: 1,
        explanation: "Poupar significa reservar uma parte do dinheiro para objetivos futuros ou imprevistos."
    },
    {
        question: "Qual é uma das principais vantagens de criar o hábito de poupar?",
        answers: [
            "Aumentar as despesas mensais.",
            "Eliminar todas as necessidades financeiras.",
            "Ter recursos disponíveis para objetivos e imprevistos.",
            "Evitar completamente qualquer tipo de trabalho."
        ],
        correct: 2,
        explanation: "A poupança ajuda a construir uma reserva financeira e proporciona maior segurança."
    },
    {
        question: "Qual atitude representa um bom planejamento financeiro?",
        answers: [
            "Gastar primeiro e pensar depois.",
            "Ignorar os próprios gastos.",
            "Comprar tudo o que deseja imediatamente.",
            "Organizar as despesas e reservar uma quantia para poupar."
        ],
        correct: 3,
        explanation: "Organizar as despesas permite identificar quanto dinheiro pode ser guardado."
    },
    {
        question: "O que é uma reserva de emergência?",
        answers: [
            "Um dinheiro guardado para situações inesperadas.",
            "Uma quantia destinada exclusivamente ao lazer.",
            "Um empréstimo feito pelo banco.",
            "Um dinheiro reservado para compras por impulso."
        ],
        correct: 0,
        explanation: "A reserva de emergência serve para lidar com despesas inesperadas, como problemas de saúde ou perda de renda."
    },
    {
        question: "É necessário ganhar muito dinheiro para começar a poupar?",
        answers: [
            "Sim, somente pessoas com salários altos conseguem poupar.",
            "Não, é possível começar guardando pequenas quantias.",
            "Sim, porque pequenas quantias não fazem diferença.",
            "Não, mas é necessário deixar de pagar todas as despesas."
        ],
        correct: 1,
        explanation: "O hábito de poupar pode começar com pequenas quantias, respeitando a realidade financeira de cada pessoa."
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
        resultMessage.textContent = "Excelente! Você demonstrou que compreende muito bem os conceitos básicos de poupança.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Muito bem! Você já possui uma boa compreensão sobre poupança. Continue aprendendo!";
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
