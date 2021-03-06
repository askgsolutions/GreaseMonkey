import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

declare var google: any;

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
   }

  autoComplete(searchInput): Observable<any[]>{
    return new Observable(observer => {
      if (searchInput.value != '') {
        this.GoogleAutocomplete.getPlacePredictions({ input: searchInput.value },
        (predictions, status) => {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        });
      }

      observer.next(this.autocompleteItems);
    });
  }

  getLocation(): Observable<any>{
    return new Observable(observer => {
      this.geolocation.getCurrentPosition().then((position) => {
        let latLong = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        observer.next(latLong);
      });
    });
  }

  nearbySearch(location): void {
    this.geocoder.geocode({'placeId': location.place_id}, (results, status) => {
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
  }
}
