// background extension script

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'download this song': {
      console.log(`New download: ${Date.now()}`);
      const filename = `Pandora Music/${request.payload.songName} by ${request.payload.artist} on album ${request.payload.album}.m4a`;
      const strippedFileName = filename.replace(/\:/g, '');
      const downloadObject = {
        url: request.payload.src,
        filename: strippedFileName,
        saveAs: false,
      };
      chrome.downloads.download(downloadObject);
      console.log('would be download... 2');
      break;
    }
    default: {
      // console.warn(`Unknown request.type: "${request.type}"`);
    }
  }
  sendResponse({ success: true });
});
