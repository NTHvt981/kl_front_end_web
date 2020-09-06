import { ThemQuanTriComponent } from './xac-thuc/them-quan-tri/them-quan-tri.component';
import { DonHangDaNhanComponent } from './quan-ly/don-hang/da-nhan/don-hang-da-nhan.component';
import { DonHangDaHuyComponent } from './quan-ly/don-hang/da-huy/don-hang-da-huy.component';

import { DangNhapComponent } from './xac-thuc/dang-nhap/dang-nhap.component';
import { DangKyComponent } from './xac-thuc/dang-ky/dang-ky.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { PkttSuaXoaComponent } from './quan-ly/pktt/sua-xoa/pktt-sua-xoa.component';
import { PkttThemComponent } from './quan-ly/pktt/them/pktt-them.component';
import { TinTucSuaXoaComponent } from './quan-ly/tin-tuc/sua-xoa/tin-tuc-sua-xoa.component';
import { TinTucThemComponent } from './quan-ly/tin-tuc/them/tin-tuc-them.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: DashboardComponent
  },
  {
    path: "dang-ky",
    pathMatch: "full",
    component: DangKyComponent
  },
  {
    path: "them-quan-tri",
    pathMatch: "full",
    component: ThemQuanTriComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dang-nhap",
    pathMatch: "full",
    component: DangNhapComponent
  },
  // phụ kiện thời trang
  {
    path: "pktt/them",
    pathMatch: "full",
    component: PkttThemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "pktt/sua-xoa",
    pathMatch: "full",
    component: PkttSuaXoaComponent,
    canActivate: [AuthGuard]
  },
  // tin tức
  {
    path: "tin-tuc/them",
    pathMatch: "full",
    component: TinTucThemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "tin-tuc/sua-xoa",
    pathMatch: "full",
    component: TinTucSuaXoaComponent,
    canActivate: [AuthGuard]
  },
  // đơn hàng
  {
    path: "don-hang",
    pathMatch: "full",
    component: DonHangDaNhanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "don-hang/huy",
    pathMatch: "full",
    component: DonHangDaHuyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "don-hang/chua-lay",
    pathMatch: "full",
    component: DonHangDaNhanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "don-hang/chua-chuyen",
    pathMatch: "full",
    component: TinTucSuaXoaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "don-hang/chua-nhan",
    pathMatch: "full",
    component: TinTucSuaXoaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "don-hang/da-nhan",
    pathMatch: "full",
    component: DonHangDaNhanComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
