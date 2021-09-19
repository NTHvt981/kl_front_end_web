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
    DA_HUY : "Đã huỷ",
    DA_DAT : "Đặt hàng thành công",
    DA_TIEP_NHAN : "Đã tiếp nhận đơn hàng",
    DANG_VAN_CHUYEN : "Đang vận chuyển",
    GIAO_THANH_CONG : "Giao hàng thành công",
};