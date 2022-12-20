const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highSchore')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

var saveHighScores = []

saveHighScores = e => { /*I cannot get my high scores to post on the page*/
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/index.html')
}
