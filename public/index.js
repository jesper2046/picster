
// http://picsterv2-env.x99288ydcg.us-east-2.elasticbeanstalk.com:80/data.json
// http://127.0.0.1:80/data.json

class TopBar {
    constructor(iGrid, aList) {
        $('#imageGridBtn').click(function () {
            $('#albumList').addClass('d-none');
            $('#imageGrid').removeClass('d-none');
            iGrid.initialize();
        });
        $('#albumListBtn').click(function () {
            $('#imageGrid').addClass('d-none');
            $('#albumList').removeClass('d-none');
            aList.initialize();
        });
        $('#searchBtn').click(function (e) {
            var title = $('#searchField').val();
            $('#imageGrid').removeClass('d-none');
            $('#albumList').addClass('d-none');
            iGrid.initialize(null, title)
        });
    }
}

class ImageDetail {
    constructor() {
        $('#imageDetail').click(function () {
            $('#imageDetail').hide();
        });
    }

    initialize(imageId) {
        $.getJSON("http://picsterv2-env.x99288ydcg.us-east-2.elasticbeanstalk.com:80/data.json").then(imageList => this.render(imageList, imageId));
    }

    render(imageList, imageId) {
        var str = this.createHTML(imageList, imageId);
        $('#imageDetailContent').empty();
        $('#imageDetailContent').append(str);
        $('#imageDetail').show();
    }

    createHTML(imageList, imageId) {
        var imageListFiltered = imageList.filter(function (imageItem) {
            return imageItem.id == imageId;
        });
        var image = imageListFiltered[0];
        var index = imageList.findIndex(item => item.id === imageId);
        var str = "<img src='" + imageList[index].img + "' class='image'>" +
            "<span><button class='btn btn-light'><i class='far fa-heart'></i></button>" + imageList[index].rating + " Likes</span>";
        return str;
    }
}

class AlbumList {
    constructor(iGrid) {
        $('#albumList').click(function (e) {
            var album = e.target.getAttribute('data-id');
            $('#albumList').addClass('d-none');
            $('#imageGrid').removeClass('d-none');
            iGrid.initialize(album);
        });
    }

    initialize(album) {
        $.getJSON("http://picsterv2-env.x99288ydcg.us-east-2.elasticbeanstalk.com:80/data.json").then(imageList => this.render(imageList));
    }

    render(imageList) {
        var str = this.createHTML(imageList);
        $('#albumList').empty();
        $('#albumList').append(str);
    }

    createHTML(imageList) {
        var albums = new Map();
        var value;
        for (var counter = 0; counter < imageList.length; counter++) {
            if (albums.has(imageList[counter].album)) {
                value = albums.get(imageList[counter].album)
                value[0] = value[0] + 1;
            } else
                value = [1, imageList[counter].img];
            albums.set(imageList[counter].album, value);
        }
        var liClass = "media"; // toggle {"media", "media my-4"}
        var iter = albums[Symbol.iterator]();
        var str = '<ul class="list-unstyled"></ul>';
        for (const [key, value] of iter) {
            str += "<li data-id='" + key + "' class='" + liClass + "'>" +
                "<img data-id='" + key + "' class='mr-3' src='" + value[1] + "' width=64 height=64 alt='Generic placeholder image'>" +
                "<div data-id='" + key + "' class='media-body'>" +
                "<h5 data-id='" + key + "' class='mt-0 mb-1'>" + key + "</h5>" +
                value[0] + " images" +
                "</div>" +
                "</li>";
            if (liClass == "media")
                liClass = "media my-4";
            else
                liClass = "media";
        }
        return str;
    }
}

class ImageGrid {
    constructor(iDetail) {
        $('#imageGrid').click(function (e) {
            var dataId = e.target.getAttribute('data-id');
            iDetail.initialize(dataId);
        });
    }

    initialize(album, title){
        $.getJSON("http://picsterv2-env.x99288ydcg.us-east-2.elasticbeanstalk.com:80/data.json").then(imageList => this.render(imageList, album, title));
    }
    
    render(images, album, title) {
        var str = this.createHTML(images, album, title);
        $('#imageGrid').empty();
        $('#imageGrid').append(str);
    }

    createHTML(images, album, title){
        var imageList = images.filter(function (imageItem) {
            if (album) {
                return imageItem.album.toLowerCase() == album.toLowerCase();
            } else if (title) {
                return imageItem.title.toLowerCase().includes(title.toLowerCase());
            }
            else {
                return true;
            }
        });
        var oneThird = imageList.length / 3;
        var counter = 0;
        var str = '<div class="row">';
        var c = oneThird;
        for (var cols = 1; cols <= 3; cols++) {
            str += "<div id='col" + cols + "' class='column'>";
            for (; counter < c; counter++) {
                str += "<div class='imageContainer'>" +
                    "<img src='" + imageList[counter].img + "' class='image'>" +
                    "<div data-id='" + imageList[counter].id + "' class='overlay'>" +
                    "<div data-id='" + imageList[counter].id + "' class='text'>" + imageList[counter].title + "</div>" +
                    "</div>" +
                    "</div>";
            }
            str += "</div>";
            c += oneThird;
        }
        str += '</div>';
        return str;
    }
}

//module.exports = { TopBar, ImageGrid, AlbumList, ImageDetail }