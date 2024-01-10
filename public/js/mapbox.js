/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicGFydGhwYW5kZXkiLCJhIjoiY2xwZ3VjZDdmMDF6bzJxcDBhMTYxODJlMiJ9.7wphUXvkzeD-hz3CNKwCcw';
  //'pk.eyJ1IjoicGFydGhwYW5kZXkiLCJhIjoiY2xwZ3k1d3B5MDJ1azJqbG5kZjZnY2o5cyJ9.x7Ujn_T8VOTivCxUIrye4g';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // mapbox://styles/parthpandey/clph305pu00i301qt8rhmgt28
    scrollZoom: false
    // center: [79.39366956402401, 22.6408687129152],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds(); // this bounds object here basically the area that will be displayed on the map.

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom' // It means it's the bottom of the element, which is going to be located at the exact GPS location
    })
      .setLngLat(loc.coordinates)
      .addTo(map); // It is an array of langitutde and latitude

    // add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
