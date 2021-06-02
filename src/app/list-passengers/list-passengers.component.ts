import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IssService } from '../iss.service';

@Component({
  selector: 'app-list-passengers',
  templateUrl: './list-passengers.component.html',
  styleUrls: ['./list-passengers.component.css']
})
export class ListPassengersComponent implements OnInit, OnDestroy {

  constructor(private issService: IssService) { }

  passengersSubscription!: Subscription;
  passengersList!: any;

  ngOnInit(): void {
    this.passengersSubscription = this.issService.getPassengers().subscribe(
      (passengers) => {
        console.log(passengers);
        this.passengersList = passengers;
        this.passengersList = this.passengersList["people"];
        console.log(this.passengersList);
      },
      (err) => { console.log(err) }
    );
  }

  ngOnDestroy(): void {
    this.passengersSubscription.unsubscribe();
  }
}