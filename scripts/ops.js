const section = $(".section");
const display = $(".maincontent");

let inScroll = false;

section.first().addClass("active-scroll");

const perfomTransition = sectionEq => {

    if (inScroll == false) {
        inScroll = true;
        const position = sectionEq * -100;
        
        const currentSection = section.eq(sectionEq);
        const menuTheme = currentSection.attr("data-sidemenu-theme");
        const sideMenu = $(".fixed-menu__link");

        if (menuTheme == "black") {
            sideMenu.addClass("fixed-menu_black");
        } else {
            sideMenu.removeClass("fixed-menu_black");
        }

        display.css({
            transform: `translateY(${position}%)`
        });
    
        section.eq(sectionEq).addClass("active-scroll").siblings().removeClass("active-scroll");

        const fixedMenu = $(".fixed-menu");

        
        setTimeout(() => {
            inScroll = false;
            
            fixedMenu.find(".fixed-menu__item")
            .eq(sectionEq)
            .addClass("fixed-menu__item_active")
            .siblings()
            .removeClass("fixed-menu__item_active");
         }, 1300);
    };
}

const scrollViewport = direction => {
    const activeSection = section.filter(".active-scroll");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction == "next" && nextSection.length) {
        perfomTransition(nextSection.index())
    }

    if (direction == "prev" && prevSection.length) {
        perfomTransition(prevSection.index())
    }
}

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport("next");
    } 

    if (deltaY < 0 ) {
        scrollViewport("prev");
    }
});

$(window).on("keydown", e => {
    
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !="input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 38:
                scrollViewport("prev");
                break;
    
                case 40:
                scrollViewport("next");     
                break;
        }
    }

});

$(".wrapper").on("touchmove",e => e.preventDefault()); 

 $("[data-scroll-to]").click (e => {
     e.preventDefault();

     const $this = $(e.currentTarget);
     const target = $this.attr("data-scroll-to");
     const reqSection = $(`[data-section-id=${target}]`);

     perfomTransition(reqSection.index());

 });

// const mobileDetect = new MobileDetect(window.navigator.userAgent);
// const isMobile = mobileDetect.mobile();


    //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin 
    $("body").swipe({
         swipe: function(event,direction) {
           const scroller = viewportScroller();
           let scrollDirection = "";
   
           if (direction == "up") scrollDirection = "next";
           if (direction == "down") scrollDirection = "prev";
           
           scroller[scrollDirection](); 
         },
       });

       