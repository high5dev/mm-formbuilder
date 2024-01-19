import { GiConsoleController } from "react-icons/gi";

// This is our custom script (avoid using arrow functions)
const script = function(props) {
  var mapProp= {
    center:new google.maps.LatLng(37.7749295, -122.4194155),
    zoom: 2,
  };
  var map = new google.maps.Map(this.querySelector(".googleMap"),mapProp);

  var geocoder = new google.maps.Geocoder();var geocoder = new google.maps.Geocoder();
  for (let i = 0; i < props.addresses.length; i++) {
    const addr = props.addresses[i];
    geocoder.geocode({
      "address": addr
    }, function(results) {
        console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        const position = { position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}, map: map };
        const marker = new google.maps.Marker(position);
    });
  }
};

let map = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('map-location')),
  model: {
    defaults: {
      script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      selectable:true,
      attributes: { class: 'map-location' },
      components: [{
        tagName: 'div',
        components: '',
        hoverable: false,
        badgable: false,
        draggable: false,
        droppable: false,
        selectable: false,
        attributes: { class: 'googleMap' }
      },
    ],
      styles: `
        .map-location {width: 100%;}
        .googleMap {width: 100%; height: 400px;}
      `,
      addresses: ["San Francisco"],
      traits: [
        {
          type: 'addresses',
          name: 'addresses',
          label: 'Addresses',
          changeProp: true,
        },
      ],
      'script-props': ['addresses'],
    }
  },
};

export default map;
