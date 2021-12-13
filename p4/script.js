document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#line1',
    actions: [{
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 150],
    }, ],
  });
})
