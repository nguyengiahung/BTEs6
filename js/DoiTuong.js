
class Student extends Person{
    constructor(diemToan, diemLy, diemHoa, hoTen, diaChi, email, type) {
        super(hoTen, diaChi, email, type);

        this.diemToan = diemToan;
        this.diemLy = diemLy;
        this.diemHoa = diemHoa;
        this.dtb = 0;

    }
    tinhDTB() {
        this.dtb = (this.diemToan + this.diemLy + this.diemHoa) / 3; 
    }
}

class Employee extends Person{
    constructor(soNgayLam, luong, ...rest) {
        super(...rest);
        this.soNgayLam = soNgayLam;
        this.luong = luong;
        this.total = 0;

    }
    tinhLuong() {
        this.total = this.soNgayLam*this.luong;
    }
}

class Customer extends Person{
    constructor(tenCongTy, triGiaHoaDon, danhGia, ...rest) {
        super(...rest);

        this.tenCongTy = tenCongTy;
        this.triGiaHoaDon = triGiaHoaDon;
        this.danhGia = danhGia;
    }
}

