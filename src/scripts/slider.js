const slider = $('.shop').bxSlider({
  pager: false, 
  controls: false,
  touchEnabled: $(window).width() < 768
});

$(".arrow__left").click(e => {
  slider.goToPrevSlide();
});

$(".arrow__right").click(e => {
  slider.goToNextSlide();
});