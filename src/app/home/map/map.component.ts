import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { PopUpDataService } from '../../services/pop-up-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  marker: google.maps.Marker;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  lat = 48.1351;
  lng = 11.5820;
  places: any;

  constructor(
    private popUpDataService: PopUpDataService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = {
      center: this.coordinates,
      zoom: 10,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map
    });
    this.marker.setMap(this.map);
    this.places = new google.maps.places.PlacesService(this.map);
    for (let i = 0; i < this.popUpDataService.SHOW_NUMBER_HOTELS; i++) {
      this.search(this.popUpDataService.hotels[i].lat, this.popUpDataService.hotels[i].lng, i);
    }
  }

  search(lat: number, lng: number, index: number): void {
    const loc = new google.maps.LatLng(lat, lng);
    const search = {
      types: ['lodging'],
      location: loc,
      radius: '5000'
    };

    this.places.nearbySearch(search, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          const markerIcon = './assets/home.svg';
          this.popUpDataService.markers[index] = new google.maps.Marker({
            position: results[index].geometry.location,
            animation: google.maps.Animation.DROP,
            icon: markerIcon
          });
          this.popUpDataService.markers[index].placeResult = results[index];
          google.maps.event.addListener(this.popUpDataService.markers[index], 'click', () => { this.showPopUp(index); });
          setTimeout(this.dropMarker(index), index * 100);
      }
    });
  }

  dropMarker(i: number): any {
    return () => {
      this.popUpDataService.markers[i].setMap(this.map);
    };
  }

  showPopUp(index: any): any {
    this.popUpDataService.isPopUpHidden = false;
    this.popUpDataService.setSelectedIcon(index);
    this.popUpDataService.getImageUrl(index);
    this.popUpDataService.getHotelName(index);
  }

}
