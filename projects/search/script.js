(function() {
    var input = $("input");
    var resultsElem = $(".results");

    input.on("input focus", function() {
        var val = input.val(); // store entered value
        if (val == "") {
            resultsElem.empty();
            return;
        }
        $.ajax({
            url: "http://spicedworld.herokuapp.com/",
            method: "GET",
            data: {
                q: val // make it dynamic
            },
            success: function(response) {
                console.log("response: ", response);
                if (input.val() !== val) {
                    console.log("That was a little too quick.");
                    return;
                    // compare the current value of our input field
                    // to the value that we put into the url when we
                    // made the ajax request
                    // look at XMLHttpRequests to see how to
                    // discard the unwanted results
                } else {
                    var resultsHtml = "";

                    if (response.length == 0) {
                        // no results could be found
                        resultsElem.css({
                            visibility: "visible"
                        });
                        resultsHtml += '<div id="none">No results</div>';
                    }

                    for (var j = 0; j < response.length; j++) {
                        resultsHtml +=
                            '<div class="results">' + response[j] + "</div>";
                        resultsElem.css({
                            visibility: "visible"
                        });
                    }
                    resultsElem.html(resultsHtml);
                }
            },
            error: function(error) {
                console.log("error: ", error);
            }
        });
    });

    resultsElem.on("mousedown", function(event) {
        // enters the match into the input field
        input.val($(event.target).html());
        resultsElem.css({
            // hides the results
            visibility: "hidden"
        });
    });

    resultsElem.on("mouseover", function(event) {
        $(".results div").removeClass("highlight"); // highlight/un-highlight switch with mouseover
        $(event.target).addClass("highlight");
    });

    $("body").on("mouseover", function(event) {
        event.stopPropagation();
    });

    input.on("keydown", function(event) {
        var highlight = $(".highlight").length; // only worked correctly with .length
        if (event.keyCode == 40) {
            // down arrow key
            if (highlight == 0) {
                $(".results :first-child").addClass("highlight"); // highlights first element
            } else if (highlight == 1) {
                // enables arrowing down the matches
                $(".highlight")
                    .next()
                    .addClass("highlight");
                $(".highlight")
                    .prev()
                    .removeClass("highlight");
            }
        } else if (event.keyCode == 38) {
            // up arrow key
            if (highlight == 0) {
                $(".results :last-child").addClass("highlight"); // highlights last element
            } else if (highlight == 1) {
                // enables arrowing up the matches
                $(".highlight")
                    .prev()
                    .addClass("highlight");
                $(".highlight")
                    .next()
                    .removeClass("highlight");
            }
        } else if (event.keyCode == 13) {
            input.val($(".highlight").html()); // enters the match into the input field
            resultsElem.css({
                // hides the results
                visibility: "hidden"
            });
        }
    });

    input.on("blur", function() {
        resultsElem.css({
            // hide the result when the input loses focus
            visibility: "hidden"
        });
    });
})();
