'use strict';

let city = document.querySelector(".city");
let error = document.querySelector(".error");
let descValue = undefined;
let i = 1;

function buttonClicked() {
    if (city.value == "") {
        error.textContent = "Пожалуйста, введите название города прежде чем нажать на кнопку.";
        error.style.display = "block";
        error.style.animation = "emergence .5s cubic-bezier(0, .50, .50, 1)";
        error.style.opacity = 1;
    } else {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&appid=44be5522c6a2f5037fb0939a51589ddd')
            .then(response => response.json())
            .then(data => {

            let date = new Date(data['list'][0]['dt_txt']);

            for (i=0;i<=4;i++) {
                let day = document.querySelectorAll(".day");
                let date = day[i].querySelector(".date");
                let temp = day[i].querySelector(".temp");
                let desc = day[i].querySelector(".weather_desc");
                let icon = day[i].querySelector(".icon");
                let dateValue = new Date(data['list'][i*8]['dt_txt']);

                day[i].style.animation = "change .5s cubic-bezier(0, .70, .30, 1)";

                temp.textContent = Math.floor(data['list'][i]['main']['temp']) - 273 + "°";
                date.textContent = dateValue.getDate() + " " + dateValue.toLocaleString('default', {month: 'short'});
                desc.textContent = data['list'][i]['weather'][0]['description'];
                icon.setAttribute("Src", "http://openweathermap.org/img/wn/" + data['list'][i]['weather'][0]['icon'] + "@2x.png");
                setTimeout('day[i].removeAttribute("style")', 500);
            }

            error.style.animation = "disappearance .5s cubic-bezier(0, .50, .50, 1)";
            setTimeout('error.style.display = "none"', 500);
            })
        .catch(err => {
            error.textContent = "Вы ввели неправильное название города!";
            error.style.display = "block";
            error.style.animation = "emergence .5s cubic-bezier(0, .50, .50, 1)";
            error.style.opacity = 1;
        })
    }
};
