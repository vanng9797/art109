$(document).ready(function() {
  var obj = document.createElement("audio");
  obj.src = "paper.mp3";
  obj.volume = 0.1;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;

  $(".img1, .img2, .img5, .img6, .img7, .img8, .img9, .img10").hover(function() {
    obj.play();
    // obj.pause();
  });
});
