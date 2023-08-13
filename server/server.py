from flask import Flask, request, jsonify
import util
app = Flask(__name__)

@app.route('/get_location')
def get_location():
    response = jsonify({
        'location' : util.get_location()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    km = int(request.form['km'])
    year = int(request.form['year'])
    brand = request.form['brand']
    fuel = request.form['fuel']
    
    response = jsonify({
        'estimated_price' : util.get_estimated_price(km,year,brand,fuel)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("starting")
    app.run()