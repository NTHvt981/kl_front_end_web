export class CTTN {
    Ma:string;
    MaTinNhan:string;
    MaNguoiTao:string;
    TenNguoiTao:string;
    NoiDung:string;
    HinhAnh:string = null;
    ThoiGianTao:Date;
    DoQuanTriTao:boolean;
    
    public constructor(init?:Partial<CTTN>) {
        Object.assign(this, init);        
        
        let timeSec = (new Date()).valueOf().toString();
        this.Ma = 'CTTN' + '-' +
          timeSec.substring(0, 3) + '-' +
          timeSec.substring(3, 6) + '-' +
          timeSec.substring(6, 9) + '-' +
          timeSec.substr(9);
    }

    setQuanTri() {
        this.DoQuanTriTao = true;
        this.MaNguoiTao = "";
        this.TenNguoiTao = "Quản trị";
        this.ThoiGianTao = new Date();
    }

    toMap(): object {
        return {
            'Ma':     this.Ma,
            'MaTinNhan': this.MaTinNhan,
            'MaNguoiTao': this.MaNguoiTao,
            'TenNguoiTao': this.TenNguoiTao,

            'NoiDung': this.NoiDung,
            'HinhAnh': this.HinhAnh,
            'ThoiGianTao':this.ThoiGianTao,
            'DoQuanTriTao':this.DoQuanTriTao
            };
    }
    
    static fromMap(data: object): CTTN {
        const kq: CTTN = new CTTN();

        kq.Ma = data['Ma'];
        kq.MaTinNhan = data['MaTinNhan'];
        kq.MaNguoiTao = data['MaNguoiTao'];
    
        kq.NoiDung = data['NoiDung'];
        kq.HinhAnh = data['HinhAnh'];
        kq.ThoiGianTao =data['ThoiGianTao'];
        kq.DoQuanTriTao = data['DoQuanTriTao'];

        if (kq.DoQuanTriTao) kq.TenNguoiTao = 'Quản trị';

        return kq;
    }
}