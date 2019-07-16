
const default_obj = {
    type: null,
    payload: null
};

const sendMessage = (obj = default_obj, callback) => {
    window.chrome.tabs.query({url: ["*://www.pandora.com/*","*://pandora.com/*"]}, (tabs) => {
        window.chrome.tabs.sendMessage(tabs[0].id, obj, callback);
    });
}; 

export default sendMessage; 
