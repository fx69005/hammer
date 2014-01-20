(function($){

    var $page = $('#page');
    var $nav = $('#nav');
    var sidebar = 0;
    var $item1 = $('#item1');
    var $item2 = $('#item2');
    var $body = $('body');

  
    $item1.hammer()
        .on('click' , function(e){
            console.log('click item 1');
            window.open('../www/pdf/test.pdf', '_blank', 'location=yes');
        });

    $item2.hammer()
        .on('click' , function(e){
            console.log('click item 2');

        });       

    $page.hammer()
        .on('swiperight' , function(e){
            e.gesture.preventDefault();
            if(sidebar){
                return true;    
            }
            $page.animate({translateX: "550px"}, 200);
            sidebar = 1;
        })
        .on('swipeleft' , function(e){
            e.gesture.preventDefault();
            if(!sidebar){
                return true;
            }
            $page.animate({translateX: "0px"}, 200);
            sidebar = 0;
        })
        .on('drag' , function(e){
             console.log(e.gesture.deltaX);
            if(e.gesture.deltaX > 550 || e.gesture.deltaX <-550){
                 console.log("STOP");
                return false;
            }
            if(e.gesture.direction == 'right' && !sidebar){
                e.gesture.preventDefault();
                $page.animate({translateX: e.gesture.deltaX +"px"}, 0);
            }
            if(e.gesture.direction == 'left' && sidebar){
                e.gesture.preventDefault();
                $page.animate({translateX: (550 + e.gesture.deltaX) +"px"}, 0);
            }
        })
        .on('dragend' , function(e){
            if(e.gesture.direction == 'right' && !sidebar){
                if(e.gesture.deltaX > 275){
                      $page.animate({translateX: "550px"}, 200);
                      sidebar = 1;
                } else {
                      $page.animate({translateX: "0px"}, 200);
                }
            }
            if(e.gesture.direction == 'left' && sidebar){
                if(e.gesture.deltaX <-275){
                    $page.animate({translateX: "0px"}, 200);
                    console.log("1");
                    sidebar = 0;
                } else{
                    console.log("2");
                    $page.animate({translateX:"550px"}, 200);
                    sidebar = 1;
                }
            }
        })
    $nav.hammer()
        .on('click', function(e){
            if (!sidebar){
                $page.animate({translateX: "550px"}, 200);
                sidebar = true;
            } else {
                 $page.animate({translateX: "0px"}, 200);
                sidebar = false;
            }
        })
            
})(Zepto);