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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Services in here
import { AuthService } from './services/auth/auth.service';
import { DonHangDaHuyComponent } from './quan-ly/don-hang/da-huy/don-hang-da-huy.component';
import { DonHangDaNhanComponent } from './quan-ly/don-hang/da-nhan/don-hang-da-nhan.component';
import { ThemQuanTriComponent } from './xac-thuc/them-quan-tri/them-quan-tri.component';
import { DangDatComponent } from './quan-ly/don-hang/dang-dat/dang-dat.component';

var firebaseConfig = {
  apiKey: "AIzaSyAOEeZAOCt8TNfDqqRed0IArzJ4Nv1A9HE",
  authDomain: "doan1-6aa37.firebaseapp.com",
  databaseURL: "https://doan1-6aa37.firebaseio.com",
  projectId: "doan1-6aa37",
  storageBucket: "doan1-6aa37.appspot.com",
  messagingSenderId: "51465047436",
  appId: "1:51465047436:web:b74502032508a9890bdaa9",
  measurementId: "G-5CNHQB62CB"
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

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
