var settings = {
  url: "https://restcountries.eu/rest/v2/all",
  method: "GET",
};

$.ajax(settings).done(function (response) {
  for (const country of response) {
    $("#select-country").append(
      `<option value="${country.alpha3Code}">${country.name}</option>`
    );
  }
});
$(document).ready(function () {
  var app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: 32,
        lng: 52,
      },
      zoom: 6,
    },
    apiKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVjMDA0MzY4ZmE2YjdjYzNlNzM5ZDc2N2MxOWUwM2QxMWQwZDYyOGY1MDYxMGVlNTEwOTMyOTQ2ZGNmMzZmZDQxYjVlNjViYTJlYmQ3ZTM3In0.eyJhdWQiOiI5NTI2IiwianRpIjoiNWMwMDQzNjhmYTZiN2NjM2U3MzlkNzY3YzE5ZTAzZDExZDBkNjI4ZjUwNjEwZWU1MTA5MzI5NDZkY2YzNmZkNDFiNWU2NWJhMmViZDdlMzciLCJpYXQiOjE1OTE0NDI5NDIsIm5iZiI6MTU5MTQ0Mjk0MiwiZXhwIjoxNTk0MDM0OTQyLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.cOua4iT8wU9z4jV_UyqCRUGSlQerscT7JC2O8J6yrlpsi6HCE1jh9IsyI53S8GMixa713Wh0r2VDXljlsO-dM8-BOKXCLr-tIsPUznOgar1sBnGWYunDxJzknKJl1oEPv75Ugu4j-j7W1QNoioVHGYrQLvbh_49mGTlq8EZzweEZ9D6Z0Ct-FzHMqKXDy6SY0XQc3aI_UV4K-y6lKh4OeB7rfap-5CLbsJs_4XQlRV3cBeqlqV_R87zrDk7AgDIJl2klzKR4JSBzbjHVqHE8-qrFovMgqAM4lZMTWL8c4YLklDpHk8GTzpdSg6KSs3wOxOnK-8f9qY2V-1O29fswEA",
  });
  app.addLayers();

  $("#select-country").change(function (e) {
    e.preventDefault();
    $.ajax({
      url: `https://restcountries.eu/rest/v2/alpha/${$(this).val()}`,
      method: "GET",
    }).done(function (res) {
      $("#txt-country").text(res.name);
      $("#native-name").text(res.nativeName);
      $("#capital").text(res.capital);
      $("#region").text(res.region);
      $("#population").text(res.population);
      $("#languages").text(res.languages[0].name);
      $("#time-zones").text(res.timezones);
      $("#calling-code").text(res.callingCodes);
      $("#image-country").attr("src", res.flag);

      app.addMarker({
        name: "basic-marker",
        latlng: {
          lat: res.latlng[0],
          lng: res.latlng[1],
        },
        popup: {
          title: {
            html: res.translations.fa,
          },
          open: true,
        },
      });

      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${res.capital}&appid=57a999dfc92ad8855f3b5bcd69cfce3b`,
        method: "GET",
      }).done(function (response) {
        $("#img-weather").attr(
          "src",
          `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
        );
        $("#main-weather").text(response.weather[0].main);
        $("#wind-speed").text(response.wind.speed);
        $("#temperature").text(Math.round(response.main.temp - 273.15));
        $("#humidity").text(response.main.humidity);
        $("#visibility").text(response.visibility);

        console.log(response);
      });
    });
  });
});
