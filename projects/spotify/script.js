Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

//////////////////////////////////////////////////
/////////////////^ SETUP CODE ^//////////////////
////////////////////////////////////////////////

var nextUrl;

$("#submit-btn").on("click", function submitInput() {
    var userInput = $("input[name=user-input]").val();
    // targets the input field in a more concrete way
    var dropdownSelectVal = $("select").val();
    // stores the selected option
    var baseUrl = "https://elegant-croissant.glitch.me/spotify";
    // link the proxy API we make our request to

    $.ajax({
        url: baseUrl,
        method: "GET",
        // we need to send certain data in our request
        data: {
            // this is what Spotify requires in their API
            query: userInput,
            type: dropdownSelectVal
        },
        success: function(response) {
            response = response.artists || response.albums;
            // set response to either object properties depending
            // on the select option

            if (response.items.length == 0) {
                $("#announce").html(
                    '<div id="announce">No results found for "' +
                        userInput +
                        '"</div>'
                );
                $("#results-container").empty();
            } else {
                $("#announce").html(
                    '<div id="announce">Results for "' + userInput + '"</div>'
                );
            }
            // myHtml = Handlebars.templates.results(getResults(response.items));
            $("#results-container").html(getResults(response.items));
            setNextUrl(response);
            infiniteScroll();
        }
    });
});

$("input, select").on("keydown", function(event) {
    if (event.keyCode === 13) {
        $("#submit-btn").trigger("click");
    }
});

function setNextUrl(newResp) {
    nextUrl =
        newResp.next &&
        newResp.next.replace(
            "api.spotify.com/v1/search",
            "elegant-croissant.glitch.me/spotify"
        );
    return nextUrl;
}

function getResults(items) {
    var myHtml;
    var imgUrl = "default.png";
    var musicObj = { results: [] };
    for (var i = 0; i < items.length; i++) {
        if (items[i].images[0]) {
            imgUrl = items[i].images[1].url;
        }
        var result = {
            name: items[i].name,
            resultImgUrl: imgUrl,
            resultExtUrl: items[i].external_urls.spotify
        };
        musicObj.results.push(result);
        // console.log("myHtml: ", myHtml);
        myHtml = Handlebars.templates.results(musicObj);
    }
    return myHtml;
    // console.log("Music Object: ", musicObj);
    // $("#results-container").html(myHtml);
}

function getMoreResults(nextUrl) {
    $.ajax({
        url: nextUrl,
        method: "GET",
        success: function(response) {
            response = response.artists || response.albums;
            $("#results-container").append(getResults(response.items));
            setNextUrl(response);
            infiniteScroll();
        }
    });
}

function infiniteScroll() {
    var endOfPage = $(document).scrollTop() + $(window).height();
    if (location.search == "?scroll=infinite") {
        if ($(document).height() - 200 <= endOfPage) {
            getMoreResults(nextUrl);
        } else {
            setTimeout(infiniteScroll, 500);
        }
    }
}
