// extension listener
chrome.runtime.onMessage.addListener(function(request, sender) {
    switch(request.type){
        case 'download this song': { 
            chrome.downloads.download({
                url: request.payload.src,
                filename: `${request.payload.song} by ${request.payload.artist}.m4a`,
                saveAs: false
            }, (x, y, z) => {
                console.log(x, y, z);
            })
        }
        default: return null;
    }   
});