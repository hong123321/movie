const getIdtv = new URLSearchParams(window.location.search);
var idTv = getIdtv.get('ids');
renderDetailTv(idTv);

function renderDetailTv(idTv) {
    const hendle = $.ajax({
        url: `${url}/tv/${idTv}`,
        data: {
            api_key: apiKey,
            language: "vi-VN",
            append_to_response: "credits,videos"
        }
    })
    hendle.then((value) => {
            $('.container_detail').prepend(`
        <div class="header_img" style="background-image:url('${imgUrl+value.backdrop_path}');width:100%; height:600px">
        </div>
        `)
            $('.col-img').prepend(`
        <div class="img-responsive header_detail-avt-img" style="background-image: url('${imgUrl+ value.poster_path}'); 
        "></div>
        `)
            $('.movie_name').prepend(`
        <h1>${value.name}</h1>
        <p>${value.original_name}</p>
        <span class="imbd"><i class="fab fa-imdb"></i> ${value.vote_average}</span>
        `)
            var gen = value.genres;
            gen.map((gens) => {
                $('.Category').append(`
                <a href="filter.html?value=${gens.name}&id=${gens.id}"  class="cateone">${gens.name}</a>
                `)
            })

            $('.movie_country').append(`
        <p>QUỐC GIA :</p>
        <p>${value.original_language}</p>
        `)
            $('.movie_time_start').append(`
        <p>KHỞI CHIẾU :</p>
        <p>${value.first_air_date}</p>
        `)
            $('.movie_title').append(`
        <p>${value.overview}</p>
        `)
            $('.movie_trailer').append(`
        <div class="movie_trailer_detail">
                                <div class="movie_trailer_detail-img">
                                    <iframe src="">
                                    </iframe>
                                </div>
                            </div>
        `)
            return value.credits.cast;
        })
        .then((value) => {
            var perfor = value.slice(0, 5)
            perfor.map((val) => {
                $('.perfor').append(`
                <a href="detailperfor.html?id=${val.id}">
                <div class="imgSlick">
                <img src="${imgUrl + val.profile_path}" alt="">
                <p>${val.name}</p>
                <p>${val.original_name}</p>
            </div>
            </a>
                `)
            })
        })
}