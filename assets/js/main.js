//show hide login, logout
const modal = $('.modal');
const formRes = $('.form-auth')
const formLogin = $('.login-form');
modal.hide();
const detailUser = $('.header_manu_userName');
detailUser.hide();
$(".btn-login").click(() => {
    modal.show();
    formLogin.show();
    formRes.hide();
})
$('.show-res').click(() => {
    formRes.show();
    formLogin.hide();
})
$('.show_log').click(() => {
    formRes.hide();
    formLogin.show();
})
$(".auth-form__control-back").click(() => {
        (formLogin, formRes, modal).hide();
    })
    // search click





//comment
$('.form-comment').css('display', '');