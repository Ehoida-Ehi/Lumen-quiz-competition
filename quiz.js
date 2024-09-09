document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');
    const quizSection = document.getElementById('quiz-section');
    const registrationSection = document.getElementById('registration-section');
    const schoolInfo = document.getElementById('school-info');
    const studentInfo = document.getElementById('student-info');
    const questionText = document.getElementById('question-text');
    const timerDisplay = document.getElementById('time-display');
    const quizForm = document.getElementById('quiz-form');

    const resultModal = document.getElementById('result-modal');
    const closeResultModal = document.getElementById('close-modal');
    const finalResult = document.getElementById('final-result');

    const winnerModal = document.getElementById('winner-modal');
    const closeWinnerModal = document.getElementById('close-winner-modal');
    const winnerInfo = document.getElementById('winner-info');

    let questions = [
        { question: "What is the name of the tallest mountain?", options: ["Kilimanjaro", "Ararat", "Everest", "Olive"], answer: 2 },
        { question: "Capital of France?", options: ["Berlin", "Paris", "Madrid", "Rome"], answer: 1 },
        { question: "The Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: 2 },
        { question: "Largest ocean in the world?", options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"], answer: 1 },
        { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Hemingway", "Chaucer", "Dickens"], answer: 0 },
        { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Fe", "Pb"], answer: 1 },
        { question: "In what year did World War II end?", options: ["1945", "1939", "1918", "1955"], answer: 0 },
        { question: "Who discovered penicillin?", options: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Isaac Newton"], answer: 0 },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: 1 },
        { question: "Which planet is closest to the sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: 0 }
    ];

    let shuffledQuestions = [];
    let currentQuestion = 0;
    let score = 0;
    let totalScore = 10;
    let timeLeft = 120; // 2-minute timer
    let timerInterval;
    let userResults = [];
    let attempts = 0;
    let highestScore = { school: '', student: '', score: 0 };

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const schoolName = document.getElementById('schoolName').value;
        const studentName = document.getElementById('studentName').value;

        schoolInfo.textContent = `School: ${schoolName}`;
        studentInfo.textContent = `Student: ${studentName}`;

        registrationSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        startQuiz();
    });

    function startQuiz() {
        shuffledQuestions = shuffleArray(questions);
        loadQuestion();
        startTimer();
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function loadQuestion() {
        const question = shuffledQuestions[currentQuestion];
        questionText.textContent = question.question;
        document.getElementById('label1').textContent = question.options[0];
        document.getElementById('label2').textContent = question.options[1];
        document.getElementById('label3').textContent = question.options[2];
        document.getElementById('label4').textContent = question.options[3];
    
        // Clear the previous radio button selection
        document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
    }

    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value);
            const correctAnswer = shuffledQuestions[currentQuestion].answer;

            if (answerIndex === correctAnswer) {
                score++;
            }

            currentQuestion++;
            if (currentQuestion < shuffledQuestions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        } else {
            alert("Please select an answer!");
        }
    });

    function startTimer() {
        timerInterval = setInterval(function () {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeLeft <= 0 || currentQuestion >= totalScore) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timerInterval);
        const schoolName = schoolInfo.textContent.split(': ')[1];
        const studentName = studentInfo.textContent.split(': ')[1];
        const percentage = (score / totalScore) * 100;

        userResults.push({ school: schoolName, student: studentName, score: percentage });
        attempts++;

        finalResult.textContent = `School: ${schoolName}, Student: ${studentName}, Score: ${percentage.toFixed(2)}%`;
        resultModal.classList.remove('hidden');

        if (percentage > highestScore.score) {
            highestScore = { school: schoolName, student: studentName, score: percentage };
        }
    }

    closeResultModal.addEventListener('click', function () {
        resultModal.classList.add('hidden');
        if (attempts >= 3) {
            // Show the Overall Winner Modal after closing the result modal
            setTimeout(showOverallWinner, 500); // Add a short delay
        } else {
            resetQuiz();
        }
    });

    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        timeLeft = 120;
        registrationSection.classList.remove('hidden');
        quizSection.classList.add('hidden');
        document.getElementById('registration-form').reset();
        document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
    }

    function showOverallWinner() {
        let resultsList = '';
        
        userResults.forEach(result => {
            resultsList += `School: ${result.school}, Student: ${result.student}, Score: ${result.score.toFixed(2)}%<br>`;
        });
    
        winnerInfo.innerHTML = `
            <h3>All Participants Results:</h3>
            ${resultsList}
            <br>
            <h3>Overall Winner:</h3>
            School: ${highestScore.school}, Student: ${highestScore.student}, Score: ${highestScore.score.toFixed(2)}%. Congratulations!
        `;
        
        winnerModal.classList.remove('hidden');
    }

    closeWinnerModal.addEventListener('click', function () {
        winnerModal.classList.add('hidden');
        resetGame();
    });

    function resetGame() {
        // Reset all variables and game state for the next 3 users
        attempts = 0;
        highestScore = { school: '', student: '', score: 0 };
        userResults = [];
        resetQuiz(); // Reset quiz for the next round
    }
});

