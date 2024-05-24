//chave API: 58adf993d86bb32c1824367bfbd2cc8f

const apiKey = "58adf993d86bb32c1824367bfbd2cc8f";
const apiCountryURL = "https://countryflagsapi.netlify.app/flag/"
//url soma com "simbolo.svg"
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cidadeInput = document.querySelector("#cidade-input");
const searchBtn = document.querySelector("#search");

const cidadeElement = document.querySelector("#cidade");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const bodyContainerForecast = document.getElementsByClassName("body-container-forecast");
const btnSugestoes = document.getElementById("btnSugestoes");


const bdC = document.querySelector(".body-container-forecast");
const btnPartilha=document.querySelector("#part");
const divPartilha = document.querySelector("#partilhar");
const ref = document.querySelector("#referenc");
const titulo = window.document.title;
const urlPag = window.document.location.href;


const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

const carregar = document.querySelector("#loader");


//carregamento inicial
if ('geolocation' in navigator) {
    bodyContainerForecast[0].classList.add("ocultar");
    navigator.geolocation.getCurrentPosition(async function (position) {

        const locationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&lang=pt_br`;

        carregamento();
        const res = await fetch(locationURL);

        const data = await res.json();
        showWeatherData(data.name);
        carregamento();
    }, function (error) {
        console.log(error);
        mostrarSugestoes();
    });

} else {
    mostrarSugestoes();
}


function mostrarSugestoes() {
    divPartilha.classList.add('ocultar');
    cidadeInput.value = "";
    errorMessageContainer.classList.add("ocultar");
    btnSugestoes.classList.add("ocultar");
    bodyContainerForecast[0].classList.add("ocultar");
    weatherContainer.classList.add("ocultar");
    suggestionContainer.classList.remove("ocultar");
}


//


// carregar o container com 40 previsões de tempo

for (var i = 0; i < 40; i++) {
    bodyContainerForecast[0].insertAdjacentHTML("beforeend", `<div class="container-forecast">
    <h2 id="data" ></h2>
    <div id="weather-data">
        <h2>
            <i class="fa-solid fa-location-dot"></i>
            <span id="cidade"></span>
            <img src="" alt="Bandeira do país" id="country">
        </h2>
        <p id="temperature"><span></span> &deg;C </p>
        <div id="description-container">
            <p id="description"></p>
            <img src="" id="weather-icon" alt="Condições do tempo">
        </div>
        <div id="details-container">
            <p id="humidity">
                <i class="fa-solid fa-droplet"></i>
                <span></span>
            </p>
            <p id="wind">
                <i class="fa-solid fa-wind"></i>
                <span></span>
            </p>
        </div>
    </div>
</div>` );

}

//


const carregamento = () => {
    carregar.classList.toggle("ocultar");
};

const getWeatherData = async (cidade) => {
    carregamento();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    carregamento();
    return data;

};

const getWheaterDataForecast = async (cidade) => {

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const resForescast = await fetch(forecastURL);
    const dataForecast = await resForescast.json();
    return dataForecast;
}



const showErrorMessage = () => {
    bodyContainerForecast[0].classList.add("ocultar");
    errorMessageContainer.classList.remove("ocultar");
};

const ocultarInformation = () => {
    errorMessageContainer.classList.add("ocultar");
    weatherContainer.classList.add("ocultar");
    suggestionContainer.classList.add("ocultar");
};

const showWeatherData = async (cidade) => {
    cidadeInput.value = "";
    ocultarInformation();
    const data = await getWeatherData(cidade);
    const dataForecast = await getWheaterDataForecast(cidade);

    if (data.cod === "404") {
        console.log("erooouu");
        showErrorMessage();
        return;
    }


    if ( (data.weather[0].id == 200) || (data.weather[0].id == 201) || (data.weather[0].id == 202) || (data.weather[0].id == 210) || (data.weather[0].id == 211) || (data.weather[0].id == 212) || (data.weather[0].id == 221) || (data.weather[0].id == 230) || (data.weather[0].id == 231) || (data.weather[0].id == 232) || (data.weather[0].id == 502) || (data.weather[0].id == 503) || (data.weather[0].id == 504) || (data.weather[0].id == 511) || (data.weather[0].id == 522) || (data.weather[0].id == 602) || (data.weather[0].id == 622) || (data.weather[0].id == 781) ){
        weatherContainer.style.borderTop = "2px solid red";
    }else{
        weatherContainer.style.borderTop = "1px solid #FFF";
    }

    cidadeElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country + ".svg");
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + cidade}")`;
    document.body.style.backgroundRepeat = "no repeat";
    document.body.style.backgroundSize = "auto";

    //forecast
    var containerForecast = document.querySelectorAll(".container-forecast");

    for (var i = 0; i < 40; i++) {
        const dataPrev = containerForecast[i].querySelector("#data");
        const divForecast = containerForecast[i].querySelector("#weather-data");
        const cidadeElementForecast = containerForecast[i].querySelector("#cidade");
        const tempElementForecast = containerForecast[i].querySelector("#temperature span");
        const descElementForecast = containerForecast[i].querySelector("#description");
        const weatherIconElementForecast = containerForecast[i].querySelector("#weather-icon");
        const countryElementForecast = containerForecast[i].querySelector("#country");
        const humidityElementForecast = containerForecast[i].querySelector("#humidity span");
        const windElementForecast = containerForecast[i].querySelector("#wind span");

        if ( (dataForecast.list[i].weather[0].id == 200) || (dataForecast.list[i].weather[0].id == 201) || (dataForecast.list[i].weather[0].id == 202) || (dataForecast.list[i].weather[0].id == 210) || (dataForecast.list[i].weather[0].id == 211) || (dataForecast.list[i].weather[0].id == 212) || (dataForecast.list[i].weather[0].id == 221) || (dataForecast.list[i].weather[0].id == 230) || (dataForecast.list[i].weather[0].id == 231) || (dataForecast.list[i].weather[0].id == 232) || (dataForecast.list[i].weather[0].id == 502) || (dataForecast.list[i].weather[0].id == 503) || (dataForecast.list[i].weather[0].id == 504) || (dataForecast.list[i].weather[0].id == 511) || (dataForecast.list[i].weather[0].id == 522) || (dataForecast.list[i].weather[0].id == 602) || (dataForecast.list[i].weather[0].id == 622) || (dataForecast.list[i].weather[0].id == 781) ){
            divForecast.style.borderTop = "2px solid red";
        }else{
            divForecast.style.borderTop = "1px solid #FFF";
        }

        dataPrev.innerText = dataForecast.list[i].dt_txt;
        cidadeElementForecast.innerText = data.name;
        tempElementForecast.innerText = parseInt(dataForecast.list[i].main.temp);
        descElementForecast.innerText = dataForecast.list[i].weather[0].description;
        weatherIconElementForecast.setAttribute("src", `https://openweathermap.org/img/wn/${dataForecast.list[i].weather[0].icon}.png`);
        countryElementForecast.setAttribute("src", apiCountryURL + data.sys.country + ".svg");
        humidityElementForecast.innerText = `${dataForecast.list[i].main.humidity}%`;
        windElementForecast.innerText = `${dataForecast.list[i].wind.speed}km/h`;

    }

    //

    btnSugestoes.classList.remove("ocultar");
    bodyContainerForecast[0].classList.remove("ocultar");
    weatherContainer.classList.remove("ocultar");
};


searchBtn.addEventListener("click", (e) => {
    divPartilha.classList.add('ocultar');
    e.preventDefault();

    const cidade = cidadeInput.value;
    showWeatherData(cidade)

});

cidadeInput.addEventListener("keyup", (e) => {

    if (e.code === "Enter") {
        const cidade = e.target.value;

        showWeatherData(cidade);
    }
});

suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const cidade = btn.getAttribute("id");
        showWeatherData(cidade);
    });
});

btnPartilha.addEventListener('click',()=>{
    if(navigator.share){
        navigator.share({
            title: `${titulo}`,
            url: `${urlPag}`

        }).then(()=>{
            console.log("obg");
        })
        .catch(console.error);
    }else{
        divPartilha.classList.remove('ocultar');
        ref.setAttribute("value",urlPag);
    }
});

bdC.addEventListener('click', ()=>{
    divPartilha.classList.add('ocultar');
})
