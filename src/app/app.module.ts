import { RadioButtonModule } from 'primeng/radiobutton';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// For material (ui  library)
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from "@angular/material/slider";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";

// primeng library
import { TableModule } from "primeng/table";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {PaginatorModule} from 'primeng/paginator';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import {ScrollTopModule} from 'primeng/scrolltop';

// self made module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DangKyComponent } from './xac-thuc/dang-ky/dang-ky.component';
import { DangNhapComponent } from './xac-thuc/dang-nhap/dang-nhap.component';
import { PkttThemComponent } from './quan-ly/pktt/them/pktt-them.component';
import { PkttSuaXoaComponent } from './quan-ly/pktt/sua-xoa/pktt-sua-xoa.component';
import { TinTucThemComponent } from './quan-ly/tin-tuc/them/tin-tuc-them.component';
import { TinTucSuaXoaComponent } from './quan-ly/tin-tuc/sua-xoa/tin-tuc-sua-xoa.component';

// For firebase -auth, cloud storage, storage
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Services in here
import { AuthService } from './services/auth/auth.service';
import { DonHangDaHuyComponent } from './quan-ly/don-hang/da-huy/don-hang-da-huy.component';
import { DonHangDaNhanComponent } from './quan-ly/don-hang/da-nhan/don-hang-da-nhan.component';
import { ThemQuanTriComponent } from './xac-thuc/them-quan-tri/them-quan-tri.component';
import { DangDatComponent } from './quan-ly/don-hang/dang-dat/dang-dat.component';
import { TaoThongBaoComponent } from './quan-ly/tin-nhan/tao-thong-bao/tao-thong-bao.component';
import { XemTinNhanComponent } from './quan-ly/tin-nhan/xem-tin-nhan/xem-tin-nhan.component';

var firebaseConfig = {
  apiKey: "AIzaSyAP_BTnqkjOcddoNzn_UK_fJy0eJF46_YY",
  authDomain: "weclothes-7dc2a.firebaseapp.com",
  projectId: "weclothes-7dc2a",
  storageBucket: "weclothes-7dc2a.appspot.com",
  messagingSenderId: "116727164677",
  appId: "1:116727164677:web:4202c091f395e07e19916c",
  measurementId: "G-4PW3LKNQLE"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DangKyComponent,
    DangNhapComponent,
    PkttThemComponent,
    PkttSuaXoaComponent,
    TinTucThemComponent,
    TinTucSuaXoaComponent,
    DonHangDaHuyComponent,
    DonHangDaNhanComponent,
    ThemQuanTriComponent,
    DangDatComponent,
    TaoThongBaoComponent,
    XemTinNhanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatSliderModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatAutocompleteModule,

    TableModule,
    BrowserModule,
    RadioButtonModule,
    InputTextModule,
    FileUploadModule,
    PaginatorModule,
    MenubarModule,
    ToastModule,
    ScrollTopModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
