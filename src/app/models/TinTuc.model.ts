export interface TinTuc {
    Ma:string,
    TieuDe:string,
    DuongDan:string,
    NoiDung:string,
    HinhAnh:string,
    ThoiGianTao:string,
}

// Firestore data converter
export const TinTucConverter = {
    toFirestore: function(tinTuc) {
        return {
            Ma:     tinTuc.Ma,
            TieuDe: tinTuc.TieuDe,
            DuongDan:   tinTuc.DuongDan,
            NoiDung:    tinTuc.NoiDung,
            HinhAnh:    tinTuc.HinhAnh,
            ThoiGianTao:tinTuc.ThoiGianTao,
            };
    },
    
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        const tinTuc: TinTuc = {
            Ma:     data.Ma,
            TieuDe: data.TieuDe,
            DuongDan:   data.DuongDan,
            NoiDung:    data.NoiDung,
            HinhAnh:    data.HinhAnh,
            ThoiGianTao:data.ThoiGianTao,
        };
        return tinTuc;
    }
}