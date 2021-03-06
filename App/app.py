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
from sklearn.externals import joblib


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


@app.route("/moviedata", methods=["GET", "POST"])
def movies():
    results = db.session.query(allMovies.averageRating, \
            allMovies.isAdult, allMovies.startYear, \
            allMovies.runtimeMinutes, allMovies.Genre1, \
            allMovies.Genre2, allMovies.Genre3, allMovies.primaryTitle)\
            .filter_by(isAdult=0)\
            .order_by(allMovies.averageRating.desc())\
            .slice(0,10)

    movieData = []
    
    for result in results:
        rating = result[0] 
        adult = result[1] 
        year = result[2] 
        runtime = result[3] 
        primary_genre = result[4]
        secondary_genre = result[5]
        tertiary_genre = result[6]
        title = result[7]


        result_data = {
            "0 Title": title,
            "1 Adult": adult,
            "2 Year": year,
            "3 Runtime": runtime,
            "4 Genre1": primary_genre,
            "5 Genre2": secondary_genre,
            "6 Genre3": tertiary_genre,
            "7 Rating": rating
        }

        movieData.append(result_data)

    return jsonify(movieData)

@app.route("/prediction", methods=["GET", "POST"])
def predict():
    if request.method == 'POST':
        # Load Model
        print("I work!", file=sys.stdout)

        # Amelia/Amy's Model
        loaded_model = pickle.load(open('../../ImdbModel','rb'))
        
        # Marc's Model
        # loaded_model = joblib.load('../../imdbMarcModel.pkl.z')

        new_film = [request.form["adults"], request.form["years"], request.form["film_length"], \
            request.form["genre_1"], request.form["genre_2"], request.form["genre_3"]]
        print(new_film, file=sys.stdout)
        # sys.stdout.flush()

        predict_film = np.array(new_film)

        predict_film = predict_film.reshape(1,-1)
       
        # Predict result
        result = loaded_model.predict(predict_film)
        print(result, file=sys.stdout)

        rating = result.tolist()

        rounded_rating = round(rating[0],1)
        high_rating = rounded_rating + .5
        low_rating = rounded_rating -.5

        def commentary(rating):
            if rounded_rating <= 2:
                comment = "This movie is the reason people hate."
            elif rounded_rating <= 5:
                comment = "Complete waste of time."
            elif rounded_rating <= 7.5:
                comment = "Mediocre at best."
            else:
                comment = "The best thing since sliced bread."
            
            return comment


        prediction = {
            "adults_entered1": new_film[0],
            "years_entered1": new_film[1],
            "film_length_entered1": new_film[2],
            "genre1_entered1" : new_film[3], 
            "genre2_entered1" : new_film[4],
            "genre3_entered1" : new_film[5],
            "prediction1": commentary(rating[0]),
            "rating1": rounded_rating
        }

        for key, value in prediction.items():
           print(f"{key}: {value}")

        results = db.session.query(allMovies.averageRating, \
                allMovies.isAdult, allMovies.startYear, \
                allMovies.runtimeMinutes, allMovies.Genre1, \
                allMovies.Genre2, allMovies.Genre3, allMovies.primaryTitle)\
                .filter((allMovies.averageRating >= low_rating) & (allMovies.averageRating <= high_rating))\
                .filter_by(Genre1=request.form["genre_1"])\
                .order_by(allMovies.startYear.desc())\
                .slice(0,1000)

                # .filter_by(isAdult=request.form["adults"])\
                # .filter_by(runtimeMinutes=request.form["film_length"])\
                # .filter_by(startYear=request.form["years"])\
                # .filter_by(Genre2=request.form["genre_2"])\
                # .filter_by(Genre3=request.form["genre_3"])\

        movieData = []
        
        for result in results:
            rating = result[0] 
            adult = result[1] 
            year = result[2] 
            runtime = result[3] 
            primary_genre = result[4]
            secondary_genre = result[5]
            tertiary_genre = result[6]
            title = result[7]


            result_data = {
                "0 Title": title,
                "1 Adult": adult,
                "2 Year": year,
                "3 Runtime": runtime,
                "4 Genre1": primary_genre,
                "5 Genre2": secondary_genre,
                "6 Genre3": tertiary_genre,
                "7 Rating": rating
            }

            movieData.append(result_data)
        
    return render_template('prediction.html', result=prediction, filterData=movieData)


if __name__ == "__main__":
    app.run(debug=True)



