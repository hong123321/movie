const getIdPerfor = new URLSearchParams(window.location.search);
var id = getIdPerfor.get('id');
renderDetailPerson(id);

function renderDetailPerson(id) {
    const deatiperson = $.ajax({
        url: `${url}/person/${id}`,
        type: "GET",
        data: {
            api_key: apiKey,

        }
    })
    deatiperson.then((val) => {
        $('.personTilte').append(`
        <div class="avt" style="background-image: url('${imgUrl+val.profile_path}');
        height: 450px; background-size: contain;  background-repeat: no-repeat;"></div>
        <div class="title">
            <h3>Thông tin cá nhân</h3>
            <div class="job">
                <h4>Nghề nghiệp</h4>
                <p>${val.known_for_department}</p>
            </div>
            <div class="sex">
                <h4>giới tính</h4>
                <p>Nữ</p>
            </div>
            <div class="birthday">
                <h4>Ngày sinh</h4>
                <p>${val.birthday}</p>
            </div>
            <div class="placeBirth">
                <h4>Nơi sinh</h4>
                <p>${val.place_of_birth}</p>
            </div>
        </div>`)
        $('.col-attend').prepend(`
        <h2> ${val.name}</h2>
        `)
        $('.story').append(`
        <p>${val.biography}</p>
        `)
        $.ajax({
            url: `${url}/person/${id}/movie_credits`,
            type: "GET",
            data: {
                api_key: apiKey,
                language: "vi-VN",
            }
        }).done((val) => {
            const movieattend = val.cast.slice(0, 20)
            const avt = val.crew.slice(0, 20)
            movieattend.map((movie) => {
                $('.rowmovie').prepend(`
                
                <div class="col-md-3 col-movieAttend">
                <div class="imgMovie" style="background-image: url('${imgUrl+movie.poster_path}');
                height:300px"></div>
                <p>${movie.original_title}</p>
            </div>`)
            })


        })
        $.ajax({
            url: `${url}/person/${id}/images`,
            type: "GET",
            data: {
                api_key: apiKey,
                language: "vi-VN",
            }
        }).done((val) => {
            val.profiles.map((vals) => {
                $('.row-avt').append(`
                <div class="col-md-3 col-avt">
                <div class="imgMovie" style="background-image: url('${imgUrl+vals.file_path}');
                height:300px;background-size: cover"></div>
                 </div>`)
            })
        })
    })
}