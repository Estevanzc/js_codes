var game_board = document.getElementById("game_board")
var tab = []
var move_direction = 0
var snake_size = false
var food_location = false
var snake = [
    { li: 10, co: 5 },
    { li: 9, co: 5 },
    { li: 8, co: 5 },
]
for (var li = 0; li <= 49; li++) {
    tab.push([])
    for (var co = 0; co <= 49; co++) {
        var element = document.createElement("div")
        element.classList.add("board_unity")
        element.dataset.snake = 0
        element.dataset.food = 0
        tab[li].push(element)
        game_board.appendChild(element)
    }
}
function playing() {
    switch (event.key) {
        case "ArrowDown":
            if (move_direction != 2) {
                move_direction = 0
            }
            break;
        case "ArrowRight":
            if (move_direction != 3) {
                move_direction = 1
            }
            break;
        case "ArrowUp":
            if (move_direction != 0) {
                move_direction = 2
            }
            break;
        case "ArrowLeft":
            if (move_direction != 1) {
                move_direction = 3
            }
            break;
        case "s":
            if (move_direction != 2) {
                move_direction = 0
            }
            break;
        case "d":
            if (move_direction != 3) {
                move_direction = 1
            }
            break;
        case "w":
            if (move_direction != 0) {
                move_direction = 2
            }
            break;
        case "a":
            if (move_direction != 1) {
                move_direction = 3
            }
            break;
    }
}
function board_cleaner() {
    for (var li in tab) {
        for (var co in tab[li]) {
            tab[li][co].dataset.snake = 0
            tab[li][co].dataset.food = 0
            tab[li][co].style.backgroundColor = ""
        }
    }
}
function food_maker() {
    var li = Number.parseInt(Math.random() * 50)
    var co = Number.parseInt(Math.random() * 50)
    while (tab[li][co].dataset.snake == 1 || (snake_size && li == snake_size.li && co == snake_size.co)) {
        li = Number.parseInt(Math.random() * 50)
        co = Number.parseInt(Math.random() * 50)
    }
    food_location = { li: li, co: co }
}
food_maker()
var snake_moving = setInterval(() => {
    var li = snake[0].li
    var co = snake[0].co
    if (snake_size) {
        snake.push({ li: snake_size.li, co: snake.co })
        snake_size = false
    }
    switch (move_direction) {
        case 0:
            li < 49 ? li++ : li = 0
            break
        case 1:
            co < 49 ? co++ : co = 0
            break
        case 2:
            li > 0 ? li-- : li = 49
            break
        case 3:
            co > 0 ? co-- : co = 49
            break
    }
    if (tab[li][co].dataset.snake == 1) {
        clearInterval(snake_moving)
    }
    if (tab[li][co].dataset.food == 1) {
        snake_size = { li: li, co: co }
        food_maker()
    }
    snake.pop()
    snake.unshift({ li: li, co: co })
    board_cleaner()
    snake_mover()
}, 200);
function snake_mover() {
    var a = 0
    var b = 0
    var number_division = 510 / Number(snake.length - 1)
    for (var i in snake) {
        var li = snake[i].li
        var co = snake[i].co
        tab[li][co].dataset.snake = 1
        if (b < 255) {
            b += number_division
        } else {
            a += number_division
        }
        tab[li][co].style.backgroundColor = `rgb(${a}, ${b}, 255)`
    }
    if (food_location) {
        tab[food_location.li][food_location.co].dataset.food = 1
        tab[food_location.li][food_location.co].style.backgroundColor = "blue"
    }
}