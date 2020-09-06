import { Observable, timer } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {
    // let showRandomId = timer(1000, 1000);
    // showRandomId.subscribe((value)=> {
    //   console.log(firestore.createId());
    // });
  }

  ngOnInit(): void {
    
  }
}
