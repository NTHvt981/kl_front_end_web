import { map } from 'rxjs/operators';
import { PKTT } from './../../../models/PKTT.model';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PkttService {

  constructor(private firestore: AngularFirestore) { }
  
  public pkttListener: Observable<PKTT[]> = 
    this.firestore.collection<PKTT>("PhuKienThoiTrang")
      .valueChanges()

  public themPKTT(pktt: PKTT):Promise<void> {
    // nếu mã phụ kiện thời trang chưa đc khởi tạo
    pktt.Ma = this.firestore.createId();

    return this.firestore.collection("PhuKienThoiTrang")
      .doc(pktt.Ma)
      .set(pktt);
  }
  
  public suaPKTT(pktt: PKTT):Promise<void> {
    return this.firestore.collection("PhuKienThoiTrang")
      .doc(pktt.Ma)
      .set(pktt);
  }
  
  public xoaPKTT(maPKTT:string):Promise<void> {
    return this.firestore.collection("PhuKienThoiTrang")
      .doc(maPKTT)
      .delete();
  }
}
