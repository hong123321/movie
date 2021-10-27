$('.logBtn').click(() => {
    var logName = $('.logName').val();
    var logPass = $('.logPass').val();
    const requestToken = $.ajax({
        url: `${url}/authentication/token/new`,
        data: {
            api_key: apiKey,
            language: "vi-VN",
        }
    })
    requestToken.then((value) => {
            return value.request_token;
        })
        .then((val) => {
            $.ajax({
                url: `${url}/authentication/token/validate_with_login?api_key=0a29470d2870722d0e03d684d78b216b`,
                type: "POST",
                data: {
                    username: `${logName}`,
                    password: `${logPass}`,
                    request_token: `${val}`
                }
            }).done((value) => {
                showDeatiluser(logName);
            }).catch((error) => {
                alert("Tên đăng nhập sai hoặc mật khẩu sai");
            })
        })
})

function showDeatiluser(logName) {
    alert("đăng nhập thành công");
    $('.btnlogin').hide();
    modal.hide();
    detailUser.show();
    detailUser.append(`
    <button type="button" class="btn-login btn-danger">${logName}</button>
    `);
}