$(document).ready(function (){
    var formData = {
        email: $("#email").val(),
        pass: $("#pass").val(),
    };
    //khi click vào login kiểm tra giá trị email và pass 
    $("#login-form").submit(function(e){
        e.preventDefault();
        if(isEmail($("#email").val())){
            $("#email").css("border", "2px solid green");
            $("#emailMsg").html("");
        }
        else {
        	$("#email").css("border", "2px solid red");
            $("#emailMsg").html("<p class='text-danger label-required'>Không được bỏ trống username</p>");
        }
        if (isBlank($("#pass").val())) {
            if(isPassword($("#pass").val())){
				$("#pass").css("border", "2px solid green");
            	$("#passMsg").html("");
			}
			else {
				$("#pass").css("border", "2px solid red");
            	$("#passMsg").html("<p class='text-danger label-required'>Password phải trên 6 kí tự</p>");
			}
        }
        else {
            $("#pass").css("border", "2px solid red");
            $("#passMsg").html("<p class='text-danger label-required'>Không được bỏ trống Password</p>");
        }
        
        // $.post("", function(formData) {
        //     console.log($(this).serializeArray());
        //     console.log("Đăng nhập thành công");
        // })

        // $.ajax({
                //     type: 'POST',
                //     url: './list_students.html',
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

    });
});