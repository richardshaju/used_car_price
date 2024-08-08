import sys
import json
import pickle
import numpy as np
import os

__locations = None
__data_columns = None
__model = None

def get_estimated_price(km, year, brand, fuel):
    try:
        loc_index = __data_columns.index(brand.lower())
    except:
        loc_index = -1
        
    x = np.zeros(len(__data_columns))
    x[0] = km
    x[1] = year
    x[19] = fuel
    if loc_index >= 0:
        x[loc_index] = 1
        
    return round(__model.predict([x])[0],0)

def get_brand():
    return __locations    

def load_saved_artifacts():
    global __data_columns
    global __locations
    global __model
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    columns_file = os.path.join(script_dir, "columns.json")
    model_file = os.path.join(script_dir, "car_prices.pickle")
    
    with open(columns_file, 'r') as f:
       __data_columns = json.load(f)['data_columns']
       __locations = __data_columns[2:-2]
        
    with open(model_file, 'rb') as f:
         __model = pickle.load(f)

def main():
    load_saved_artifacts()
    
    if len(sys.argv) != 5:
        print(json.dumps({"error": "Invalid number of arguments"}))
        return

    km = float(sys.argv[1])
    year = int(sys.argv[2])
    brand = sys.argv[3]
    fuel = int(sys.argv[4])

    result = get_estimated_price(km, year, brand, fuel)
    print(json.dumps({"prediction": result}))

if __name__ == '__main__':
    main()