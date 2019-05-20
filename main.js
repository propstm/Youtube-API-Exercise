function processData(response){
    //console.log(response);
    var navigationElement = document.getElementById('results');

    navigationElement.innerHTML = "";

    for (var i in response.items){
        console.log(response.items[i]);
        console.log('video id:' + response.items[i].id.videoId);
        var item = response.items[i]
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var thumbnailUrl = item.snippet.thumbnails.medium.url;
        

        navigationElement.insertAdjacentHTML('beforeEnd', `<div class="entry" onclick="loadVideo('${videoId}')"><img src="${thumbnailUrl}" alt="${title}" /><p class="navTitle">${title}</p></div>`);
    }

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
        document.getElementById('views').innerHTML = "View Count: " + views + "<br/>Like Count: " + likes + "<br/>Dislike Count: " + dislikes;
    }
}

function fetchVideosForQuery(q){
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${q}&key=${apiKey}`)
    .then((res) => res.json())
    .then(processData)
    .catch(renderError);
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

// Load default content    
loadVideo('XGwa3FQtSD0');
fetchVideosForQuery('Animals As Leaders');
