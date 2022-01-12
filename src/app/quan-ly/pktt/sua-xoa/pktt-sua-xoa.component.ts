import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { enLoaiOptions, loaiOptions } from './../../../models/PKTT.model';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UtilService } from './../../../services/util/util.service';
import { PkttService } from './../../../services/database/pktt.service';
import { FormGroup } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PKTT } from 'src/app/models/PKTT.model';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Component({
  selector: 'app-pktt-sua-xoa',
  templateUrl: './pktt-sua-xoa.component.html',
  styleUrls: ['./pktt-sua-xoa.component.css'],
  providers: [MessageService]
})
export class PkttSuaXoaComponent implements OnInit, AfterViewInit {
  public pkttForm: FormGroup;
  public dsPktt: PKTT[];
  public pkttChon: PKTT;
  public loaiOptions = loaiOptions;
  public enLoaiOptions = enLoaiOptions;
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
    
    //ar
    this.leftOffset = this.pkttChon.OffsetTrai;
    this.rightOffset = this.pkttChon.OffsetPhai;
    this.topOffset = this.pkttChon.OffsetTren;
    this.bottomOffset = this.pkttChon.OffsetDuoi;
    this.draw();
  }

  public async processFile(imageInput) {
    console.log(imageInput);

    this.fileHinhAnh = imageInput.files[0];

    // const reader = new FileReader();
  
    // reader.onload = ((e) => {
    //   this.urlHinhAnh = e.target['result'];
    // });
  
    // reader.readAsDataURL(this.fileHinhAnh);
    
    const name: string = Date.now().toString();
    const path = "PhuKienThoiTrang/" + name;
    await this.storage.upload(path, this.fileHinhAnh).then(async (snapShot: UploadTaskSnapshot)=> {
      console.log("Upload file hình thành công");

      await snapShot.ref.getDownloadURL().then((url)=>{
        this.urlHinhAnh = url;
      })
    });
  }

  public async suaPktt() {

    // upload file to storage
    if (this.fileHinhAnh != undefined)
    {
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
      SoLuong: this.soLuong.value,

      //ar
      OffsetTrai: this.leftOffset,
      OffsetPhai: this.rightOffset,
      OffsetTren: this.topOffset,
      OffsetDuoi: this.bottomOffset,
    }

    this.pkttService.suaPKTT(pktt)
      //Sửa pktt LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Message', detail: 'Edit fail'});
        console.log(error);
      })
      //Sửa pktt THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Message', detail: 'Edit success'});
        console.log("Sửa phụ kiện thời trang thành công!");
      });
  }
  
  public xoaPktt() {
    this.pkttService.xoaPKTT(this.ma.value)
      //Xóa pktt LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Message', detail: 'Delete fail'});
        console.log(error);
      })
      //Xóa pktt THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Message', detail: 'Delete success'});
        console.log("Xóa phụ kiện thời trang thành công!");

        this.urlHinhAnh = null;
        this.pkttForm.reset();
      });
  }
  
  handleOnPage($event) {
    UtilService.makeRowsSameHeight();
  }

  // ------------------------------AR section -----------------------------
  public leftOffset = 0;
  public rightOffset = 0;
  public topOffset = 0;
  public bottomOffset = 0;
  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;
  /** Canvas 2d context */
  ngAfterViewInit(): void {
    this.canvas = this.canvasEl.nativeElement as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.context.save();
  }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  /**
   * Draws something using the context we obtained earlier on
   */
  private draw() {
    if (this.urlHinhAnh != '') {
      const img = new Image(); //Create a background image
      const ctx = this.context;
      const canvas = this.canvas;
      img.src = this.urlHinhAnh.toString();

      const leftOffset = this.leftOffset;
      const rightOffset = this.rightOffset;
      const topOffset = this.topOffset;
      const bottomOffset = this.bottomOffset;

      img.onload = function() {
        let height = 0;
        let width = 0;

        if (img.width > canvas.width) {
          width = canvas.width;
          height = width / img.width * img.height;
        } else {
          height = canvas.height;
          width = height / img.height * img.width;
        }

        //reset
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fill();

        //draw pktt image
        ctx.drawImage(img, 
          0, 0, img.width, img.height, 
          0, 0, width, height
          );
        
        //calculate offset
        const left = width * leftOffset;
        const right = width * (1 - rightOffset);
        const top = height * topOffset;
        const bottom = height * (1 - bottomOffset);
        
        //Draw offset line
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(right, top);
        ctx.lineTo(right, bottom);
        ctx.lineTo(left, bottom);
        ctx.lineTo(left, top);
        ctx.fillStyle = 'red';
        ctx.stroke(); 
      }
    }
  }

  drawCanvas($event) {
    this.draw();
  }
}
