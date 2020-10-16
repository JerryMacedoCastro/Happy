import Leaflet from 'leaflet';
import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [48, 58],
  iconAnchor: [29, 68],
  popupAnchor: [170, 0],
});

export default mapIcon;
