import { Component, OnDestroy, OnInit } from '@angular/core';
import { IssService } from './iss.service';
import { Subscription } from 'rxjs/Subscription';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private issService: IssService) { }

  map!: any;
  posisitionSubscription!: Subscription;
  currentPosition!: any;
  IssMarker!: any;
  myIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios/452/satellite.png',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [-3, -76]
});



  ngOnInit() {
    this.posisitionSubscription = this.issService.getPosition().subscribe(
      (position) => {
        this.currentPosition = position;
        this.initMap([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]]);
        this.IssMarker = L.marker([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]], {icon: this.myIcon});
      },
      (error) => {console.log(error);},
      () => {
        this.posisitionSubscription.unsubscribe();
      }
    )
    setInterval(() => {
      this.posisitionSubscription = this.issService.getPosition().subscribe(
        (position) => {
          this.IssMarker.remove();
          this.currentPosition = position;
          this.IssMarker = L.marker([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]], {icon: this.myIcon});
          this.IssMarker.addTo(this.map);
        },
        (error) => {console.log(error);},
        () => {this.posisitionSubscription.unsubscribe()}
      )
    }, 500)
    
  }

  ngOnDestroy() {
    this.posisitionSubscription.unsubscribe();
  }

  initMap(coor: any) {
    this.map = L.map('map').setView(coor, 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  
}
