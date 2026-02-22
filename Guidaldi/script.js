document.addEventListener("DOMContentLoaded", function () {

    // ----- CLOCK & DATE -----
    function realtimeClock() {
        const now = new Date();

        // Orologio
        const hours = ("0" + now.getHours()).slice(-2);
        const minutes = ("0" + now.getMinutes()).slice(-2);
        document.getElementById('clock').innerHTML = hours + " : " + minutes;

        // Giorno della settimana e data
        const weekday = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
        const monthday = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
                          "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];

        const week = weekday[now.getDay()];       // Giorno della settimana
        const day = now.getDate();                // Giorno del mese
        const month = monthday[now.getMonth()];   // Mese

        document.getElementById("data").innerHTML = `${week} ${day} ${month}`;

        setTimeout(realtimeClock, 500);
    }

    realtimeClock();

    // ----- WEATHER -----
    const tempEl = document.getElementById('temp');

    function convertKelvinToCelsius(val) {
        return Math.floor(val - 273.15);
    }

    const CITTA = '';
    const CHIAVE_API = '';
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+CITTA+'&appid='+CHIAVE_API)
        .then(res => res.json())
        .then(data => {
            const temperature = data.main.temp;
            tempEl.innerHTML = `<span>${convertKelvinToCelsius(temperature)}ºC</span>`;
        })
        .catch(err => console.log("Errore fetch meteo:", err));

    // ----- BUTTONS -----
    const buttons = document.querySelectorAll(".box[data-link]");
    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            const link = this.getAttribute("data-link");
            if (link) {
                window.open(link, "_blank");
            }
        });
    });

    // ----- CONSOLE LOG -----
    console.log('%cCreated by Hemerale', "font-size: 30px; color: #A39FC8;");
    console.log('%chttps://github.com/hemerale/Guidaldi', "font-size: 15px;");
});

