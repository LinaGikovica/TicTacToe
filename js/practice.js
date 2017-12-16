const Empty = " ";
const X = 'X';
const O = 'O';

const board = [
    [Empty, Empty, Empty],
    [Empty, Empty, Empty],
    [Empty, Empty, Empty]
];

const winGroups = [
    // Horizontal
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],

    // Vertical
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
    [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
    [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],

    // Diagonals
    [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
    [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
];

let currentPlayer = X;

function check_win(player) {
    for (let i = 0; i < winGroups.length; i++) {
        const group = winGroups[i];

        if (board[group[0].x][group[0].y] == player &&
            board[group[1].x][group[1].y] == player &&
            board[group[2].x][group[2].y] == player) {
            return true;
        }

    }
    return false;
}

function reset() {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            board[x][y] = Empty;
        } 
        show_board();
        currentPlayer = X;
    }
}

function play(x, y, player) {
    board[x][y] = player;
}

function is_playable(x, y) {
    return board[x][y] == Empty;
}

function next_player() {
    if (currentPlayer == X) currentPlayer = O;
    else currentPlayer = X;
}

function is_board_full() {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] == Empty) return false;
        }
    }

    return true;
}

function show_board() {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            const element = board[x][y];
            const id = "#t_" + x + y;
            $(id).text(element);
        }
    }
}

$(function () {

    show_board();

    $(".clickable").click(function (event) {
        let tile = $(this);
        let id = tile.attr("id");

        // Extracts coordinates from Id
        let clickedX = Number(id[2]);
        let clickedY = Number(id[3]);

        if (is_playable(clickedX, clickedY)) {
            play(clickedX, clickedY, currentPlayer);
            show_board();

            // check win and tie conditions
            if (check_win(X)) {
                alert("Player X has won!");
                reset();
                return;
            }
            else if (check_win(O)) {
                alert("Player O has won!");
                reset();
                return;
            }
            if (is_board_full()) {
                alert("Tie!");
                reset();
                return;
            }

            next_player();
        } else alert("Click on empty field");
    });
});
