// TODO: Create a map variable
     var map;
     var markers = [];
     
     // TODO: Complete the following function to initialize the map
     function initMap() {

        var styles = [
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#bfffdf"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#c5c5c5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#5ad35e"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#c0c0c0"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffe706"
              },
              {
                "weight": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#ffe706"
              },
              {
                "weight": 0.5
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
              {
                "color": "#8f8f47"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ceceff"
              }
            ]
          }
        ];

        var india = new google.maps.LatLng(17.33012907,78.58177185);
        
         // TODO: use a constructor to create a new map JS object. You can use the coordinates
         // we used, 40.7413549, -73.99802439999996 or your own!
        map = new google.maps.Map(document.getElementById('map'),{center: india,zoom: 11,styles:styles});
        var zoomAutocomplete = new google.maps.places.Autocomplete(document.getElementById('zoomtext'));
        var timeAutocomplete = new google.maps.places.Autocomplete(document.getElementById('searchtext'));
        var model = {
           locations: [
                       {title: 'Golconda', location:{lat:17.38333385, lng:78.40104461}},
                       {title: 'Charminar', location:{lat:17.3615636, lng:78.4746645}},
                       {title: 'Ramoji Film City', location:{lat:17.25410515,lng:78.68082047}},
                       {title: 'Falaknuma Palace', location:{lat:17.33150785,lng:78.466115}},
                       {title: 'Buddha Statue', location:{lat:17.4155731,lng:78.4749823}}
                       ],
            /*contents: ['Golkonda is a citadel and fort in Hyderabad and was the capital of the medieval sultanate of the Qutb Shahi dynasty.',
               'The Charminar is a monument and mosque located in Hyderabad and is listed among the most recognized structures of India.',
                'The Ramoji Film City, At 2000 acres, is the largest studio complex in the world.',
                'Falaknuma palace of Hyderabad was built by Nawab Vikar-ul-Umra, means "Like the Sky" in Urdu.',
                'The Buddha Statue is the worlds tallest monolith of Gautama Buddha.']*/
            };
      for(var i = 0; i < model.locations.length; i++){
          var titles = model.locations[i].title;
          var positions = model.locations[i].location;
          //set marker
          var marker = new google.maps.Marker({
            position: positions,
            title: titles,
            gestureHandling: 'cooperative',
            animation: google.maps.Animation.DROP
            });
          // push each marker in to markers array
          markers.push(marker);
          //declaring the content
          var content = model.locations[i].title;
          //initilize the streetview service
          var streetview = new google.maps.StreetViewService();
          var radius = 150;
          
          //infowindow class to show information
          var infowindow = new google.maps.InfoWindow({maxWidth: 200});
          //Event Listener when clicked on marker display info window
          marker.addListener('click',(function(marker,content,map){
              return function(){
              infowindow.setContent(content);
              infowindow.open(map,marker);};
            })(marker,content,map));
      }
    }
    //show markers when button clicked
    document.getElementById('show').addEventListener('click',show);
    function show(){
          for (var i = 0; i < markers.length; i++){
            markers[i].setMap(map);
          }
        }
    //hide markers when button clicked
    document.getElementById('hide').addEventListener('click',hide);
    function hide(){
          for (var i = 0; i < markers.length; i++){
            markers[i].setMap(null);
            //set markers are to null(empty markers array)
          }
        }
    //zoom area function using geocode
    document.getElementById('zoombtn').addEventListener('click',geocode);
    function geocode(){
      var geocoder = new google.maps.Geocoder();
      var address = document.getElementById('zoomtext').value;

      if(address == ""){
        window.alert("Please enter some address");
      }
      else{
        geocoder.geocode(
          {address: address},
          function(results,status){
            if(status == google.maps.GeocoderStatus.OK){
              map.setCenter(results[0].geometry.location);
              map.setZoom(15);
            }else{
              window.alert('Address: \"'+address+'\" cannot be found');
            }
            
          });
      }
    }
    //google distance api
    /*document.getElementById('calcdist').addEventListener('click',calculatedistance);

    function calculatedistance(){
      var address = document.getElementById('searchtext').value;
      var origins=[];
      var destination = address;
      var distanceapi = new google.maps.
    }*/