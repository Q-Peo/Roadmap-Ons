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
                console.log($(form).serializeArray());
                console.log('Đăng nhập thành công');
                window.location = './list_students.html';
                //form.submit();
                // $.ajax({
                //     type: 'POST',
                //     url: '',
                //     data: $(this).serializeArray(),
                //     success: function(response){
                //         console.log('response: ', response)
                //         if(response == 'success'){
                //             var msg = '';
                //             if (response == 1) {
                //                 window.location = './list_students.html';
                //             }
                //             else {
                //                 msg = 'Bạn đã nhập sai tài khoản hoặc mật khẩu'
                //             }
                //             $("#msg").html(msg);
                //         }
                //     },
                // })
            }
        });
        e.preventDefault();
    });
});