/* Global Variables */
const apiKey = "&appid=0bee29c772704d38dee97aa6f80bcb11";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// const url = baseURL + zipCode + apiKey;

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const userResponse = document.getElementById("feelings").value;
  const zipCode = document.getElementById("zip").value;

  getWeather(baseURL, zipCode, apiKey);

}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getWeather = async (baseURL, zipCode, apiKey) => {

    const res = await fetch(baseURL + zipCode + apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error)
    }

}

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}


