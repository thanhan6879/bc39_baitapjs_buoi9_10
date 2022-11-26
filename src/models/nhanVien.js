function NhanVien(
    _taikhoanNV,
    _hotenNV,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam,
) {
    //property
    this.taikhoanNV = _taikhoanNV;
    this.hotenNV = _hotenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    //method
    this.tinhLuong = function () {
        this.tongLuong =
            parseFloat(this.luongCoBan) *
            parseFloat(this.gioLam)
            ;
    };

    // this.loaiNhanVien = function () {
    //     this.tongLuong = 8000;
    //     this.xepLoai = "";
    //     if (this.tongLuong >= 20000000) {
    //         this.xepLoai = "Giám Đốc";
    //     } else if (this.tongLuong >= 15000000 && this.tongLuong < 20000000) {
    //         this.xepLoai = "Trưởng Phòng";
    //     } else {
    //         this.xepLoai = "Nhân Viên";
    //     }
    //     console.log(this.xepLoai);
    // };

}


