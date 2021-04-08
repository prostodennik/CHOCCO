const section = $(".section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu__link");
const fixedMenu = $(".fixed-menu");
const menuItems = fixedMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

section.first().addClass("active-scroll");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error("переданно не верное значение в countSectionPosition");
        return 0;

    }

    return position
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = section.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const activeClass = "fixed-menu_black";


    if (menuTheme == "black") {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const perfomTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
        transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(section, sectionEq, "active-scroll");


    setTimeout(() => {
        inScroll = false;
        resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item_active");

    }, transitionOver + mouseInertiaOver);
}

const viewportScroller = () => {
    const activeSection = section.filter(".active-scroll");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                perfomTransition(nextSection.index())
            }
        },
        prev() {
            if (prevSection.length) {
                perfomTransition(prevSection.index())
            }
        },
    };
};

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", (e) => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInput = tagName == "input" || tagName == "textarea";
    const scroller = viewportScroller();

    if (userTypingInInput) return;
    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;

        case 40:
            scroller.next();
            break;
    }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
    e.preventDefault();
    //moal close mobile
    modalMenu.style.display = "none";
    body.style.overflow = "";

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    perfomTransition(reqSection.index());

});

if (isMobile) {
    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin 
    $("body").swipe( {
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if (direction == "up") {
                scrollDirection = "next";
                scroller[scrollDirection]();
            };
            if (direction == "down") {
                scrollDirection = "prev";
                scroller[scrollDirection]();
            };
        },
    });
}





