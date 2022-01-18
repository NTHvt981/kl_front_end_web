import { PKTT } from './PKTT.model';
export interface CTDH {
    Ma:         string,
    MaDonHang:  string,
    MaPhuKien:  string,
    Ten:        string,
    Hinh:       string,
    Gia:        number,
    KichThuoc?: string,
    SoLuong: string,
    PhuKienThoiTrang: PKTT,
}

// Firestore data converter
// export const CTDHConverter = {
//     toFirestore: function(ctdh: CTDH) {
//         return {
//             Ma:            ctdh.Ma,
//             MaDonHang:     ctdh.MaDonHang,
//             MaPhuKien:     ctdh.MaPhuKien,
//             Ten:           ctdh.Ten,
//             Hinh:          ctdh.Hinh,
//             Gia:           ctdh.Gia,
//             };
//     },
    
//     fromFirestore: function(snapshot, options): CTDH{
//         const ctdh = snapshot.data(options);
//         const kq: CTDH = {
//             Ma:            ctdh.Ma,
//             MaDonHang:     ctdh.MaDonHang,
//             MaPhuKien:     ctdh.MaPhuKien,
//             Ten:           ctdh.Ten,
//             Hinh:          ctdh.Hinh,
//             Gia:           ctdh.Gia,
//             KickThuoc:     ctdh.KichThuoc?,
//             PhuKienThoiTrang: null
//         };
//         return kq;
//     }
// }

export const loaiOptions: string[] = ["Nón", "Áo", "Quần", "Ba lô", "Giày"];