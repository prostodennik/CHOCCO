const slider = $('.shop').bxSlider({
  pager: false, 
  controls: false,
});

$(".arrow__left").click(e => {
  slider.goToPrevSlide();
});

$(".arrow__right").click(e => {
  slider.goToNextSlide();
});