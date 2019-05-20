function processData(response){
    //console.log(response);
    var rootElement = document.getElementById('root');

    rootElement.innerHTML = "";
    root.insertAdjacentHTML('beforeEnd', `<ul>`);


    for (var i in response.items){
        //console.log(response.items[i]);
        console.log('video id:' + response.items[i].id.videoId);
        var item = response.items[i]
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var thumbnailUrl = item.snippet.thumbnails.default.url;
        

        root.insertAdjacentHTML('beforeEnd', `<li onclick="loadVideo('${videoId}')"><img src="${thumbnailUrl}" alt="${title}" />${title}</li>`);
    }

    root.insertAdjacentHTML('beforeEnd', `</ul>`);
}

function processDetailData(response){
    for (var i in response.items){
        var item = response.items[i];
        var title = item.snippet.title;
        var description = item.snippet.description;
        var likes = item.statistics.likeCount;
        var dislikes = item.statistics.dislikeCount;
        var views = item.statistics.viewCount;
        
        console.log('likes:' + likes);
        console.log('dislikes:' + dislikes);
        console.log('views:' + views);

        document.getElementById('videoTitle').innerHTML = title;
        document.getElementById('videoDescription').innerHTML = description;
        document.getElementById('views').innerHTML = views;
        document.getElementById('likes').innerHTML = likes;
        document.getElementById('dislikes').innerHTML = dislikes;
    }
}

function loadVideo(id){
    console.log('load video fired');
    var videoFrame = document.getElementById('videoFrame');
    videoFrame.src = `https://www.youtube.com/embed/${id}`;
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${apiKey}`)
    .then((res) => res.json())
    .then(processDetailData)
    .catch(renderError);
}

const renderError = (err = 'Error processing request') => document
    .getElementById('root').innerHTML = `<div>${err}</div>`;

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=animals%20as%20leaders&key=${apiKey}`)
    .then((res) => res.json())
    .then(processData)
    .catch(renderError);