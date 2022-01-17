// variable declaration
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;


const questions = [
  {
    question: 'The correct sequence of HTML tags for starting a webpage is -',
    answers: [
      {
        answer: 'HTML, Head, Title, Body',
        correct: true,
      },
      {
        answer: 'HTML, Body, Title, Head',
        correct: false,
      },
      {
        answer: 'HTML, Head, Title, Body',
        correct: false,
      },
      {
        answer: 'Head, Title, HTML, body ',
        correct: false,
      },
    ],
  },
  {
    question: 'How to create a checkbox in HTML?',
    answers: [
      {
        answer: '<input type = "button">',
        correct: false,
      },
      {
        answer: '<input type = "checkbox">',
        correct: true,
      },
      {
        answer: '<checkbox>',
        correct: false,
      },
      {
        answer: '<input type = "check">',
        correct: false,
      },
    ],
  },
  {
    question: 'What is the id selector in CSS?',
    answers: [
      {
        answer: '#',
        correct: true,
      },
      {
        answer: '.',
        correct: false,
      },
      {
        answer: '@',
        correct: false,
      },
      {
        answer: '/',
        correct: false,
      },
    ],
  },
];

// quiz replacement for the first question
function init() {

  //create first question
  createQuestion(0);
}

//creates a question
function createQuestion(i) {

  // clear previous question
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // change question text
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // insert alternative
  questions[i].answers.forEach((answer, i) => {
    // create template quizz button
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remove hide and template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // insert alternative on the screen
    answerBox.appendChild(answerTemplate);

    // insert click on button event
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // increment the question number
  actualQuestion++;
}

// check user response
function checkAnswer(btn) {
  // selects all buttons
  const buttons = answerBox.querySelectorAll('button');

  //  check if correct answer and add class
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checks if the user got the question right
      if (btn === button) {
        //points increase
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // display next question
  nextQuestion();
}

// displays the pŕoxima question in the quiz
function nextQuestion() {
  // timer for user to see the answers
  setTimeout(function () {
    //checks if there are still questions
    if (actualQuestion >= questions.length) {
      // displays success message
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// displays the final screen
function showSuccessMessage() {
  hideOrShowQuizz();

  // change data success screen
  // calculate score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //change the number of correct questions
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // change the question total
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// show or hide the score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// restart quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //clear game
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// quizz startup
init();