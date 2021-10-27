const renderSearch = (id, img, name, title) =>
    `
    <div class="col-md-2 col-odd" id=${id}>
    <a href="detail.html?id=${id}">
                <div class="img" style="background-image: url('${imgUrl + img}');height:400px;"></div>
                <div class="movies_item_name">
                    <p>${name}</p>
                </div>
                <div class="movies_item_desc"><span>${title} </span></div>
                </a>
            </div>
    `
$('.exitSearch').click(function() {
    const val = $('.form-control').val();
    const datasearch = $.ajax({
        url: `${url}/search/multi/`,
        data: {
            api_key: apiKey,
            language: "vi-VN",
            query: `${val}`
        }
    })
    datasearch.then((val) => {
        var data = val.results
        data.map((value) => {
            var html = renderSearch(
                value.id,
                value.poster_path,
                value.title,
                value.original_title
            )
            $('.movie_search').prepend(html);
        })


    }).catch((erro) => {
        console.log(erro);
    })
})