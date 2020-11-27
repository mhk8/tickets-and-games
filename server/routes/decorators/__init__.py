from functools import wraps
from flask import session


def login_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if "user_id" in session:
            return function(*args, **kwargs)

        return {"error": "User not logged in"}, 401

    return wrap
