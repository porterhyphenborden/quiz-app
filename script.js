let questionNum = 0;
let score = 0;

// Loads question and answer content to page
function loadQuestion() {
  if (questionNum < STORE.length) {
    $('.nextButton').hide();
    $('.feedback').hide();
    $('.questionAnswerForm').html(`
        <form>
            <h2>${STORE[questionNum].question}</h2>
            <fieldset name="answer options">
                <label for="answer-one">
                    <input type="radio" name="answer" id="answer-one" value="${STORE[questionNum].answers[0]}" required>
                    <span>${STORE[questionNum].answers[0]}</span>
                </label>
                <label for="answer-two">
                    <input type="radio" name="answer" id="answer-two" value="${STORE[questionNum].answers[1]}" required>
                    <span>${STORE[questionNum].answers[1]}</span>
                </label>
                <label for="answer-three">
                    <input type="radio" name="answer" id="answer-three" value="${STORE[questionNum].answers[2]}" required>
                    <span>${STORE[questionNum].answers[2]}</span>
                </label>
                <label for="answer-four">
                    <input type="radio" name="answer" id="answer-four" value="${STORE[questionNum].answers[3]}" required>
                    <span>${STORE[questionNum].answers[3]}</span>
                </label>
                <button type="submit" class="submitButton">SUBMIT</button>
            </fieldset>
        </form>`);
    $('.questionTracker').html(`Question ${questionNum+1}/10`);
    $('.scoreTracker').html(`Score: ${score}`);
  }
}

// Removes initial elements and runs function to load question and answer form
function handleStart() {
  $('.startButton').on('click', function(event) {
    $('.js-initialDisplay').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.progressTracker').css('display', 'inherit');
    $('body').css({"background-image": "url('https://i.imgur.com/PGgE8GX.png')", "background-size": "450px", "background-position": "center bottom"});
    loadQuestion();
  })
}

// Increases score by one point
function incrementScore() {
  score ++;
}

// Displays feedback for correct answer
function feedbackCorrect() {
  $('.submitButton').hide();
  $('fieldset').before(`<div class="feedback correct">CORRECT!</div>`);
  incrementScore(score);
  $('.scoreTracker').text(`Score: ${score}`);
  $('input:checked').parent().addClass('correctAns');
  $('fieldset').append(`<button class="nextButton">NEXT</button>`);
}

// Displays feedback for incorrect answer
function feedbackIncorrect() {
  $('.submitButton').hide();
  $('fieldset').before(`<div class="feedback incorrect">INCORRECT!</div>`);
  $('input:checked').parent().addClass('incorrectAns');
  let correctID = STORE[questionNum].correctAnswer;
  $('#' + correctID).parent().addClass('correctAns');
  $('fieldset').append(`<button class="nextButton">NEXT</button>`);
}

// Verifies answer and determines feedback
function handleSubmit() {
  $('.questionAnswerForm').on('submit', function(event) {
      event.preventDefault();
      let selected = $('input:checked').attr('id');
      let correctAns = `${STORE[questionNum].correctAnswer}`;
      if (selected === correctAns) {
        feedbackCorrect();
      }
      else {
        feedbackIncorrect();
      }
  });
}

// Increases question number by one
function incrementQuestion() {
  questionNum ++;
}

// Displays results at end of quiz
function showResults() {
    $('body').css("background-image", "none");
    $('.progressTracker').hide();
    if (score == 10) {
        $('.questionAnswerForm').html(`
            <h2>You got a perfect score!</h2>
            <p>You are a true afficianado. Go have some tequila to celebrate!
            <img src="https://i.imgur.com/NjTvUiO.png" alt="Bottle of Tequila"></p>
            <button class="restartButton">RETAKE QUIZ</button>`);
  }
    else if (score < 10 && score >= 6) {
        $('.questionAnswerForm').html(`
            <h2>You got ${score}/10 questions correct!</h2>
            <p>You're on your way to becoming an expert. Have a margarita while you study!
            <img src="https://i.imgur.com/D4knvng.png" alt="Margarita"></p>
            <button class="restartButton">RETAKE QUIZ</button>`);
  }
  else {
        $('.questionAnswerForm').html(`
            <h2>You got ${score}/10 questions correct!</h2>
            <p>No more tequila for you! Stick to water from now on.
            <img src="https://i.imgur.com/IPqunfn.png" alt="Glass of water"></p>
            <button class="restartButton">RETAKE QUIZ</button>`);
  }
}

// Moves on to next question or results depending on questionNum
function handleNext() {
  $('.questionAnswerForm').on('click', '.nextButton', function(event) {
    incrementQuestion();
    if (questionNum < STORE.length) {
      loadQuestion();
    }
    else {
      showResults();
    }
  });
}

// Reloads quiz from beginning
function retakeQuiz() {
  $('.questionAnswerForm').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

// Callback function for document ready
function loadQuiz() {
  handleStart();
  handleSubmit();
  handleNext();
  retakeQuiz();
}

$(loadQuiz);
