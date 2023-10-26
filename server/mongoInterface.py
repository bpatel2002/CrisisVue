import pymongo
import os
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import datetime
from bson.objectid import ObjectId
import re


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
        event_name = input_dict["event_name"]
        perpetrator = input_dict["perpetrator"]
        summary = input_dict["summary"]
        date = input_dict["date"]
        location = input_dict["location"]
        motive = input_dict["motive"]
        casualties = input_dict["casualties"]
        additional_fields = input_dict.get("additional_fields", {})
        date_submitted = str(datetime.datetime.now())

    except KeyError as e:
        error_message = f"Missing requried argument: {str(e)}"
        return {"error": error_message}

    event_document = {
        'event_name': event_name,
        'perpetrator': perpetrator,
        'summary': summary,
        'date': date,
        'location': location,
        'motive': motive,
        'casualties': casualties,
        'date_submitted': date_submitted
    }

    event_document.update(additional_fields)

    new_event_id = db.Events.insert_one(event_document).inserted_id

    return new_event_id


def add_url(url_list, event_id):
    db = init_mongo()

    try:
        url_document = {
            'event_id': event_id,
            'url_list': url_list
        }
        url_id = db.urls.insert_one(url_document)

    except Exception as e:
        error_message = f"{str(e)}"
        return {"error": error_message}

    return url_id


def get_url(event_id):
    db = init_mongo()
    document = db.urls.find_one({"event_id": event_id})
    return document


def get_one_event_by_uid(uid):
    """
    This method will try to find a document to match the uid
    """
    db = init_mongo()
    query = {"_id": ObjectId(uid)}
    return list(db.Events.find(query))  # consume cursor and pass back as list


def get_all(filters=None, event_name=None, date=None, location=None, limit=100):
    """
    Get documents that match the filters
    """
    # Assuming init_mongo is a function that initializes a connection to your MongoDB instance and returns a database object.
    db = init_mongo()

    # Parse the filters to get the MongoDB query parameters.
    find_params = parse_filters(filters, event_name, date, location)

    # Define the pipeline for aggregation.
    pipeline = [
        {
            '$match': find_params
        },
        {
            '$sort': {
                'date': 1
            }
        },
        {
            '$limit': limit
        }
    ]

    # Run the aggregation pipeline and return the results.
    return db.Events.aggregate(pipeline)


# def update():
"""
This method will try to update an existing document in the collection.

Input: the id of the document to update and the parameters and new values that will
be updated.

Output: the status code of whether or not the udpate was successful
"""


def get_all_example():
    db = init_mongo()
    docs = db.Events.find()
    return list(docs)


def delete(uid):
    """
    This method will attempt to delete a document in the collection.

    Input: the id of the document to delete
    Output: the status code of whether or not the document was deleted or not.
    """
    db = init_mongo()
    events_collection = db.Events
    deleted_count = events_collection.delete_one(
        {'_id': ObjectId(uid)}).deleted_count

    return deleted_count


def parse_filters(filters, event_name=None, date=None, location=None):
    query_params = {}
    if filters:
        # Search for search param in item name, or any other field you want to search in
        query_params.update(
            {'$or': [{'event_name': {'$regex': filters, '$options': 'i'}}]})

    # Additional search parameters
    if event_name:
        query_params.update({'event_name': event_name})
    if date:
        query_params.update({'date': date})
    if location:
        query_params.update({'location': location})

    return query_params
