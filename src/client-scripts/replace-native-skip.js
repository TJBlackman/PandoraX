import { skipSong } from './audio-commands';

export const replaceNativeSkipButton = () => {
  try {
    const btn1 = document.querySelector('.Tuner__Controls .Tuner__Control__Skip.Tuner__Audio__Control__Skip');
    const btn2 = btn1.cloneNode(true);
    btn1.after(btn2);
    btn1.parentNode.removeChild(btn1);
    btn2.addEventListener('click', () => {
      skipSong();
    });
  } catch (err) {
    setTimeout(replaceNativeSkipButton, 2000);
  }
};
