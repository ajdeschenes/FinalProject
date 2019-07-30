# import necessary libraries
from flask_cors import CORS
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for)
from flask_sqlalchemy import SQLAlchemy
import sys

from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

import numpy as np

import pickle



conn_str = "root:helpme01@localhost/imdbData?charset=utf8"
engine = create_engine(f'mysql://{conn_str}')

Base = automap_base()

Base.prepare(engine, reflect = True)

allMovies = Base.classes.movies

session = Session(engine)




# setup Flask app --- why did we need CORS?
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:helpme01@localhost/imdbData'
db = SQLAlchemy(app)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/moviedata")
def movies():
    results = db.session.query(allMovies.averageRating, \
            allMovies.isAdult, allMovies.startYear, \
            allMovies.runtimeMinutes, allMovies.Genre1, \
            allMovies.Genre2, allMovies.Genre3)\
            .filter_by(isAdult=0)\
            .filter_by(startYear="2008")\
            .filter_by(runtimeMinutes="93")\
            .filter_by(Genre1="3")\
            .filter_by(Genre2="8")\
            .filter_by(Genre3="9")\
            .slice(0,1000)

            # .filter_by(isAdult=request.form["adults"])
            # .filter_by(startYear=request.form["years"])
            # .filter_by(runtimeMinutes=request.form["film_length"])
            # .filter_by(Genre1=request.form["genre_1"])
            # .filter_by(Genre2=request.form["genre_2"])
            # .filter_by(Genre3=request.form["genre_3"])
            # .slice(0,1000)

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
            "a": adult,
            "b": year,
            "c": runtime,
            "d": primary_genre,
            "e": secondary_genre,
            "f": tertiary_genre,
            "g": rating
        }

        movieData.append(result_data)

    return jsonify(movieData)



@app.route("/prediction", methods=["GET", "POST"])
def predict():
    if request.method == 'POST':
        # Load Model
        print("I work!", file=sys.stdout)

        loaded_model = pickle.load(open('../../ImdbModel','rb'))

        new_film = [request.form["adults"], request.form["years"], request.form["film_length"], request.form["genre_1"], request.form["genre_2"], request.form["genre_3"]]
        print(new_film, file=sys.stdout)
        sys.stdout.flush()

        new_film = np.array(new_film)

        new_film = new_film.reshape(1,-1)
       
        # Predict result
        result = loaded_model.predict(new_film)
        print(result, file=sys.stdout)

        rating = result.tolist()

        prediction = {
            "rating": rating[0]
        }
        
    return render_template('index.html', result=prediction)


if __name__ == "__main__":
    app.run(debug=True)



