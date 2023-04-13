// Event Listener to trigger query for weather, map
$("#myBtn").click(function (event) {
  event.preventDefault()

  // To empty rendered display for new data
  $("#cityName").empty()
  $("#myCity").empty()
  $("#current").empty()

  // Variable for city name
  var nameCity = $("#cityEl").val()

  // Warning if no city name
  if (!nameCity) {
    $("#cityEl").attr("placeholder", "Please enter name of the city")
    $("#cityEl").addClass("placeholder")
    return;
  }

  // Variable for history buttons created and attached to section
  var hisBtn = $("<button>")
  hisBtn.text(nameCity.toUpperCase()).attr("id", nameCity).addClass("historyBtn btn btn-secondary mt-2")
  $("#history").append(hisBtn)

  // var for weather information
  var weatherData = []
  var weatherData1 = []

  // Function for fetching lon and lat of the city from opemweather map
  async function fetchWeather() {
    try {
      const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + nameCity + "&limit=6&appid=7ceb463b0dbb74278996f51113e27ee3", {
        method: 'GET',
        redirect: 'follow',
      })
      const data =
        await response.json();
      weatherData = data
      var lon = weatherData[0].lon
      var lat = weatherData[0].lat

      //  Map embedded using maptiler style
      var map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=6uaB21HtHtwRWRKE2rGU',
        center: [lon, lat],
        zoom: 0
      });

      var marker = new maplibregl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);

      // Fetching weather forecast using lat and lon and rendering data on the webpage

      fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=7ceb463b0dbb74278996f51113e27ee3", {
        method: 'GET',
        redirect: 'follow',
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          weatherData1.push(data)
          var disM = $("<div>")
          var dateElM = $("<p>")
          var dateM = dayjs.unix(weatherData1[0].list[0].dt)
          dateElM.text(dayjs(dateM).format("DD/MM/YYYY"))
          var nameElM = $("<p>")
          nameElM.text(nameCity.toUpperCase())
          var tempElM = $("<p>")
          var tempM = weatherData1[0].list[0].main.temp
          tempElM.text("Current Temp:" + " " + tempM + "c")
          var iconElM = $("<img>")
          var iconM = weatherData1[0].list[0].weather[0].icon
          iconElM.attr("src", "https://openweathermap.org/img/wn/" + iconM + "@2x.png").css({ "height": "50px", "height": "50px" })
          var humidityElM = $("<p>")
          var humidityM = weatherData1[0].list[0].main.humidity
          humidityElM.text("humidity:" + humidityM + "%")
          var windElM = $("<p>")
          var windM = weatherData1[0].list[0].wind.speed
          windElM.text("Wind Speed:" + windM + "kmh")
          $(disM).append(iconElM, dateElM, nameElM, tempElM, humidityElM, windElM)
          $(disM).css({ "padding": "5px", "border": "2px solid black", "margin": "5px", "border-radius": "15px", "box-shadow": "3px 3px 6px grey" })
          $("#current").append(disM)

          // For loop to created current and 5 days forecast and rendering on webpage
          for (i = 1; i < 6; i++) {
            var dis = $("<div>")
            var dateEl = $("<p>")
            var date = dayjs.unix(weatherData1[0].list[i * 8 - 1].dt)
            dateEl.text(dayjs(date).format("DD/MM/YYYY"))
            var nameEl = $("<p>")
            nameEl.text(nameCity.toUpperCase())
            var tempEl = $("<p>")
            var temp = weatherData1[0].list[i * 8 - 1].main.temp
            tempEl.text(temp + "c")
            var iconEl = $("<img>")
            var icon = weatherData1[0].list[i * 8 - 1].weather[0].icon
            iconEl.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png").css({ "height": "50px", "height": "50px" })
            var humidityEl = $("<p>")
            var humidity = weatherData1[0].list[i * 8 - 1].main.humidity
            humidityEl.text(humidity + "%")
            var windEl = $("<p>")
            var wind = weatherData1[0].list[i * 8 - 1].wind.speed
            windEl.text(wind + "kmh")
            $(dis).append(iconEl, dateEl, tempEl, humidityEl, windEl)
            $(dis).addClass("col")
            $(dis).css({ "padding": "5px", "border": "2px solid black", "margin": "5px", "border-radius": "15px", "box-shadow": "3px 3px 6px grey" })
            $("#myCity").append(dis)
          }
        })


    } catch (err) {
      console.error(err)
    }
  }

  // Calling fetchWeather function
  fetchWeather()

})

