/* Global Variables */
const apiKey = "&appid=0bee29c772704d38dee97aa6f80bcb11&units=imperial";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// event listener that initiates api call;

document.getElementById("generate").addEventListener("click", performAction);

// callback function called by event listener
function performAction(e) {
  const userResponse = document.getElementById("feelings").value;
  const zipCode = document.getElementById("zip").value;

  //api call chained with server.js call and UI update of data from api and user
  getWeather(baseURL, zipCode, apiKey).then(function (data) {

    postData("/weatherdata", {
      temperature: `${data.main.temp}°F`,
      date: newDate,
      feeling: userResponse,
    }).then(updateUI());
  });
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//api call function
const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + apiKey);
  try {
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
// save data to server with POST
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
//update UI with data from server.js and user input feelings
const updateUI = async () => {
  const request = await fetch("/projectdata");
  try {
    const allData = await request.json();
    document.getElementById("entry").className = "holderResponse";
    document.getElementById("content").innerHTML = `Feeling: ${
      allData.slice(-1)[0].feeling
    }`;
    document.getElementById("date").innerHTML = `Date: ${
      allData.slice(-1)[0].date
    }`;
    document.getElementById("temp").innerHTML = `Temperature: ${
      allData.slice(-1)[0].temperature
    }`;
  } catch (error) {
    console.log("error", error);
  }
};
