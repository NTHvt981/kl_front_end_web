import { MessageService } from 'primeng/api';
import { UtilService } from './../../../services/util/util.service';
import { loaiOptions, phanLoaiOptions } from './../../../models/PKTT.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PkttService } from './../../../services/database/pktt.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { PKTT } from 'src/app/models/PKTT.model';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Component({
  selector: 'app-pktt-them',
  templateUrl: './pktt-them.component.html',
  styleUrls: ['./pktt-them.component.css'],
  providers: [MessageService]
})
export class PkttThemComponent implements OnInit, AfterViewInit {
  public pkttForm: FormGroup;
  public fileHinhAnh: File;
  public loaiOptions = loaiOptions;
  public phanLoaiOptions = phanLoaiOptions;
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
      phanLoai: ['',[Validators.required]],
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
      moTa: '',
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
  get phanLoai() {return this.pkttForm.get('phanLoai')}
  get mau() {return this.pkttForm.get('mau')}
  get hang() {return this.pkttForm.get('hang')}
  get gia() {return this.pkttForm.get('gia')}
  get soLuong() {return this.pkttForm.get('soLuong')}
  get moTa() {return this.pkttForm.get('moTa')}
  get trai() {return this.pkttForm.get('trai')}
  

  public async themPktt() { 
    const name: string = Date.now().toString();
    const path = "PhuKienThoiTrang/" + name;

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

    // thêm tin tức vào firestore
    const pktt:PKTT = {
      Ma: null,
      Ten: this.ten.value,
      Loai: this.loai.value,
      PhanLoai: this.phanLoai.value,
      Hinh: this.urlHinhAnh as string,
      Hang: this.hang.value,
      Mau: this.mau.value,
      MoTa: this.moTa.value,
      Gia: this.gia.value,
      SoLuong: this.soLuong.value,

      //for ar
      OffsetTrai: this.leftOffset,
      OffsetPhai: this.rightOffset,
      OffsetTren: this.topOffset,
      OffsetDuoi: this.bottomOffset,
    }
    this.pkttService.themPKTT(pktt)
      //Thêm pktt LỖI
      .catch((error) => {
        this.messageService.add({severity:'error', summary: 'Message', detail: 'Add fail'});
        console.log(error);
      })
      //Thêm pktt THÀNH CÔNG
      .then(() => {
        this.messageService.add({severity:'success', summary: 'Message', detail: 'Add success'});
        console.log("Add success!");
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

        ctx.drawImage(img, 
          0, 0, img.width, img.height, 
          0, 0, width, height
          );

        const left = width * leftOffset;
        const right = width * (1 - rightOffset);
        const top = height * topOffset;
        const bottom = height * (1 - bottomOffset);

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