// Event listener for history buttons and recreating the rendered information
$("#history").click(function (event) {
  event.preventDefault()
  $("#cityName").empty()
  $("#myCity").empty()
  $("#current").empty()
  var buttonClicked = event.target
  var nameCity = buttonClicked.id
  var weatherData = []
  var weatherData1 = []
  async function fetchWeather() {
    try {
      const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + nameCity + "&limit=6&appid=7ceb463b0dbb74278996f51113e27ee3", {
        method: 'GET',
        redirect: 'follow',
      })
      const data =
        await response.json();
      weatherData = data
      var lon = weatherData[0].lon
      var lat = weatherData[0].lat

      //  Map embedded  
      var map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets/style.json?key=6uaB21HtHtwRWRKE2rGU',
        center: [lon, lat],
        zoom: 0
      });

      var marker = new maplibregl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);

      fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=7ceb463b0dbb74278996f51113e27ee3", {
        method: 'GET',
        redirect: 'follow',
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          weatherData1.push(data)
          var disM = $("<div>")
          var dateElM = $("<p>")
          var dateM = dayjs.unix(weatherData1[0].list[0].dt)
          dateElM.text(dayjs(dateM).format("DD/MM/YYYY"))
          var nameElM = $("<p>")
          nameElM.text(nameCity.toUpperCase())
          var tempElM = $("<p>")
          var tempM = weatherData1[0].list[0].main.temp
          tempElM.text("Current Temp:" + " " + tempM + "c")
          var iconElM = $("<img>")
          var iconM = weatherData1[0].list[0].weather[0].icon
          iconElM.attr("src", "https://openweathermap.org/img/wn/" + iconM + "@2x.png").css({ "height": "50px", "height": "50px" })
          var humidityElM = $("<p>")
          var humidityM = weatherData1[0].list[0].main.humidity
          humidityElM.text("humidity:" + humidityM + "%")
          var windElM = $("<p>")
          var windM = weatherData1[0].list[0].wind.speed
          windElM.text("Wind Speed:" + windM + "kmh")
          $(disM).append(iconElM, dateElM, nameElM, tempElM, humidityElM, windElM)
          $(disM).css({ "padding": "5px", "border": "2px solid black", "margin": "5px", "border-radius": "15px", "box-shadow": "3px 3px 6px grey" })
          $("#current").append(disM)

          for (i = 1; i < 6; i++) {
            var dis = $("<div>")
            var dateEl = $("<p>")
            var date = dayjs.unix(weatherData1[0].list[i * 8 - 1].dt)
            dateEl.text(dayjs(date).format("DD/MM/YYYY"))
            var nameEl = $("<p>")
            nameEl.text(nameCity.toUpperCase())
            var tempEl = $("<p>")
            var temp = weatherData1[0].list[i * 8 - 1].main.temp
            tempEl.text(temp + "c")
            var iconEl = $("<img>")
            var icon = weatherData1[0].list[i * 8 - 1].weather[0].icon
            iconEl.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png").css({ "height": "50px", "height": "50px" })
            var humidityEl = $("<p>")
            var humidity = weatherData1[0].list[i * 8 - 1].main.humidity
            humidityEl.text(humidity + "%")
            var windEl = $("<p>")
            var wind = weatherData1[0].list[i * 8 - 1].wind.speed
            windEl.text(wind + "kmh")
            $(dis).addClass("col")
            $(dis).append(iconEl, dateEl, tempEl, humidityEl, windEl)
            $(dis).css({ "padding": "5px", "border": "2px solid black", "margin": "5px", "border-radius": "15px", "box-shadow": "3px 3px 6px grey" })
            $("#myCity").append(dis)
          }
        })


    } catch (err) {
      console.error(err)
    }
  }


  fetchWeather()

})

// Display the local current time
function currentTime() {
  var date = dayjs();
  var time = date.format("hh:mm:ss A");
  $('#clock').text("Local time: " + time);
  var tic = setTimeout(function () {
    currentTime()
  }, 1000);
}
currentTime();