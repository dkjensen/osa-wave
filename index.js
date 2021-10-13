"use strict";

var waves = document.querySelectorAll('[data-wave]');
var devicePixelRatio = window.devicePixelRatio || 1;
waves.forEach(function (wave) {
  var fillColor = wave.getAttribute('data-fill') || '#f0f';
  var clipDirection = wave.getAttribute('data-clip-direction') || 'top';
  var containerWrapper = document.createElement('div');
  containerWrapper.classList = 'containerWrapper';
  var container = document.createElement('div');
  container.classList = 'container';
  var canvas = document.createElement('canvas');
  canvas.classList = 'canvas';
  container.appendChild(canvas);
  containerWrapper.appendChild(container);
  wave.insertAdjacentElement('afterend', containerWrapper);

  var _container$getBoundin = container.getBoundingClientRect(),
      width = _container$getBoundin.width,
      height = _container$getBoundin.height;

  var context = canvas.getContext("2d");
  var time = 0;
  var repeater = clipDirection === "top" ? 0 : 1;
  var isActive = true;

  function setupCanvas() {
    canvas.style.width = "".concat(width, "px");
    canvas.style.height = "".concat(height, "px");
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    context = canvas.getContext("2d");
    context.scale(devicePixelRatio, devicePixelRatio);
  }

  function draw() {
    if (context) {
      time += 0.0015;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(width, repeater * height);
      context.lineTo(0, repeater * height);
      context.lineTo(0, height * 0.5);

      for (var i = 0; i <= width; i += 1) {
        context.lineTo(i, height * 0.5 - height * 0.5 * Math.sin((time + i / width) * 2 * Math.PI));
      }

      context.fillStyle = fillColor;
      context.fill();

      if (isActive) {
        window.requestAnimationFrame(draw);
      }
    }
  }

  setupCanvas();
  draw();
});
