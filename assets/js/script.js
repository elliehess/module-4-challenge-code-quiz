/*we will be able to grab these elements from the HTML and interact with them*/
const home = document.querySelector('#home');
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const quizText = document.querySelector('#quizText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerEl = document.getElementById("timer");
timesupCont = document.getElementById("timesUP");

const startingTime = 1;

/*setting our variables*/
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionNumber = 0;
let availableQuestions = [];
let time = startingTime * 75;
var timeInterval;


/*creating our questions */
let questions = [
    {
        question: 'What does CSS stand for?',
        choice1: 'Computer Style Sources',
        choice2: 'Color Style Sheets',
        choice3: 'Cascading Style Sheets',
        choice4: 'Computer Stance Sources',
        answer: '3'
    },
    {
        question: 'Arrays in Javascript can be used to store:',
        choice1: 'Booleans',
        choice2: 'Strings',
        choice3: 'Numbers',
        choice4: 'All of the above',
        answer: '4',
    },
    {
        question: 'What does HTML stand for?',
        choice1: 'HyperText Markup Language', 
        choice2: 'Hyperfixated Made Language',
        choice3: 'Hyper Mode Load',
        choice4: 'HowTo Make Language',
        answer: '1'
    },
    {
        question: 'A Boolean value can be:',
        choice1: 'true',
        choice2: 'false',
        choice3: 'Both a and b',
        choice4: 'Neither a or b',
        answer: '3',
    },
    {
        question: 'Javascript is used by programmers to:',
        choice1: 'style a presentation of documents',
        choice2: 'create dynamic and interactive web content',
        choice3: 'create static web pages and applications',
        choice4: 'none of the above',
        answer: '2',
    }
]

/* to keep track of our score*/
const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startQuiz = () => { /*start Quiz function */
    questionNumber = 0
    score = 0
    availableQuestions = [...questions]
    timeInterval = setInterval(startTimer, 1000);
    getNextQuestion ()
}

function startTimer() { /*tried my best at a timer*/
 
    if (numOfQuestions = availableQuestions.length - 1) {
        startQuiz.classList.add("hide");
    }
    homePage.classList.add("hide");
    startQuiz.classList.remove("hide");
    const minutes = Math.floor(time / 60);
    var seconds = time % 75;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (time <= 0) {
        timerEl.innerHTML = "Oops, Time's Up!";
        startQuiz.classList.add("hide");
        timesUpCont.classList.remove("hide");
    }
    
    timerEl.innerHTML = minutes + ":" + seconds;
    time--;

}

getNextQuestion = () => { /*go through questions and once finished grab the score and display it on screen*/
    if(availableQuestions.length === 0 || questionNumber > MAX_QUESTIONS) {
        localStorage.setItem('mostrecentScore', score)
        return window.location.assign('end.html') /*creating another html to store what happens when quiz is over*/
    }

    /* loop through the questions until there are none left */
    questionNumber++
    quizText.innerText = `Question ${questionNumber} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionNumber/MAX_QUESTIONS) * 100}%`

    /* choose a random question and dislay it */
    const questionList = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionList]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'] /*so we know what choice to click on*/
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionList, 1) /*splices our array of Qs from our Q list */

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => { /*create our event listener */
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let applyClass = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' /*choose whether to apply the GREEN correct or RED incorrect class style */

        if(applyClass === 'correct') { /*you will increase score if quesiton correct */
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(applyClass)

        setTimeout (() => { /*perform the next questin function after selected*/
            selectedChoice.parentElement.classList.remove(applyClass)
            getNextQuestion()
        }, 1000)
    })
})

incrementScore = num => { /*update our score */
    score +=num 
    scoreText.innerText = score
}

startQuiz ();





//submit button
//go back
//clear high scores
//set time interval
//local.storage for high scores