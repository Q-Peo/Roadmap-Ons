$(document).ready(function () {
    $('#login-form').submit(function (e) {   
        var formData = {
            email: $('#email').val(),
            pass: $('#pass').val(),
        };
        $('#login-form').validate({
            rules: {
                email: {
                    required: true,
                    isEmail: true,
                },
                pass: {
                    required: true,
                    isSpace: true,
                }
            },
            messages: {
                email: {
                    required: 'Không được để trống username'
                },
                pass: {
                    required: 'Không được để trống password'
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr('name') == 'email') {
                    error.insertAfter($('#emailMsg'));
                } else if (element.attr('name') == 'pass') {
                    error.insertAfter($('#passMsg'));
                } else { 
                    error.append($('.errorTxt span'));
                }
            },
            submitHandler: function (form) {
                //console.log($(form).serializeArray());
                //window.location = './list_students.html';
                $.ajax({
                    method: 'POST',
                    url: '../../../server/api/authen/login.php',
                    //headers: { "Authorization": localStorage.getItem('token') },
                    data: {
                        email: $('#email').val(),
                        pass: $('#pass').val()
                    },
                    success: function (data) {
                        localStorage.setItem('data', data.token);
                        if (!data.success) {
                            alert('Đang vào chờ tí....');
                            $(location).attr('href', "./list_students.html");
                            console.log(data);
                        }
                        else {
                            alert("Sai tài khoản hoặc mật khẩu!!")
                        }
                    },
                    error: function (data) {
                        alert('Lỗi rồi báo lại coder....');
                    },
                })
            }
        });
        e.preventDefault();
    });
});