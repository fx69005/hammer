(function($){

    var $page = $('#page');
    var $nav = $('#nav');
    var sidebar = 0;
    var $item1 = $('#item1');
    var $item2 = $('#item1');



    // prep some variables
      var startDate = new Date("September 24, 2013 13:00:00");
      var endDate = new Date("September 24, 2013 14:30:00");
      var title = "My nice event";
      var location = "Home";
      var notes = "Some notes about this event.";
      var success = function(message) { alert("Success: " + JSON.stringify(message)); };
      var error = function(message) { alert("Error: " + message); };

  

   


    $item1.hammer()
        .on('click' , function(e){
            console.log('click item 1');
            var ref =  window.open('pdf/test.pdf', '_blank', 'location=yes');
            ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
            ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
            ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
            ref.addEventListener('exit', function(event) { alert(event.type); });  
        });



    $item2.hammer()
        .on('click' , function(e){
             window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
        });       

    $page.hammer()
        .on('swiperight' , function(e){
            if(sidebar){
                return true;    
            }
            $page.animate({translateX: "550px"}, 200);
            sidebar = 1;
        })
        .on('swipeleft' , function(e){
            if(!sidebar){
                return true;
            }
            $page.animate({translateX: "0px"}, 200);
            sidebar = 0;
        })
        .on('drag' , function(e){
            if(e.gesture.deltaX > 550){
                 console.log("0");
                return false;
            }
            if(e.gesture.direction == 'right' && !sidebar){
                 console.log("1");
                $page.animate({translateX: e.gesture.deltaX +"px"}, 0);
            }
            if(e.gesture.direction == 'left' && sidebar){
                 console.log("2");
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