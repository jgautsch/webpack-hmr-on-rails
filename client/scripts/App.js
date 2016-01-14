import $ from 'jquery';

import '../styles/App.scss';

$(document).ready(() => {
  var timer = {
    initialState: {
      time: 0,
      running: false
    },
    mount() {
      // Set some initial state
      timer.state = timer.initialState;

      // Make DOM match our state
      timer.render();

      // Setup some event handlers
      $('#timer-toggle').on('click', () => {
        if (timer.state.running) {
          timer.stop();
        } else {
          timer.start();
        }
      });
    },
    tick() {
      timer.state.time = Math.round((timer.state.time + 0.1) * 10) / 10;
      timer.render();
    },
    start() {
      timer.state.running = true;
      timer.runningTimer = setInterval(timer.tick, 100);
      timer.render();
    },
    stop() {
      timer.state.running = false;
      clearInterval(timer.runningTimer);
      timer.render();
    },
    render() {
      $('#timer-counter').text(timer.state.time);
      if (timer.state.running) {
        $('#timer-toggle').text('Stop');
      } else {
        $('#timer-toggle').text('Start');
      }
    }
  };

  timer.mount();

});
