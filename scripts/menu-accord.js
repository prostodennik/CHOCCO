const mesureWidth = item => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".slide-menu");
    const titlesBlocks = container.find(".slide-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".slide-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isTablet = (screenWidth > 480 && screenWidth < 769);
    const isMobile = screenWidth < 480;
    
    if (isTablet) {
        reqItemWidth = screenWidth - titlesWidth;
    } else if (isMobile) {
        reqItemWidth = screenWidth - titlesBlocks.width();
    } else {
        reqItemWidth =  500;
    }
    
    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight - paddingLeft
    }
};

const closeEveryItemCont = container => {
    const items = container.find(".slide-menu__item");
    const content = container.find(".slide-menu__content");

    items.removeClass("active-acco");
    content.width(0);
}

const openItemAcco = (item) => {
    const hiddenContent = item.find(".slide-menu__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".slide-menu__container");

    item.addClass("active-acco");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
}

$(".slide-menu__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".slide-menu__item");
    const itemOpenedAcco = item.hasClass("active-acco");
    const container = $this.closest(".slide-menu");

    if (itemOpenedAcco) {
        closeEveryItemCont(container)
    } else {
        closeEveryItemCont(container)
        openItemAcco(item);
    }
});

$(".slide-menu__close").on("click", e => {
    e.preventDefault();

    closeEveryItemCont($(".slide-menu"));
})