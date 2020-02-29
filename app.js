let cityform = document.querySelector("form");
let card = document.querySelector(".card");
let time = document.querySelector("img.time");
let icon = document.querySelector(".icon");
let details = document.querySelector(".details");


//getting datas for APIs
const updateCity = async (city)=>{

    let CityData = await getCity(city);
    let WeatherData = await getCurrentWeather(CityData.Key);

    return {
        CityData:CityData,
        WeatherData:WeatherData
        };
};


//updating UI 
const updateUI = async (data)=>{

        //get datas
        let city = data.CityData;
        let weather = data.WeatherData;
        details.innerHTML = `
        <h5 class="my-3">${city.EnglishName}</h5>
        <div class="my-2">${weather.WeatherText}</div>
        <div class="display-4 my-2">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>  
        `;

        //update time icon
        let timeSrc = null;
        timeSrc = weather.IsDayTime?"img/day.svg":"img/night.svg";
        time.setAttribute("src",timeSrc);

        //update weather icon
        let getIcon = `<img src="img/icons/${weather.WeatherIcon}.svg">`;
        icon.innerHTML=getIcon;

}

cityform.addEventListener("submit",()=>{

    event.preventDefault();

    //get city name
    let city = cityform.city.value.trim();

    //reset form
    cityform.reset();

    //show detail form
    if(card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
    
    //get city and weather infromation
    updateCity(city)
    .then(data=>{
        updateUI(data);
    })
    .catch(err=>{
        console.log(err);
    });
});