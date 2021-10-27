const getIdFilter = new URLSearchParams(window.location.search);
var id = getIdFilter.get('id');
renderfilter(id);
//get filter Name
var valName = getIdFilter.get('value')
$('.filterName').append(`
<h3>${valName}</h3>
`)
    //Get filter Movie category in detail page
function renderfilter(id) {
    const hendleFilter = $.ajax({
        url: `${url}/discover/movie`,
        data: {
            api_key: apiKey,
            with_genres: id,
            language: "vi-VN"
        }
    })
    hendleFilter.then((value) => {
            $('.filterMovie').empty()
            value.results.map((val) => {
                var html = renderPage(
                    val.id,
                    val.poster_path,
                    val.original_title,
                    val.title
                )
                $('.filterMovie').prepend(html)
            })
            return value.total_pages;
        })
        .then((val) => {
            $('.filter-pagination').twbsPagination({
                totalPages: val,
                onPageClick: function(evt, page) {
                    $.ajax({
                        url: `${url}/discover/movie`,
                        type: 'GET',
                        data: {
                            api_key: apiKey,
                            language: "vi-VN",
                            page: page
                        },
                    }).done((val) => {
                        console.log(val)
                        $('#filtercontent').empty()
                        val.results.map((movie) => {
                            var htmls = renderPage(
                                movie.id,
                                movie.poster_path,
                                movie.original_title,
                                movie.title
                            )
                            $('#filtercontent').append(htmls);
                        })
                    })
                }
            })
        })
}