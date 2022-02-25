//phân trang bằng jquery không sử dụng plugin

$(document).ready(function () {
    //lấy số item hiển thị trên mỗi trang
    // $("#rowsPerPage").keyup(function () {
    //     limit = $('#rowsPerPage').val();
    // })

    //tạm cho số item hiển thị là 4
    limit = 4;

    //tính tổng số trang để hiển thị
    var pageCount = $('.table-item').length / limit;

    //chèn số trang là số thẻ li vào thẻ ul có class .pagination
    for (var i = 0; i < pageCount; i++) {
        $('.pagination').append('<li class="page-item"><a class="page-link rounded-circle" href="#">' + (i + 1) + '</a></li>');
    }

    //gán class background màu xanh cho thẻ trang đầu tiên (vì hiển thị trang web là trang đầu tiên)
    $('.pagination .page-link').first().addClass('bg-primary text-white');

    //hàm hiển thị item table theo số trang (truyền vào 1 biến là số trang hiện tại)
    showPage = function (currentPage) {
        $('.table-item').hide(); //ẩn tất cả item trong table
        $('.table-item').each(function (start) {
            /*
                duyệt mảng theo n tăng dần để tìm ra item đầu tiên trong trang hiện tại
                => start = (currentPage - 1) * limit
            */
            if (start >= limit * (currentPage - 1) && start < limit * currentPage) {
                $(this).show();
            }
        });
    }

    //mặc định cho trang đầu tiên là 1
    showPage(1);

    // hàm click vào trang mới thì đổi màu trang hiện tại
    $('.pagination li a').click(function () {
        $('.pagination li a').removeClass("bg-primary text-white");
        $(this).addClass("bg-primary text-white");
        showPage(parseInt($(this).text())); //lấy số trang hiện tại để hiển thị số item
    });
});