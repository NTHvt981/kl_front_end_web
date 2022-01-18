import * as firebase from "firebase/compat";
import { CTDH } from "./CTDH.model";
// import * as firebase from 'firebase';

export class DonHang {
    Ma:             string;
    MaKhachHang:    string;
    TenKhachHang:   string;
    SoDienThoai:    string;
    DiaChi:         string;
    ThoiGianDatHang: firebase.default.firestore.Timestamp;
    ThoiGianCapNhat: firebase.default.firestore.Timestamp;
    TinhTrang:    string;
    TongCong:    number;
    KhuyenMai:    number;
    ChiTietDonHangs: CTDH[];
}

// Firestore data converter
// export const DonHangConverter = {
//     toFirestore: function(donHang: DonHang) {
//         return {
//             Ma:             donHang.Ma,
//             MaKhachHang:    donHang.MaKhachHang,
//             TenKhachHang:   donHang.TenKhachHang,
//             SoDienThoai:    donHang.SoDienThoai,
//             DiaChi:         donHang.DiaChi,
//             ThoiGianDatHang:donHang.ThoiGianDatHang,
//             ThoiGianCapNhat:donHang.ThoiGianCapNhat,
//             TinhTrang:      donHang.TinhTrang,
//             TongCong:       donHang.TongCong,
//             KhuyenMai:      donHang.KhuyenMai
//             };
//     },
    
//     fromFirestore: function(snapshot, options): DonHang{
//         const donHang = snapshot.data(options);
//         const kq: DonHang = {
//             Ma:             donHang.Ma,
//             MaKhachHang:    donHang.MaKhachHang,
//             TenKhachHang:   donHang.TenKhachHang,
//             SoDienThoai:    donHang.SoDienThoai,
//             DiaChi:         donHang.DiaChi,
//             ThoiGianDatHang:donHang.ThoiGianDatHang,
//             ThoiGianCapNhat:donHang.ThoiGianCapNhat,
//             TinhTrang:      donHang.TinhTrang,
//             TongCong:       donHang.TongCong,
//             KhuyenMai:      donHang.KhuyenMai,
//             ChiTietDonHangs: new Array<CTDH>()
//         };
//         return kq;
//     }
// }

export const DonHangTinhTrang = {
    INIT: 'Taking order',
    DELIVERY: 'Delivery',
    SUCCESS: 'Finish',
    CANCELED: 'Cancel',
};