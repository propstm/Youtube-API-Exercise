function processData(response){
    //console.log(response);
    var rootElement = document.getElementById('root');

    rootElement.innerHTML = "";
    root.insertAdjacentHTML('beforeEnd', `<ul>`);


    for (var i in response.items){
        var title = response.items[i].snippet.title;
        var thumbnailUrl = response.items[i].snippet.thumbnails.default.url;

        root.insertAdjacentHTML('beforeEnd', `<li>Title: ${title} | Thumbnail URL: ${thumbnailUrl}</li>`);
    }

    root.insertAdjacentHTML('beforeEnd', `</ul>`);
}

const renderError = (err = 'Error processing request') => document
    .getElementById('root').innerHTML = `<div>${err}</div>`;

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=animals%20as%20leaders&key=${apiKey}`)
    .then((res) => res.json())
    .then(processData)
    .catch(renderError);