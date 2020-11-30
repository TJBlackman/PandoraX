// listen for "Are you still listening" popup
// automatically click "yes"

export const onStillListeningObserver = () => {
  try {
    const observer = new MutationObserver(() => {
      let btn = document.querySelector('[data-qa="keep_listening_button"]');
      if (btn) {
        btn.click();
      }
    });

    const observer_target = document.querySelector('.region-overlay');
    const observer_options = { childList: true, subtree: true };

    observer.observe(observer_target, observer_options);
  } catch (err) {
    return setTimeout(onStillListeningObserver, 2000);
  }
};
