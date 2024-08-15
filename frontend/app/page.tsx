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
import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, CarFront, Fuel, Gauge, Github, Share2 } from "lucide-react";

const font = Ysabeau_SC({ subsets: ["latin"], weight: ["400"] });
export default function Home() {
  const [brands, setBrands] = useState<[string]>();
  const [isValid, setIsValid] = useState(true);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropDownRef = useRef<HTMLDivElement[]>([]);
  const dropDownButtons = useRef<HTMLDivElement[]>([]);
  const submitButton = useRef<HTMLDivElement | null>(null);

  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const setButtonRef =
    (index: number) =>
    (element: HTMLDivElement): void => {
      dropDownButtons.current[index] = element;
    };
  const setDropDownRef =
    (index: number) =>
    (element: HTMLDivElement): void => {
      dropDownRef.current[index] = element;
    };

  const handleClickOutside = (event: any) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.some((element: HTMLDivElement) =>
        element?.contains(event.target as Node)
      ) &&
      !dropDownButtons.current.some((button) =>
        button?.contains(event.target as Node)
      )
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const years = [];
  for (let year = 2013; year <= 2022; year++) {
    years.push(year);
  }

  useEffect(() => {
    fetch("https://used-car-price-g5fz.onrender.com/get_brand")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.brand);
        setLoading(false);
      })
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
    if (window.innerWidth <= 768) {
      if (submitButton.current) {
        submitButton.current.scrollIntoView({ behavior: "smooth" });
      }
    }

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
        setResult(data.estimated_price.toLocaleString("en-IN", options));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    setResult("");
  }, [formData]);

  const handleShare = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Used car price predictor",
          text: "Check out this amazing ML model which predicts used car price",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.error("Web Share API is not supported in this browser.");
    }
  };

  const loadingtitles = [
    "Loading the website",
    "Loading the model",
    "Loading the algorithm",
  ];

  const [loadingTitle, setLoadingTitle] = useState(loadingtitles[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTitle(
        loadingtitles[Math.floor(Math.random() * loadingtitles.length)]
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center flex-col gap-2 bg-white z-50">
            <Image
              className="rounded-3xl animate-pulse"
              src={"/logo.jpg"}
              width={100}
              height={100}
              alt="logo"
            />
            <p className="text-sm font-mono">{loadingTitle}</p>
          </div>
        )}
      </div>
      <div
        className={`w-full h-full flex md:flex-row flex-col ${font.className}`}
      >
        <div className="md:w-1/2 w-full h-screen bg-[#efeded] md:rounded-r-[50px] drop-shadow-2xl ">
          <div className="p-6 font-bold flex justify-between text-2xl text-center">
            <a href="https://github.com/richardshaju/used_car_price/">
              <Github
                color="white"
                className="bg-black w-7 h-7 rounded-full p-1"
              />
            </a>
            <h1>USED CAR PRICE PREDICTOR</h1>
            <a href="" onClick={handleShare}>
              <Share2
                color="white"
                className="bg-black w-8 h-7 rounded-full p-1"
              />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-2xl">Enter the parameters</h1>
            <form
              className="flex flex-col gap-2 items-center mt-4"
              onSubmit={handleSubmit}
            >
              <Select open={openDropdown === "brand" ? true : false}>
                <div
                  className="flex flex-col"
                  ref={setButtonRef(1)}
                  onClick={() => handleDropdownToggle("brand")}
                >
                  <p>brand</p>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue
                      placeholder={formData.brand || "Select the brand"}
                    />
                  </SelectTrigger>
                  <SelectContent ref={setDropDownRef(1)}>
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

              <Select open={openDropdown === "year" ? true : false}>
                <div
                  className="flex flex-col"
                  ref={setButtonRef(2)}
                  onClick={() => handleDropdownToggle("year")}
                >
                  <p>Year</p>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue
                      placeholder={formData.year || "Select Manufacture Year"}
                    />
                  </SelectTrigger>
                  <SelectContent ref={setDropDownRef(2)}>
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
              <Select open={openDropdown === "fuel" ? true : false}>
                <div
                  className="flex flex-col"
                  ref={setButtonRef(3)}
                  onClick={() => handleDropdownToggle("fuel")}
                >
                  <p>fuel type</p>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue
                      placeholder={formData.fuel || "Select Fuel Type"}
                    />
                  </SelectTrigger>
                  <SelectContent ref={setDropDownRef(3)}>
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
              <Button
                ref={submitButton as React.RefObject<HTMLButtonElement>}
                className={`w-1/2 mt-5 " ${
                  isValid ? " " : " bg-slate-500 cursor-not-allowed"
                } `}
                disabled={!isValid}
              >
                Estimate Price
              </Button>
            </form>
          </div>
        </div>
        <div className="md:w-1/2 w-full h-screen bg-white flex justify-center items-center">
          <div className="flex flex-col h-1/2">
            <Image
              src={`/logos/${formData.brand}.png`}
              width={250}
              height={250}
              alt="logo"
            />
            <div className="flex justify-evenly gap-4 mt-8">
              <div className="flex flex-col justify-evenly gap-4 w-[50%]">
                <p className="flex flex-col items-center">
                  <CarFront />
                  {formData.brand}
                </p>
                <p className="flex flex-col items-center">
                  <Calendar />
                  {formData.year}
                </p>
              </div>
              <div className="flex flex-col  justify-evenly gap-4 w-[50%]">
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
              {result && (
                <div>
                  <Label className="text-lg underline">Estimated Price</Label>
                  <p className="text-xl font-mono font-semibold mt-1">
                    {result}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
