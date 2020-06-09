(function() {
    // var headlines = $("#headlines");

    var left = $("#headlines").offset().left;

    var links = $("#headlines a");

    var anima;

    for (var i = 0; i < links.length; i++) {
        links.eq(i).on("mouseover", function(e) {
            $(e.target).css({
                textDecoration: "underline",
                color: "blue"
            });
            cancelAnimationFrame(anima);
        });
        links.eq(i).on("mouseout", function(e) {
            $(e.target).css({
                textDecoration: "none",
                color: "black"
            });
            moveHeadLines();
        });
    }

    moveHeadLines();

    function moveHeadLines() {
        left--;
        if (left < -links.eq(0).outerWidth()) {
            // add the width of the first link to the new left so that the 2nd, 3rd etc. link stay in place
            left += links.eq(0).outerWidth();
            // the first link is completely off screen and should now be made the last link
            links
                .eq(0)
                .parent()
                .append(links.eq(0));
        }
        // sets the new position of the headlines
        $("#headlines").css({
            left: left + "px"
        });
        anima = requestAnimationFrame(moveHeadLines);
        // refreshes the screen after a certain action/move has been done, calls itself
    }
})();

// (function() {
//     var headlines = document.getElementById("headlines2");

//     var left = headlines.offsetLeft;

//     var links = headlines.getElementsByTagName("a");

//     var anima;

//     for (var i = 0; i < links.length; i++) {
//         links[i].addEventListener("mouseover", function(e) {
//             var hoverLink = e.target;
//             hoverLink.style.textDecoration = "underline";
//             hoverLink.style.color = "blue";
//             cancelAnimationFrame(anima);
//         });
//         links[i].addEventListener("mouseout", function(e) {
//             var afterHover = e.target;
//             afterHover.style.textDecoration = "none";
//             afterHover.style.color = "black";
//             moveHeadLines();
//         });
//     }

//     moveHeadLines();
//     // FYI: To my shame, I still have not figured out how to have the headlines ticker along infinitely.
//     function moveHeadLines() {
//         left++;
//         var linkOutside = left + links[links.length - 1];
//         if (linkOutside > document.body.offsetWidth) {
//             left += links[links.length - 1].offsetWidth;
//             headlines.parentNode.insertBefore(
//                 links[links.length - 1],
//                 links[0]
//             );
//         }
//         headlines.style.left = left + "px";
//         anima = requestAnimationFrame(moveHeadLines);
//     }
// })();
