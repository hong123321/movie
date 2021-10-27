const tvmovie = $.ajax({
    url: `${url}/tv/popular`,
    type: 'GET',
    data: {
        api_key: apiKey,
        language: "vi-VN"
    }
})
tvmovie.then((val) => {
        var tvpopular = val.results.slice(0, 8);
        tvpopular.map((tvpopula) => {
            var html = renderSerimovie(
                tvpopula.id,
                tvpopula.poster_path,
                tvpopula.original_name,
                tvpopula.name
            )
            $('.tvpopular').append(html)
        })
        return val.total_pages;
    })
    .then((val) => {
        $('.pagination').twbsPagination({
            totalPages: val,
            onPageClick: function(evt, page) {
                $.ajax({
                    url: `${url}/tv/popular`,
                    type: 'GET',
                    data: {
                        api_key: apiKey,
                        language: "vi-VN",
                        page: page
                    },
                }).done((val) => {
                    $('#seriMovie').empty()
                    val.results.map((movie) => {
                        var htmls = renderSerimovie(
                            movie.id,
                            movie.poster_path,
                            movie.original_name,
                            movie.name
                        )
                        $('#seriMovie').append(htmls);

                    })
                })
            }
        })
    })