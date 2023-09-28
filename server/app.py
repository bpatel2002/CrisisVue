from flask import Flask, Response, make_response, request, jsonify, json, dumps
from mongoInterface import get_one_event_by_uid, add, delete

app = Flask(__name__)


# Endpoint to handle what happens when admin clicks submit button on form to add data
@app.route('/submitForm', methods=['POST'])
def submit_form():
    try:
        # Get data from user inupt form
        perpetrator = request.form['perpetrator']
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


@app.route('/event/<string:id>', methods=['GET'])
def getEvent(id):
    try:
        event = get_one_event_by_uid(id)
        numOfEvents = len(event)
        return get_method_output(json.loads(dumps(event)), numOfEvents)
    
    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


@app.route('/event/<string:id>', methods=['DELETE'])
def deleteEvent(id):
    try:
        

        # Call pymongo delete function

        deleted_count = delete(id)
        if (deleted_count > 0):
            res = make_response(
                jsonify(
                    {"message": f"Comment with id: {id} successfully deleted", "id": str(
                        id)}
                ), 200
            )
        else:
            res = make_response(
                jsonify(
                    {"message": f"No comment with id: {id} found"}
                ), 404
            )

        return res

    except Exception as e:
        return make_response({"data": f"Error {e}"})


    

def get_method_output(output, count):
    '''
    This is a helper method which returns the output for the submission endpoint
    based on how many submissions were found by the client's query.
    '''
    if count > 1:
        return make_response(
            jsonify(
                {'message': f'{count} submissions were found', 'data': output}
            ), 200
        )
    elif count == 1:
        return make_response(
            jsonify(
                {'data': output}
            ), 200
        )


if __name__ == '__main__':
    app.run()
