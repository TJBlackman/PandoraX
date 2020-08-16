chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'download this song': {
      const filename = `Pandora Music/${request.payload.songName} by ${request.payload.artist} on album ${request.payload.album}.m4a`;
      const strippedFileName = filename.replace(/\:/g, '');
      const downloadObject = {
        url: request.payload.src,
        filename: strippedFileName,
        saveAs: false,
      };
      console.log(downloadObject);
      chrome.downloads.download(downloadObject);
    }
    default: {
    }
  }
  sendResponse({});
  return true;
});
