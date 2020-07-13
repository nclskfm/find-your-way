/**
 * location interface to store the uploaded csv data
 */
export interface Location {
  id: number;
  msgLocation: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  latitude: number;
  longitude: number;
}
