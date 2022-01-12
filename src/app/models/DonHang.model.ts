import { CTDH } from "./CTDH.model";
// import * as firebase from 'firebase';

export class DonHang {
    Ma:             string;
    MaKhachHang:    string;
    TenKhachHang:   string;
    SoDienThoai:    string;
    DiaChi:         string;
    ThoiGianDatHang: firebase.default.firestore.Timestamp;
    TinhTrang:    string;
    TongCong:    number;
    // GiamGia:    number;
    // SauGiamGia:    number;
    ChiTietDonHangs: CTDH[];
}

// Firestore data converter
export const DonHangConverter = {
    toFirestore: function(donHang: DonHang) {
        return {
            Ma:             donHang.Ma,
            MaKhachHang:    donHang.MaKhachHang,
            TenKhachHang:   donHang.TenKhachHang,
            SoDienThoai:    donHang.SoDienThoai,
            DiaChi:         donHang.DiaChi,
            ThoiGianDatHang:donHang.ThoiGianDatHang,
            TinhTrang:      donHang.TinhTrang,
            TongCong:       donHang.TongCong,
            };
    },
    
    fromFirestore: function(snapshot, options): DonHang{
        const donHang = snapshot.data(options);
        const kq: DonHang = {
            Ma:             donHang.Ma,
            MaKhachHang:    donHang.MaKhachHang,
            TenKhachHang:   donHang.TenKhachHang,
            SoDienThoai:    donHang.SoDienThoai,
            DiaChi:         donHang.DiaChi,
            ThoiGianDatHang:donHang.ThoiGianDatHang,
            TinhTrang:      donHang.TinhTrang,
            TongCong:       donHang.TongCong,
            ChiTietDonHangs: new Array<CTDH>()
        };
        return kq;
    }
}

export const DonHangTinhTrang = {
    INIT: 'Taking order',
    DELIVERY: 'Delivery',
    SUCCESS: 'Finish',
    CANCELED: 'Cancel',
};