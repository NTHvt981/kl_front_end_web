import { UtilService } from './../../../services/util/util.service';
import { TinTucService } from './../../../services/database/tin-tuc/tin-tuc.service';
import { TinTuc } from './../../../models/TinTuc.model';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tin-tuc-them',
  templateUrl: './tin-tuc-them.component.html',
  styleUrls: ['./tin-tuc-them.component.css'],
  providers: [MessageService]
})
export class TinTucThemComponent implements OnInit {
  public tinTucForm: FormGroup;
  public isUploading: boolean;
  public fileHinhAnh: File;
  private urlHinhAnh: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder,
              private tinTucService: TinTucService,
              private storage: AngularFireStorage,
              private messageService: MessageService) {

    this.tinTucForm = this.formBuilder.group({
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

  public async themTinTuc() {
    const name: string = Date.now().toString();
    const path = "TinTuc/" + name;

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
    const tinTuc:TinTuc = {
      Ma: name,
      TieuDe: this.tieuDe.value,
      DuongDan: this.duongDan.value,
      HinhAnh: this.urlHinhAnh as string,
      NoiDung: this.noiDung.value,
      ThoiGianTao: Date().toString()
    }
    await this.tinTucService.themTinTuc(tinTuc)
      //Thêm tin tức LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Thêm tin tức lỗi'});
        console.log(error);
      })
      //Thêm tin tức THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Thông báo', detail: 'Thêm tin tức thành công'});
        console.log("Thêm tin tức thành công!");
      });

    this.tinTucForm.reset();
  }
}
