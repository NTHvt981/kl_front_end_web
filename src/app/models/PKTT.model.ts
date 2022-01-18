import { ESMap } from "typescript";

export interface PKTT {
    Ma:     string,
    Ten:    string,
    Loai:   string,
    PhanLoai?: string,
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
// export const PKConverter = {
//     toFirestore: function(pktt: PKTT) {
//         return {
//             Ma:     pktt.Ma,
//             Ten:    pktt.Ten,
//             Loai:   pktt.Loai,
//             Hinh:   pktt.Hinh,
//             MoTa:   pktt.MoTa,
//             Hang:   pktt.Hang,
//             Mau:    pktt.Mau,
//             Gia:    pktt.Gia,
//             SoLuong:pktt.SoLuong,

//             //for ar
//             OffsetTrai:pktt.OffsetTrai,
//             OffsetPhai:pktt.OffsetPhai,
//             OffsetTren:pktt.OffsetTren,
//             OffsetDuoi:pktt.OffsetDuoi,
//             };
//     },
    
//     fromFirestore: function(snapshot, options): PKTT{
//         const pktt = snapshot.data(options);
//         const kq: PKTT = {
//             Ma:     pktt.Ma,
//             Ten:    pktt.Ten,
//             Loai:   pktt.Loai,
//             Hinh:   pktt.Hinh,
//             MoTa:   pktt.MoTa,
//             Hang:   pktt.Hang,
//             Mau:    pktt.Mau,
//             Gia:    pktt.Gia,
//             SoLuong:pktt.SoLuong,
//             PhanLoai: pktt.PhanLoai,
            
//             //for ar
//             OffsetTrai: pktt.OffsetTrai,
//             OffsetPhai: pktt.OffsetPhai,
//             OffsetTren: pktt.OffsetTren,
//             OffsetDuoi: pktt.OffsetDuoi,
//         };
//         return kq;
//     }
// }

export const loaiOptions: string[] = ["Hat", "Shirt", "Pants", "Backpack", "Shoes"];
export const phanLoaiOptions:ESMap<string, string[]> = new Map([
    [loaiOptions[0], ['Caps', 'Beanies', 'Fedoras', 'Berets']],
    [loaiOptions[1], ['Shirt', 'T-Shirt', 'Jacket']],
    [loaiOptions[2], ['Jeans', 'Shorts', 'Skirt', 'Kaki']],
    [loaiOptions[3], ['Backpack']],
    [loaiOptions[4], ['Shoes', 'Slipper']],
]);