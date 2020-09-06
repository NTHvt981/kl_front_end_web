export interface VaiTro { 
    KhachHang?: boolean;
    QuanTri?: boolean;
 }
  
export interface NguoiDung {
    Ma: string;
    Email: string;
    CoVaiTro: VaiTro;
}