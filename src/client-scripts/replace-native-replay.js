import { replaySong } from './audio-commands';

export const replaceNativeReplayButton = () => {
  try {
    const btn1 = document.querySelector('.Tuner__Controls .Tuner__Control__Replay.Tuner__Audio__Control__Replay');
    const btn2 = btn1.cloneNode(true);
    btn1.after(btn2);
    btn1.parentNode.removeChild(btn1);
    btn2.addEventListener('click', () => {
      replaySong();
    });
  } catch (err) {
    setTimeout(replaceNativeReplayButton, 2000);
  }
};
