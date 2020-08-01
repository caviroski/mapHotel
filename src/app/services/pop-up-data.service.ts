import { Injectable } from '@angular/core';

import { Observable, Observer, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpDataService {

  markers = [];
  SHOW_NUMBER_HOTELS = 3;
  hotels = [
    {
      lat: 48.1705,
      lng: 11.4616
    },
    {
      lat: 48.1505,
      lng: 11.7616
    },
    {
      lat: 48.2315,
      lng: 11.5820
    }
  ];
  directionsObservable: Observable<any>;
  hotelImage = new BehaviorSubject<string>('');
  hotelName = new BehaviorSubject<string>('');
  isPopUpHidden = true;
  distanceKm: string;

  constructor() { }

  getImageUrl(index: number): void {
    this.hotelImage.next(this.markers[index].placeResult.photos[0].getUrl({ maxWidth: 300, maxHeight: 200 }));
  }

  getHotelName(index: number): void {
    this.hotelName.next(this.markers[index].placeResult.name);
  }

  setSelectedIcon(index: number): void {
    this.allIconsToDefault();
    this.getDistanceToCenter(index);
    this.directionsObservable.subscribe(
      (response: any) => {
        this.distanceKm = response;
      }
    );
    this.markers[index].setIcon('./assets/home-active.svg');
  }

  allIconsToDefault(): void {
    for (let i = 0; i < this.SHOW_NUMBER_HOTELS; i++) {
      this.markers[i].setIcon('./assets/home.svg');
    }
  }

  getDistanceToCenter(index: number): void {
    const directionsService = new google.maps.DirectionsService();
    this.directionsObservable = Observable.create((observer: Observer<string>) => {
      directionsService.route({
        origin: {lat: 48.1351, lng: 11.5820},
        destination: {lat: this.hotels[index].lat, lng: this.hotels[index].lng},
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (String(status) === 'OK') {
          const point = response.routes[0].legs[0];
          observer.next(point.distance.text);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });
  }

}
