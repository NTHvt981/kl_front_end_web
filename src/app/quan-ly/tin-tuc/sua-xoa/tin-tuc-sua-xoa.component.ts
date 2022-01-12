import { MessageService } from 'primeng/api';
import { UtilService } from './../../../services/util/util.service';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { TinTucService } from '../../../services/database/tin-tuc.service';
import { TinTuc, TinTucConverter } from './../../../models/TinTuc.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Component({
  selector: 'app-tin-tuc-sua-xoa',
  templateUrl: './tin-tuc-sua-xoa.component.html',
  styleUrls: ['./tin-tuc-sua-xoa.component.css'],
  providers: [MessageService]
})
export class TinTucSuaXoaComponent implements OnInit {
  public tinTucForm: FormGroup;
  public dsTinTuc: TinTuc[]; 
  public tinTucChon: TinTuc;
  public fileHinhAnh: File;
  public urlHinhAnh: string | ArrayBuffer;

  constructor(private tinTucService: TinTucService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private messageService: MessageService) {

    //mỗi khi database thay đổi, tintuc listener trả về dãy tin tức mới
    this.tinTucService.tinTucListener.subscribe((tinTucList) => {
      this.dsTinTuc = tinTucList;
    });

    this.tinTucForm = this.formBuilder.group({
      ma: "",
      tieuDe: ["", [
        Validators.required
      ]],
      duongDan: ["", [
        Validators.required
      ]],
      noiDung: "",
    });
  }

  ngOnInit(): void {
  }

  public rowClicked() {
    this.tinTucForm.setValue({
      "ma": this.tinTucChon.Ma,
      "tieuDe": this.tinTucChon.TieuDe,
      "duongDan": this.tinTucChon.DuongDan,
      "noiDung": this.tinTucChon.NoiDung
    });

    this.urlHinhAnh = this.tinTucChon.HinhAnh;
  }
  
  get ma() {return this.tinTucForm.get("ma")}
  get tieuDe() {return this.tinTucForm.get("tieuDe")}
  get duongDan() {return this.tinTucForm.get("duongDan")}
  get noiDung() {return this.tinTucForm.get("noiDung")}

  public processFile(imageInput) {
    this.fileHinhAnh = imageInput.files[0];

    const reader = new FileReader();
  
    reader.onload = ((e) => {
      this.urlHinhAnh = e.target['result'];
    });
  
    reader.readAsDataURL(this.fileHinhAnh);
  }

  public async suaTinTuc() {
    const name: string = Date.now().toString();
    const path = "HinhTam/" + name;

    // upload file to storage
    if (this.fileHinhAnh != undefined)
    {
      await this.storage.upload(path, this.fileHinhAnh)
                  .then(async (snapShot: UploadTaskSnapshot)=> {
        console.log("Upload file hình thành công");
  
        await snapShot.ref.getDownloadURL().then((url)=>{
          this.urlHinhAnh = url;
        })
      });
    }

    let tinTucMoi: TinTuc = {
      Ma: this.ma.value,
      DuongDan: this.duongDan.value,
      NoiDung: this.noiDung.value,
      HinhAnh: this.urlHinhAnh as string,
      ThoiGianTao: this.tinTucChon.ThoiGianTao,
      TieuDe: this.tieuDe.value
    }
    this.tinTucService.suaTinTuc(tinTucMoi)
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Message', detail: 'Edit fail'});
        console.log(error);
      })
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Message', detail: 'Edit success'});
        console.log("Sửa tin tức thành công!");
      });
  }
  public xoaTinTuc() {
    this.tinTucService.xoaTinTuc(this.ma.value)
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Message', detail: 'Delete fail'});
        console.log(error);
      })
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Message', detail: 'Delete success'});
        console.log("Xóa tin tức thành công!");
        
        this.urlHinhAnh = null;
        this.tinTucForm.reset();
      });
  }
  
  public handleOnPage($event) {
    UtilService.makeRowsSameHeight();
  }
}
