export interface CTDH {
    Ma:         string,
    MaDonHang:  string,
    MaPhuKien:  string,
    Ten:        string,
    Loai:       string,
    Hinh:       string,
    Gia:        number,
    Hang:       string,
    Mau:        string,
    MoTa:       string,
}

// Firestore data converter
export const CTDHConverter = {
    toFirestore: function(ctdh: CTDH) {
        return {
            Ma:            ctdh.Ma,
            MaDonHang:     ctdh.MaDonHang,
            MaPhuKien:     ctdh.MaPhuKien,
            Ten:           ctdh.Ten,
            Loai:          ctdh.Loai,
            Hinh:          ctdh.Hinh,
            Gia:           ctdh.Gia,
            Hang:          ctdh.Hang,
            Mau:           ctdh.Mau,
            MoTa:          ctdh.MoTa,
            };
    },
    
    fromFirestore: function(snapshot, options): CTDH{
        const ctdh = snapshot.data(options);
        const kq: CTDH = {
            Ma:            ctdh.Ma,
            MaDonHang:     ctdh.MaDonHang,
            MaPhuKien:     ctdh.MaPhuKien,
            Ten:           ctdh.Ten,
            Loai:          ctdh.Loai,
            Hinh:          ctdh.Hinh,
            Gia:           ctdh.Gia,
            Hang:          ctdh.Hang,
            Mau:           ctdh.Mau,
            MoTa:          ctdh.MoTa,
        };
        return kq;
    }
}

export const loaiOptions: string[] = ["Nón", "Áo", "Quần", "Ba lô", "Giày"];