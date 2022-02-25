//các hàm xử lý logic khi dùng jquery validate
//rule check khoảng trắng trong input
$.validator.addMethod("isSpace", function (value, element) {
    return value == '' || value.trim().length != 0;
}, "Vui lòng nhập vào trường này");

//rule check email 
$.validator.addMethod("isEmail", function (value, element) {
    return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
}, "Điền đúng định dạng email");

//rule check sdt
$.validator.addMethod("isPhone", function (value, element) {
    return this.optional(element) || /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value);
}, "Điền đúng định dạng sdt");

//rule check ngày theo format: đd/mm/yyyy
$.validator.addMethod("isDate", function (value,element) {
    return this.optional(element) || /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value);
}, "Điền đúng định dạng ngày");

//rule check length input
$.validator.addMethod("isLengthInput", function (value, element) {
    return value.length < 6;
}, "Phải trên 6 kí tự");



//các hàm xử lý k sử dụng jquery validate
//function check input còn trống không
function isBlank (value) {
    if (value.replace(/\s+/g, '').length == 0) {
        return false;
    }
    else {
        return true;
    }
}

//function check input còn trống và có khoảng trắng không
function isNull (value) {
    if (value == '' && value.trim().length == 0) {
        return false;
    }
    else {
        return true;
    }
}

//function check password
function isPassword (pass) {
    if (pass.length < 6) {
        return false;
    }
    else {
        return true;
    }
}

//check xem có phải là email không
function isEmail (email) {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

//function check so dien thoai
function isPhoneNumber (number) {
    var phone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (phone.test(number)) {
        return true;
    }
    else{
        return false;
    }
}
