/* Global Variables */
// Base Url for OpenWeatherMap
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const serverUrl = 'http://localhost:3000';

// Personal API Key for OpenWeatherMap API
const personalApi = 'de062ed18dd498a58c158417bbe1de01';
const units = '&units=imperial';
const apiKey = `,&appid=${personalApi}${units}`;

// Create a new date instance dynamically with JS
const date = new Date().toDateString();

//Generate button
const generate = document.getElementById('generate');

//Error Message
const errorMsg = document.getElementById('error'); 

const generateWeather = () => {
    //General Variables
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    //New object
    let newData = {};

    //Using Chaining Promises
    getWeather(zipCode).then((data) => {
        if (data) {
            newData = {
                'temp': Math.round(data.main.temp),
                'feel': data.weather.description,
                'city': data.name,
                'date': date,
                'feel': feelings,
            }
            postWeather(serverUrl + '/post', newData);
            retrieveData();
        }

    });
}

//Getting the web API data (Weather Data)
const getWeather = async (zipCode = '') => {

    try {
        const response = await fetch(baseUrl + zipCode + apiKey);
        const data = await response.json();

        //Handling 'not found city'
        if (data.cod != 200) {
            errorMsg.innerHTML = data.message; //Displaying the error message
            //Error message disappears in 2.5s
            setTimeout(_=> errorMsg.innerHTML = '', 2500);

            throw data.message;
        }

        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

//Sending the weather data to the server
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//Retrieving the weather data from the server and updating it in the html document
const retrieveData = async () => {
    const response = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await response.json();
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = `${allData.temp} degrees`;
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('city').innerHTML = allData.city;
    }
    catch (error) {
        console.log('error', error);
    }
}

//EventListeners
generate.addEventListener('click', generateWeather);