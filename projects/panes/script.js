// console.log("sanity check: ", $);

var conDistance = $(".container").offset().left;

$(".bar").on("mousedown", function mouseDown() {
    // console.log("Someone's clicking on me!");
    $("body").on("mousemove", function(event) {
        // listen for a mouseup that stops the bar-moving
        $("body").on("mouseup", function() {
            // console.log("The mouse went up");
            $("body").off("mousemove");
        });
        var newLeft = event.clientX - $(".bar").outerWidth() - conDistance;
        // move the bar by assigning new left position
        $(".bar").css({
            left: newLeft + "px"
        });
        // cover or uncover top image with that same left value
        $(".top-image").css({
            width: newLeft + "px"
        });
        // left side limit
        if (newLeft <= 0) {
            $(".top-image").css({
                width: 0
            });
            $(".bar").css({
                left: "0px"
            });
            // right side limit
        } else if (newLeft >= $(".container").outerWidth() - 20) {
            $(".bar").css({
                left: $(".container").outerWidth() - 20 + "px"
            });
        }
        console.log("There is a mouse: ", $(event.clientX));
        // $("body").on("mouseup", function(event) {
        //     $(event.currentTarget).off("mousedown", mouseDown());
        // });
        // $(".container").off("mousedown", mouseDown());
    });
});
