$(document).ready(function () {
    let token = localStorage.getItem('data');
    if (isTokenExpired(token)) {
        alert('Đã hết phiên đăng nhập. Vui lòng đăng nhập lại!');
        localStorage.removeItem('data');
        $(location).prop('href', '/client/login.html');
    }
    else {
        // xu li icon menu tab (thay đổi icon khi toggle)
        $('#base-info-tab').click(function () {
            $('.form-inline').toggle();
            icon = $(this).find('.fa-caret-down');
            icon.toggleClass('fa-caret-left');
        });

        // input timepicker cho input ngày sinh
        $.fn.datepicker.defaults.format = 'yyyy-mm-dd';
        $('#datepicker-dob').datepicker({
            todayBtn: 'linked',
            language: 'it',
            autoclose: true,
            todayHighlight: true,
        });

        var endpoint = $(location).attr('search');
        console.log(endpoint);

        // hiển thị thông tin khi có param id url
        if (endpoint != "") {
            $('#btnHandle').html('Sửa');
            $('.title').html('Sửa sinh viên');
            $.ajax({
                method: 'GET',
                url: LOCAL_URL + '/server/api/student/read.php' + endpoint,
                dataType: 'json',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
                    // console.log(localStorage.getItem('data'));
                },
                success: function (data) {
                    console.log(data);
                    $.each(data.students, function (key, value) {
                        $('#ma_ho_so').val(value.profile_code);
                        $('#ma_sinh_vien').val(value.student_code);
                        $('#ho_dem').val(value.firstname);
                        $('#ten').val(value.lastname);
                        $("#gioi_tinh").val(value.gender === 'Nam' ? 0 : 1).change();
                        $('#ngay_sinh').val(value.date_of_birth);
                        $('#noi_sinh').val(value.place_of_birth);
                        $('#dan_toc').val(value.race);
                        $('#ton_giao').val(value.religion);
                        $('#dien_thoai').val(value.phone);
                        $('#email').val(value.email);
                        $('#personal_email').val(value.personal_email);
                        $('#dia_chi').val(value.address);
                        $('#cmnd').val(value.identity_number);
                        $('#trang_thai').val(value.student_status);
                        $('#ghi_chu').val(value.note);
                    });
                },
            });
        }

        // xử lí khi update hoặc create sinh viên
        $('#addForm').submit(function (e) {
            // xu li validate form
            $('#addForm').validate({
                rules: {
                    ma_ho_so: {
                        required: true,
                        isSpace: true,
                        isValidChar: true,
                    },
                    ma_sinh_vien: {
                        required: true,
                        isSpace: true,
                        isValidChar: true,
                    },
                    ho_dem: {
                        required: true,
                        isSpace: true,
                        isValidChar: true,
                    },
                    ten: {
                        required: true,
                        isSpace: true,
                        isValidChar: true,
                    },
                    gioi_tinh: "required",
                    ngay_sinh: {
                        required: true,
                        isDate: true,
                    },
                    noi_sinh: {
                        required: true,
                        isSpace: true,
                        isValidChar: true,
                    },
                    dien_thoai: {
                        required: true,
                        isPhone: true,
                    },
                    email: {
                        required: true,
                        isEmail: true,
                    },
                    personal_email: {
                        isEmail: $('#personal_email').val() == "" ? false : true
                    }
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
                    },
                },
                submitHandler: function (data) {
                    // kiểm tra xem url có endpoint ?id=, không có thì call api create, có thì update
                    if ($(location).attr('search') == "") {
                        // ajax them sinh vien
                        $.ajax({
                            method: 'POST',
                            url: LOCAL_URL + '/server/api/student/create.php',
                            dataType: 'json',
                            data: {
                                profile_code: $("#ma_ho_so").val(),
                                student_code: $("#ma_sinh_vien").val(),
                                firstname: $("#ho_dem").val(),
                                lastname: $("#ten").val(),
                                gender: (($("#gioi_tinh").val() == 1) ? 'Nữ' : 'Nam'),
                                date_of_birth: $("#ngay_sinh").val(),
                                place_of_birth: $("#noi_sinh").val(),
                                race: $("#dan_toc").val(),
                                religion: $("#ton_giao").val(),
                                phone: $("#dien_thoai").val(),
                                email: $("#email").val(),
                                personal_email: $("#personal_email").val(),
                                address: $("#dia_chi").val(),
                                identity_number: $("#cmnd").val(),
                                student_status: $("#trang_thai").val(),
                                note: $("#ghi_chu").val(),
                            },
                            beforeSend: function (request) {
                                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
                                // console.log(localStorage.getItem('data'));
                            },
                            success: function (data) {
                                if (!data.success) {
                                    alert('Thêm thành công');
                                    $(location).attr('href', "./list_students.html?page=1");
                                    // console.log(data);
                                }
                                else {
                                    alert("Lỗi rồi nhập lại nhá bạn")
                                }
                            },
                        });
                    }
                    else {
                        $.ajax({
                            method: 'POST',
                            url: LOCAL_URL + '/server/api/student/update.php' + endpoint,
                            dataType: 'json',
                            data: {
                                profile_code: $("#ma_ho_so").val(),
                                student_code: $("#ma_sinh_vien").val(),
                                firstname: $("#ho_dem").val(),
                                lastname: $("#ten").val(),
                                gender: (($("#gioi_tinh").val() == 1) ? 'Nữ' : 'Nam'),
                                date_of_birth: $("#ngay_sinh").val(),
                                place_of_birth: $("#noi_sinh").val(),
                                race: $("#dan_toc").val(),
                                religion: $("#ton_giao").val(),
                                phone: $("#dien_thoai").val(),
                                email: $("#email").val(),
                                personal_email: $("#personal_email").val(),
                                address: $("#dia_chi").val(),
                                identity_number: $("#cmnd").val(),
                                student_status: $("#trang_thai").val(),
                                note: $("#ghi_chu").val(),
                            },
                            beforeSend: function (request) {
                                request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
                                // console.log(localStorage.getItem('data'));
                            },
                            success: function (data) {
                                if (!data.success) {
                                    alert('Sửa thành công');
                                    $(location).attr('href', "./list_students.html?page=1");
                                    // console.log(data);
                                }
                                else {
                                    alert("Lỗi rồi nhập lại nhá bạn")
                                }
                            },
                        });
                    }
                }
            });

            e.preventDefault();
        });
    }
    
});