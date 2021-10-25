var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
  relativeInput: true
});

$(document).ready(function() {
    $(".layer3").animate({
        left: '250px',
        opacity: '0.5',
        height: '50%',
        width: '50%'
      },
      5000, 'swing');
  $('.layer3').fadeOut(5000);
  function loop(){
     $('.layer9')
       .animate({top:12},1000)
       .animate({top:9},1000, loop);
     $('.layer8')
       .animate({left:14},1000)
       .animate({left:10},1000, loop);
     $('.layer7')
       .animate({right:16},1000)
       .animate({right:12},1000, loop);
    }

    loop(); // call this wherever you want
});
