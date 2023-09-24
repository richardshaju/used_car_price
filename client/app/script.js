let brands = [];

function onPageLoad() {
  console.log("loading..");
  var url = "/api/get_brand";
  $.get(url, function (data, status) {
    console.log("Response got");
    if (data) {
      brands = data.brand;
      brands.forEach((brand) => {
        const option = document.createElement("p");
        option.textContent = brand.toUpperCase();
        option.addEventListener("click", () => {
          brandInput.value = brand.toUpperCase();
          brandOptions.style.display = "none";
        });
        brandOptions.appendChild(option);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const brandInput = document.getElementById("brandInput");
  const brandOptions = document.getElementById("brandOptions");
  const yearInput = document.getElementById("yearInput");
  const yearOptions = document.getElementById("yearOptions");
  const fuelInput = document.getElementById("fuelInput");
  const fuelOptions = document.getElementById("fuelOptions");
  const kmInput = document.getElementById("kmInput");
  const kmError = document.getElementById("kmError");
  const carForm = document.getElementById("carForm");
  const resultElement = document.getElementById("result");

  const years = [];
  for (let i = 2013; i < 2023; i++) {
    years.push(i);
  }

  // Populate year options
  years.forEach((year) => {
    const option = document.createElement("p");
    option.textContent = year;
    option.addEventListener("click", () => {
      yearInput.value = year;
      yearOptions.style.display = "none";
    });
    yearOptions.appendChild(option);
  });

  // Populate brand options (You need to fetch and populate the actual data)
  // For demonstration purposes, I'm using static data here.

  const type = ["PETROL", "DIESEL"];
  type.forEach((type) => {
    const option = document.createElement("p");
    option.textContent = type;
    option.addEventListener("click", () => {
      fuelInput.value = type;
      fuelOptions.style.display = "none";
    });
    fuelOptions.appendChild(option);
  });

  // Handle form submission
  carForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const km = parseInt(kmInput.value);
    if (km >= 5000 && km <= 100000) {
      kmError.textContent = "";
      var brand = brandInput.value;
      var year = yearInput.value;
      var kilometer = kmInput.value;
      var fuel_type;
      if (fuelInput.value == "PETROL") {
        fuel_type = 1;
      } else {
        fuel_type = 0;
      }
    
      var url = "/api/predict_car_price";

      // Create an object with your data
      var requestData = {
          km: kilometer,
          year: year,
          brand: brand,
          fuel: fuel_type
      };
      
      // Set the headers and send the POST request
      $.ajax({
          url: url,
          type: "POST",
          data: JSON.stringify(requestData), // Convert the data to a JSON string
          contentType: "application/json", // Set the content type header
          dataType: "json", // Specify the expected data type
          success: function(data, status){
            resultElement.textContent = "Estimated Price: " + data.estimated_price.toLocaleString("en-IN");
          },
          error: function(xhr, status, error){
              console.error(error);
          }
      });
    } else {
      kmError.textContent = "Should be between 5000 & 100000";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const yearInput = document.getElementById("yearInput");
  const yearOptions = document.getElementById("yearOptions");
  yearOptions.style.display = "none";
  // Toggle the visibility of the options when the input is clicked
  yearInput.addEventListener("click", function () {
    if (yearOptions.style.display === "block") {
      yearOptions.style.display = "none";
    } else {
      yearOptions.style.display = "block";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const brandInput = document.getElementById("brandInput");
  const brandOptions = document.getElementById("brandOptions");
  brandOptions.style.display = "none";
  // Toggle the visibility of the options when the input is clicked
  brandInput.addEventListener("click", function () {
    if (brandOptions.style.display === "block") {
      brandOptions.style.display = "none";
    } else {
      brandOptions.style.display = "block";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const brandInput = document.getElementById("fuelInput");
  const brandOptions = document.getElementById("fuelOptions");
  brandOptions.style.display = "none";
  // Toggle the visibility of the options when the input is clicked
  brandInput.addEventListener("click", function () {
    if (brandOptions.style.display === "block") {
      brandOptions.style.display = "none";
    } else {
      brandOptions.style.display = "block";
    }
  });
});

window.onload = onPageLoad;
