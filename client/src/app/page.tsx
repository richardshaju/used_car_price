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
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const font = Ysabeau_SC({ subsets: ["latin"], weight: ["400"] });
export default function Home() {
  const [brands, setBrands] = useState<[string]>();
  const [isValid, setIsValid] = useState(true);

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
    brand: "",
    year: "",
    kilometer: "",
    fuelType: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Access the form data here
    console.log(formData);
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
            className="flex flex-col gap-2 items-center"
            onSubmit={handleSubmit}
          >
            <Select>
              <div className="flex flex-col">
                <p>brand</p>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cars</SelectLabel>
                    {brands &&
                      brands.map((brand: string) => (
                        <SelectItem key={brand} value={brand}>
                          {brand.toUpperCase()}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </div>
            </Select>

            <Select>
              <div className="flex flex-col">
                <p>Year</p>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Manufacture Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {years.map((item,idx) => (
                      <SelectItem
                        key={item}
                        value={formData.year}
                        onClick={() =>
                          setFormData({ ...formData, year: item.toString() })
                        }
                      >
                        {item.toString()}
                      </SelectItem>
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
                name="kilometer"
                value={formData.kilometer}
                onChange={handleInputChange}
              />
              {isValid ? null : <span>should be between 5000 & 100000</span>}
            </div>
            <Select>
              <div className="flex flex-col">
                <p>fuel type</p>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fuel type</SelectLabel>
                    <SelectItem value="akst">DIESEL</SelectItem>
                    <SelectItem value="hst">PETROL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </div>
            </Select>
            <Button className="w-1/2 mt-6">Estimate Price</Button>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-screen bg-white "></div>
    </div>
  );
}
