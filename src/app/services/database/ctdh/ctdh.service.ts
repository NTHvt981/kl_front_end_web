import { switchMap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CTDH, CTDHConverter } from './../../../models/CTDH.model';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtdhService {

  constructor(private firestore: AngularFirestore) { }

  public getDSCTDH(maDH:string) {
    
      return this.firestore
        .collection("ChiTietDonHang")
        .doc(maDH)
        .collection("ChiTietDonHang")
        .get()
        .pipe<CTDH[]>(map((data) => {
          let dsCTDH: CTDH[] = [];

          data.forEach(doc => {
            dsCTDH.push({
              Ma:            doc.get("Ma"),
              MaDonHang:     doc.get("MaDonHang"),
              MaPhuKien:     doc.get("MaPhuKien"),
              Ten:           doc.get("Ten"),
              Loai:          doc.get("Loai"),
              Hinh:          doc.get("Hinh"),
              Gia:           doc.get("Gia"),
              Hang:          doc.get("Hang"),
              Mau:           doc.get("Mau"),
              MoTa:          doc.get("MoTa"),
            })
          })

          return dsCTDH;
        }));
  }
}
