import { DonHang } from './DonHang.model';
import { MyData } from "./Data.model";

export class ThongTin {
    LoaiPhuKien: string;
    SoLuong: number;
    ThoiGianDatHang: Date;

    constructor() {
        this.SoLuong = 0;
        this.ThoiGianDatHang = new Date();
    }
}

export function getThongTin(thongTin :ThongTin, dsDonHang: DonHang[]) {
    dsDonHang.forEach((dh) => {

        for (let index = 0; index < dh.ChiTietDonHangs.length; index++) {
            const ctdh = dh.ChiTietDonHangs[index];
            let tg = dh.ThoiGianDatHang.toDate();
            
            let con_1 = tg.getDate() == thongTin.ThoiGianDatHang.getDate();
            let con_2 = tg.getMonth() == thongTin.ThoiGianDatHang.getMonth();
            let con_3 = tg.getFullYear() == thongTin.ThoiGianDatHang.getFullYear();

            let con_4 = ctdh.PhuKienThoiTrang.Loai == thongTin.LoaiPhuKien;

            if (con_1 && con_2 && con_3 && con_4) thongTin.SoLuong += 1;
        }
    });
}

export function getDataChart(
    matThongTin: ThongTin[][], days: number, 
    dayLabels: String[], typeLabels: String[], colors: String[]): MyData 
{
    let result = new MyData();
    
    for (let i = 0; i < days; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);

        let s_1 = date.getDate();
        let s_2 = date.getMonth();
        let s_3 = date.getFullYear();

        dayLabels.push(s_1 + "/" + s_2 + "/" + s_3);
    }

    return result;
}