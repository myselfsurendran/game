from browser import document, html, alert

X_CLASS = 'x'
O_CLASS = 'o'
WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

cell_elements = document.select('[data-cell]')
board = document['board']
winning_message_element = document['message']
winning_message_text_element = document['winning-message-text']
restart_button = document['restartButton']
o_turn = False

def start_game(event=None):
    global o_turn
    o_turn = False
    for cell in cell_elements:
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.unbind('click')
        cell.bind('click', handle_click, once=True)
    set_board_hover_class()
    winning_message_element.style.display = 'none'

def handle_click(event):
    global o_turn
    cell = event.target
    current_class = O_CLASS if o_turn else X_CLASS
    place_mark(cell, current_class)
    if check_win(current_class):
        end_game(False)
    elif is_draw():
        end_game(True)
    else:
        swap_turns()
        set_board_hover_class()

def end_game(draw):
    if draw:
        winning_message_text_element.textContent = 'Draw!'
    else:
        winning_message_text_element.textContent = f"{'O' if o_turn else 'X'} Wins!"
    winning_message_element.style.display = 'flex'

def is_draw():
    return all(cell.classList.contains(X_CLASS) or cell.classList.contains(O_CLASS) for cell in cell_elements)

def place_mark(cell, current_class):
    cell.classList.add(current_class)

def swap_turns():
    global o_turn
    o_turn = not o_turn

def set_board_hover_class():
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if o_turn:
        board.classList.add(O_CLASS)
    else:
        board.classList.add(X_CLASS)

def check_win(current_class):
    return any(all(cell_elements[index].classList.contains(current_class) for index in combination) for combination in WINNING_COMBINATIONS)

restart_button.bind('click', start_game)
start_game()
