(function() {
    var kitties = document.querySelectorAll("#kitties img");
    var dots = document.querySelectorAll("#dots .dot");
    var kittyIndex = 0;
    var timer;
    var isTransitioning = false;

    // we have to detect in our code when there's a transition happening
    // when there's a transition happening, we set isTransitioning to true
    // when there's no transition happening, we set isTransitioning to false

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", clickHandler(i));
    }

    function clickHandler(dotIndex) {
        return function() {
            if (isTransitioning === true) {
                // if there's a transition happening
                // do nothing
                if (isTransitioning || dotIndex == kittyIndex) {
                    return;
                }
                // if the clicked dot is equal to the current image's index (kittyIndex),
                // do nothing
                // return;
            }
            // only runs when the click actually happens
            clearTimeout(timer);
            moveKitties(dotIndex);
        };
    }

    function moveKitties(index) {
        kitties[kittyIndex].classList.remove("onscreen");
        isTransitioning = true;
        dots[kittyIndex].classList.remove("on");
        kitties[kittyIndex].classList.add("offscreen-left");
        console.log(isTransitioning);
        if (typeof index === "number") {
            // dot was clicked -> show the image that corresponds with the clicked dot
            kittyIndex = index;
        } else {
            // no click, carousel continues as usual
            kittyIndex++;
        }
        if (kittyIndex == kitties.length) {
            kittyIndex = 0;
        }
        kitties[kittyIndex].classList.add("onscreen");
        dots[kittyIndex].classList.add("on");
    }

    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("offscreen-left")) {
            isTransitioning = false;
            console.log(isTransitioning);
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 2000);
        }
    });

    timer = setTimeout(moveKitties, 2000);
})();

/* 3 parts of moveKitties:
    - at top of function - remove currentKitty from screen
    - middle of function - increment var that's keeping track of 
      which kitty to show onscreen, or we're resetting it back to 0
      - if user didn't click a dot - then increment the variable as usual (reset it to 0 if needed)
      - if the user did click a dot - then the next kitty we want to show onscreen is the index
        so if index = 2 (third dot), then the next kitty to get the "onscreen" class would be kitty[2]
    - at end of function - add the next kitty to the screen */
