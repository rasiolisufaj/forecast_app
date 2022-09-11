// INTERACTING WITH WEATHER API
const apiKey = "wDrTAhip5apSATqlJROMwrCovUixUlU7";

// Get current condition
const getCurrentCondition = async (key) => {
  const resourceUrl =
    "http://dataservice.accuweather.com/currentconditions/v1/";

  const queryParameters = `${key}?apikey=${apiKey}`;

  const response = await fetch(resourceUrl + queryParameters);
  const data = await response.json();
  return data[0];
};

// Get city
const getCity = async (city) => {
  const resourceUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const queryParameters = `?apikey=${apiKey}&q=${city}`;

  const response = await fetch(resourceUrl + queryParameters);
  const data = await response.json();
  return data[0];
};

// https://developer.accuweather.com/
