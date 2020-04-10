import { Component,NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  GoogleAutocomplete: any;
  geocoder: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  nearbyItems: any[];

  constructor(public zone: NgZone, public geolocation: Geolocation) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  searchLocations(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  currentLocation(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLong = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getSearchResult(item){
    this.autocompleteItems = [];
    this.autocomplete.input = item.description;
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.autocompleteItems = [];
        // this.GooglePlaces.nearbySearch({
        //   location: results[0].geometry.location,
        //   radius: '500',
        //   types: ['restaurant'],
        //   // key: 'YOUR_KEY_HERE'
        // }, (near_places) => {
        //     this.zone.run(() => {
        //       this.nearbyItems = [];
        //       for (var i = 0; i < near_places.length; i++) {
        //         this.nearbyItems.push(near_places[i]);
        //       }
        //   });
        // })
      }
    })
    console.log(item);
  }
}
