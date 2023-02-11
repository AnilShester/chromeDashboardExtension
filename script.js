let crypto = document.getElementById('crypto_div')
const currentTime = document.getElementById('time')
const weather = document.getElementById('weather_div')
const author = document.getElementById('author')
const currentDate = document.getElementById('date')

const cryptoList = ['bitcoin', 'dogecoin', 'ethereum', 'litecoin']

// fetching background image from stackoverflow
fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nepal'
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    author.textContent = `Photo by: ${data.user.name}`
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1583079903715-10d17697cd92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80")`
  })

// function to fetch crypto coins data from the api
const getCoinsData = (coinsArr) => {
  coinsArr.map((coin) => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status)
        }
        return response.json()
      })
      .then((data) => {
        crypto.innerHTML += `
        <div class="crypto">
            <img src=${data.image.thumb} alt="dogecoin image">
            <h4>${data.name}: $${data.market_data.current_price.usd}</h4>
        </div>
        `
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

getCoinsData(cryptoList)

// Setting time
const getTime = () => {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const date = new Date()
  let day = weekday[date.getDay()]
  currentTime.textContent = date.toLocaleTimeString()
  currentDate.textContent = `${day} ${date.toLocaleDateString()}`
}

setInterval(getTime, 1000)

// Weather API call
//getting the coordinates for the latitude and longitude

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords

  const baseWeatherUrl =
    'https://apis.scrimba.com/openweathermap/data/2.5/weather'
  fetch(`${baseWeatherUrl}?lat=${latitude}&lon=${longitude}&units=metric`)
    .then((response) => {
      if (!response.ok) {
        throw Error('Cannot obtain the data ', response.status)
      }
      return response.json()
    })
    .then((data) => {
      weather.innerHTML = `
        <div class = 'weather_icon'>
        <img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt='weather icon'/>
        <p>${data.main.temp}°C</p>
        </div>
        <h2> ${data.name} </h2>
        <h3>${data.weather[0].description}</h3>
        <p>Feels like: ${data.main.feels_like}</p>
        <p>min:${data.main.temp_min}°C/max:${data.main.temp_max}°C</p>
        `
    })
    .catch((err) => {
      console.log(err)
    })
})
