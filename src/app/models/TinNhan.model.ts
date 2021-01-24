export class TinNhan {
    Ma:string;
    MaNguoiTao:string;
    TenNguoiTao:string;
    TieuDe:string;
    ThoiGianTao:Date;
    DoQuanTriTao:boolean;
    KetThuc:boolean;
    
    public constructor(init?:Partial<TinNhan>) {
        Object.assign(this, init);        
        
        let timeSec = (new Date()).valueOf().toString();
        this.Ma = 'TIN-NHAN' + '-' +
          timeSec.substring(0, 3) + '-' +
          timeSec.substring(3, 6) + '-' +
          timeSec.substring(6, 9) + '-' +
          timeSec.substr(9);
    }

    toMap(): object {
        return {
            'Ma':     this.Ma,
            'MaNguoiTao': this.MaNguoiTao,
            'TenNguoiTao': this.TenNguoiTao,

            'TieuDe': this.TieuDe,
            'ThoiGianTao':this.ThoiGianTao,

            'DoQuanTriTao':this.DoQuanTriTao,
            'KetThuc':this.KetThuc
            };
    }
    
    static fromMap(data: object): TinNhan {
        const kq: TinNhan = new TinNhan();

        kq.Ma = data['Ma'];
        kq.MaNguoiTao = data['MaNguoiTao'];
        kq.TenNguoiTao = data['TenNguoiTao'];
    
        kq.TieuDe = data['TieuDe'];
        kq.ThoiGianTao = data['ThoiGianTao'] as Date;

        kq.DoQuanTriTao = data['DoQuanTriTao'];
        kq.KetThuc = data['KetThuc'];

        if (kq.DoQuanTriTao) kq.TenNguoiTao = 'Quản trị';

        return kq;
    }
}