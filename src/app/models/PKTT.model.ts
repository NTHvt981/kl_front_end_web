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

export const loaiOptions: string[] = ["Hat", "Shirt", "Pants", "Backpack", "Shoes"];
export const phanLoaiOptions:ESMap<string, string[]> = new Map([
    [loaiOptions[0], ['Caps', 'Beanies', 'Fedoras', 'Berets']],
    [loaiOptions[1], ['Shirt', 'T-Shirt', 'Jacket']],
    [loaiOptions[2], ['Jeans', 'Shorts', 'Short skirts', 'Long skirts', 'Kaki']],
    [loaiOptions[3], ['Backpack']],
    [loaiOptions[4], ['Shoes', 'Slipper']],
]);