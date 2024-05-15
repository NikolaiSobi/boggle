from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify

boggle_game = Boggle()
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret99"

@app.route('/')
def home():
    board = Boggle().make_board()
   
    session['board'] = board
    session['highScore'] = 0
    session['gamesPlayed'] = 0
    return render_template('board.html', board=board)


@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    boggle_Word = data.get('boggleName')
    check_word = boggle_game.check_valid_word(session['board'], boggle_Word)
    isWord = False

    if check_word == "ok":
        isWord = True

    response = {"result" : f"{boggle_Word}", "isWord": isWord}


    return jsonify(response)
