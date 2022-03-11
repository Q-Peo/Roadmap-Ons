$(document).ready(function () {
    // lay token ra check
    let token = localStorage.getItem('data');
    if(isTokenExpired(token)) {
        alert('Đã hết phiên đăng nhập. Vui lòng đăng nhập lại!');
        localStorage.removeItem('data');
        $(location).prop('href', '/client/login.html');
    }
    else {
        $('.btn-home').click(function () {
            $(location).prop('href', './list_students.html');
        });
        $('.btn-logout').click(function () {
            localStorage.removeItem('data');
            $(location).prop('href', './login.html');
        });
        $('.btn-add').click(function () {
            $(location).prop('href', './add_students.html');
        });

        function deleteFun(id) {
            // console.log(typeof id);
            if (confirm('Bạn có chắc chắn xóa sinh viên này không?')) {
                $.ajax({
                    method: 'DELETE',
                    url: LOCAL_URL + '/server/api/student/delete.php?id=' + id,
                    dataType: 'json',
                    data: {
                        id: id,
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
                        // console.log(localStorage.getItem('data'));
                    },
                    success: function (data) {
                        alert("Bạn đã xóa thành công!!");
                        // window.location.replace('./list_students.html');
                        location.reload();
                    },
                });
            }
            else {
                return false;
            }
        }

        $currentPage = 1;
        var dem = 0;

        // lấy url 
        // let url = new URL(window.location.href);
        // let searchParams = new URLSearchParams(window.location.search)

        $page = 1;
        
        var options = {};
        options.url = LOCAL_URL + "/server/api/student/pagination.php?page=" + $page;
        options.type = "GET";
        options.beforeSend = function (request) {
            request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
            // console.log(localStorage.getItem('data'));
        };
        options.dataType = "json";
        options.success = function (data) {
            // console.log(data.students.length);
            // console.log(data.students);
            $('#msg').html('Có ' + data.countRows + ' bản ghi');
            var no = 1;
            $.each(data.students, function (key, value) {
                $("tbody").append("<tr class='table-item'><td>" + value.id + "</td>" +
                    "<td>" + value.profile_code + "</td>" +
                    "<td>" + value.student_code + "</td>" +
                    "<td>" + value.firstname + " " + value.lastname + "</td>" +
                    "<td>" + value.gender + "</td>" +
                    "<td>" + value.date_of_birth + "</td>" +
                    "<td>" + value.place_of_birth + "</td>" +
                    "<td>" + value.race + "</td>" +
                    "<td>" + value.religion + "</td>" +
                    "<td>" + value.phone + "</td>" +
                    "<td>" + value.email + "</td>" +
                    "<td>" + value.personal_email + "</td>" +
                    "<td>" + value.address + "</td>" +
                    "<td>" + value.identity_number + "</td>" +
                    "<td>" + value.student_status + "</td>" +
                    "<td>" + value.note + "</td>" +
                    "<td>" +
                    "<div class='btn-group' role='group' aria-label='Basic example'>" +
                    "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-eye'></i></button>" +
                    "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-pen-to-square'></i></button>" +
                    // "<button type='button' class='btn' onclick='deleteFun("+value.id+")'><i class='fa-solid fa-trash-can'></i></button>" +
                    "<button type='button' class='btn btn-delete' id='delete-" + value.id + "'><i class='fa-solid fa-trash-can'></i></button>" +
                    "</div>"
                    + "</td></tr>");
            });

            for (var i = 1; i <= data.countPages; i++) {
                // console.log('a' + i);
                dem++;
                $("<li class='page-item pointed pa' id='pagination-" + i + "'><a class='page-link'>" + i + "</a></li>").insertBefore(".page-next");
            }

            // var searchParams = new URLSearchParams(window.location.search);
            // var page = searchParams.get('page');

            // console.log(page);

            // nut prev, next
            // $('.a-next').click(function () {
            //     if (page <= data.countPages && data.countPages > 1) {
            //         var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=' + (parseInt(page) + 1);
            //         window.history.pushState({ path: refresh }, '', refresh);

            //         // $(this).attr('href', './list_students.html?page=' + (parseInt(page) + 1));
            //         $.ajax({
            //             method: 'GET',
            //             url: "http://localhost:3000/server/api/student/pagination.php?page=" + (parseInt(page) + 1),
            //             beforeSend: function (request) { 
            //                 request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
            //                 // console.log(localStorage.getItem('data'));
            //             },
            //             success: function (data) {
            //                 // lấy endpoint
            //                 // console.log(data);
            //                 $('#msg').html('Có ' + data.countRows + ' bản ghi');
            //                 $('.table-item').remove();
            //                 $.each(data.students, function (key, value) {
            //                     $("tbody").append("<tr class='table-item'><td>" + value.id + "</td>" +
            //                         "<td>" + value.profile_code + "</td>" +
            //                         "<td>" + value.student_code + "</td>" +
            //                         "<td>" + value.firstname + " " + value.lastname + "</td>" +
            //                         "<td>" + value.gender + "</td>" +
            //                         "<td>" + value.date_of_birth + "</td>" +
            //                         "<td>" + value.place_of_birth + "</td>" +
            //                         "<td>" + value.race + "</td>" +
            //                         "<td>" + value.religion + "</td>" +
            //                         "<td>" + value.phone + "</td>" +
            //                         "<td>" + value.email + "</td>" +
            //                         "<td>" + value.personal_email + "</td>" +
            //                         "<td>" + value.address + "</td>" +
            //                         "<td>" + value.identity_number + "</td>" +
            //                         "<td>" + value.student_status + "</td>" +
            //                         "<td>" + value.note + "</td>" +
            //                         "<td>" +
            //                         "<div class='btn-group' role='group' aria-label='Basic example'>" +
            //                         "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-eye'></i></button>" +
            //                         "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-pen-to-square'></i></button>" +
            //                         // "<button type='button' class='btn' onclick='deleteFun("+value.id+")'><i class='fa-solid fa-trash-can'></i></button>" +
            //                         "<button type='button' class='btn btn-delete' id='delete-" + value.id + "'><i class='fa-solid fa-trash-can'></i></button>" +
            //                         "</div>"
            //                         + "</td></tr>");
            //                 });
            //             }
            //         });
            //     }
            // });
            // $('.a-prev').click(function () {
            //     if (page > 1 && data.countPages > 1) {
            //         // $(this).attr('href', './list_students.html?page=' + (parseInt(page) - 1));
            //         var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=' + (parseInt(page) - 1);
            //         window.history.pushState({ path: refresh }, '', refresh);

            //         // $(this).attr('href', './list_students.html?page=' + (parseInt(page) + 1));
            //         $.ajax({
            //             method: 'GET',
            //             url: "http://localhost:3000/server/api/student/pagination.php?page=" + (parseInt(page) - 1),
            //             beforeSend: function (request) {
            //                 request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
            //                 // console.log(localStorage.getItem('data'));
            //             },
            //             success: function (data) {
            //                 // lấy endpoint
            //                 // console.log(data);
            //                 $('#msg').html('Có ' + data.countRows + ' bản ghi');
            //                 $('.table-item').remove();
            //                 $.each(data.students, function (key, value) {
            //                     $("tbody").append("<tr class='table-item'><td>" + value.id + "</td>" +
            //                         "<td>" + value.profile_code + "</td>" +
            //                         "<td>" + value.student_code + "</td>" +
            //                         "<td>" + value.firstname + " " + value.lastname + "</td>" +
            //                         "<td>" + value.gender + "</td>" +
            //                         "<td>" + value.date_of_birth + "</td>" +
            //                         "<td>" + value.place_of_birth + "</td>" +
            //                         "<td>" + value.race + "</td>" +
            //                         "<td>" + value.religion + "</td>" +
            //                         "<td>" + value.phone + "</td>" +
            //                         "<td>" + value.email + "</td>" +
            //                         "<td>" + value.personal_email + "</td>" +
            //                         "<td>" + value.address + "</td>" +
            //                         "<td>" + value.identity_number + "</td>" +
            //                         "<td>" + value.student_status + "</td>" +
            //                         "<td>" + value.note + "</td>" +
            //                         "<td>" +
            //                         "<div class='btn-group' role='group' aria-label='Basic example'>" +
            //                         "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-eye'></i></button>" +
            //                         "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-pen-to-square'></i></button>" +
            //                         // "<button type='button' class='btn' onclick='deleteFun("+value.id+")'><i class='fa-solid fa-trash-can'></i></button>" +
            //                         "<button type='button' class='btn btn-delete' id='delete-" + value.id + "'><i class='fa-solid fa-trash-can'></i></button>" +
            //                         "</div>"
            //                         + "</td></tr>");
            //                 });
            //             }
            //         });
            //     }
            // });
        };

        $.ajax(options).then(() => {

            $(".btn-delete").click(function () {
                const id = this.id.slice(7);
                deleteFun(id);
            });

            $('.pagination .pa').click(function () {
                const page = this.id.slice(11);

                // $(this > ".page-link").css("color", "red").css("border", "none");
   
                var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=' + page;
                window.history.pushState({ path: refresh }, '', refresh);

                $.ajax({
                    method: 'GET',
                    url: LOCAL_URL + "/server/api/student/pagination.php?page=" + page,
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
                        // console.log(localStorage.getItem('data'));
                    },
                    success: function (data) {
                        // lấy endpoint
                        // console.log(data);
                        $('#msg').html('Có ' + data.countRows + ' bản ghi');
                        $('.table-item').remove();
                        $.each(data.students, function (key, value) {
                            $("tbody").append("<tr class='table-item'><td>" + value.id + "</td>" +
                                "<td>" + value.profile_code + "</td>" +
                                "<td>" + value.student_code + "</td>" +
                                "<td>" + value.firstname + " " + value.lastname + "</td>" +
                                "<td>" + value.gender + "</td>" +
                                "<td>" + value.date_of_birth + "</td>" +
                                "<td>" + value.place_of_birth + "</td>" +
                                "<td>" + value.race + "</td>" +
                                "<td>" + value.religion + "</td>" +
                                "<td>" + value.phone + "</td>" +
                                "<td>" + value.email + "</td>" +
                                "<td>" + value.personal_email + "</td>" +
                                "<td>" + value.address + "</td>" +
                                "<td>" + value.identity_number + "</td>" +
                                "<td>" + value.student_status + "</td>" +
                                "<td>" + value.note + "</td>" +
                                "<td>" +
                                "<div class='btn-group' role='group' aria-label='Basic example'>" +
                                "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-eye'></i></button>" +
                                "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-pen-to-square'></i></button>" +
                                // "<button type='button' class='btn' onclick='deleteFun("+value.id+")'><i class='fa-solid fa-trash-can'></i></button>" +
                                "<button type='button' class='btn btn-delete' id='delete-" + value.id + "'><i class='fa-solid fa-trash-can'></i></button>" +
                                "</div>"
                                + "</td></tr>");
                        });
                    }
                });
            });
        });

        // search
        $('#search-input').on('click', function () {
            var fullname = $('#fullname').val();
            var profile_code = $('#profile_code').val();
            var student_code = $('#student_code').val();

            var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?profile_code=' + profile_code + '&student_code=' + student_code + '&fullname=' + fullname;
            window.history.pushState({ path: refresh }, '', refresh);

            $.ajax({
                method: 'GET',
                url: LOCAL_URL + '/server/api/student/filter.php?profile_code=' + profile_code + '&student_code=' + student_code + '&fullname=' + fullname,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('data'));
                    // console.log(localStorage.getItem('data'));
                },
                success: function (data) {
                    // lấy endpoint
                    if (data.rows > 0) {
                        // console.log(data);
                        $('#msg').html('Có ' + data.rows + ' bản ghi');
                        $('.table-item').remove();
                        $('.pagination-nav').remove();
                        $.each(data.students, function (key, value) {
                            $("tbody").append("<tr class='table-item'><td>" + value.id + "</td>" +
                                "<td>" + value.profile_code + "</td>" +
                                "<td>" + value.student_code + "</td>" +
                                "<td>" + value.firstname + " " + value.lastname + "</td>" +
                                "<td>" + value.gender + "</td>" +
                                "<td>" + value.date_of_birth + "</td>" +
                                "<td>" + value.place_of_birth + "</td>" +
                                "<td>" + value.race + "</td>" +
                                "<td>" + value.religion + "</td>" +
                                "<td>" + value.phone + "</td>" +
                                "<td>" + value.email + "</td>" +
                                "<td>" + value.personal_email + "</td>" +
                                "<td>" + value.address + "</td>" +
                                "<td>" + value.identity_number + "</td>" +
                                "<td>" + value.student_status + "</td>" +
                                "<td>" + value.note + "</td>" +
                                "<td>" +
                                "<div class='btn-group' role='group' aria-label='Basic example'>" +
                                "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-eye'></i></button>" +
                                "<button type='button' class='btn' onclick=\"window.location.href = './add_students.html?id=" + value.id + "';\"><i class='fa-solid fa-pen-to-square'></i></button>" +
                                // "<button type='button' class='btn' onclick='deleteFun("+value.id+")'><i class='fa-solid fa-trash-can'></i></button>" +
                                "<button type='button' class='btn btn-delete' id='delete-" + value.id + "'><i class='fa-solid fa-trash-can'></i></button>" +
                                "</div>"
                                + "</td></tr>");
                        });
                    }
                    else {
                        $('#msg').html('Không có kết quả nào');
                        $('.table-item').remove();
                        $('.pagination-nav').remove();
                    }
                }
            });
        })
    }

});
