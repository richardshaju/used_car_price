from flask import Flask, request, jsonify,make_response
import util
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  


@app.route('/get_brand')
def get_brand():
    response = jsonify({
        'brand' : util.get_brand()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_car_price', methods=['POST'])
def predict_car_price():
    data = request.get_json()
    
    km = int(data.get('km'))
    year = int(data.get('year'))
    brand = data.get('brand')
    fuel = data.get('fuel')
    
    print(km)
    print(brand)
    response = jsonify({
        'estimated_price' : util.get_estimated_price(km,year,brand,fuel)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



if __name__ == "__main__":
    print("starting")
    app.run()