import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DonHang, DonHangConverter } from './../../../models/DonHang.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonHangService {

  constructor(private firestore: AngularFirestore) { }

  public donHanglistener(trang_thai:string): Observable<DonHang[]> {
    let beSubject = new BehaviorSubject(trang_thai);

    if (trang_thai == null || trang_thai == "")
      return beSubject.pipe<DonHang[]>(
        switchMap(tinhTrang => 
          this.firestore.collection<DonHang>('DonHang').valueChanges()
        )
      );
    else
      return beSubject.pipe<DonHang[]>(
        switchMap(tinhTrang => 
          this.firestore.collection<DonHang>(
            'DonHang', ref=>ref.where("TinhTrang", "==", tinhTrang))
            .valueChanges()
        )
      );
  }

  public async chuyenTinhTrang(dsDonHang:DonHang[], tinhTrangDen:string): Promise<boolean> {
    let result = true;

    dsDonHang.forEach(async donHang => {
      await this.firestore.collection("DonHang").doc(donHang.Ma).update({
        "TinhTrang": tinhTrangDen
      })
      .catch((error)=> {
        result = false;
        console.log(error);
      })
      .then(()=>{console.log("Chuyển trạng thái thành công")})
    });

    return result;
  }
}
