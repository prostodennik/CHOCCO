const openItem = (item) => {
    const container = item.closest(".teams__item");
    const contentBlock = container.find(".teams__descripton");
    const textBlock = contentBlock.find(".teams__descriotion-block");
    const reqHeight = textBlock.height();
    const triangle = container.find(".teams__triangle");

    triangle.addClass("teams__triangle_up");
    container.addClass("active");
    contentBlock.height(reqHeight);
};

const closeEveryItem = (container) => {
    const items = container.find(".teams__descripton");
    const itemContainer = container.find(".teams__item");
    const triangleUp = container.find(".teams__triangle");

    triangleUp.removeClass("teams__triangle_up");
    itemContainer.removeClass("active");
    items.height(0);
};

$(".teams__item").click((e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".teams");
    const elemContainer = $this.closest(".teams__item");

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
});   