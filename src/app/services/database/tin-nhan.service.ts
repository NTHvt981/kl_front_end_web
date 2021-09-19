import { TinNhan } from './../../models/TinNhan.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TinNhanService {
  private collection: AngularFirestoreCollection<TinNhan>;
  
  constructor(private firestore: AngularFirestore) {
    this.collection = this.firestore.collection('TinNhan');
  }

  public TinNhanListener: Observable<TinNhan[]> = this.firestore.collection<TinNhan>("TinNhan")
                                                              .valueChanges();

  readAllLive(): Observable<TinNhan[]> {
    return this.collection.snapshotChanges().pipe(map((snapshot => {
      let result:TinNhan[] = [];

      snapshot.forEach((doc) => {
        var tinNhan = TinNhan.fromMap(doc.payload.doc.data());

        result.push(tinNhan);
      });

      return result;
    })));
  }
  
  readAllOnce(): Promise<TinNhan[]> {
    return new Promise<TinNhan[]>((resolve, reject) => {
      this.collection.get().subscribe((snapshot) => {
        let result:TinNhan[] = [];
  
        snapshot.forEach((doc) => {
          var tinNhan = TinNhan.fromMap(doc.data());
  
          result.push(tinNhan);
        });
  
        resolve(result);
      });
    });
  }

  public async themTinNhan(tinNhan: TinNhan):Promise<void> {
    tinNhan.DoQuanTriTao = true;
    tinNhan.MaNguoiTao = '';
    tinNhan.TenNguoiTao = 'Quản trị';
    
    return this.firestore.collection("TinNhan").doc(tinNhan.Ma).set(tinNhan.toMap());
  }

  public async closeTinNhan(tinNhan: TinNhan):Promise<void> {
    return this.firestore.collection("TinNhan").doc(tinNhan.Ma).update({'KetThuc': true});
  }
}
