var GoogleMapsLoader = require('google-maps');

var $ = require('jquery');

module.exports = function(){
    
    var element = $('.map__inner');
    
    if ( !element.length ) return;
    
    GoogleMapsLoader.KEY = "AIzaSyAWcHcp64bDM-0Lx8WMEoH9Bk3mDezAjBI";
    
    GoogleMapsLoader.load(function(google) {
        
        var locations = $('.map__location').$$();
        
        var latlngs = locations.map( element => {
            
            var latlng = element.data('latlng').split(',').map( s => Number(s) );
            
            return { lat: latlng[0], lng: latlng[1] };
            
        });
        
        var center = latlngs.reduce( (memo, latlng) => {
            
            memo.lat += latlng.lat / latlngs.length;
            memo.lng += latlng.lng / latlngs.length;
            
            return memo;
            
        }, {lat: 0, lng: 0} );
        
        var map = new google.maps.Map( element[0], {
            zoom: 8,
            center,
            styles,
            disableDefaultUI: true,
            draggable: false,
            scrollwheel: false
        });
        
        function createMarker ( latlng, color, map ) {
            
            return new google.maps.Marker({
                position: latlng,
                map: null,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    strokeWeight: 0,
                    fillColor: color,
                    fillOpacity: 1
                }
            });
            
        }
        
        var markersBlue = latlngs.map( latlng => createMarker( latlng, '#007cff' ) );
        
        var markersWhite = latlngs.map( latlng => createMarker( latlng, 'black' ) );
        
        function closeLocations () {
            
            locations.forEach( location => location.addClass('hidden') );
            
            markersBlue.forEach( marker => {
                if( marker.getMap() === null ) marker.setMap( map )
            });
            
            markersWhite.forEach( marker => marker.setMap( null ) );
            
        }
        
        function openLocation ( i ) {
            
            return function() {

                closeLocations();
                
                locations[ i ].removeClass( 'hidden' );
                
                markersBlue[ i ].setMap( null );
                
                markersWhite[ i ].setMap( map );
                
            }
            
        }
        
        markersBlue.forEach( (marker, i) => marker.addListener('click', openLocation(i) ) );
        
        markersWhite.forEach( marker => marker.addListener('click', closeLocations) );
        
        closeLocations();
        
        var left = latlngs.reduce( (memo, latlng) => Math.min(memo, latlng.lng), Infinity );
        var right = latlngs.reduce( (memo, latlng) => Math.max(memo, latlng.lng), -Infinity );
        
        var width = right - left;
        var extender = {lat: latlngs[0].lat, lng: left - width * .66}
        
        function onResize() {
          
          var bounds = new google.maps.LatLngBounds();
          
          latlngs.forEach( latlng => bounds.extend( latlng ) );
          
          if( window.innerWidth > 768 ) {
            
            bounds.extend( extender );
            
          }
          
          map.fitBounds( bounds );

        }
        
        $(window).on('resize', onResize );
        
        onResize();
        
        openLocation(0)();
        
    });
    
};

var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]