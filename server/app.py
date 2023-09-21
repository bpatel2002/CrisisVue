from flask import Flask, Response, make_response


app = Flask(__name__)


@app.route('/')
def submit_form():
    return make_response({"data": "Endpoint sucessfully hit"}, 200)

if __name__ == '__main__':
    app.run()