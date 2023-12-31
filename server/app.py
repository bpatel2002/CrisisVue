from flask import Flask, Response, make_response, request, jsonify
import json
from mongoInterface import *
from bson.json_util import dumps
from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth

app = Flask(__name__)


CORS(app)
cred = credentials.Certificate("./mass-shooting-digital-library-firebase-adminsdk-1ckjm-814244dce9.json")
firebase_admin.initialize_app(cred)



# Endpoint to handle what happens when admin clicks submit button on form to add data


@app.route('/events', methods=['POST'])
def submit_form():
    try:

        token = request.headers.get("Authorization").split(' ')[1]
        user = auth.verify_id_token(token)
        # Get data from user inupt form
        if user is None:
            return make_response({"error": "Invalid token"}, 401)
        details = request.json
        place = details['place']
        event_name = details['name']
        perpetrator = details['perpetrator']
        summary = details['summary']
        date = details['date']
        location = details['location']
        motive = details['motive']
        casualties = details['casualties']
        # Deal with additional user inputted fields?
        additional_fields = details['additional_fields']
        urls = details['urls']

        input_dict = {
            "place": place,
            "event_name": event_name,
            "perpetrator": perpetrator,
            "summary": summary,
            "date": date,
            "location": location,
            "motive": motive,
            "casualties": casualties,
            "additional_fields": additional_fields
        }

        list_urls = urls.split(",")

        event_id = str(add(input_dict))
        try:
            add_url(list_urls, event_id)
        except Exception as e:
            return make_response({"Error": f"Error inserting urls: {e}"}, 400)

        return make_response({"message": "succesfully added", "new_object_id": f"{event_id}"}, 200)

    except KeyError as e:
        return make_response({"Error": f"Missing field: {e}"}, 500)


@app.route('/urls/<string:id>', methods=['GET'])
def get_urls(id):
    """"
    This method will take a id from the url parameters and search for the documents in the urls collection which match with that id
    """
    try:
        document = get_url_document(id)
        return jsonify(json.loads(dumps(document))), 200
    except Exception as e:
        return make_response({"data": f"Error {e}"}, 500)


@app.route('/events', methods=['GET'])
def searchEvents():
    filters = request.args.get('filters', None)
    date = request.args.get('date', None)
    location = request.args.get('location', None)
    sort = request.args.get('sort', None) 
    sort = int(sort) if sort else 1

    try:
        results = get_all(filters=filters, date=date, location=location, sort=sort)
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


@app.route('/login', methods=['POST'])
def authentication():
    try:
        loginData = request.json
        inUsername = loginData['username']
        inPassword = loginData['password']

        redirData = {
            "authenticated": False,
            "redirectURL": "http://localhost:3000/submit",
        }

        if inUsername == "admin" and inPassword == "12345":
            redirData["authenticated"] = True
            return make_response(
                jsonify(redirData),
                200
            )
        else:
            redirData["redirectURL"] = "NULL"
            return make_response(
                jsonify(redirData),
                200
            )

    except KeyError as e:
        return make_response({"Error": f"Missing field: {e}"}, 500)


if __name__ == '__main__':
    app.run()
