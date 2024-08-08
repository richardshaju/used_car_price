import json
import pickle
import numpy as np
import os
__locations  = None
__data_columns = None
__model = None


base_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(base_dir, 'artifacts', 'columns.json')



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
    load_saved_artifacts()
    return __locations    

def load_saved_artifacts():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the full paths to the files
    columns_file_path = os.path.join(base_dir, 'artifacts', 'columns.json')
    model_file_path = os.path.join(base_dir, 'artifacts', 'car_prices.pickle')
    
    print("Loading Arftifact")
    global __data_columns
    global __locations
    global __model
    with open(columns_file_path, 'r') as f:
       __data_columns =  json.load(f)['data_columns']
       __locations = __data_columns[2:-2]
        
    with open(model_file_path, 'rb') as f:
         __model = pickle.load(f)
         
if __name__ == '__main__':
    print(load_saved_artifacts())
    print(get_brand())
    print(get_estimated_price(20000,2019,"bmw",1))
    print(get_estimated_price(20000,2019,"audi",1))
    print(get_estimated_price(20000,2019,"maruti",1))
    print(get_estimated_price(20000,2019,"suz",1))
    