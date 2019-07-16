window.addEventListener('load', function(){
    console.log('PandoraX is loaded');
    if (['www.pandora.com','pandora.com'].includes(window.location.host) === false){ 
        return; 
    }
    console.log('PandoraX is running!');

    const extensionId = chrome.runtime.id;

    // // https://www.npmjs.com/package/downloadjs | Thanks @rndme <3 
    ;(function(root,factory){typeof define=="function"&&define.amd?define([],factory):typeof exports=="object"?module.exports=factory():root.PandoraXDownload=factory()})(this,function(){return function download(data,strFileName,strMimeType){var self=window,defaultMime="application/octet-stream",mimeType=strMimeType||defaultMime,payload=data,url=!strFileName&&!strMimeType&&payload,anchor=document.createElement("a"),toString=function(a){return String(a)},myBlob=self.Blob||self.MozBlob||self.WebKitBlob||toString,fileName=strFileName||"download",blob,reader;myBlob=myBlob.call?myBlob.bind(self):Blob,String(this)==="true"&&(payload=[payload,mimeType],mimeType=payload[0],payload=payload[1]);if(url&&url.length<2048){fileName=url.split("/").pop().split("?")[0],anchor.href=url;if(anchor.href.indexOf(url)!==-1){var ajax=new XMLHttpRequest;return ajax.open("GET",url,!0),ajax.responseType="blob",ajax.onload=function(e){download(e.target.response,fileName,defaultMime)},setTimeout(function(){ajax.send()},0),ajax}}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){if(!(payload.length>2096103.424&&myBlob!==toString))return navigator.msSaveBlob?navigator.msSaveBlob(dataUrlToBlob(payload),fileName):saver(payload);payload=dataUrlToBlob(payload),mimeType=payload.type||defaultMime}else if(/([\x80-\xff])/.test(payload)){var i=0,tempUiArr=new Uint8Array(payload.length),mx=tempUiArr.length;for(i;i<mx;++i)tempUiArr[i]=payload.charCodeAt(i);payload=new myBlob([tempUiArr],{type:mimeType})}blob=payload instanceof myBlob?payload:new myBlob([payload],{type:mimeType});function dataUrlToBlob(strUrl){var parts=strUrl.split(/[:;,]/),type=parts[1],indexDecoder=strUrl.indexOf("charset")>0?3:2,decoder=parts[indexDecoder]=="base64"?atob:decodeURIComponent,binData=decoder(parts.pop()),mx=binData.length,i=0,uiArr=new Uint8Array(mx);for(i;i<mx;++i)uiArr[i]=binData.charCodeAt(i);return new myBlob([uiArr],{type:type})}function saver(url,winMode){if("download"in anchor)return anchor.href=url,anchor.setAttribute("download",fileName),anchor.className="download-js-link",anchor.innerHTML="downloading...",anchor.style.display="none",anchor.addEventListener("click",function(e){e.stopPropagation(),this.removeEventListener("click",arguments.callee)}),document.body.appendChild(anchor),setTimeout(function(){anchor.click(),document.body.removeChild(anchor),winMode===!0&&setTimeout(function(){self.URL.revokeObjectURL(anchor.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(url)&&(url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime)),window.open(url)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=url),!0;var f=document.createElement("iframe");document.body.appendChild(f),!winMode&&/^data:/.test(url)&&(url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime)),f.src=url,setTimeout(function(){document.body.removeChild(f)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(blob,fileName);if(self.URL)saver(self.URL.createObjectURL(blob),!0);else{if(typeof blob=="string"||blob.constructor===toString)try{return saver("data:"+mimeType+";base64,"+self.btoa(blob))}catch(y){return saver("data:"+mimeType+","+encodeURIComponent(blob))}reader=new FileReader,reader.onload=function(e){saver(this.result)},reader.readAsDataURL(blob)}return!0}});

    const getLastAudioTag = () => document.querySelector('body > audio:last-of-type');
    const checkIfIsAd = () => {
        try {
            const isAd = document.querySelector('.nowPlayingTopInfo').className.includes('nowPlayingTopInfo--audioAd');
            return isAd;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    const PandoraX = {
        skip: function(){
            const audioTag = getLastAudioTag();
            audioTag.currentTime = audioTag.duration;
        },
        replay: function(){
            const audioTag = getLastAudioTag(); 
            audioTag.currentTime = 0;
        },
        scrub: function(time){ // in seconds
            const audioTag = getLastAudioTag();
            let target = time;
            if (time > audioTag.duration){ target = audioTag.duration; }
            if (time < 0){ target = 0; }
            audioTag.currentTime = target;
        },
        volume: function(number){ // 0 - 1
            const audioTag = getLastAudioTag(); 
            let target = number; 
            if (number > 1){ target = 1; }
            if (number < 0){ target = 0; }
            audioTag.volume = target;
        },
        mute: function(boolean){
            const audioTag = getLastAudioTag(); 
            audioTag.muted = boolean;
        },
        play: function(){
            const audioTag = getLastAudioTag(); 
            audioTag.play();
        },
        pause: function(){
            const audioTag = getLastAudioTag(); 
            audioTag.pause();
        },
        getCurentAudio: function(){ // returns last <audio /> element
            return getLastAudioTag(); 
        },
        playbackRate: function(speed){ // 1 is normal, 1.5 is 150%
            const audioTag = getLastAudioTag(); 
            audioTag.playbackRate = speed;
        },
        download: function(){
            let song = {
                song: 'Unkown song',
                artist: 'Unkown Artist'
            };
            let audioTag; 
            try {
                audioTag = getLastAudioTag(); 
                song = getSongData();
            }
            catch(err){
                console.log(err);
            }

            if (audioTag){
                setTimeout(() => {
                    fetch(audioTag.src,{
                        method: 'GET'
                    })
                        .then(x => x.blob())
                        .then(x => window.PandoraXDownload(x, `${song.song} by ${song.artist}`))
                }, 100)
            } else {
                alert('could not get song.....')
            }
        }
    }

    const getSongData = () => {
        try {
            const isAd = checkIfIsAd();
            if (isAd) { return; }

            const nowPlayingCenterWrapper = document.querySelector('.NowPlaying__centerWrapper');
            const stationName = nowPlayingCenterWrapper.querySelector('.NowPlayingTopInfoSessionName__link').innerText;
            const songName = (nowPlayingCenterWrapper.querySelector('.Marquee__wrapper__content') || nowPlayingCenterWrapper.querySelector('.Marquee__wrapper__content__child')).innerText;
            const artistName = nowPlayingCenterWrapper.querySelector('.NowPlayingTopInfo__current__artistName').innerText;
            const albumName = nowPlayingCenterWrapper.querySelector('.nowPlayingTopInfo__current__albumName').innerText;
            const albumArt = nowPlayingCenterWrapper.querySelector('.nowPlayingTopInfo__artContainer__art').style.backgroundImage.replace(/url\("|"\)/g,'');
            const isThumbsUp = document.querySelector('[data-qa="thumbs_up_button"]').className.includes('ThumbUpButton--active');
            const songLength = document.querySelector('[data-qa="remaining_time"]').innerText;
            const volume = document.querySelector('[data-qa="volume_slider_handle"').attributes['aria-valuenow'].value;

            const audioTag = getLastAudioTag();

            return {
                station: stationName,
                song: songName,
                artist: artistName,
                album: albumName,
                albumArt: albumArt,
                songLength: songLength,
                volume: volume,
                isThumbsUp: isThumbsUp,
                currentTime: audioTag.currentTime,
                duration: audioTag.duration,
                paused: audioTag.paused
            };
        }
        catch(err){
            console.error(err);
        }
    };

    const sendSongInfo = () => {
        const songData = getSongData();
        chrome.runtime.sendMessage(extensionId, {
            type: 'new song',
            payload: songData
        });
    }

    // listen for when song changes
    (function attachSongChangeListener() {
        try {

            const observer_target = document.querySelector('.nowPlayingTopInfo__artContainer').parentElement;
            const observer = new MutationObserver((mutations) => {
                console.log('Observer: Song has changed. '+ new Date().toLocaleTimeString())
                sendSongInfo();
            });
    
            const observer_options = { childList: false, subtree: true, attributes: true }
            observer.observe(observer_target, observer_options); 
            console.log('attachSongChangeListener is running!');
            
            const songData = getSongData();
            chrome.runtime.sendMessage(extensionId, {
                type: 'new song',
                payload: songData
            });

        } catch(err){
            console.log('Retrying attachSongChangeListener in 1000ms....')
            return setTimeout(attachSongChangeListener, 1000);
        }
    })();

    // listen for "Are you still listening" popup
    (function attachStillListeningListener() {
        try {
            const observer = new MutationObserver((arrayOfMutations) => {
                console.log('Observer: Are you still listening? '+ new Date().toLocaleTimeString())
                let btn = document.querySelector('[data-qa="keep_listening_button"]');
                if (btn) { 
                    console.log('Clicking "Im still listening." '+ new Date().toLocaleTimeString())
                    btn.click(); 
                }
            });
        
            const observer_target = document.querySelector('.region-overlay'); 
            const observer_options = { childList: true, subtree: true }
            
            observer.observe(observer_target, observer_options);
            console.log('attachStillListeningListener is running!')
        }
        catch(err){
            console.log('Retrying attachStillListeningListener in 1000ms....')
            return setTimeout(attachStillListeningListener, 1000);
        } 
    })();

    // listen for audio ads
    (function attachAdListener() {
        try {
            const observer = new MutationObserver((arrayOfMutations) => {
                console.log('Observer: Checking for audio advertisement. '+ new Date().toLocaleTimeString())        
                const isAd = checkIfIsAd();
                if (!isAd) { return; }
    
                const addedAudioElement = arrayOfMutations.some(mutation => Array.from(mutation.addedNodes).some(node => node.tagName.toLowerCase() === "audio"));
                if (!addedAudioElement){ return; }
    
                const skipAd = () => {
                    PandoraX.skip();
                    console.log(`PandoraX skipped an audio advertisement! ${new Date().toLocaleTimeString()}`);
                    audioTag.removeEventListener('loadedmetadata', skipAd, false);
                }; 
    
                const audioTag = getLastAudioTag();
                audioTag.addEventListener('loadedmetadata', skipAd, false);
            });
            
            observer.observe(document.body, { childList: true }); 
            console.log('attachAdListener is running!')
        } 
        catch(err){
            console.log('Retrying attachAdListener in 1000ms....')
            return setTimeout(attachAdListener, 1000);
        }
    })();

    // extension listener
    chrome.runtime.onMessage.addListener(function(request, sender) {
        console.log(request);
        console.log(sender);
        switch(request.type){
            case 'GET SONG INFO': {
                sendSongInfo();
                break;
            };
            case 'thumbsdown': {}
            case 'replay': { PandoraX.replay(); break; }
            case 'pause': { 
                PandoraX.pause(); 
                sendSongInfo();
                break; 
            }
            case 'play': { 
                PandoraX.play(); 
                sendSongInfo();
                break; 
            }
            case 'next': { PandoraX.skip(); sendSongInfo(); break; }
            case 'thumbsup': { }
            case 'download': { PandoraX.download(); break; }
            default: return null;
        }   
    });

    this.console.log(chrome.runtime.id);
});