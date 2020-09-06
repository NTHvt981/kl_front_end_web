import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { NguoiDung, VaiTro } from '../../models/NguoiDung.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { auth, User } from 'firebase';

// import { auth } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<NguoiDung>;

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router) {

    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return firestore.collection("NguoiDung").doc(user.uid).valueChanges();
        }
        else
          return of(null);
      })
    )
  }

  // đăng nhập
  public signIn(email:string, password:string)
  {
    this.auth.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error);
      }).then(()=> {
        this.router.navigate(["/"]);
      })
  }

  // đăng ký
  public signUp(email:string, password:string) 
  {
    this.auth.createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error);
        //ép kiểu credential
        // thiếu firebase.auth.UserCredential -> credential mặc định thuộc kiểu null
        
      })
      .then((credential: firebase.auth.UserCredential) => {
        // add account in QuanTri Collection
        this.router.navigate(['/']);
        let uid = credential.user.uid;
        let email = credential.user.email;

        let nguoiDung: NguoiDung = {
          Ma: uid,
          Email: email,
          CoVaiTro: {
            KhachHang: true,
            QuanTri: false,
          }
        };

        this.firestore.collection("NguoiDung").doc(uid).set(nguoiDung)
            .catch((error) => {
              console.log("có lỗi" + error);
            })
            .then(() => {
              console.log("Add quản trị thành công");
            });
      });
  }

  public async signOut() {
    await this.auth.signOut();
  }

  public update(user: NguoiDung) {
    const refUser = this.firestore.collection("NguoiDung").doc(user.Ma);
    refUser.set(user, {merge:true})
      .catch((error) => {
        console.log("có lỗi" + error);
      });
  }

  public isAdmin(user: NguoiDung): boolean {
    if (!user) return false
    if (user.CoVaiTro.QuanTri) return true;
    return false
  }

  public setAdmin(email:string) {
    this.firestore
      .collection<User>("NguoiDung")
      .ref.where("Email", "==", email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let ma = doc.get("Ma");
          this.firestore.collection("NguoiDung").doc(ma).update({
            "CoVaiTro": {
              "KhachHang": true,
              "QuanTri": true,
            }
          })
        })
      }).catch((error) => console.log("Error in get user " + error));
  }
}
