var board = document.getElementById("board")
var bombs_num = document.getElementById("bombs_num")
var tab = []
var first = false
var create = false
var first_play = false
var elements_created = 0
var bomb_num = 0
var bomb_num2 = 0
var play_mode = true
for (var li = 0; li <= 49; li++) {
    tab.push([])
    for (var co = 0; co <= 49; co++) {
        var element = document.createElement("div")
        var num = Number.parseInt(Math.random() * 10)
        element.id = "board_unity"
        element.dataset.li = li
        element.dataset.co = co
        element.addEventListener("click", function () {
            play(this)
        })
        element.dataset.created = 0
        element.dataset.verifyed = 0
        tab[li].push(element)
        board.appendChild(element)
    }
}
function play_moder(element) {
    if (element.dataset.type == 0) {
        play_mode = true
        element.style.color = "red"
        element.parentNode.children[1].style.color = "black"
    } else {
        play_mode = false
        element.style.color = "blue"
        element.parentNode.children[0].style.color = "black"
    }
}
function play(element) {
    var li = Number(element.dataset.li)
    var co = Number(element.dataset.co)
    if (element.dataset.created == 0 && !create) {
        if (!first) {
            element.dataset.bomb = 0
            first = true
        } else {
            var num = Number.parseInt(Math.random() * 10)
            if (num <= 2) {
                element.dataset.bomb = 1
                //element.innerHTML = 1
                bomb_num++
                bomb_num2++
            } else {
                element.dataset.bomb = 0
            }
        }
        element.dataset.created = 1
        if (li > 0) {
            if (tab[li - 1][co].dataset.created == 0) {
                play(tab[li - 1][co])
            }
            if (co > 0) {
                if (tab[li - 1][co - 1].dataset.created == 0) {
                    play(tab[li - 1][co - 1])
                }
            }
            if (co < 49) {
                if (tab[li - 1][co + 1].dataset.created == 0) {
                    play(tab[li - 1][co + 1])
                }
            }
        }
        if (li < 49) {
            if (tab[li + 1][co].dataset.created == 0) {
                play(tab[li + 1][co])
            }
            if (co > 0) {
                if (tab[li + 1][co - 1].dataset.created == 0) {
                    play(tab[li + 1][co - 1])
                }
            }
            if (co < 49) {
                if (tab[li + 1][co + 1].dataset.created == 0) {
                    play(tab[li + 1][co + 1])
                }
            }
        }
        if (co > 0) {
            if (tab[li][co - 1].dataset.created == 0) {
                play(tab[li][co - 1])
            }
        }
        if (co < 49) {
            if (tab[li][co + 1].dataset.created == 0) {
                play(tab[li][co + 1])
            }
        }
        elements_created++
        if (elements_created == 2500) {
            create = true
            play(element)
            bombs_num.innerHTML = bomb_num
        }
    } else if (create) {
        if (play_mode) {
            var bomb_count = 0
            if (element.dataset.bomb == 0) {
                element.dataset.verifyed = 1
                if (li > 0) {
                    if (tab[li - 1][co].dataset.bomb == 1) {
                        bomb_count++
                    }
                    if (co > 0) {
                        if (tab[li - 1][co - 1].dataset.bomb == 1) {
                            bomb_count++
                        }
                    }
                    if (co < 49) {
                        if (tab[li - 1][co + 1].dataset.bomb == 1) {
                            bomb_count++
                        }
                    }
                }
                if (li < 49) {
                    if (tab[li + 1][co].dataset.bomb == 1) {
                        bomb_count++
                    }
                    if (co > 0) {
                        if (tab[li + 1][co - 1].dataset.bomb == 1) {
                            bomb_count++
                        }
                    }
                    if (co < 49) {
                        if (tab[li + 1][co + 1].dataset.bomb == 1) {
                            bomb_count++
                        }
                    }
                }
                if (co > 0) {
                    if (tab[li][co - 1].dataset.bomb == 1) {
                        bomb_count++
                    }
                }
                if (co < 49) {
                    if (tab[li][co + 1].dataset.bomb == 1) {
                        bomb_count++
                    }
                }
                element.style.backgroundColor = "white"
                element.style.boxShadow = "1px 1px 5px grey"
                if (bomb_count == 0) {
                    if (li > 0) {
                        if (tab[li - 1][co].dataset.verifyed == 0) {
                            play(tab[li - 1][co])
                        }
                        if (co > 0) {
                            if (tab[li - 1][co - 1].dataset.verifyed == 0) {
                                play(tab[li - 1][co - 1])
                            }
                        }
                        if (co < 49) {
                            if (tab[li - 1][co + 1].dataset.verifyed == 0) {
                                play(tab[li - 1][co + 1])
                            }
                        }
                    }
                    if (li < 49) {
                        if (tab[li + 1][co].dataset.verifyed == 0) {
                            play(tab[li + 1][co])
                        }
                        if (co > 0) {
                            if (tab[li + 1][co - 1].dataset.verifyed == 0) {
                                play(tab[li + 1][co - 1])
                            }
                        }
                        if (co < 49) {
                            if (tab[li + 1][co + 1].dataset.verifyed == 0) {
                                play(tab[li + 1][co + 1])
                            }
                        }
                    }
                    if (co > 0) {
                        if (tab[li][co - 1].dataset.verifyed == 0) {
                            play(tab[li][co - 1])
                        }
                    }
                    if (co < 49) {
                        if (tab[li][co + 1].dataset.verifyed == 0) {
                            play(tab[li][co + 1])
                        }
                    }
                } else {
                    element.innerHTML = bomb_count
                    if (!first_play) {
                        if (li > 0) {
                            if (tab[li - 1][co].dataset.bomb == 0) {
                                first_play = true
                                play(tab[li - 1][co])
                                first_play = false
                            } else {
                                tab[li - 1][co].style.backgroundColor = "blue"
                                bomb_num--
                                bomb_num2--
                                bombs_num.innerHTML = bomb_num
                            }
                            if (co > 0) {
                                if (tab[li - 1][co - 1].dataset.bomb == 0) {
                                    first_play = true
                                    play(tab[li - 1][co - 1])
                                    first_play = false
                                } else {
                                    tab[li - 1][co - 1].style.backgroundColor = "blue"
                                    bomb_num--
                                    bomb_num2--
                                    bombs_num.innerHTML = bomb_num
                                }
                            }
                            if (co < 49) {
                                if (tab[li - 1][co + 1].dataset.bomb == 0) {
                                    first_play = true
                                    play(tab[li - 1][co + 1])
                                    first_play = false
                                } else {
                                    tab[li - 1][co + 1].style.backgroundColor = "blue"
                                    bomb_num--
                                    bomb_num2--
                                    bombs_num.innerHTML = bomb_num
                                }
                            }
                        }
                        if (li < 49) {
                            if (tab[li + 1][co].dataset.bomb == 0) {
                                first_play = true
                                play(tab[li + 1][co])
                                first_play = false
                            } else {
                                tab[li + 1][co].style.backgroundColor = "blue"
                                bomb_num--
                                bomb_num2--
                                bombs_num.innerHTML = bomb_num
                            }
                            if (co > 0) {
                                if (tab[li + 1][co - 1].dataset.bomb == 0) {
                                    first_play = true
                                    play(tab[li + 1][co - 1])
                                    first_play = false
                                } else {
                                    tab[li + 1][co - 1].style.backgroundColor = "blue"
                                    bomb_num--
                                    bomb_num2--
                                    bombs_num.innerHTML = bomb_num
                                }
                            }
                            if (co < 49) {
                                if (tab[li + 1][co + 1].dataset.bomb == 0) {
                                    first_play = true
                                    play(tab[li + 1][co + 1])
                                    first_play = false
                                } else {
                                    tab[li + 1][co + 1].style.backgroundColor = "blue"
                                    bomb_num--
                                    bomb_num2--
                                    bombs_num.innerHTML = bomb_num
                                }
                            }
                        }
                        if (co > 0) {
                            if (tab[li][co - 1].dataset.bomb == 0) {
                                first_play = true
                                play(tab[li][co - 1])
                                first_play = false
                            } else {
                                tab[li][co - 1].style.backgroundColor = "blue"
                                bomb_num--
                                bomb_num2--
                                bombs_num.innerHTML = bomb_num
                            }
                        }
                        if (co < 49) {
                            if (tab[li][co + 1].dataset.bomb == 0) {
                                first_play = true
                                play(tab[li][co + 1])
                                first_play = false
                            } else {
                                tab[li][co + 1].style.backgroundColor = "blue"
                                bomb_num--
                                bomb_num2--
                                bombs_num.innerHTML = bomb_num
                            }
                        }
                        first_play = true
                    }
                }
            } else if (element.style.backgroundColor != "blue") {
                element.style.backgroundColor = "red"
                alert("sadfasdfasd")
            }
        } else {
            if (element.style.backgroundColor == "") {
                element.style.backgroundColor = "blue"
                if (element.dataset.bomb == 1) {
                    bomb_num2--
                }
                bomb_num--
                bombs_num.innerHTML = bomb_num
            } else if (element.style.backgroundColor == "blue") {
                element.style.backgroundColor = ""
                if (element.dataset.bomb == 1) {
                    bomb_num2++
                }
                bomb_num++
                bombs_num.innerHTML = bomb_num
            }
            if (bomb_num2 == 0) {
                alert("ganhaste")
            }
        }
    }
}