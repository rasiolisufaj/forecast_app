// DOM
const formElement = document.querySelector("form");
const cityDetailsElement = document.getElementById("details");
const cardElement = document.getElementById("card");
const cardImageElement = document.getElementById("time");
const iconImageElement = document.getElementById("icon-image");

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weatherDetails = data.weatherDetails;

  cityDetailsElement.innerHTML = `
      <h5>${cityDetails.EnglishName}</h5>
      <div class="weather-condition">${weatherDetails.WeatherText}</div>
      <div class="temp-display"><span>${weatherDetails.Temperature.Metric.Value}</span><span> &deg;C</span></div>
  `;

  // Update Card Image
  let cardImageSrc = null;
  if (weatherDetails.IsDayTime) {
    cardImageSrc = "img/day.svg";
  } else {
    cardImageSrc = "img/night.svg";
  }
  cardImageElement.setAttribute("src", cardImageSrc);

  // Update Icon Image
  const iconImageSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  iconImageElement.setAttribute("src", iconImageSrc);

  // Display Card
  if (cardElement.classList.contains("d-none")) {
    cardElement.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getCurrentCondition(cityDetails.Key);

  return {
    cityDetails,
    weatherDetails,
  };
};

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = formElement.city.value.trim();

  // clear out the form field
  formElement.reset();

  // Local Storage
  localStorage.setItem("city", city);

  // Update the UI
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((error) => console.log(error));
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.city)
    .then((data) => updateUI(data))
    .catch((error) => console.log(error));
}
