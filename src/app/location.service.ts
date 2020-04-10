import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  GoogleAutocomplete: any;
  geocoder: any;
  autocompleteItems: any[];

  constructor(public zone: NgZone, public geolocation: Geolocation) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
    this.autocompleteItems = [];
   }

  autoComplete(search){
    if (search.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: search.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLong = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
