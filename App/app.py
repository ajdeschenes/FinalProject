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

engine = create_engine("sqlite:///imdbdata.sqlite")

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
    results = db.session.query(allMovies.Price, allMovies.Room_Id, allMovies.Room_Type, allMovies.City, allMovies.Country, allMovies.Latitude, allMovies.Longitude).all()
    movieData = []

    for result in results:
        price = result[0] 
        room_id = result[1] 
        room_type = result[2] 
        city = result[3] 
        country = result[4]
        lat = result[5]
        lon = result[6]
        selection = result[7]
        distance = result[8]


        result_data = {
            "price": price,
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

