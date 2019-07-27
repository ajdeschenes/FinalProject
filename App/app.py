# import necessary libraries
from flask_cors import CORS
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session



conn_str = "root:helpme01@localhost/imdbData?charset=utf8"
engine = create_engine(f'mysql://{conn_str}')

Base = automap_base()

Base.prepare(engine, reflect = True)

allMovies = Base.classes.movies

session = Session(engine)


# setup Flask app --- why did we need CORS?
app = Flask(__name__)
CORS(app)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/moviedata")
def movies():
    results = db.session.query(allMovies.averageRating, allMovies.isAdult, allMovies.startYear, allMovies.runtimeMinutes, allMovies.Genre1, allMovies.Genre2, allMovies.Genre3).all()
    movieData = []

    for result in results:
        rating = result[0] 
        adult = result[1] 
        year = result[2] 
        runtime = result[3] 
        primary_genre = result[4]
        secondary_genre = result[5]
        tertiary_genre = result[6]


        result_data = {
            "rating": price,
            "room_id": room_id,
            "room_type": room_type,
            "city": city,
            "country": country,
            "lat": lat,
            "lon": lon,
            "selection": selection,
            "distance": distance
        }


@app.route("/prediction")
def predict():

    # Load Model

    # Predict result

    
    return prediction


if __name__ == "__main__":
    app.run()

