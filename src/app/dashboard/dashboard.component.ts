import { loaiOptions } from './../models/PKTT.model';
import { CtdhService } from './../services/database/ctdh.service';
import { Observable, timer } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ThongTin, getThongTin } from "./../../app/models/ThongTin.model";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public matThongTin: ThongTin[][] = [];
  public days: number = 3;
  data: any;

  constructor(private firestore: AngularFirestore, private ctdhService: CtdhService) {
    loaiOptions.forEach((loai, index) => {
      this.matThongTin.push([])

      for (let i = 0; i < this.days; i++) {
        let thongTin: ThongTin = new ThongTin();

        thongTin.ThoiGianDatHang.setDate(thongTin.ThoiGianDatHang.getDate() - i);
        thongTin.LoaiPhuKien = loai;

        this.matThongTin[index].push(thongTin);
      }
    });
  }

  ngOnInit(): void {
    this.ctdhService.getAllCTDH().then((value) => {
      console.log("All đơn hàng: ", value);

      // console.log("Ma trận thông tin ", this.matThongTin);

      this.matThongTin.forEach((dsThongTin) => {
        dsThongTin.forEach((thongTin) => {
          getThongTin(thongTin, value);
        });
      });

      console.log("Ma trận thông tin ", this.matThongTin);

      this.data = {
        labels: [],
      }
    });
  }
}
