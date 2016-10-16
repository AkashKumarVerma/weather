var lat;
var long;
var location;
var apiKey;
var url;
var encodedURL;
var pr;
var scale;
var temp;
var changedTemp;

function getLocation(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat  = position.coords.latitude;
			long = position.coords.longitude;
			alert(lat);
		});
		location = [lat, long];
	}
	return location;
}

function urlEncode(url, lat, long, apiKey) {
	return url+"weather?lat="+lat+"&lon"+long+"&APPID="+apiKey;
}

function getWeather() {
	apiKey = "2424676006772f485c85eb43922b62e7";
	url    = "api.openweathermap.org/data/2.5/";

	location = getLocation();
	encodedURL = urlEncode(url, location.lat, location.long, apiKey);

	$.ajax({
		url: encodedURL,
		success: function(response) {
			pr = JSON.parse(response);
			alert(pr);
		}
	});
}



function CtoF(temp) {
	return temp*(9/5) + 32;
}

function FtoC(temp) {
	return (temp - 32)*(5/9);
}

function changeScale() {
		scale = $(".scale").text();
		temp  = parseFloat($(".temp").text());

		if(scale == "C") {
			changedTemp = CtoF(temp);
			$(".day-temp").html('<sapn class="temp">'+changedTemp.toFixed(1)+'</sapn>&nbsp;<sapn class="scale">F</sapn>');
			$(".btn-scale-change").html("C");
		} else {
			changedTemp = FtoC(temp);
			$(".day-temp").html('<sapn class="temp">'+changedTemp.toFixed(1)+'</sapn>&nbsp;<sapn class="scale">C</sapn>');
			$(".btn-scale-change").html("F");
		}
}




/* MAIN FUNCTION TO LOAD ALL THE OTHER FUCTIONS */

$(function() {
	$(".btn-scale-change").click(function(){
		changeScale();
	});
});