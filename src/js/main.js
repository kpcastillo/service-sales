
import { initMap } from "./address";
const helloNode = document.createElement("h1");

document.getElementById('content').appendChild(helloNode);
helloNode.textContent = "Hello from JavaScript!";

initMap();
//import { initMap } from "./address.js";

import { APILoader } from "@googlemaps/js-api-loader";

const CONFIGURATION = {
  "ctaTitle": "Checkout",
  "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":false,"mapTypeControl":false,"streetViewControl":false,"zoom":16,"zoomControl":true,"maxZoom":22,"mapId":""},
  "mapsApiKey": "AIzaSyALbB99cOQM6d4WIgh4-Vunctftsal7ZSY"
};