// extension listener
chrome.runtime.onMessage.addListener(function(request, sender) {
  switch (request.type) {
    case 'download this song': {
      chrome.downloads.download({
        url: request.payload.src,
        filename: `${request.payload.songName} by ${request.payload.artist}.m4a`,
        saveAs: false
      });
    }
    default:
      return null;
  }
});
