import React, { useState, useEffect } from "react";
import "./Home.css";
function Home() {
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenYear, setIsOpenYear] = useState(false);
  const [isOpenFuel, setIsOpenFuel] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [data, setData] = useState("");

  const [brand, setBrand] = useState("Audi");
  const [year, setYear] = useState(2022);
  const [km, setKm] = useState(20000);
  const [fuel, setFuel] = useState(1);

  const [result, setresult] = useState(0);
  const years = [];
  for (var i = 2013; i < 2023; i++) {
    years.push(i);
  }
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue >= 5000 && newValue <= 100000) {
      setKm(newValue);
      setIsValid(true);
    } else {
      setKm(newValue);
      setIsValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://ec2-16-16-209-112.eu-north-1.compute.amazonaws.com/predict_car_price", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        km: km,
        year: year,
        brand: brand,
        fuel: fuel,
      }),
      headers: {
        "Content-type": "application/json; ",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const options = { style: "currency", currency: "INR" };
        setresult(data.estimated_price.toLocaleString("en-IN", options));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch("http://ec2-16-16-209-112.eu-north-1.compute.amazonaws.com/get_brand")
      .then((response) => response.json())
      .then((data) => setData(data.brand))
      .catch((error) => console.error("error:" + error));
  }, []);

  return (
    <div className="home">
      <div className="background"></div>
      <div className="parent">
        <div className="box">
          <h1>USED CAR PRICE ESTIMATOR</h1>
          <div className="text">
            <h4>
              A used car price estimator is a valuable tool that assists
              individuals in determining the approximate value of pre-owned
              vehicles. By analyzing various factors such as the car's make,
              model, year, mileage, condition, and market trends, the estimator
              provides users with an educated estimate of what the vehicle could
              be worth in the current market.
            </h4>
          </div>
          <form action="" onSubmit={handleSubmit} method="POST">
            <div className="wrapper">
              <div className="row_1">
                <p>BRAND</p>
                <div className="custom-select">
                  <input
                    type="text"
                    value={brand.toUpperCase()}
                    readOnly
                    onClick={() => setIsOpenBrand(!isOpenBrand)}
                  />
                  {isOpenBrand && (
                    <div className="option">
                      {data.map((item) => (
                        <p
                          onClick={() => {
                            setBrand(item);
                            setIsOpenBrand(!isOpenBrand);
                          }}
                        >
                          {item.toUpperCase()}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <p>DRIVEN KILOMETER</p>
                <div className="custom-select">
                  <input
                    className="kilometer"
                    type="text"
                    value={km}
                    onChange={handleInputChange}
                  />
                  {!isValid && (
                    <p style={{ color: "red" }}>
                      Should be between 5000 & 100000
                    </p>
                  )}
                </div>
              </div>

              <div className="row_2">
                <p>MANUFACTURE YEAR</p>
                <div className="custom-select">
                  <input
                    type="text"
                    value={year}
                    readOnly
                    onClick={() => setIsOpenYear(!isOpenYear)}
                  />
                  {isOpenYear && (
                    <div className="option">
                      {years.map((item) => (
                        <p
                          onClick={() => {
                            setYear(item);
                            setIsOpenYear(!isOpenYear);
                          }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <p>FUEL TYPE</p>
                <div className="custom-select">
                  <input
                    type="text"
                    value={fuel == 0 ? "DIESEL" : "PETROL"}
                    readOnly
                    onClick={() => setIsOpenFuel(!isOpenFuel)}
                  />
                  {isOpenFuel && (
                    <div className="option">
                      <p
                        onClick={() => {
                          setFuel(1);
                          setIsOpenFuel(!isOpenFuel);
                        }}
                      >
                        PETROL
                      </p>
                      <p
                        onClick={() => {
                          setFuel(0);
                          setIsOpenFuel(!isOpenFuel);
                        }}
                      >
                        DIESEL
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button type="submit">ESTIMATE PRICE</button>
          </form>
          {isValid ? <h3>Estimated Price : {result}</h3> : <p></p>}
        </div>
      </div>
    </div>
  );
}

export default Home;
