export const isCurrentMediaAdvertisement = () => {
  try {
    const element = document.querySelector('.nowPlayingTopInfo');
    if (!element) return false;

    const isAd = element.className.includes('nowPlayingTopInfo--audioAd');
    if (isAd) return true;

    const messageFromPandora = element.querySelector('.Marquee__wrapper__content').innerText === 'Message From';
    if (messageFromPandora) return true;

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
