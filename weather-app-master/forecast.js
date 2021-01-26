//https://api.openweathermap.org/data/2.5/forecast?q=Mumbai&units=metric&appid=52378f47189b16a4f567e1625c482c3f





var key='52378f47189b16a4f567e1625c482c3f';
const getForecast= async (city) =>{
    const base='https://api.openweathermap.org/data/2.5/forecast';
    const query=`?q=${city}&units=metric&appid=${key}`;
    
    
    const response=await fetch(base+query);
    
    console.log(response);
    
    if(!response.ok)
        throw new Error("status Code:" + response.status);
//    console.log(data);
    
    const data=await response.json();
    
    return data;
}

//getForecast("Gujarat")
//.then(data=>console.log(data))
//.catch(err=> console.warn(err));