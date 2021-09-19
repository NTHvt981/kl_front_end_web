import { Subscription } from 'rxjs';
import { CTTN } from './../../../models/CTTN.model';
import { CttnService } from './../../../services/database/cttn.service';
import { UtilService } from './../../../services/util/util.service';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TinNhanService } from './../../../services/database/tin-nhan.service';
import { TinNhan } from './../../../models/TinNhan.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xem-tin-nhan',
  templateUrl: './xem-tin-nhan.component.html',
  styleUrls: ['./xem-tin-nhan.component.css'],
  providers: [MessageService]
})
export class XemTinNhanComponent implements OnInit {
  public dsTinNhan: TinNhan[]; 
  public dsCTTN: CTTN[]; 
  public tinNhanChon: TinNhan;
  public fileHinhAnh: File;
  public urlHinhAnh: string | ArrayBuffer;
  private cttnSubcription: Subscription = null;
  public replyText: string;

  constructor(
    private tinNhanService: TinNhanService,
    private cttnService: CttnService,
    private storage: AngularFireStorage,
    private messageService: MessageService
    ) { 
      this.tinNhanService.readAllLive().subscribe((tinNhanList) => {
        this.dsTinNhan = tinNhanList;

        console.log(tinNhanList[0].ThoiGianTao);
      });
    }

  ngOnInit(): void {
  }

  public rowClicked() {
    console.log(this.tinNhanChon);

    if (this.cttnSubcription != null) this.cttnSubcription.unsubscribe();

    this.cttnSubcription = this.cttnService.readAllLive(this.tinNhanChon.Ma).subscribe((val) => {
      this.dsCTTN = val;
      console.log(this.dsCTTN);
    });
  }

  public sendReply($event) {
    if (this.replyText != null && this.replyText != "" && this.tinNhanChon != null)
    {
      console.log(this.replyText);

      let cttnCuaQuanTri = new CTTN();
      cttnCuaQuanTri.MaTinNhan = this.tinNhanChon.Ma;
      cttnCuaQuanTri.NoiDung = this.replyText;
      cttnCuaQuanTri.setQuanTri();

      this.cttnService.them(cttnCuaQuanTri).then(() => {
        console.log('Đã thêm được chi tiết tin nhắn');
      });
    }
  }
  
  public handleOnPage($event) {
    UtilService.makeRowsSameHeight();
  }
}
