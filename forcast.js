const key='JNAmJF2v5B75entmBlhAQWyiuxInRRs5'
//current weather

let getCurrentWeather=async(id)=>{
let base='http://dataservice.accuweather.com/currentconditions/v1/'
 let query=`${id}?apikey=${key}`
 let res=await fetch(base+query,{mode:"cors"});
 let data= await res.json();
 return data[0];

}
//city information
let getCity= async (city)=>{
    let base='http://dataservice.accuweather.com/locations/v1/cities/search';
    let query=`?apikey=${key}&q=${city}`;
    let res=await fetch(base+query,{mode:"cors"});
    let data=await res.json();
    return data[0];
};
getCity('pyinoolwin')
.then(data=>{
    console.log(data)
    return getCurrentWeather(data.Key)
}).then(data=>console.log(data))
.catch(err=>console.log(err,"Error"))