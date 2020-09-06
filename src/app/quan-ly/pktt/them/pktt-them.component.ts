import { MessageService } from 'primeng/api';
import { UtilService } from './../../../services/util/util.service';
import { loaiOptions } from './../../../models/PKTT.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { PkttService } from './../../../services/database/pktt/pktt.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PKTT } from 'src/app/models/PKTT.model';

@Component({
  selector: 'app-pktt-them',
  templateUrl: './pktt-them.component.html',
  styleUrls: ['./pktt-them.component.css'],
  providers: [MessageService]
})
export class PkttThemComponent implements OnInit {
  public pkttForm: FormGroup;
  public fileHinhAnh: File;
  public loaiOptions = loaiOptions;
  private urlHinhAnh: string | ArrayBuffer;

  constructor(private formBuilder:FormBuilder,
              private pkttService: PkttService,
              private storage: AngularFireStorage,
              private messageService: MessageService) { 
    this.pkttForm = this.formBuilder.group({
      ten: ['',[
        Validators.required
      ]],
      loai: ['',[
        Validators.required
      ]],
      mau: '',
      hang: '',
      gia: [0, [
        Validators.required,
        Validators.min(0)
      ]],
      soLuong: [0, [
        Validators.required,
        Validators.min(0)
      ]],
      moTa: ''
    })
  }

  ngOnInit(): void {
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

  get ten() {return this.pkttForm.get('ten')}
  get loai() {return this.pkttForm.get('loai')}
  get mau() {return this.pkttForm.get('mau')}
  get hang() {return this.pkttForm.get('hang')}
  get gia() {return this.pkttForm.get('gia')}
  get soLuong() {return this.pkttForm.get('soLuong')}
  get moTa() {return this.pkttForm.get('moTa')}
  

  public async themPktt() { 
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
      Ma: null,
      Ten: this.ten.value,
      Loai: this.loai.value,
      Hinh: this.urlHinhAnh as string,
      Hang: this.hang.value,
      Mau: this.mau.value,
      MoTa: this.moTa.value,
      Gia: this.gia.value,
      SoLuong: this.soLuong.value
    }
    this.pkttService.themPKTT(pktt)
      //Thêm pktt LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Thêm phụ kiện thời trang lỗi'});
        console.log(error);
      })
      //Thêm pktt THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Thêm phụ kiện thời trang thành công'});
        console.log("Thêm phụ kiện thời trang thành công!");
      });
  }
  
  handleOnPage($event) {
    UtilService.makeRowsSameHeight();
  }
}
