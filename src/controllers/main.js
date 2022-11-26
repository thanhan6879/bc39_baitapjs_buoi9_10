//tao doi tuong dsnv
var dsnv = new DanhSachNhanVien();
var validation = new Validation();


getLocalStorage();

// Tạo biến document cho id
function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV(isAdd) {
    //Lấy thông tin từ user nhập
    var taikhoanNV = getEle("tknv").value;
    var hotenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    var isValid = true;

    //Check Validation
    if (isAdd) {
        //MaNV
        isValid &=
            validation.kiemTraRong(taikhoanNV, "errortkNV", "(*) Vui lòng nhập tài khoản") &&
            validation.kiemTraChuoiKitu(
                taikhoanNV,
                "errortkNV",
                "(*) Vui lòng nhập từ 4-6 kí tự",
                4,
                6
            ) &&
            validation.kiemTraTrungMaNV(
                taikhoanNV,
                "errortkNV",
                "(*) Mã NV đã tồn tại",
                dsnv.arr
            );
    }

    //tenNV
    isValid &=
        validation.kiemTraRong(hotenNV, "errorhotenNV", "(*) Vui long nhap hotenNV") &&
        validation.kiemTraChuoiKitu(
            hotenNV,
            "errorhotenNV",
            "(*) Tên Nhân Viên Phải Là Chữ, Không Để Trống"
        );

    //email
    isValid &=
        validation.kiemTraRong(email, "errorEmail", "(*) Vui long nhap email") &&
        validation.kiemTraEmail(
            email,
            "errorEmail",
            "(*) Vui long nhap email dung dinh dang"
        );

    //Matkhau
    isValid &= validation.kiemTraRong(
        matKhau,
        "errorMatKhau",
        "(*) Vui long nhap mat khau"
    ) && validation.kiemTraDoDaiKyTu(
        matKhau,
        "errorMatKhau",
        "(*) Vui long nhap mat khẩu 6 - 10 ky tu(1kytuso,1 in hoa, 1 ky dac biet",
        6,
        10
    );

    //Ngày Làm
    isValid &= validation.kiemTraRong(
        ngayLam,
        "errorNgayLam",
        "(*) Vui lòng nhập ngày làm"
    );

    //Lương cơ bản
    isValid &= validation.kiemTraRong(
        "luongCB",
        "errorLuong",
        "(*) Vui lòng nhập lương cơ bản"
    );

    //Chức Vụ
    isValid &= validation.kiemTraChonChucVu(
        "chucvu",
        "errorChucVu",
        "(*) Vui lòng nhập chức vụ"
    );

    //Giờ làm
    isValid &= validation.kiemTraRong(
        gioLam,
        "errorGioLam",
        "(*) Vui lòng nhập số giờ làm"
    );

    if (!isValid) return;

    //tạo đối tượng từ lớp đối tượng NhanVien
    var nv = new NhanVien(
        taikhoanNV,
        hotenNV,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam,
    );

    //tinh tong Luong NV
    nv.tinhLuong();
    return nv;

    // // xep loai NV
    // nv.loaiNhanVien();
    // return nv;


}

// them NV 
getEle("btnThemNV").onclick = function () {
    var nv = layThongTinNV();
    if (nv) {
        dsnv.themNV(nv);
        // render danh sách nhân viên đã thêm UI 
        renderTable(dsnv.arr);
        setLocalStorage();
    }
}

function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        content += `
        <tr>
        <td>${nv.taikhoanNV}</td>
        <td>${nv.hotenNV}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.xepLoai}</td>
        <td>
        <button  data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="editNV('${nv.taikhoanNV}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteNV('${nv.taikhoanNV}')">Delete</button>
        </td>
        </tr>
        `;
    }
    getEle("tbodyNhanVien").innerHTML = content;
}

/**
 * Edit NV
 */
function editNV(taikhoanNV) {
    var nv = dsnv.layChiTietNV(taikhoanNV);
    if (nv) {
        //Dom tới các thẻ input show value
        getEle("tknv").value = nv.taikhoanNV;
        //disable tknv
        getEle("tknv").disabled = true;

        getEle("name").value = nv.hotenNV;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("chucvu").value = nv.chucVu;
    }
}
/**
 * Update SV
 */
getEle("btnCapNhat").addEventListener("click", function () {
    var nv = layThongTinNV(false);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
});


/**
 * Delete NV
 */
function deleteNV(taikhoanNV) {
    //xoá NV
    dsnv.xoaNV(taikhoanNV);
    //render lại table
    renderTable(dsnv.arr);
    //Lưu lại LocalStorage
    setLocalStorage();
}


function setLocalStorage() {
    //Convert JSON => string
    var dataString = JSON.stringify(dsnv.arr);
    //lưu data xuống LocalStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //Convert string => JSON
        dsnv.arr = JSON.parse(dataString);
        //render lại table
        renderTable(dsnv.arr);
    }
}
