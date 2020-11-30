import { getLastAudioTag } from './audio-commands';
import { isCurrentMediaAdvertisement } from './is-current-media-ad';

export const getSongData = () => {
  try {
    const isAd = isCurrentMediaAdvertisement();
    if (isAd) {
      return;
    }

    const nowPlayingCenterWrapper = document.querySelector('.NowPlaying__centerWrapper');
    const stationName = nowPlayingCenterWrapper.querySelector('.NowPlayingTopInfoSessionName__link').innerText;
    const songName = (
      nowPlayingCenterWrapper.querySelector('.Marquee__wrapper__content') ||
      nowPlayingCenterWrapper.querySelector('.Marquee__wrapper__content__child')
    ).innerText;
    const artistName = nowPlayingCenterWrapper.querySelector('.NowPlayingTopInfo__current__artistName').innerText;
    const albumName = nowPlayingCenterWrapper.querySelector('.nowPlayingTopInfo__current__albumName').innerText;
    const albumArt = nowPlayingCenterWrapper
      .querySelector('.nowPlayingTopInfo__artContainer__art')
      .style.backgroundImage.replace(/url\("|"\)/g, '');
    const isThumbsUp = document
      .querySelector('[data-qa="thumbs_up_button"]')
      .className.includes('ThumbUpButton--active');
    const isThumbsDown = document
      .querySelector('[data-qa="thumbs_down_button"]')
      .className.includes('ThumbUpButton--active');
    const volume = document.querySelector('[data-qa="volume_slider_handle"').attributes['aria-valuenow'].value;

    const audioTag = getLastAudioTag();
    return {
      station: stationName,
      songName: songName,
      artist: artistName,
      album: albumName,
      albumArt: albumArt,
      volume: volume,
      isThumbsUp: isThumbsUp,
      isThumbsDown: isThumbsDown,
      currentTime: audioTag.currentTime,
      duration: audioTag.duration,
      paused: audioTag.paused,
      src: audioTag.src,
    };
  } catch (err) {
    console.log(err);
  }
};
