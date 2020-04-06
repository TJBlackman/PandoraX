const default_obj = {
  type: null,
  payload: null
};

export const sendMessage = (obj = default_obj, callback) => {
  window.chrome.tabs.query(
    { url: ["*://www.pandora.com/*", "*://pandora.com/*"] },
    tabs => {
      if (tabs.length > 0) {
        window.chrome.tabs.sendMessage(tabs[0].id, obj, callback);
      } else {
        callback("not open");
      }
    }
  );
};
