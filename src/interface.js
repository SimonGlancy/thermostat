$(document).ready(function(){

var thermostat;



    $.getJSON("http://localhost:4567/temp", function(data) {
      console.log(data.temp);
      thermostat = new Thermostat(data.temp);
      console.log(thermostat);
      updateDisplay();
  });


  function updateDisplay() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#temperature').attr('class', thermostat.temperatureColour());
    $('#powerSaveSwitch').attr('class',thermostat.powerSaveStatus());
  };

  function updateDatabase() {
    $.ajax({
      url: "http://localhost:4567/temp",
      type: "POST",
      data: {temp: thermostat.getCurrentTemperature()}
    });
  }

  $('#increaseTemperature').on('click', function() {
    thermostat.increaseTemperature();
    updateDatabase();
    updateDisplay();
  });

  $('#decreaseTemperature').on('click', function() {
    thermostat.decreaseTemperature();
    updateDatabase();
    updateDisplay();
  });

  $('#powerSaveSwitch').on('click', function() {
    thermostat.powerSaveSwitch();
    $('#powerSave').text(thermostat.powerSaveStatus());
    updateDatabase();
    updateDisplay();
  });

  $('#resetTemperature').on('click', function() {
    thermostat.resetTemperature();
    updateDatabase();
    updateDisplay();
  });

  $("#submit").click(function() {
    var city = $("#city").val();
    $("#display-city").text(city);
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c74750056623d5bf9582e07bc0b923ea&units=metric", function(data) {
      $("#api-temp").text(data.main.temp);
    });
  });



})
