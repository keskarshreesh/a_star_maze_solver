import json
from flask import Flask
from maze import getMaze
app = Flask(__name__)

@app.route('/maze')
def getMazeService():
    maze = getMaze();
    return json.dumps({
        "maze": maze 
    })
app.run()