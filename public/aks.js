
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
			myIcn1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+(i).toString()+"|FF0000|FFFFFF");
			//        }
			var marker = new google.maps.Marker({
					position: myPt1,
					icon: myIcn1,
					map: map });

		}
       
 			myIcn1 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+String.fromCharCode(65+18)+"|0000FF|FFFFFF");       
			var marker = new google.maps.Marker({
					position: src,
					map: map,
                                         icon:myIcn1 });

                    spinner.stop()
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
                  var input1 = document.getElementById("pac-input");
                 input.value ="";

		}
	        
//                elemLoaded=elemLoaded+1;
//                if(elemLoaded===elemToLoad){
//                  alert("Hi");
//		  tsp.setAvoidHighways(false);
//		  tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);
//		  tsp.solveRoundTrip(onSolveCallBack);  
//		}
	};
        var src=null; var src_marker=null;

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
         
        function addSpinner(){

		var opts = {
       lines: 7, // The number of lines to draw
       length: 20, // The length of each line
       width: 10, // The line thickness
       radius: 30, // The radius of the inner circle
       corners: 1, // Corner roundness (0..1)
       rotate: 0, // The rotation offset
       direction: 1, // 1: clockwise, -1: counterclockwise
       color: '#000', // #rgb or #rrggbb or array of colors
       speed: 1, // Rounds per second
       trail: 60, // Afterglow percentage
       shadow: false, // Whether to render a shadow
       hwaccel: false, // Whether to use hardware acceleration
       className: 'spinner', // The CSS class to assign to the spinner
       zIndex: 2e9, // The z-index (defaults to 2000000000)
       top: '50%', // Top position relative to parent
       left: '50%' // Left position relative to parent
		};
		var target = document.getElementById('form');
		spinner = new Spinner(opts).spin(target); 


	}

	function calcRoute(){
                  if(src === null){
                     alert("Please metion the source");
                     return;
                   }
                  tsp.addWaypoint(src);
		  tsp.setAvoidHighways(false);
		  tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);
                  addSpinner();
		  tsp.solveRoundTrip(onSolveCallBack);  

	};




	but = document.getElementById("calcRoute");
	but.addEventListener('click', function(event) {
			calcRoute();
			});


document.getElementById('files').addEventListener('change', handleFileSelect, false);


output = {}

   function calcRouteAks(){
      select = document.getElementById("routeSelect");
      var rtName = select.value;
      var schools = output[rtName].schools;
      var kitchen = output[rtName].kitchen;
      tsp.addWaypoint(new google.maps.LatLng(parseFloat(kitchen[0]),parseFloat(kitchen[1])));
      src = new google.maps.LatLng(parseFloat(kitchen[0]),parseFloat(kitchen[1]));    
      var gc = new google.maps.Geocoder();

      gc.geocode({"location":src},function(result, sts){
		      if(sts ===  google.maps.GeocoderStatus.OK){
		      src= result[0].geometry.location;
		      }
		      });


      for(i=0;i<schools.length;i++){
   //      if(schools[i][0] or schools[i][1] ) {
   //        continue;
    //     }
         tsp.addWaypoint(new google.maps.LatLng(parseFloat(schools[i][0]),parseFloat(schools[i][1])));
      }      
      tsp.setAvoidHighways(false);
      tsp.setTravelMode(google.maps.DirectionsTravelMode.DRIVING);
      tsp.solveRoundTrip(onSolveCallBack);  
   };



function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            if(isNaN(parseInt(data[3]))) {console.log("Worked");continue;}
            if(isNaN(parseInt(data[4]))) {continue;}

            if(output[data[7]] == undefined ) output[data[7]]={"schools":[],"kitchen":null}
            output[data[7]]["schools"].push([data[3],data[4]])
            output[data[7]]["kitchen"]=[data[9],data[10]]

        }
    }

   var aks = document.getElementsByClassName("two");
   var select =document.createElement('select');
   select.id="routeSelect";
   for(var i in output) {
    var option = document.createElement('option');
    option.text = i;
    select.add(option, 0);
   }

   var btn = document.createElement('input');
   btn.setAttribute('type','button');
   btn.setAttribute('name','button');
   btn.setAttribute('value','Route');
   btn.setAttribute('id','aksButton');
  
   aks.item().appendChild(select);
   aks.item().appendChild(btn);
   btn = document.getElementById("aksButton");
   btn.addEventListener('click', function(event) {
			calcRouteAks();
			});

}


 function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    f = files[0];
//    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                    f.size, ' bytes, last modified: ',
//                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                   '</li>');
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e){
      var data = e.target.result;
       processData(data);
     };
    reader.readAsText(f);
//    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }



}




