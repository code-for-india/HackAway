
function hello(){
 alert("hello");
};

function initialize() {
	var mapOptions = { zoom:10,
		center: new google.maps.LatLng(13.0099197,77.5509148 )
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        directionsPanel = document.getElementById("my_textual_div");
        tsp = new BpTspSolver(map,directionsPanel);
 
        var input = document.getElementById("pac-input");
        var autocomplete= new google.maps.places.Autocomplete(input);

        var input1 = document.getElementById("pac-source");
        var autocompleteSource = new google.maps.places.Autocomplete(input1);


	google.maps.event.addListener(autocomplete, 'place_changed', function() {
       	       var gc = new google.maps.Geocoder();
               var data = document.getElementById("pac-input");
               gc.geocode({"address":data.value},function(result, sts){
				locate(result,sts);             });

        });

	google.maps.event.addListener(autocompleteSource, 'place_changed', function() {
       	       var gc = new google.maps.Geocoder();
               var data = document.getElementById("pac-source");
               gc.geocode({"address":data.value},function(result, sts){
				locateSource(result,sts);             });

        });


	function onSolveCallBack(){
		alert("Solved");
		temp = tsp.getGDirections();
		dirRenderer = new google.maps.DirectionsRenderer({
				directions: temp,
				hideRouteList: true,
				map: map,
				panel: null,
				preserveViewport: false,
				suppressInfoWindows: true,
				suppressMarkers: true });
		for (var i = 0; i < temp.routes[0].legs.length; ++i) {
			var route = temp.routes[0].legs[i];
			var myPt1 = route.end_location;
			//        if (i == dir.legs.length - 1 && mode == 0) {
			//            myIcn1 = new google.maps.MarkerImage("iconsnew/black1.png");
			//        } else {
			myIcn1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+String.fromCharCode(65+i)+"|FF0000|FFFFFF");
			//        }
			var marker = new google.maps.Marker({
					position: myPt1,
					icon: myIcn1,
					map: map });

		}
               src_marker.setPosition(arr[0].geometry.location); 

	};

        var elemLoaded=0; 
        var elemToLoad =6;
	function locate(arr,sts){
		if(sts ===  google.maps.GeocoderStatus.OK){
                  tsp.addWaypoint(arr[0].geometry.location);
		  myIcn1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+String.fromCharCode(65+3)+"|FF0000|FFFFFF");
		  var marker = new google.maps.Marker({
			position: arr[0].geometry.location,
			icon: myIcn1,
			map: map });
                   map.setCenter(arr[0].geometry.location);

		}
	        
//                elemLoaded=elemLoaded+1;
//                if(elemLoaded===elemToLoad){
//                  alert("Hi");
//		  tsp.setAvoidHighways(false);
//		  tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);
//		  tsp.solveRoundTrip(onSolveCallBack);  
//		}
	};
        var src; var src_marker=null;

	function locateSource(arr,sts){
		if(sts ===  google.maps.GeocoderStatus.OK){
                  src = arr[0].geometry.location;
		  myIcn1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+String.fromCharCode(65+18)+"|0000FF|FFFFFF");
                 if(src_marker === null){
		  src_marker = new google.maps.Marker({
			position: arr[0].geometry.location,
			icon: myIcn1,
			map: map });
                  }else{
                   src_marker.setPosition(arr[0].geometry.location); 
                  }
                   map.setCenter(arr[0].geometry.location);

		}
	        
//                elemLoaded=elemLoaded+1;
//                if(elemLoaded===elemToLoad){
//                  alert("Hi");
//		  tsp.setAvoidHighways(false);
//		  tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);
//		  tsp.solveRoundTrip(onSolveCallBack);  
//		}
	};


	function calcRoute(){
                  tsp.addWaypoint(src);
		  tsp.setAvoidHighways(false);
		  tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);
		  tsp.solveRoundTrip(onSolveCallBack);  

	};




	but = document.getElementById("calcRoute");
	but.addEventListener('click', function(event) {
			calcRoute();
			});
}




