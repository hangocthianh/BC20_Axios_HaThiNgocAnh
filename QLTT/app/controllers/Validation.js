function getEle(id) {
    return document.getElementById(id);
}
function Validation() {
    // kiểm tra rỗng
    this.checkEmpty = function (value, message, spanID) {
        if (value.trim() != "") {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra tk trùng không
    this.checkAccount = function (value, message, spanID, arrUser) {
        var isExist = false;
        isExist = arrUser.some(function (user) {
            return value.trim() == user.taiKhoan;
        })
        if (isExist) {
            getEle(spanID).innerHTML = message;
            getEle(spanID).style.display = "block";
            return false;
        }
        getEle(spanID).innerHTML = "";
        getEle(spanID).style.display = "none";
        return true;
    }

    // kiểm tra tên là ký tự chữ
    this.checkName = function (value, message, spanID) {
        var pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        var reg = new RegExp(pattern);
        if (value.match(reg)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra mật khẩu hợp lệ
    this.checkPass = function (value, message, spanID) {
        var pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if (value.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra email hợp lệ
    this.checkEmail = function (value, message, spanID) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra chọn loại NN và loại ND
    this.checkSelect = function (selectID, message, spanID) {
        if (getEle(selectID).selectedIndex != 0) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
    // kiểm tra mô tả dưới 60 kí tự
    this.checkDescription = function (value, message, spanID) {
        var pattern = /^.{1,60}$/;
        if (value.match(pattern)) {
            getEle(spanID).innerHTML = "";
            getEle(spanID).style.display = "none";
            return true;
        }
        getEle(spanID).innerHTML = message;
        getEle(spanID).style.display = "block";
        return false;
    }
}
