import { map } from 'rxjs/operators';
import { Observable, of, from, pipe } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, CollectionReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { TinTuc } from 'src/app/models/TinTuc.model';

@Injectable({
  providedIn: 'root',
})
export class TinTucService {
  constructor(private firestore: AngularFirestore) {
  }

  public tinTucListener: Observable<TinTuc[]> = this.firestore.collection<TinTuc>("TinTuc")
                                                              .valueChanges()

  public async themTinTuc(tinTuc: TinTuc):Promise<void> {
    // nếu mã phụ kiện thời trang chưa đc khởi tạo
    if (tinTuc.Ma == null || tinTuc.Ma == "")
      tinTuc.Ma = this.firestore.createId();
    
    return this.firestore.collection("TinTuc").doc(tinTuc.Ma).set(tinTuc);
  }
  
  public suaTinTuc(tinTuc: TinTuc):Promise<void> {
    return this.firestore.collection("TinTuc").doc(tinTuc.Ma).set(tinTuc);
  }
  
  public xoaTinTuc(maTinTuc:string):Promise<void> {
    return this.firestore.collection("TinTuc").doc(maTinTuc).delete();
  }
}
