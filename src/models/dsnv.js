function DanhSachNhanVien() {
    this.arr = [];


    this.themNV = function (nv) {
        this.arr.push(nv);
    }

    this.timViTriNV = function (taikhoanNV) {
        /**
         * Tim vi tri
         * 0. Tao bien index gan -1 (khong tim thay)
         * 1. Duyệt mảng
         *      => sv = arr[i]
         * 2. Nếu sv.maSV trùng với maSV
         *      => true => gán i cho biến index
         */
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.taikhoanNV === taikhoanNV) {
                index = i;
                break;
            }
        }
        return index;
    };

    this.layChiTietNV = function (taikhoanNV) {
        //Tim vi tri SV
        var index = this.timViTriNV(taikhoanNV);

        if (index !== -1) {
            return this.arr[index];
        }
    };

    this.capNhatNV = function (nv) {
        //tim vi tri sv can update
        var index = this.timViTriNV(nv.taikhoanNV);

        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    this.xoaNV = function (taikhoanNV) {
        var index = this.timViTriNV(taikhoanNV);

        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.timKiemNV = function (keyword) {
        /**
         * 0. tạo mangTimKiem = []
         * 1. Duyệt mảng arr
         *      => sv = arr[i]
         * 2. Nếu sv.tenSV trùng với keyword
         *      => true => push sv vào mangTimKiem
         * 3. trả về mangTimKiem
         */
        var mangTimKiem = [];

        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            //chuyển tenSV về chự thường
            var tenNVLowerCase = nv.tenNV.toLowerCase();
            var keywordLowerCase = keyword.toLowerCase();
            if (tenNVLowerCase.indexOf(keywordLowerCase) !== -1) {
                mangTimKiem.push(nv);
            }
        }

        return mangTimKiem;
    };

}

