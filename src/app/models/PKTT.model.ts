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

    //for ar
    OffsetTrai:number,
    OffsetPhai:number,
    OffsetTren:number,
    OffsetDuoi:number,
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

            //for ar
            OffsetTrai:pktt.OffsetTrai,
            OffsetPhai:pktt.OffsetPhai,
            OffsetTren:pktt.OffsetTren,
            OffsetDuoi:pktt.OffsetDuoi,
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
            
            //for ar
            OffsetTrai: pktt.OffsetTrai,
            OffsetPhai: pktt.OffsetPhai,
            OffsetTren: pktt.OffsetTren,
            OffsetDuoi: pktt.OffsetDuoi,
        };
        return kq;
    }
}

export const loaiOptions: string[] = ["Nón", "Áo", "Quần", "Ba lô", "Giày"];
export const enLoaiOptions: string[] = ["Hat", "Shirt", "Pants", "Backpack", "Shoes"];