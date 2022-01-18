import { PkttService } from './pktt.service';
import { PKTT } from './../../models/PKTT.model';
import { DonHang } from './../../models/DonHang.model';
import { switchMap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CTDH } from './../../models/CTDH.model';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { DonHangService } from './don-hang.service';

@Injectable({
  providedIn: 'root'
})
export class CtdhService {

  constructor(private firestore: AngularFirestore, private pkttService: PkttService) { }

  public getDSCTDH(maDH:string) {
      return this.firestore
        .collection("DonHang")
        .doc(maDH)
        .collection("ChiTietDonHang")
        .get()
        .pipe<CTDH[]>(map((data) => {
          let dsCTDH: CTDH[] = [];

          data.forEach(async doc => {
            let ctdh: CTDH = {
              Ma:            doc.get("Ma"),
              MaDonHang:     doc.get("MaDonHang"),
              MaPhuKien:     doc.get("MaPhuKien"),
              Ten:           doc.get("Ten"),
              Hinh:          doc.get("Hinh"),
              Gia:           doc.get("Gia"),
              KichThuoc:       doc.get("KichThuoc"),
              SoLuong:       doc.get("SoLuong"),
              PhuKienThoiTrang: null
            }
          
            console.log(ctdh);
            await this.pkttService.getPKTT(ctdh.MaPhuKien).then((phuKien: PKTT) => {
              ctdh.PhuKienThoiTrang = phuKien;
            });

            dsCTDH.push(ctdh);
          })

        return dsCTDH;
      }));
  }

  public getCTDHInDonHang(donHang: DonHang): Promise<DonHang> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection("DonHang")
        .doc(donHang.Ma)
        .collection("ChiTietDonHang")
        .get().toPromise().then((snap) => {
          snap.forEach((doc) => {
            donHang.ChiTietDonHangs.push(doc.data() as CTDH);
          });

          resolve(donHang);
        });
    });
  }
}
