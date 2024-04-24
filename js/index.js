//chave API: 58adf993d86bb32c1824367bfbd2cc8f

const apiKey = "58adf993d86bb32c1824367bfbd2cc8f"; 
const apiCountryURL= "https://countryflagsapi.netlify.app/flag/"
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

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

const carregar = document.querySelector("#loader");

const carregamento = () =>{
    carregar.classList.toggle("ocultar");
};

const getWeatherData = async(cidade) =>{
    carregamento();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    carregamento();
    return data;

};

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("ocultar");
};
  
const ocultarInformation = () => {
    errorMessageContainer.classList.add("ocultar");
    weatherContainer.classList.add("ocultar");
  
    suggestionContainer.classList.add("ocultar");
};

const showWeatherData = async(cidade) =>{
    ocultarInformation();
    const data = await getWeatherData(cidade);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    cidadeElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL +  data.sys.country + ".svg");
    humidityElement.innerText =`${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + cidade}")`;

    weatherContainer.classList.remove("ocultar");
};

 
searchBtn.addEventListener("click", (e) =>{

    e.preventDefault();

    const cidade = cidadeInput.value;
    showWeatherData(cidade)
    
});

cidadeInput.addEventListener("keyup",(e)=>{

    if(e.code === "Enter"){
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