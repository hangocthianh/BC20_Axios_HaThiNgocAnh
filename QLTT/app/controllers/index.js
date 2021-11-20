function getEle(id) {
    return document.getElementById(id);
}
var service = new UserServices();
var valid = new Validation();

// lấy thông tin từ server
function getUserList() {
    service
        .getUserListAPI()
        .then(function (result) {
            renderUser(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getUserList();


//kiểm tra thông tin 
function validationUpdate(hoTen, matKhau, email, moTa, hinhAnh) {
    var isvalid = true;
    isvalid &= valid.checkEmpty(hoTen, "Họ tên không được để trống!", "tbHoTen") && valid.checkName(hoTen, "Họ tên phải là chữ và không có kí tự đặc biệt!", "tbHoTen");
    isvalid &= valid.checkEmpty(matKhau, "Mật khẩu không được để trống!", "tbMatKhau") && valid.checkPass(matKhau, "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8!", "tbMatKhau");
    isvalid &= valid.checkEmpty(email, "Email không được để trống!", "tbEmail") && valid.checkEmail(email, "Email phải đúng định dạng!", "tbEmail");
    isvalid &= valid.checkEmpty(hinhAnh, "Hình ảnh không được để trống!", "tbHinhAnh");
    isvalid &= valid.checkSelect("loaiNguoiDung", "Hãy chọn loại người dùng!", "tbLoaiNguoiDung");
    isvalid &= valid.checkSelect("loaiNgonNgu", "Hãy chọn loại ngôn ngữ!", "tbLoaiNgonNgu");
    isvalid &= valid.checkEmpty(moTa, "Mô tả không được để trống!", "tbMoTa") && valid.checkDescription(moTa, "Mô tả không vượt quá 60 ký tự!", "tbMoTa");
    return isvalid;
}
function validationAdd(hoTen, matKhau, email, moTa, hinhAnh,taiKhoan, array) {
    var isvalid = true;
    isvalid &= valid.checkEmpty(taiKhoan, "Tài khoản không được để trống!", "tbTaiKhoan") && valid.checkAccount(taiKhoan, "Tài khoản bị trùng!", "tbTaiKhoan", array);
    isvalid &= valid.checkEmpty(hoTen, "Họ tên không được để trống!", "tbHoTen") && valid.checkName(hoTen, "Họ tên phải là chữ và không có kí tự đặc biệt!", "tbHoTen");
    isvalid &= valid.checkEmpty(matKhau, "Mật khẩu không được để trống!", "tbMatKhau") && valid.checkPass(matKhau, "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8!", "tbMatKhau");
    isvalid &= valid.checkEmpty(email, "Email không được để trống!", "tbEmail") && valid.checkEmail(email, "Email phải đúng định dạng!", "tbEmail");
    isvalid &= valid.checkEmpty(hinhAnh, "Hình ảnh không được để trống!", "tbHinhAnh");
    isvalid &= valid.checkSelect("loaiNguoiDung", "Hãy chọn loại người dùng!", "tbLoaiNguoiDung");
    isvalid &= valid.checkSelect("loaiNgonNgu", "Hãy chọn loại ngôn ngữ!", "tbLoaiNgonNgu");
    isvalid &= valid.checkEmpty(moTa, "Mô tả không được để trống!", "tbMoTa") && valid.checkDescription(moTa, "Mô tả không vượt quá 60 ký tự!", "tbMoTa");
    return isvalid;
}


// hiện thị thông tin lên bản
function renderUser(data) {
    var html = "";
    data?.forEach(function (user, index) {
        html += `
            <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.hoTen}</td>
            <td>${user.matKhau}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" onclick="editUser(${user.id})" data-toggle="modal"
                data-target="#myModal">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
            </tr>
        `
    });
    getEle("tblDanhSachNguoiDung").innerHTML = html;
}

// xóa user
function deleteUser(id) {
    service
        .deleteUserAPI(id)
        .then(function (result) {
            getUserList();
            alert("Đã xóa thành công!");
        })
        .catch(function (error) {
            console.log(error);
        })
}

// thêm tiêu đề và nút modal thêm sản phẩm
getEle("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";
    document.getElementsByClassName("modal-footer")[0].innerHTML = `<button class="btn btn-info" onclick="addUser()">Thêm</button>`;
});
// thêm người dùng
function addUser() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var hinhAnh = getEle("HinhAnh").value;
    var user = new User("", taiKhoan.trim(), hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    service
        .getUserListAPI()
        .then(function (result) {
            if (validationAdd(hoTen, matKhau, email, moTa, hinhAnh, taiKhoan, result.data)) {
                service
                    .addUserAPI(user)
                    .then(function (result) {
                        document.getElementsByClassName("close")[0].click();
                        getUserList();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}


// thêm tiêu đề và nút modal cập nhật chỉnh sửa
function editUser(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Cập nhật người dùng";
    document.getElementsByClassName("modal-footer")[0].innerHTML = `<button class="btn btn-info" onclick="updateUser(${id})">Cập nhật</button>`

    service
        .getUserById(id)
        .then(function (result) {
            getEle("TaiKhoan").disabled = true;
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("loaiNguoiDung").value = result.data.loaiND;
            getEle("loaiNgonNgu").value = result.data.ngonNgu;
            getEle("MoTa").value = result.data.moTa;
            getEle("HinhAnh").value = result.data.hinhAnh;
        })
        .catch(function (error) {
            console.log(error);
        })
}
// cập nhật người dùng
function updateUser(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var hinhAnh = getEle("HinhAnh").value;
    var user = new User(id, taiKhoan.trim(), hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    service
        .getUserListAPI()
        .then(function (result) {
            if (validationUpdate(hoTen, matKhau, email, moTa, hinhAnh) ) {
                service
                    .updateUserAPI(user)
                    .then(function (result) {
                        document.getElementsByClassName("close")[0].click();
                        getUserList();
                        getEle("TaiKhoan").disabled = false;
                        getEle("formFood").reset();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}
