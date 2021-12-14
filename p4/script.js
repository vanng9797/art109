
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

document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'scroll',
    player: '#line3',
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
    player: '#until',
    actions: [{
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 50],
    }, ],
  });
})




document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'cursor',
    player: '#star' ,
    actions: [
       {
         position: { x: [0, 1], y: [-1, 2] },
         type: 'seek',
         frames: [0, 179],
       },
       {
         position: { x: -1, y: -1 },
         type: 'stop',
         frames: [0],
       },
     ],
  });
})

document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'cursor',
    player: '#star0' ,
    actions: [
       {
         position: { x: [0, 1], y: [-1, 2] },
         type: 'seek',
         frames: [0, 179],
       },
       {
         position: { x: -1, y: -1 },
         type: 'stop',
         frames: [0],
       },
     ],
  });
})


document.addEventListener('DOMContentLoaded', function() {
  LottieInteractivity.create({
    mode: 'cursor',
    player: '#star00' ,
    actions: [
       {
         position: { x: [0, 1], y: [-1, 2] },
         type: 'seek',
         frames: [0, 179],
       },
       {
         position: { x: -1, y: -1 },
         type: 'stop',
         frames: [0],
       },
     ],
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

var animation = lottie.loadAnimation({
  container: document.getElementById('circle'), // Required
  path: 'anim/circle.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "circle", // Name for future reference. Optional.
})

var animation = lottie.loadAnimation({
  container: document.getElementById('cloud'), // Required
  path: 'anim/cloud.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "cloud", // Name for future reference. Optional.
})

var animation = lottie.loadAnimation({
  container: document.getElementById('btslogo'), // Required
  path: 'anim/btslogo.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "btslogo", // Name for future reference. Optional.
})

var animation = lottie.loadAnimation({
  container: document.getElementById('sun'), // Required
  path: 'anim/sun.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
  name: "sun", // Name for future reference. Optional.
})
