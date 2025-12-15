$(function () {
    $('#bottomNav').load('bottom-nav.html', function () {

        const page = $('body').data('page');

        $('.nav-item').removeClass('active');
        $('.nav-item[data-page="' + page + '"]').addClass('active');

    });
});