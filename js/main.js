const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=1c68a806b5038f29f5f7ebf9c4ef62f8';
const units = '&units=metric';

let $city="Londyn"; 
let $url;


const getWeather = () =>  {
    $city = (!input.value) ? "New York" : input.value;
    url = apiLink + $city + apiKey + units;
    axios.get(url)
    .then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = Object.assign({},...res.data.weather);

        warning.textContent = ""; 
        cityName.textContent = res.data.name;
        temperature.textContent = Math.floor(temp) +'°C';
        humidity.textContent = hum+'%';
        // weather.textContent = res.data.weather[0].main;
        weather.textContent = status.main;

        if(status.id >= 200 &&  status.id < 300){
            photo.setAttribute('src','./img/thunderstorm.png')
        }

        else if(status.id >= 300 &&  status.id < 500){
            photo.setAttribute('src','./img/drizzle.png')
        }

        else if(status.id >= 500 &&  status.id < 600){
            photo.setAttribute('src','./img/rain.png')
        }

        else if(status.id >= 600 &&  status.id < 700){
            photo.setAttribute('src','./img/ice.png')
        }

        else if(status.id >= 700 &&  status.id < 800){
            photo.setAttribute('src','./img/fog.png')
        }

        else if(status.id === 800){
            photo.setAttribute('src','./img/sun.png')
        }

        else if(status.id > 800 &&  status.id < 900){
            photo.setAttribute('src','./img/cloud.png')
        }else{
            console.log("Unknown value");
        }
    }
    )
    .catch(err => {
        warning.textContent = "Nie znaleziono takiego miasta"; 
    });

}

const enterCheck = () => {
    if(event.keyCode === 13){
        getWeather();
    }
}

getWeather();

btn.addEventListener('click',getWeather);
input.addEventListener('keyup', enterCheck);
