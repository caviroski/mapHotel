import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { PopUpDataService } from '../../services/pop-up-data.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  hotelImageSrc: string;
  hotelName: string;

  constructor(public popUpDataService: PopUpDataService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.popUpDataService.hotelImage.subscribe(
      result => {
        this.hotelImageSrc = result;
      },
      error => {
        console.log('No image ' + error);
      }
    );
    this.popUpDataService.hotelName.subscribe(
      result => {
        this.hotelName = result;
      },
      error => {
        console.log('No name ' + error);
      }
    );
  }

  book(): void {
    console.log('Book a room');
  }

}
