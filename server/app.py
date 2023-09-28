from flask import Flask, Response, make_response, request, jsonify
from mongoInterface import add

app = Flask(__name__)


# Endpoint to handle what happens when admin clicks submit button on form to add data
@app.route('/submitForm', methods=['POST'])
def submit_form():
    try:
        # Get data from user inupt form
        perpetrator = request.form['Perpetrator']
        summary = request.form['summary']
        date = request.form['date']
        location = request.form['location']
        motive = request.form['motive']
        how = request.form['how']
        # Deal with additional user inputted fields?
        additional_fields = request.form.get('additional_fields', {})
        
        input_dict = {
            "perpetrator": perpetrator,
            "summary": summary,
            "date": date,
            "location": location,
            "motive": motive,
            "how": how,
            "additional_fields": additional_fields
        }

        res = add(input_dict)

        return make_response(res, 200)

    except KeyError as e:
        return make_response({"Error": f"Missing field: {e}"}, 500)
    


if __name__ == '__main__':
    app.run()