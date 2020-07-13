/**
 * Interface to store the information for the map marker
 */
export interface Marker {
  position: google.maps.LatLngLiteral;
  title: string;
  label: google.maps.MarkerLabel;
}
