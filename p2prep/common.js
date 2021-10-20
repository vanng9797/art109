
/*
 * zutomayo.net
 * update 2021.6.24
 */
(function($) {
  function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      return true;
    } else {
      return false;
    }
  }
  function isiOS() {
    if (navigator.userAgent.match(/iPhone|iPad/)) {
      return true;
    } else {
      return false;
    }
  }


  //--------------------------------------------------
  //
  //  ModalContents　モーダル
  //
  //--------------------------------------------------
  var ModalContents = (function(){


    const arrowWidth = 40; //矢印ボタンのwidth
    const arrowGap = 20;   //矢印ボタンとポップアップコンテナの距離





    return{
        Init: function(){

          if($('.ztmy-photo-popup').length) {
            //classが存在したら実行する
            $('.ztmy-photo-popup').magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                  enabled: true,
                  arrowMarkup: '<span role="button" class="gallery-arrow gallery-arrow-%dir%"></span>'
                },
                callbacks: {
                  change: function () {
                    ModalContents.galleryArrowPosition();
                  },
                  resize: function () {
                    ModalContents.galleryArrowPosition();
                  },
                  open: function () {
                    ModalContents.galleryArrowPosition();
                  }
                }
              });
            }

        },
            //矢印の配置を調整する関数
        galleryArrowPosition:function() {
          const contWidth = $('.mfp-content').width();      // .mfp-contentのwidth取得
          const left = contWidth / 2 + arrowGap + arrowWidth - 6; //「前へ」ボタンの調整量
          const right = contWidth / 2 + arrowGap - 6;             //「次へ」ボタンの調整量
          // $('.gallery-arrow-left').css('margin-left', '-' + left + 'px');
          // $('.gallery-arrow-right').css('margin-left', right + 'px');
        }
    }

  })();





  //--------------------------------------------------
  //
  //  WindowDraggble DOMドラッグ
  //
  //--------------------------------------------------
  var WindowDraggble = (function(){

    let _mode = false;
    return{
        Init: function(url){



          //要素の取得
          var elements = document.getElementsByClassName("drag-and-drop");

          //要素内のクリックされた位置を取得するグローバル（のような）変数
          var x;
          var y;

          //マウスが要素内で押されたとき、又はタッチされたとき発火
          for(var i = 0; i < elements.length; i++) {
              elements[i].addEventListener("mousedown", mdown, false);
              elements[i].addEventListener("touchstart", mdown, false);
          }

          //マウスが押された際の関数
          function mdown(e) {
            _mode = true;
              //クラス名に .drag を追加
              this.classList.add("drag");

              //タッチデイベントとマウスのイベントの差異を吸収
              if(e.type === "mousedown") {
                  var event = e;
              } else {
                  var event = e.changedTouches[0];
              }

              //要素内の相対座標を取得
              x = event.pageX - this.offsetLeft;
              y = event.pageY - this.offsetTop;

              //ムーブイベントにコールバック
              document.body.addEventListener("mousemove", mmove, false);
              document.body.addEventListener("touchmove", mmove, false);
          }

          //マウスカーソルが動いたときに発火
          function mmove(e) {

              //ドラッグしている要素を取得
              var drag = document.getElementsByClassName("drag")[0];

              //同様にマウスとタッチの差異を吸収
              if(e.type === "mousemove") {
                  var event = e;
              } else {
                  var event = e.changedTouches[0];
              }

              //フリックしたときに画面を動かさないようにデフォルト動作を抑制
              e.preventDefault();

              //マウスが動いた場所に要素を動かす
              drag.style.top = event.pageY - y + "px";
              drag.style.left = event.pageX - x + "px";

              //マウスボタンが離されたとき、またはカーソルが外れたとき発火
              drag.addEventListener("mouseup", mup, false);
              document.body.addEventListener("mouseleave", mup, false);
              drag.addEventListener("touchend", mup, false);
              document.body.addEventListener("touchleave", mup, false);

          }

          //マウスボタンが上がったら発火
          function mup(e) {

              var drag = document.getElementsByClassName("drag")[0];

              //ムーブベントハンドラの消去
              document.body.removeEventListener("mousemove", mmove, false);
              if(drag){
                drag.removeEventListener("mouseup", mup, false);
              }
              document.body.removeEventListener("touchmove", mmove, false);
              if(drag){
                drag.removeEventListener("touchend", mup, false);
              }

              //クラス名 .drag も消す
              if(drag){
                drag.classList.remove("drag");

              }
              _mode = false;

          }


          $('.btn-close,.btn-no').on('click',function(e){
            mup();
            WindowDraggble.Close($(this).data('close'));
            e.preventDefault();
          });

          $('.btn-close-menu,.header-bar').on('click',function(e){
            mup();
            WindowDraggble.Mini($(this).data('close'));
            e.preventDefault();
          });

          $(".drag-and-drop a").on('click',function(){
            mup();
          });


          // $("#spNews").on('touchend',function(){
          //   WindowDraggble.Mini("#spNews");
          // });

        },
        Close:function(target){
          console.log(target);
          // $(target).addClass("windowclose");
          $(target).fadeOut(150);
        },
        Mini:function(target){
          console.log(target);
          // $(target).addClass("windowclose");
          $(target).toggleClass("windowmini");
        }
      }
  })();




  //--------------------------------------------------
  //
  //  TableHint 表組みスクロールヒント
  //
  //--------------------------------------------------
  var TableHint = (function(){

    return{
        Init: function(){
          $(".scroll-hint").on("touchstart click",function(){
            // $(".table-wrap").removeClass("scroll-hint");
            // console.log("as");
            TableHint.Close();
          });



        },
        Close: function(){
          $(".table-wrap").removeClass("scroll-hint");
        }
      }
  })();


	$(function(){

    TableHint.Init();
    ModalContents.Init();
    // ImageProtect.Init("/photo/");
    WindowDraggble.Init();
    TopMvFunc.Init();
    ContentsMore.Init();
    ContentsMore2.Init();
    SmoothScroll.Init();
    TopAnim.Init();
    TopicsMore.Init();
    PageTop.Init();
    HamburgerMenu.Init();

		// glitchEffect.Init();

    let spMenu = $("#spNews.windowmini");
    $(window).on("load",function(){
      gsap.to(spMenu, 0.2, {right: 0,delay: 0,ease: Power2.easeInOut});
    });




    //css transition 初回オフ
    $(window).on('load',function(){
      $('body').removeClass('preload');
    });

    $(window).on('resize',function(){
        // winResize();
    });
    // $(window).on('load scroll touchmove resize', tabFix);

	});




})(jQuery);
