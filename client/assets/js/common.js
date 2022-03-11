const LOCAL_URL = 'http://localhost:3000';


//các hàm xử lý logic khi dùng jquery validate
//rule check ki tu dac biet
$.validator.addMethod("isValidChar", function (value, element) {
    return this.optional(element) || !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value);
}, "Không được chứa các kí tự đặc biệt"),

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
    return this.optional(element) || /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(value);
}, "Điền đúng định dạng ngày");

//rule check length input
$.validator.addMethod("isLengthInput", function (value, element) {
    return value.length < 6;
}, "Phải trên 6 kí tự");

// hàm check token hết hạn chưa
function isTokenExpired(token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}