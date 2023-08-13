import json
import pickle
import os 
import sklearn
import numpy as np
__locations  = None
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
        
    return round(__model.predict([x])[0],2)

def get_location():
    load_saved_artifacts()
    return __locations    

def load_saved_artifacts():
    print("Loading Arftifact")
    global __data_columns
    global __locations
    global __model
    with open("./artifacts/columns.json", 'r') as f:
       __data_columns =  json.load(f)['data_columns']
       __locations = __data_columns[2:-2]
        
    with open("./artifacts/car_prices.pickle", 'rb') as f:
         __model = pickle.load(f)
         
if __name__ == '__main__':
    print(load_saved_artifacts())
    print(get_location())
    print(get_estimated_price(20000,2019,"bmw",1))
    print(get_estimated_price(20000,2019,"audi",1))
    print(get_estimated_price(20000,2019,"maruti",1))
    print(get_estimated_price(20000,2019,"suz",1))
    