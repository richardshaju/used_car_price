"use client";
import Image from "next/image";
import { Ysabeau_SC } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, CarFront, Fuel, Gauge } from "lucide-react";

const font = Ysabeau_SC({ subsets: ["latin"], weight: ["400"] });
export default function Home() {
  const [brands, setBrands] = useState<[string]>();
  const [isValid, setIsValid] = useState(true);
  const [result, setresult] = useState("");

  const years = [];
  for (let year = 2013; year <= 2022; year++) {
    years.push(year);
  }

  useEffect(() => {
    fetch("https://used-car-price-g5fz.onrender.com/get_brand")
      .then((response) => response.json())
      .then((data) => setBrands(data.brand))
      .catch((error) => console.error("error:" + error));
  }, []);

  const [formData, setFormData] = useState({
    brand: "bmw",
    year: "2020",
    km: "50000",
    fuel: "petrol",
  });

  const handleKmValdator = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: any = event.target.value;

    if (newValue.length > 7) {
      setIsValid(false);
    } else if (newValue >= 5000 && newValue <= 100000) {
      setFormData({ ...formData, km: newValue });
      setIsValid(true);
    } else {
      setFormData({ ...formData, km: newValue });
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://used-car-price-g5fz.onrender.com/predict_car_price", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        ...formData,
        fuel: formData.fuel == "petrol" ? 1 : 0,
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

  return (
    <div className={`w-full h-full flex ${font.className}`}>
      <div className="w-1/2 h-screen bg-[#efeded] rounded-r-[50px] drop-shadow-2xl ">
        <div className="p-6 font-bold text-2xl text-center">
          <h1>USED CAR PRICE PREDICTOR</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-20">
          <h1 className="text-2xl">Enter the parameters</h1>
          <form
            className="flex flex-col gap-2 items-center mt-4"
            onSubmit={handleSubmit}
          >
            <Select>
              <div className="flex flex-col">
                <p>brand</p>
                <SelectTrigger className="w-[280px]">
                  <SelectValue
                    placeholder={formData.brand || "Select the brand"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cars</SelectLabel>
                    {brands?.map((item) => (
                      <div
                        className="cursor-pointer p-1 px-8 hover:bg-gray-100"
                        key={item.toString()}
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            brand: item.toString(),
                          }));
                        }}
                      >
                        {item.toString()}
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </div>
            </Select>

            <Select>
              <div className="flex flex-col">
                <p>Year</p>
                <SelectTrigger className="w-[280px]">
                  <SelectValue
                    placeholder={formData.year || "Select Manufacture Year"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {years.map((item) => (
                      <div
                        className="cursor-pointer p-1 px-8 hover:bg-gray-100"
                        key={item.toString()}
                        onClick={() => {
                          setFormData((prevData) => ({
                            ...prevData,
                            year: item.toString(),
                          }));
                        }}
                      >
                        {item.toString()}
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </div>
            </Select>

            <div className="flex flex-col">
              <p>kilometer</p>
              <Input
                className="w-[280px]"
                placeholder="Driven Kilometer"
                name="km"
                value={formData.km}
                onChange={handleKmValdator}
              />
              {isValid ? null : (
                <span className="text-red-500 text-sm">
                  should be between 5000 & 100000
                </span>
              )}
            </div>
            <Select>
              <div className="flex flex-col">
                <p>fuel type</p>
                <SelectTrigger className="w-[280px]">
                  <SelectValue
                    placeholder={formData.fuel || "Select Fuel Type"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fuel type</SelectLabel>

                    <p
                      className="cursor-pointer p-1 px-8 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          fuel: "petrol",
                        }));
                      }}
                    >
                      PETROL
                    </p>
                    <p
                      className="cursor-pointer p-1 px-8 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          fuel: "diesel",
                        }));
                      }}
                    >
                      DIESEL
                    </p>
                  </SelectGroup>
                </SelectContent>
              </div>
            </Select>
            <Button className={`w-1/2 mt-6" ${isValid ? '': 'bg-slate-500 cursor-not-allowed'} `} disabled={!isValid} >Estimate Price</Button>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-screen bg-white flex justify-center items-center">
        <div className="flex flex-col h-1/2">
          <Image
            src={`/logos/${formData.brand}.png`}
            width={250}
            height={250}
            alt="logo"
          />
          <div className="flex justify-evenly gap-4 mt-8">
            <div className="flex flex-col justify-evenly gap-4">
              <p className="flex flex-col items-center">
                <CarFront />
                {formData.brand}
              </p>
              <p className="flex flex-col items-center">
                <Calendar />
                {formData.year}
              </p>
            </div>
            <div className="flex flex-col  justify-evenly gap-4">
              <p className="flex flex-col items-center">
                <Gauge />
                {formData.km}
              </p>
              <p className="flex flex-col items-center">
                <Fuel />
                {formData.fuel}
              </p>
            </div>
          </div>

          <div className="mt-3 text-center">
            <Label className="text-lg underline">Estimated Price</Label>
            <p className="text-xl font-mono font-semibold mt-1">{result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
