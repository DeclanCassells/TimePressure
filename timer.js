$(document).ready(function() {
  //timer.js

  var progressBar = $('#timer'),
      startBtn = $('#start'),
      stopBtn = $('#stop'),
      resetBtn = $('#reset'),
      addBtn = $('#add'),
      finalBtn = $('#final'),
      seconds = $('#seconds'),
      selected = $('#selected'),
      choices = $('#choices'),
      finalChoices = $('#finalChoices'),
      pause = false;
      width = 100;
  var START_TIME = 60;
  var timer = START_TIME;
  var FIRST = 30;
  var SECOND = 20;
  var THIRD = 10;
  var FINAL = 30;
  var MAX_TIME = 120;
  var incrementCount = 0;

  var selectedList = [];

  var MAX_SELECT = 5;

  var setProgress = function (t) {
    progressBar.css('width', (t/MAX_TIME)*100 + '%');
    seconds.text(t);
  };

  var startTimer = function () {
    pause = false;
    setProgress(timer);
    choices.show();


    var interval = setInterval(function() {
        if (timer <= 0 || pause) {
            clearInterval(interval);
        } else {

          timer -= 1;

          setProgress(timer);
        }
        console.log('time', timer);
    }, 1000);
  };

  var addTime = function () {
    var extra = 0;
    if (incrementCount === 0) {
      extra = FIRST;
    } else if (incrementCount == 1) {
      extra = SECOND;
    } else if (incrementCount == 2) {
      extra = THIRD;
    }
    timer += extra;
    incrementCount++;
    console.log('add %d', extra);
    if (incrementCount >= 3) {
      finalChoice();
    }
  };

  startBtn.click(startTimer);

  stopBtn.click(function () {
    pause = true;
  });

  resetBtn.click(function () {
    timer = START_TIME;
    incrementCount = 0;
    pause = true;
    setProgress(timer);
    choices.show();
    finalChoices.hide();
  });

  addBtn.click(addTime);

  $("#choices li").click(function () {
    var that = $(this);
    that.appendTo('#selected');
    that.removeClass();
    addTime();
  });

  var finalChoice = function () {
    console.log('final');
    timer += FINAL;
    choices.hide();
    finalChoices.empty();
    finalChoices.show();

    selected.children().each(function () {
      var that = $(this);
      that.appendTo('#finalChoices');
      that.addClass('span3');
    });

    // var interval = setInterval(function() {
    //     if (timer <= 0 || pause) {
    //         clearInterval(interval);
    //     } else {

    //       timer -= 1;

    //       setProgress(timer);
    //     }
    //     console.log('time', timer);
    // }, 1000);

  };

  finalBtn.click(finalChoice);


});