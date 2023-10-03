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
    return list(db.Events.find(query))  # consume cursor and pass back as list


def get_all(filters, event_name=None, date=None, location=None, limit=100):
    """
    This method will return search for all documents that fit a certain query
    Input: a dict known as filters
    Ouput: formatted dicionary containing all documents that were found which match the search params
    """
    db = init_mongo()

    find_params = parse_filters(filters)

    # searching for a specific event using these, otherwise the pipeline will try to match using a regex
    if event_name:
        find_params.update({'event_name': event_name})
    elif date:
        find_params.update({'date': date})
    elif date:
        find_params.update({'location': location})

    pipeline = [
        {
            '$match': find_params
        },
        {
            "$sort": {"ratio": 1}
        },
        {
            '$sort': {
                '_id': pymongo.DESCENDING
            }
        },
        {
            '$limit': limit
        }
    ]

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


def parse_filters(filters):
    if not filters:
        return {}

    # parse search and type
    search_match = re.search(r'search:(\w+)', filters)
    search_param = search_match.group(1) if search_match else None

    # Search for search param in item name and comment, while also ensuring that type is of one that is specified
    query_params = {}
    if search_param:
        query_params.update(
            {'$or': [{'item_name': {'$regex': search_param, '$options': 'i'}}]})
    return query_params



event_document = {
        'event_name': "Las Vegas Shooting",
        'perpetrator': "Stephen Paddock",
        'summary': "Stephen paddock opened fire at a crowd attending a music festival and fired more than 1000 bullets, killing 60 and injuring 413",
        'date': "10/1/2017",
        'location': "Las Vegas, NV",
        'motive': "unknown",
        'casualties': 60
    }

add(event_document)