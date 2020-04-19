import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../location.service';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  geocoder: any;
  searchInput: { value: string; };
  autocompleteItems: any[];
  searchResultItems: any[];

  constructor(private locationService: LocationService, public geolocation: Geolocation) {
    this.searchInput = { value: '' };
    this.autocompleteItems = [];
    this.searchResultItems = [1,2,3,4,5]
  }

  searchLocations(){
    // this.locationService.autoComplete(this.searchInput).subscribe((data:any[]) =>{
    //   this.autocompleteItems = data;
    //   console.log(this.autocompleteItems);
    // })
  }

  getSearchResult(item){
    this.autocompleteItems = [];
    this.searchInput.value = item.description;
    console.log(item);
  }
}
