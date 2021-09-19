import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CTTN } from './../../models/CTTN.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CttnService {
  private root = 'TinNhan';
  private nextRoot = 'ChiTietTinNhan';
  
  constructor(private firestore: AngularFirestore) {
  }

  readAllLive(id: string): Observable<CTTN[]> {
    return this.firestore.collection(this.root).doc(id).collection(this.nextRoot).snapshotChanges().pipe(map((snapshot => {
      let result:CTTN[] = [];

      snapshot.forEach((doc) => {
        var cttn = CTTN.fromMap(doc.payload.doc.data());

        result.push(cttn);
      });

      return result;
    })));
  }
  
  readAllOnce(id: string): Promise<CTTN[]> {
    return new Promise<CTTN[]>((resolve, reject) => {
      this.firestore.collection(this.root).doc(id).collection(this.nextRoot).get().subscribe((snapshot) => {
        let result:CTTN[] = [];
  
        snapshot.forEach((doc) => {
          var cttn = CTTN.fromMap(doc.data());
  
          result.push(cttn);
        });
  
        resolve(result);
      });
    });
  }

  public async them(cttn: CTTN):Promise<void> {
    cttn.DoQuanTriTao = true;
    
    return this.firestore.collection(this.root).doc(cttn.MaTinNhan).collection(this.nextRoot).doc(cttn.Ma).set(cttn.toMap());
  }
}
