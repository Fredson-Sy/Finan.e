// ========================================
// QUESTIONÁRIO SOBRE CRÉDITO
// ========================================

const questions = [
    {
        question: "O que é crédito?",
        answers: [
            "Dinheiro que você recebe de presente sem precisar devolver.",
            "A possibilidade de usar um dinheiro agora e pagá-lo no futuro.",
            "Um tipo de poupança com rendimento garantido.",
            "Um desconto dado em compras à vista."
        ],
        correct: 1,
        explanation: "Crédito é usar um recurso que ainda não é seu, com o compromisso de pagar depois."
    },
    {
        question: "O que são juros?",
        answers: [
            "O valor cobrado pelo uso do dinheiro emprestado.",
            "Um prêmio dado a quem paga as contas em dia.",
            "Uma taxa cobrada apenas em compras à vista.",
            "O valor que o banco guarda para o cliente."
        ],
        correct: 0,
        explanation: "Os juros são o preço do crédito: quanto maior a taxa e o prazo, mais se paga no total."
    },
    {
        question: "Qual atitude ajuda a evitar o endividamento?",
        answers: [
            "Usar todo o limite do cartão todo mês.",
            "Parcelar tudo para a parcela caber no bolso.",
            "Pagar apenas o valor mínimo da fatura.",
            "Verificar se a parcela cabe no orçamento antes de contratar."
        ],
        correct: 3,
        explanation: "Comparar a parcela com a renda antes de contratar evita assumir dívidas que não dá para pagar."
    },
    {
        question: "O que costuma acontecer ao pagar apenas o valor mínimo da fatura do cartão?",
        answers: [
            "A dívida é quitada normalmente, sem custo extra.",
            "O saldo restante gera juros altos e a dívida pode crescer.",
            "O banco devolve parte do valor no mês seguinte.",
            "O limite do cartão aumenta automaticamente."
        ],
        correct: 1,
        explanation: "O valor que não foi pago entra no crédito rotativo, que costuma ter juros muito altos."
    },
    {
        question: "Para que serve o score de crédito?",
        answers: [
            "Para calcular o saldo da conta bancária.",
            "Para definir o valor do salário do cliente.",
            "Para indicar o histórico de pagamentos e ajudar na análise de crédito.",
            "Para aumentar automaticamente o limite do cartão."
        ],
        correct: 2,
        explanation: "O score resume o comportamento de pagamento e pesa na decisão de quem concede o crédito."
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
        resultMessage.textContent = "Excelente! Você demonstrou que compreende muito bem os conceitos básicos de crédito.";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Muito bem! Você já possui uma boa compreensão sobre crédito. Continue aprendendo!";
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