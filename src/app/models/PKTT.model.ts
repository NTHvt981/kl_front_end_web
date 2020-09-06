export interface PKTT {
    Ma:     string,
    Ten:    string,
    Loai:   string,
    Hinh:   string,
    MoTa:   string,
    Hang:   string,
    Mau:    string,
    Gia:    string,
    SoLuong:string,
}

// Firestore data converter
export const PKConverter = {
    toFirestore: function(pktt: PKTT) {
        return {
            Ma:     pktt.Ma,
            Ten:    pktt.Ten,
            Loai:   pktt.Loai,
            Hinh:   pktt.Hinh,
            MoTa:   pktt.MoTa,
            Hang:   pktt.Hang,
            Mau:    pktt.Mau,
            Gia:    pktt.Gia,
            SoLuong:pktt.SoLuong,
            };
    },
    
    fromFirestore: function(snapshot, options): PKTT{
        const pktt = snapshot.data(options);
        const kq: PKTT = {
            Ma:     pktt.Ma,
            Ten:    pktt.Ten,
            Loai:   pktt.Loai,
            Hinh:   pktt.Hinh,
            MoTa:   pktt.MoTa,
            Hang:   pktt.Hang,
            Mau:    pktt.Mau,
            Gia:    pktt.Gia,
            SoLuong:pktt.SoLuong,
        };
        return kq;
    }
}

export const loaiOptions: string[] = ["Nón", "Áo", "Quần", "Ba lô", "Giày"];