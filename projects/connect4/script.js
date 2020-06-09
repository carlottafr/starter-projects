(function() {
    var diagonalVictories = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 31, 37],
        [23, 28, 33, 38]
    ];

    var currentPlayer = "player1";
    var columns = $(".column");
    var allSlots = columns.children();

    columns.on("click", function(e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        // stores slots of clicked column

        // Loop through all the slots from the last row upwards and
        // find the first available slot.
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var slotsInRow = $(".row" + i);
        // define my variable to detect my slots going
        // diagonally from left to top right
        // define my variable to detect my slots going
        // diagonally from right to down left
        // console.log("slotsInRow: ", slotsInRow);

        // The sky - uh, the top row is the limit:
        if (i === -1) {
            return;
        }
        // first we will check for a column victory
        // so we need to pass slotsInCol
        var victoryHtml = "";
        if (checkForVictory(slotsInCol)) {
            currentPlayer === "player1"
                ? (victoryHtml += "<p>Player 1 wins!</p>")
                : (victoryHtml += "<p>Player 2 wins!</p>");

            $(".victory").html(victoryHtml);
            $(".victory").addClass("active");
            $(".win").addClass("live");
            // next we will check for a row victory
            // so we need to pass slotsInRow
        } else if (checkForVictory(slotsInRow)) {
            currentPlayer === "player1"
                ? (victoryHtml += "<p>Player 1 wins!</p>")
                : (victoryHtml += "<p>Player 2 wins!</p>");

            $(".victory").html(victoryHtml);
            $(".victory").addClass("active");
            $(".win").addClass("live");
        } else if (checkForDiagonalVictory(allSlots)) {
            currentPlayer === "player1"
                ? (victoryHtml += "<p>Player 1 wins!</p>")
                : (victoryHtml += "<p>Player 2 wins!</p>");

            $(".victory").html(victoryHtml);
            $(".victory").addClass("active");
            $(".win").addClass("live");
        } else {
            switchPlayer();
        }
    });

    function checkForVictory(slots) {
        // we need some logic to find victories
        // and if we do return true
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                // reset the count to 0 because it
                // found the other (or no) player
                count = 0;
            }
        }
    }

    function checkForDiagonalVictory(slots) {
        var count = 0;
        for (var i = 0; i < diagonalVictories.length; i++) {
            for (var j = 0; j < diagonalVictories[i].length; j++) {
                // set "index" to the value of a winning slot
                var index = diagonalVictories[i][j];
                if (slots.eq(index).hasClass(currentPlayer)) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
    }

    $("#again").on("click", function() {
        for (var s = 0; s < allSlots.length; s++) {
            allSlots.eq(s).hasClass("player1")
                ? allSlots.eq(s).removeClass("player1")
                : allSlots.eq(s).removeClass("player2");
        }
        $(".victory").html("");
        $(".victory").removeClass("active");
        $(".win").removeClass("live");
    });

    function switchPlayer() {
        currentPlayer === "player1"
            ? (currentPlayer = "player2")
            : (currentPlayer = "player1");
    }
})();
