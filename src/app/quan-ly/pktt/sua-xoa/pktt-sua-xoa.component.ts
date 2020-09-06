import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';
import { loaiOptions } from './../../../models/PKTT.model';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UtilService } from './../../../services/util/util.service';
import { PkttService } from './../../../services/database/pktt/pktt.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PKTT } from 'src/app/models/PKTT.model';

@Component({
  selector: 'app-pktt-sua-xoa',
  templateUrl: './pktt-sua-xoa.component.html',
  styleUrls: ['./pktt-sua-xoa.component.css'],
  providers: [MessageService]
})
export class PkttSuaXoaComponent implements OnInit {
  public pkttForm: FormGroup;
  public dsPktt: PKTT[];
  public pkttChon: PKTT;
  public loaiOptions = loaiOptions;
  public fileHinhAnh: File;
  public urlHinhAnh: string | ArrayBuffer;
  public oldUrlHinhAnh: string | ArrayBuffer;

  constructor(private pkttService:PkttService,
              private formBuilder:FormBuilder,
              private storage:AngularFireStorage,
              private messageService:MessageService) { 
    pkttService.pkttListener.subscribe(( dsPktt: PKTT[]) => {
      this.dsPktt = dsPktt;
      UtilService.makeRowsSameHeight();
    });

    this.pkttForm = this.formBuilder.group({
      ma: ['',[Validators.required]],
      ten: ['',[Validators.required]],
      loai: ['',[Validators.required]],
      mau: '',
      hang: '',
      gia: [0, [
        Validators.required,
        Validators.min(0)]],
      soLuong: [0, [
        Validators.required,
        Validators.min(0)]],
      moTa: ''
    });
  }

  ngOnInit(): void {
  }

  get ma() {return this.pkttForm.get('ma')}
  get ten() {return this.pkttForm.get('ten')}
  get loai() {return this.pkttForm.get('loai')}
  get mau() {return this.pkttForm.get('mau')}
  get hang() {return this.pkttForm.get('hang')}
  get gia() {return this.pkttForm.get('gia')}
  get soLuong() {return this.pkttForm.get('soLuong')}
  get moTa() {return this.pkttForm.get('moTa')}

  public rowClicked() {
    console.log(this.pkttChon);

    this.pkttForm.setValue({
      "ma": this.pkttChon.Ma,
      "ten": this.pkttChon.Ten,
      "loai": this.pkttChon.Loai,
      "mau": this.pkttChon.Mau,
      "hang": this.pkttChon.Hang,
      "gia": this.pkttChon.Gia,
      "soLuong": this.pkttChon.SoLuong,
      "moTa": this.pkttChon.MoTa
    });

    this.urlHinhAnh = this.pkttChon.Hinh;
  }

  public processFile(imageInput) {
    console.log(imageInput);

    this.fileHinhAnh = imageInput.files[0];

    const reader = new FileReader();
  
    reader.onload = ((e) => {
      this.urlHinhAnh = e.target['result'];
    });
  
    reader.readAsDataURL(this.fileHinhAnh);
  }

  public async suaPktt() {
    const name: string = Date.now().toString();
    const path = "PhuKienThoiTrang/" + name;

    // upload file to storage
    if (this.fileHinhAnh != undefined)
    {
      await this.storage.upload(path, this.fileHinhAnh)
                  .then(async (snapShot: firebase.storage.UploadTaskSnapshot)=> {
        console.log("Upload file hình thành công");
  
        await snapShot.ref.getDownloadURL().then((url)=>{
          this.urlHinhAnh = url;
        })
      });
    }

    // thêm tin tức vào firestore
    const pktt:PKTT = {
      Ma: this.ma.value,
      Ten: this.ten.value,
      Loai: this.loai.value,
      Hinh: this.urlHinhAnh as string,
      Hang: this.hang.value,
      Mau: this.mau.value,
      MoTa: this.moTa.value,
      Gia: this.gia.value,
      SoLuong: this.soLuong.value
    }

    this.pkttService.suaPKTT(pktt)
      //Sửa pktt LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Sửa phụ kiện thời trang lỗi'});
        console.log(error);
      })
      //Sửa pktt THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Sửa phụ kiện thời trang thành công'});
        console.log("Sửa phụ kiện thời trang thành công!");
      });
  }
  
  public xoaPktt() {
    this.pkttService.xoaPKTT(this.ma.value)
      //Xóa pktt LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Xóa phụ kiện thời trang lỗi'});
        console.log(error);
      })
      //Xóa pktt THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Xóa phụ kiện thời trang thành công'});
        console.log("Xóa phụ kiện thời trang thành công!");

        this.urlHinhAnh = null;
        this.pkttForm.reset();
      });
  }
  
  handleOnPage($event) {
    UtilService.makeRowsSameHeight();
  }
}
