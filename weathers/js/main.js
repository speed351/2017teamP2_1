(function () {
	window.addEventListener("tizenhwkey", function (ev) {

		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());
var my_region;

function regions() {
	var region = document.getElementById("region");
	if(region.options[region.selectedIndex].value == "empty"){
		alert("지역을 선택해주세요");
	}else {
		my_region = region.options[region.selectedIndex].value;
		alert(my_region +"(으)로 설정되었습니다.");
	}
}

$(document).ready(function($) {
	alert("weather");
	  $.ajax({
	  	// 결과를 한글로 받을 수 있다.
	  url : "http://api.wunderground.com/api/25f99b39fbc43cd7/geolookup/conditions/lang:KR/q/Korea/seoul.json",
	  dataType : "jsonp",
	  success : function(parsed_json) {
	  	 // location
	  	 var location = parsed_json.location;
	  	 var location_s= "<h6>도시명(city_name):  "+location.city+"</h6>";
		 $("#locationinfo").append(location_s);
	  	 // 관측지에 대한 정보
	  	 var observ = parsed_json.current_observation;
	  	 var observ_s;
		 $("#observinfo").append(observ_s);
		// 날씨정보
		 var weather_s = "<h6>업데이트 정보:  "+observ.observation_time+"</h6>";
		 weather_s +="<h6>현재 날씨 :  "+observ.weather+"</h6>";
		 weather_s +="<h6>현재 온도 섭씨:  "+observ.temp_c+"</h6>";
		 weather_s +="<h6>상대 습도 :  "+observ.relative_humidity+"</h6>";
		 weather_s +="<h6>바람 정보 전체 :  "+observ.wind_string+"</h6>";
		 weather_s +="<h6>풍향 :  "+observ.wind_dir+"</h6>";
		 weather_s +="<h6>풍속 (mph):  "+observ.wind_mph+"</h6>";
		 weather_s +="<h6>자외선 양:  "+observ.UV+"</h6>";
		 weather_s +="<h6>아이콘 : "+observ.icon+"</h6>";
		 weather_s +="<h6>아이콘 그림 :  "+"<img src='"+observ.icon_url+"'/></h6>";
		 $("#weatherinfo").append(weather_s);

	  }
	  });
	});