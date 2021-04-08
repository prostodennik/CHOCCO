// let player;

const playerContainer = document.querySelector(".video__player");
const playerStart = document.querySelector(".player__start");
const playerWrapper = document.querySelector(".player__wrapper");
const video = document.querySelector(".video");

const hadleStart = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

playerStart.addEventListener('click', hadleStart);
playerWrapper.addEventListener('click', hadleStart);

video.onplay = () => {
    playerStart.classList.add("paused");
    playerStart.classList.remove("player__start")
}
video.onpause = () => {
    playerStart.classList.remove("paused");
    playerStart.classList.add("player__start")
}




// const playerContainer = $(".player__start");
// const video = $(".video");

// let eventsInitIn = () => {
//     $(".player__start").click(e => {
//         e.preventDefault();
        
//         if (playerContainer.hasClass("paused")) {
//             playerContainer.removeClass("paused");
//             playerContainer.addClass("player__start")
//             playerPlay.removeClass("player__play-none")
//             video.play();
//         } else {
//             playerContainer.addClass("paused");
//             playerContainer.removeClass("player__start")
//             playerPlay.addClass("player__play-none")
//             video.play();
//         }
//       });
//      };

//     const playerPlay = $(".player__play") 

//      let eventsInitPlay = () => {
//          $(".player__play").click(e => {
//             e.preventDefault();

//             if (playerPlay.hasClass("player__play-none")) {
//                 playerPlay.removeClass("player__play-none");
//                 playerContainer.addClass("player__start")
//                 playerContainer.removeClass("paused");
//                 player.pauseVideo();
//             } else {
//                 playerContainer.addClass("paused");
//                 playerContainer.removeClass("player__start")
//                 playerPlay.addClass("player__play-none");
//                 player.playVideo();
//             }
//          });
//      }

//     //  let playBackLine = () => {
//          console.log("insideplayBackLine");
//          $(".player__playback-line").click(e => {
             
//              const bar = $(e.currentTarget);
//              const clckedPosition = e.originalEvent.layerX;
//              const buttonPosition = (clckedPosition / bar.width()) * 100; 
//              const videoPosition = (player.getDuration() / 100) * buttonPosition;
             
//              $(".player__playback-button").css({
//                  left: `${buttonPosition}%`
//              })
//             player.seekTo(videoPosition);
//             })
//     //  };

//      const onPlayerReady = () => {
//          let interval;
//          const durationSec = player.getDuration();

//          if (typeof interval !== "undefined") {
//              clearInterval(interval);
//          }

//          interval = setInterval(() => {
//             const completedSec = player.getCurrentTime(); 
//             const completedPercent = (completedSec / durationSec) * 100;

//             $(".player__playback-button").css({
//                 left: `${completedPercent}%`
//             });
//          }, 1000);
//      }; 

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: '360',
//     width: '660',
//     videoId: 'k_g_NM2YxZA',
//     events: {
//         'onReady': onPlayerReady,
//         // 'onStateChange': onPlayerStateChange
//       },
//       playerVars: {
//         controls: 0,
//         disablekb: 0,
//         showinfo: 0,
//         rel: 0,
//         autoplay: 0,
//         modestbranding: 0
//       }
//     });
// }

// eventsInitIn();

// eventsInitPlay();

// // playBackLine();

