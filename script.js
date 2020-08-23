const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playButton = document.getElementById('play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar'); 
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenButton = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
}

function togglePlay() {
    if(video.paused) {
        video.play();
        playButton.classList.replace('fa-play', 'fa-pause');
        playButton.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}

video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //

function displayTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time % 60);

    seconds = seconds > 9 ? seconds :`0${seconds}`;

    return `${minutes}:${seconds}`;
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(event) {
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

function changeVolume(event) {
    let volume= event.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    handleVolumeIcon(volume);

    lastVolume = volume;
}

function toggleMute() {
    
    if(video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        handleVolumeIcon(video.volume);
        
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        handleVolumeIcon(video.volume);
        
    }
}

function handleVolumeIcon(volume) {
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    } else if (volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
        volumeIcon.setAttribute('title', 'Mute');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }
}

// Change Playback Speed -------------------- //
function changeSpeed(){
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }

    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

  let fullscreen = false;
  function handleFullscreen() {
      if (!fullscreen) {
          openFullscreen(player);
      } else {
          closeFullscreen(player);
      }

      fullscreen = !fullscreen;
  }


// Event listners
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenButton.addEventListener('click', handleFullscreen);
