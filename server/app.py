from flask import Flask, Response, make_response, request, jsonify
import json
from mongoInterface import *
from bson.json_util import dumps
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

# Endpoint to handle what happens when admin clicks submit button on form to add data


@app.route('/events', methods=['POST'])
def submit_form():
    try:
        # Get data from user inupt form
        details = request.json
        event_name = details['name']
        perpetrator = details['perpetrator']
        summary = details['summary']
        date = details['date']
        location = details['location']
        motive = details['motive']
        casualties = details['casualties']
        # Deal with additional user inputted fields?
        additional_fields = details['additional_fields']

        input_dict = {
            "event_name": event_name,
            "perpetrator": perpetrator,
            "summary": summary,
            "date": date,
            "location": location,
            "motive": motive,
            "casualties": casualties,
            "additional_fields": additional_fields
        }

        res = add(input_dict)

        return make_response({"message": "succesfully added", "new_object_id": f"{res}"}, 200)

    except KeyError as e:
        return make_response({"Error": f"Missing field: {e}"}, 500)


@app.route('/events', methods=['GET'])
def searchEvents():
    filters = request.args.get('filters', None)
    date = request.args.get('date', None)
    location = request.args.get('location', None)

    try:
        results = get_all(filters=filters, date=date, location=location)
        results = list(results)
        return jsonify(json.loads(dumps(results))), 200

    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


@app.route('/events/<string:id>', methods=['GET'])
def getEvent(id):
    try:
        event = get_one_event_by_uid(id)
        numOfEvents = len(event)
        return get_method_output(json.loads(dumps(event)), numOfEvents)

    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


@app.route('/events', methods=['GET'])
def getAllEvents():
    try:
        # call pymongo code to query all events in the database
        events = get_all_example()
        numOfEvents = len(events)
        return get_method_output(json.loads(dumps(events)), numOfEvents)

    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


@app.route('/events/<string:id>', methods=['DELETE'])
def deleteEvent(id):
    try:

        # Call pymongo delete function

        deleted_count = delete(id)
        if (deleted_count > 0):
            res = make_response(
                jsonify(
                    {"message": f"Event with id: {id} successfully deleted", "id": str(
                        id)}
                ), 200
            )
        else:
            res = make_response(
                jsonify(
                    {"message": f"No event with id: {id} found"}
                ), 404
            )

        return res

    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


@app.route('/events/<string:id>', methods=['PUT'])
def updateEvent(id):

    try:
        # Call pymongo update code
        update(id)

    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


def get_method_output(output, count):
    '''
    This is a helper method which returns the output for the event endpoint
    based on how many events were found by the client's query.
    '''
    if count > 1:
        return make_response(
            jsonify(
                {'message': f'{count} events were found', 'data': output}
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
