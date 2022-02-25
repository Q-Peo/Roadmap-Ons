$(document).ready(function () {
    //xu li icon menu tab (thay đổi icon khi toggle)
    $('#base-info-tab').click(function () {
        $('.form-inline').toggle();
            icon = $(this).find('.fa-caret-down');
            icon.toggleClass('fa-caret-left');
    });

    //input timepicker cho input ngày sinh và ngày cấp
    $.fn.datepicker.defaults.format = 'dd/mm/yyyy';
    $('#datepicker-dob').datepicker({
        todayBtn: 'linked',
        language: 'it',
        autoclose: true,
        todayHighlight: true,
    });
    $('#datepicker-ngaycap').datepicker({
        todayBtn: 'linked',
        language: 'it',
        autoclose: true,
        todayHighlight: true,
    });  

    $('#addForm').submit( function (e) {
        //xu li validate form
        $('#addForm').validate({
            rules: {
                ma_ho_so: {
                    required: true,
                    isSpace: true,
                },
                ma_sinh_vien: {
                    required: true,
                    isSpace: true,
                },
                ho_dem: {
                    required: true,
                    isSpace: true,
                },
                ten: {
                    required: true,
                    isSpace: true,
                },
                gioi_tinh: "required",
                ngay_sinh: {
                    required: true,
                    isDate: true,
                },
                noi_sinh: {
                    required: true,
                    isSpace: true,
                },
                dien_thoai: {
                    required: true,
                    isPhone: true,
                },
                email: {
                    required: true,
                    isEmail: true,
                },
            },
            messages: { //thêm messages cho từng ô input required (gán theo input[name])
                ma_ho_so: 'Vui lòng nhập mã hồ sơ',
                ma_sinh_vien: 'Vui lòng nhập mã sinh viên',
                ho_dem: 'Vui lòng nhập họ đệm',
                ten: 'Vui lòng nhập tên',
                gioi_tinh: {
                    required: 'Vui lòng chọn giới tính',
                },
                ngay_sinh: {
                    required: 'Vui lòng nhập ngày sinh',
                },
                noi_sinh: 'Vui lòng nhập nơi sinh',
                dien_thoai: {
                    required: 'Vui lòng nhập số điện thoại',
                },
                email: {
                    required: 'Vui lòng nhập email',
                }
            },
            // errorPlacement: function (error, element) {
            //     if (element.attr('name') == 'ngay_sinh') {
            //         error.insertAfter($('#ngay_sinhMsg'));
            //     }
            //     else {
            //         error.append($('.errorTxt span'));
            //     }
            // },
            submitHandler: function (form) {
                console.log('Thêm thành công!!');
                alert('Thêm thành công!!');
                //hiển thị dữ liệu vừa nhập thành công
                console.log($( form ).serializeArray());

                // sử dụng ajax
                // $.ajax({
                //     type: 'POST',
                //     url: './add_students.html',
                //     data: $( this ).serializeArray(),
                //     success: function(response){
                //         console.log('response: ', response)
                //     },
                // })
                // form.submit();
            }
        });

        //sử dụng .each() lặp qua tất cả các ô input có class là required
        // $('.required').each(function () {
        //     if ($(this).attr('name') === 'email') { //kiểm tra xem ô input nào có name = "email", gán rule check xem có phải là email không
        //         $(this).rules('add', {
        //             isSpace: true,
        //             isEmail: true,
        //         });
        //     }
        //     else if ($(this).attr('name') === 'dien_thoai' ) { //kiểm tra xem input nào có name = dien_thoai, gán rule check sdt
        //         $(this).rules('add', {
        //             isSpace: true,
        //             isPhone: true,
        //         });
        //     }
        //     else if ($(this).attr('name') === 'ngay_sinh') { //kiểm tra xem input nào có name = ngay_sinh, gán rule check ngay sinh
        //         $(this).rules('add', {
        //             isSpace: true,
        //             isDate: true,
        //         });
        //     }
        //     else { //gán rule kiểm tra cho tất cả các input required còn lại
        //         $(this).rules('add', { 
        //             isSpace: true,
        //             required: true,
        //         });
        //     }
        // });

        e.preventDefault();
    });
    
});


    // $(document).ready(function (e) {
    //     $("#addForm").submit(function () {
    //         $flag = true;

    //         $(this).find(".required").each(function () {
    //             //dieu kien if elseif check xem input required nao la email, phone
    //             if ($(this).attr('id') === "email") {
    //                 if (isNull($(this).val())) {
    //                     if (isEmail($(this).val())) {
    //                         $(this).removeClass("blank").siblings(".error").children("small").html("");
    //                     }
    //                     else {
    //                         $flag = false;
    //                         $(this).addClass("blank").siblings(".error").children("small").html("Vui lòng điền email");
    //                     }
    //                 }
    //                 else {
    //                     $flag = false;
    //                     $(this).addClass("blank").siblings(".error").children("small").html("Vui lòng điền vào mục này");
    //                 }
    //             }
    //             else if ($(this).attr('id') === "dien_thoai") {
    //                 if (isNull($(this).val())) {
    //                     if (isPhoneNumber($(this).val())) {
    //                         $(this).removeClass("blank").siblings(".error").children("small").html("");
    //                     }
    //                     else {
    //                         $flag = false;
    //                         $(this).addClass("blank").siblings(".error").children("small").html("Vui lòng điền đúng sdt");
    //                     }
    //                 }
    //                 else {
    //                     $flag = false;
    //                     $(this).addClass("blank").siblings(".error").children("small").html("Vui lòng điền vào mục này");
    //                 }
    //             }
    //             else {
    //                 if (!isNull($(this).val())) {
    //                     $flag = false;
    //                     $(this).addClass("blank").siblings(".error").children("small").html("Vui lòng điền vào mục này");
    //                 }
    //                 else {
    //                     $(this).removeClass("blank").siblings(".error").children("small").html("");
    //                 }
    //             }
    //         });
    //         //return $flag;   

    //         console.log($(this).serializeArray());
    //         event.preventDefault();
    //     });
    // })
