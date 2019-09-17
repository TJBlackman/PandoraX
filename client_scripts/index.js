window.addEventListener('load', function(){
    console.log('PandoraX is loaded');
    if (['www.pandora.com','pandora.com'].includes(window.location.host) === false){ 
        return; 
    }
    console.log('PandoraX is running!');

    const extensionId = chrome.runtime.id;

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

    const PandoraCommands = {
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
        playbackRate: function(speed){ // 1 is normal, 1.5 is 150%
            const audioTag = getLastAudioTag(); 
            audioTag.playbackRate = speed;
        },
        thumbsup: () => {
            const btn = document.querySelector('[data-qa="thumbs_up_button"]');
            if (btn) {
                btn.click();
            }
        },
        thumbsdown: () => {
            const btn = document.querySelector('[data-qa="thumbs_down_button"]');
            if (btn) {
                btn.click();
            }
        },
        download: function(){
            let song = {
                song: 'Unknown song',
                artist: 'Unknown Artist',
                src: undefined
            };
            try {
                song = getSongData();
            }
            catch(err){
                console.log(err);
            }

            // send to bg script
            chrome.runtime.sendMessage(extensionId, {
                type: 'download this song',
                payload: song
            });
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
            const isThumbsDown = document.querySelector('[data-qa="thumbs_down_button"]').className.includes('ThumbUpButton--active');
            const volume = document.querySelector('[data-qa="volume_slider_handle"').attributes['aria-valuenow'].value;

            const audioTag = getLastAudioTag();

            return {
                station: stationName,
                songName: songName,
                artist: artistName,
                album: albumName,
                albumArt: albumArt,
                volume: volume,
                isThumbsUp: isThumbsUp,
                isThumbsDown: isThumbsDown,
                currentTime: audioTag.currentTime,
                duration: audioTag.duration,
                paused: audioTag.paused,
                src: audioTag.src
            };
        }
        catch(err){
            console.error(err);
        }
    };

    const refreshCurrentSongInfo = () => {
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
                refreshCurrentSongInfo();
            });
    
            const observer_options = { childList: false, subtree: true, attributes: true }
            observer.observe(observer_target, observer_options); 
            console.log('watching for song change');
            
            const songData = getSongData();
            chrome.runtime.sendMessage(extensionId, {
                type: 'new song',
                payload: songData
            });

        } catch(err){
            return setTimeout(attachSongChangeListener, 1000);
        }
    })();

    // listen for "Are you still listening" popup
    (function attachStillListeningListener() {
        try {
            const observer = new MutationObserver((arrayOfMutations) => {
                let btn = document.querySelector('[data-qa="keep_listening_button"]');
                if (btn) { 
                    btn.click(); 
                }
            });
        
            const observer_target = document.querySelector('.region-overlay'); 
            const observer_options = { childList: true, subtree: true }
            
            observer.observe(observer_target, observer_options);
            console.log('watching for "Are you still listening" popup')
        }
        catch(err){
            return setTimeout(attachStillListeningListener, 1000);
        } 
    })();

    // listen for audio ads
    (function attachAdListener() {
        try {
            const observer = new MutationObserver((arrayOfMutations) => {
                const isAd = checkIfIsAd();
                if (!isAd) { return; }
    
                const addedAudioElement = arrayOfMutations.some(mutation => Array.from(mutation.addedNodes).some(node => node.tagName.toLowerCase() === "audio"));
                if (!addedAudioElement){ return; }
    
                const skipAudioAd = () => {
                    PandoraCommands.skip();
                    audioTag.removeEventListener('loadedmetadata', skipAudioAd, false);
                }; 
    
                const audioTag = getLastAudioTag();
                audioTag.addEventListener('loadedmetadata', skipAudioAd, false);
            });
            
            observer.observe(document.body, { childList: true }); 
            console.log('watching for audio ads')
        } 
        catch(err){
            return setTimeout(attachAdListener, 1000);
        }
    })();
    
    // listen for video ads
    (function attachVideoAdListener() {
        const target = document.getElementById('adContainer');
        try {
            const observer = new MutationObserver((arrayOfMutations) => {
                const videoTags = target.querySelectorAll('[title="Advertisement"]'); 
                videoTags.forEach(video => {
                    const skipVideoAd = () => {
                        video.volume = 0;
                        video.currentTime = video.duration;
                        video.removeEventListener('play', skipVideoAd, false);
                    };
                    video.addEventListener('play', skipVideoAd, false);
                }); 
            });
            
            observer.observe(target, { childList: true, subtree: true }); 
            console.log('watching for video ads')
        } 
        catch(err){
            return setTimeout(attachVideoAdListener, 1000);
        }
    })();

    // extension listener
    chrome.runtime.onMessage.addListener(function(request, sender) {
        switch(request.type){
            case 'GET SONG INFO': {
                refreshCurrentSongInfo();
                break;
            };
            case 'replay': { 
                PandoraCommands.replay(); 
                refreshCurrentSongInfo();
                break; 
            }
            case 'pause': { 
                PandoraCommands.pause(); 
                refreshCurrentSongInfo();
                break; 
            }
            case 'play': { 
                PandoraCommands.play(); 
                refreshCurrentSongInfo();
                break; 
            }
            case 'next': { 
                PandoraCommands.skip(); 
                break; 
            }
            case 'thumbsup': { 
                PandoraCommands.thumbsup(); 
                refreshCurrentSongInfo(); 
                break; 
            }
            case 'thumbsdown': { 
                PandoraCommands.thumbsdown(); 
                break; 
            }
            case 'download': { 
                PandoraCommands.download(); 
                break; 
            }
            default: return null;
        }   
    });
});