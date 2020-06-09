var burger = document.querySelector("#burgermenu");

var darkness = $("#darkness");

var modal = $("#welcome-modal");

var hamMen = document.querySelector("#menu");

burger.addEventListener("click", function () {
    hamMen.classList.add("on");
    darkness.css({
        visibility: "visible",
    });
});

setTimeout(modalAppears, 1000);

function modalAppears() {
    darkness.css({
        visibility: "visible",
    });
    modal.css({
        visibility: "visible",
    });
}

$("#x").on("click", function () {
    darkness.css({
        visibility: "hidden",
    });
    modal.css({
        visibility: "hidden",
    });
    hamMen.classList.remove("on");
});

darkness.on("click", function () {
    darkness.css({
        visibility: "hidden",
    });
    modal.css({
        visibility: "hidden",
    });
    hamMen.classList.remove("on");
});
