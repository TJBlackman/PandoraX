chrome.runtime.onMessage.addListener(function(request) {
  switch (request.type) {
    case "download this song": {
      chrome.downloads.download({
        url: request.payload.src,
        filename: `Pandora Music/${request.payload.songName} by ${request.payload.artist} on album ${request.payload.album}.m4a`,
        saveAs: false
      });
    }
    default:
      return null;
  }
});
