(function($, document, window) {

    $(document).ready(function() {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function() {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function() {

    });

})(jQuery, document, window);


/***********************************
****COMMUNAICATING WITH FORECAST.js*
***********************************/


const cityForm=document.querySelector('form');
const monthName=["JAN","FEB","MAR","APR","MAY","JUNE","JULY","AUG","SEP","OCT","NOV","DEC"];
const dayName=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

const updateUI=(data,cityName)=>{
    const days=document.getElementsByClassName('day');
    const date=document.querySelector('.date');
    const humidity=document.getElementById('humidity');
    const windSpeed=document.getElementById('wind-speed');
    const windDegree=document.getElementById('wind-degree');
    const location=document.querySelector('.location');
    const temps=document.getElementsByClassName('temp');
    const icons=document.getElementsByClassName('weather-icon');
    
    
    
    location.innerHTML=cityName;
    humidity.innerHTML=data.list[0].main.humidity +'%';
    
    windSpeed.innerHTML=(Math.round(data.list[0].wind.speed *3.6 *10)/10) + "km/hr";
    
    windDegree.innerHTML=data.list[0].wind.deg +"<sup>o</sup>";
    
    
    const todaysDate=new Date(data.list[0].dt_txt);
    const todaysMonth=monthName[todaysDate.getMonth()];
    const todaysDay=todaysDate.getDay();
    date.innerHTML=todaysDate.getDate() +" "+todaysMonth;
    
    
    var i=0;
    var j=0;
    for(let element of days){
        const day=dayName[(todaysDay+i)%7];
        element.innerHTML=day;
        
        const temp=Math.round(data.list[j].main.temp);
//        console.log(temp);
        temps[i].innerHTML= temp +"<sup>o</sup>C";
        
        icons[i].src="images/icons/" +data.list[j].weather[0].icon +".svg";
        
        i++;
        j+=8;//hr 8 3-3 ke slot ke baad ka time = new day ka
    }
}

cityForm.addEventListener('submit', e=>{
    e.preventDefault();
    let cityName=cityForm.city.value.trim();
    if(cityName==""){
        cityName="Mumbai";
    }
    
    getForecast(cityName)
        .then(data=> updateUI(data,cityName))
        .catch(err=>console.log(err));
});


//DEFAULT LOAD FOR MUMBAI
//getForecast('Mumbai')
//    .then(data=> updateUI(data,'Mumbai'))
//    .catch(err=>console.log(err));


