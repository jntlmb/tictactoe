def draw_board(board):
    print()
    print(f"1   {board[0]} | {board[1]} | {board[2]}")
    print("   -----------")
    print(f"2   {board[3]} | {board[4]} | {board[5]}")
    print("   -----------")
    print(f"3   {board[6]} | {board[7]} | {board[8]}")
    print()
    print("    1   2   3")
    print()


def change_player(player):
    return "o" if player == "x" else "x"


def input_move(board):
    while True:
        try:
            print()
            choice = int(input("Enter Postion: "))
            if choice in [x + 1 for x in range(9)]:
                if board[choice - 1] == ' ':
                    return choice - 1
                else:
                    print("Field already played. Try again.")
            else:
                print("Field out of range. Try again.")
        except ValueError:
            print("Non integer entered. Try again.")


def update_board(player, position, board):
    if player == "x":
        board[position] = "x"
    if player == "o":
        board[position] = "o"


def check_row(board):
    if board[0] != ' ' and board[1] != ' ' and board[2] != ' ':
        if board[0] == board[1] == board[2]:
            return True
    elif board[3] != ' ' and board[4] != ' ' and board[5] != ' ':
        if board[3] == board[4] == board[5]:
            return True
    elif board[6] != ' ' and board[7] != ' ' and board[8] != ' ':
        if board[6] == board[7] == board[8]:
            return True
    else:
        return False


def check_column(board):
    if board[0] != ' ' and board[3] != ' ' and board[6] != ' ':
        if board[0] == board[3] == board[6]:
            return True
    elif board[1] != ' ' and board[4] != ' ' and board[7] != ' ':
        if board[1] == board[4] == board[7]:
            return True
    elif board[2] != ' ' and board[5] != ' ' and board[8] != ' ':
        if board[2] == board[5] == board[8]:
            return True
    else:
        return False


def check_diagonal(board):
    if board[0] != ' ' and board[4] != ' ' and board[8] != ' ':
        if board[0] == board[4] == board[8]:
            return True
    elif board[2] != ' ' and board[4] != ' ' and board[6] != ' ':
        if board[2] == board[4] == board[6]:
            return True
    else:
        return False


def check_win(board):
    if check_row(board) or check_column(board) or check_diagonal(board):
        return True
    else:
        return False


def check_draw(board):
    counter = 0
    for field in board:
        if field != ' ':
            counter += 1
    if counter == 9:
        return True


current_player = "x"
starting_board = [' ', ' ', ' ',
                  ' ', ' ', ' ',
                  ' ', ' ', ' ']

while True:
    draw_board(starting_board)

    print(f"Turn: {current_player}")
    pos = input_move(starting_board)
    update_board(current_player, pos, starting_board)

    if check_win(starting_board):
        draw_board(starting_board)
        print(f"{current_player} won the game!")
        break
    elif check_draw(starting_board):
        draw_board(starting_board)
        print("Draw :(")
        break
    else:
        current_player = change_player(current_player)
