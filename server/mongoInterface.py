import pymongo
import os
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import datetime
from bson.objectid import ObjectId


def init_mongo():
    """
    This method will pull the mongo key from the env file and use it to
    establish connection to the appropriate cluster, it will then return
    the clusert to be used in other methods.
    """

    # load variables in the env file into the os' env
    load_dotenv()
    uri = os.getenv("MONGO_KEY")

    # Create a new client and connect to the server
    client = MongoClient(uri)
    return client.Cluster0


def add(input_dict):
    """
    Input: a dictionary containing key value pairs of the various fields to be added 
    to the document that will be stored in the Events collection

    Output: a status and the id of the inserted document.
    """
    db = init_mongo()

    try:
        perpetrator = input_dict["perpetrator"]
        summary = input_dict["summary"]
        date = input_dict["date"]
        location = input_dict["location"]
        motive = input_dict["motive"]
        how = input_dict["how"]
        additional_fields = input_dict.get("additional_fields", {})
        date_submitted = str(datetime.datetime.now())

    except KeyError as e:
        error_message = f"Missing requried argument: {str(e)}"
        return {"error": error_message}

    event_document = {
        'perpetrator': perpetrator,
        'summary': summary,
        'date': date,
        'location': location,
        'motive': motive,
        'how': how,
        'date_submitted': date_submitted
    }

    event_document.update(additional_fields)

    new_event_id = db.Events.insert_one(event_document)

    return {
        "message": "inserted successfully",
        "new_event_id": new_event_id
    }


# def get_one():
"""
This method will search for a single document in the mongodb collection
using the passed in search parameters.

Input: search parameters

Output: formatted dicionary of the document if one was found that matches the search params
"""


def get_one_event_by_uid(uid):
    """
    This method will try to find a document to match the uid
    """
    db = init_mongo()
    query = {"_id": ObjectId(uid)}
    return list(db.events.find(query))  # consume cursor and pass back as list


# def get_all():
"""
This method will return search for all documents that fit a certain query

Input: search parameters

Ouput: formatted dicionary containing all documents that were found which match the search params
"""


# def update():
"""
This method will try to update an existing document in the collection.

Input: the id of the document to update and the parameters and new values that will
be updated.

Output: the status code of whether or not the udpate was successful
"""


def delete(uid):
    """
    This method will attempt to delete a document in the collection.

    Input: the id of the document to delete
    Output: the status code of whether or not the document was deleted or not.
    """
    db = init_mongo()
    events_collection = db.events
    deleted_count = events_collection.delete_one(
        {'_id': ObjectId(uid)}).deleted_count
    return deleted_count
