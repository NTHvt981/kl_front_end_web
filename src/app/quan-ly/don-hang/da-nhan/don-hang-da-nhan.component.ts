import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CtdhService } from './../../../services/database/ctdh.service';
import { CTDH } from './../../../models/CTDH.model';
import { UtilService } from './../../../services/util/util.service';
import { FormGroup } from '@angular/forms';
import { DonHangTinhTrang } from './../../../models/DonHang.model';
import { DonHangService } from './../../../services/database/don-hang.service';
import { Component, OnInit } from '@angular/core';
import { DonHang } from 'src/app/models/DonHang.model';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-don-hang-da-nhan',
  templateUrl: './don-hang-da-nhan.component.html',
  styleUrls: ['./don-hang-da-nhan.component.css'],
  providers: [MessageService]
})
export class DonHangDaNhanComponent implements OnInit {
  // biến hỗ trợ danh sách dơn hàng
  public donHangForm: FormGroup;
  public dsDonHang: DonHang[];
  public donHangChon: DonHang;
  public dsDonHangChon: DonHang[];
  private donHangSubcription: Subscription = null;
  public tinhTrangOptions: string[];

  // biến hỗ trợ danh sách chi tiết dơn hàng
  public dsCtdh: CTDH[];
  public ctdhChon: CTDH;
  private ctdhSubcription: Subscription = null;

  constructor(private donHangService: DonHangService,
              private ctdhService: CtdhService,
              private formBuilder: FormBuilder,
              private messageService: MessageService) {
    
    this.donHangSubcription = donHangService
      .donHanglistener(DonHangTinhTrang.INIT)
      .subscribe((dsDonHang:DonHang[]) => {
        this.dsDonHang = dsDonHang;

        // console.log(this.dsDonHang);
        
      });

    this.donHangForm = this.formBuilder.group({
      tinhTrangTu: DonHangTinhTrang.INIT,
      tinhTrangDen: ['', [
        Validators.required,
      ]]
    });

    this.tinhTrangOptions = [
      DonHangTinhTrang.INIT,
      DonHangTinhTrang.DELIVERY,
      DonHangTinhTrang.SUCCESS,
      DonHangTinhTrang.CANCELED
    ];
  }

  // dành cho form control
  get tinhTrangTu() {return this.donHangForm.get('tinhTrangTu')}
  get tinhTrangDen() {return this.donHangForm.get('tinhTrangDen')}

  ngOnInit(): void {
  }

  thayDoiTinhTrangTu() {
    this.donHangSubcription.unsubscribe();

    this.donHangSubcription = this.donHangService
      .donHanglistener(this.tinhTrangTu.value)
      .subscribe((dsDonHang:DonHang[]) => {
        this.dsDonHang = dsDonHang;

        // console.log(this.dsDonHang);
        
      });
    console.log("Tìm theo tình trạng từ")
  }

  public chuyenTinhTrang() {
    if (this.dsDonHangChon.length == 0) return;
    this.donHangService.chuyenTinhTrangAll(this.dsDonHangChon, this.tinhTrangDen.value)
      .then((result) => {
        if (result == true) {
          this.messageService.add(
            {severity:'success', summary: 'Thông báo', detail: 'Change status successful'}
            );
        }
        else {
          this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Change status fail'});
        }

        this.tinhTrangTu.reset();
        this.dsDonHangChon = [];

        
      });
  }

  rowCthdClicked() { }

  handleOnPage($event) {
    
  }
  handleRowSelect($event) {
    console.log($event.data);
  }
  rowHoaDonClicked($event, donHang: DonHang) {
    // console.log($event);
    // console.log(value);
    let ma = donHang.Ma;

    if (this.ctdhSubcription != null) this.ctdhSubcription.unsubscribe();

    this.ctdhSubcription = this.ctdhService
      .getDSCTDH(ma)
      .subscribe((dsCTDH)=> {
        this.dsCtdh = dsCTDH;
        
        
    });
  }
}
