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



conn_str = "root:<password>@localhost/imdbData?charset=utf8"
engine = create_engine(f'mysql://{conn_str}')

Base = automap_base()

Base.prepare(engine, reflect = True)

allMovies = Base.classes.movies

session = Session(engine)




# setup Flask app --- why did we need CORS?
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:<password>@localhost/imdbData'
db = SQLAlchemy(app)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route('/test', methods=['POST'])
def my_form_post():
    text = request.form['text']
    processed_text = text.upper()
    return processed_text


@app.route("/moviedata")
def movies():
    results = db.session.query(allMovies.averageRating, allMovies.isAdult, allMovies.startYear, allMovies.runtimeMinutes, allMovies.Genre1, allMovies.Genre2, allMovies.Genre3).slice(1,11)
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
            "adult": adult,
            "year": year,
            "runtime": runtime,
            "primary_genre": primary_genre,
            "secondary_genre": secondary_genre,
            "tertiary_genre": tertiary_genre,
            "rating": rating
        }

        movieData.append(result_data)

    return jsonify(movieData)



@app.route("/prediction", methods=["GET", "POST"])
def predict():

    # Load Model
    loaded_model = pickle.load(open(filename, '../imdbData'))

    new_film = [request.form["adults"], request.form["years"], request.form["film_length"], request.form["genre_1"], request.form["genre_2"], request.form["genre_3"]]

    # Predict result
    result = loaded_model.predict(new_film)
    print(result)
    
    return render_template("index.html", result=result)


if __name__ == "__main__":
    app.run(debug=True)



