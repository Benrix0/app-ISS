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
  defaultCenter: boolean = true;

  myIcon = L.icon({
    iconUrl: 'https://icons-for-free.com/iconfiles/png/512/color-satellite-131994932394782384.png',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [-3, -76]
  });
  
  ngOnInit() {
    this.posisitionSubscription = this.issService.getPosition().subscribe(
      (position) => {
        this.currentPosition = position;
        this.initMap([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]]);
        this.IssMarker = L.marker([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]], { 
          icon: this.myIcon,
          title: 'title'
         });
      },
      (error) => { console.log(error); },
      () => {
        this.posisitionSubscription.unsubscribe();
      }
    )
    setInterval(() => {
      this.posisitionSubscription = this.issService.getPosition().subscribe(
        (position) => {
          this.IssMarker.remove();
          this.currentPosition = position;
          this.IssMarker = L.marker([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]], {
            icon: this.myIcon,
            title: `lat: ${this.currentPosition["iss_position"]["latitude"]} \nlng: ${this.currentPosition["iss_position"]["longitude"]}`
          });
          if (this.defaultCenter) {
            this.map.setView([this.currentPosition["iss_position"]["latitude"], this.currentPosition["iss_position"]["longitude"]]);
          };
          this.IssMarker.addTo(this.map).on("click", () => {
            this.defaultCenter = true;
          });
        },
        (error) => { console.log(error); },
        () => { this.posisitionSubscription.unsubscribe() }
      )
    }, 500)

  }

  ngOnDestroy() {
    this.posisitionSubscription.unsubscribe();
  }

  initMap(coor: any) {
    this.map = L.map('map').setView(coor, 3);
    this.map.on('drag', () => {
      this.defaultCenter = false;
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  onSetCentered(): void {
    this.defaultCenter = true;
  }
}
