
document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#line1',
    actions: [{
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 130],
    }, ],
  });
})

document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#line2',
    actions: [{
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 130],
    }, ],
  });
})



var animation = lottie.loadAnimation({
  container: document.getElementById('anim1'), // Required
  path: 'anim/anim1.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "anim1", // Name for future reference. Optional.
})

var animation = lottie.loadAnimation({
  container: document.getElementById('btstext'), // Required
  path: 'anim/btstext.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "btstext", // Name for future reference. Optional.
})

var animation = lottie.loadAnimation({
  container: document.getElementById('heart'), // Required
  path: 'anim/heart.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "heart", // Name for future reference. Optional.
})

var animation = lottie.loadAnimation({
  container: document.getElementById('hansheart'), // Required
  path: 'anim/hansheart.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "hansheart", // Name for future reference. Optional.
})
