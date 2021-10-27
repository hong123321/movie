const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const url = 'https://api.themoviedb.org/3';
const apiKey = '0a29470d2870722d0e03d684d78b216b';
const renderPage = (id, img, name, tilte) => `
      <div  class="col-md-2 col-odd">
      <a href="detail.html?id=${id}">
      <div class="movies_item_img" style="background-image: url('${imgUrl+img}');  height:400px;"></div>
      <div class="movies_item_name">
          <p>${name}</p>
      </div>
      <div class="movies_item_desc"><span>${tilte}</span></div>
      </a>
  </div>
`
const renderSerimovie = (id, img, name, tilte) => `
      <div  class="col-md-2 col-odd">
      <a href="detail.html?ids=${id}">
      <div class="movies_item_img" style="background-image: url('${imgUrl+img}');  height:400px;"></div>
      <div class="movies_item_name">
          <p>${name}</p>
      </div>
      <div class="movies_item_desc"><span>${tilte}</span></div>
      </a>
  </div>
`
    //reder filter genre
// $.ajax({
//     url: `${url}/genre/movie/list`,
//     type: 'GET',
//     data: {
//         api_key: apiKey,
//         language: "vi-VN"
//     }
// }).done((value) => {
//     value.genres.map((val) => {
//         $('.genre').append(`
//         <li value="${val.id}"  onclick='fiter(id_gen=${val.id},id_lan)' role="presentation"><a role="menuitem" tabindex="-1" href="#">${val.name}</a></li>
//         `)
//     })
// })

// //render filter country
// $.ajax({
//         url: `${url}/configuration/countries`,
//         type: 'GET',
//         data: {
//             api_key: apiKey,
//             language: "vi-VN"
//         }
//     }).done((value) => {
//         value.map((val) => {
//             $('.dropdown_country').append(`
//         <li class="getId"  onclick='fiter(id_gen,id_lan=${val.iso_3166_1})' role="presentation"><a role="menuitem" tabindex="-1" href="#">${val.native_name}</a></li>
//         `)
//         })
//     })
//     // render result filter genres and country
// $('.fiter').hide();

// function fiter(id_gen, id_lan) {
//     var val = id_gen;
//     var vals = id_lan;
//     console.log(val, vals)
//     $.ajax({
//         url: `${url}/discover/movie`,
//         data: {
//             api_key: apiKey,
//             with_genres: val,
//             language: "vi-VN"
//         }
//     }).done((data) => {
//         $('.fiter').empty();
//         $('.grid__full-width').hide();
//         $('.fiter').show();
//         data.results.map((value) => {
//             var html = renderPage(
//                 value.id,
//                 value.poster_path,
//                 value.original_title,
//                 value.title
//             )
//             $('.fiter').prepend(html)
//         })

//     })
// }
//reder filter genre
$.ajax({
    url: `${url}/genre/movie/list`,
    type: 'GET',
    data: {
        api_key: apiKey,
        language: "vi-VN"
    }
}).then((value) => {
    value.genres.map((val) => {
        $('.droppdown_Category').append(`
            <option value="${val.id}">${val.name}</option>
            `)
    })
})

$.ajax({
        url: `${url}/watch/providers/regions`,
        type: 'GET',
        data: {
            api_key: apiKey,
            language: "vi-VN"
        }
    }).then((value) => {
        console.log(value)
        value.results.map((val) => {
            $('.droppdown_country').append(`
        <option value="${val.iso_3166_1}">${val.native_name}</option>
        `)
        })
    })
    //get event on change fiter
$('.droppdown_Category').on('change', function() {
    filter();
})
$('.droppdown_country').on('change', function() {
    filter();
})
$('.droppdown_year').on('change', function() {
    filter();
})
$('.droppdown_date').on('change', function() {
    filter();
})
$('.fiter').hide();
$('.noItem').hide();

function filter() {
    //get value filter
    const valueSelectGenre = $('.droppdown_Category :selected').val();
    const valueSelectCountry = $('.droppdown_country :selected ').val();
    const valueSelecYear = $('.droppdown_year :selected').val();
    const valueSelectOrder = $('.droppdown_date :selected').val();
    // query in ajax
    const queryRegion = valueSelectCountry && `&with_original_language=${valueSelectCountry}`;
    const year = queryRegion.toLowerCase()
    const queryYear = valueSelecYear && `&primary_release_year=${valueSelecYear}`;
    const queryGenre = valueSelectGenre && `&with_genres=${valueSelectGenre}`;
    const queryOrderBy = valueSelectOrder && `&sort_by=${valueSelectOrder}`;
    $.ajax({
        url: `${url}/discover/movie?api_key=0a29470d2870722d0e03d684d78b216b${queryGenre}${year}${queryYear}${queryOrderBy}`,
        type: 'GET',
        data: {
            page: 1,
            language: "en-US"
        }
    }).done((val) => {
        console.log(val)
        $('.fiter').empty();
        $('.grid__full-width').hide();
        $('.fiter').show();

        if (val.total_pages == 0) {
            $('.noItem').show();
        } else {
            $('.noItem').hide();
            val.results.map((value) => {
                var html = renderPage(
                    value.id,
                    value.poster_path,
                    value.original_title || value.original_name,
                    value.title || value.name

                )
                $('.fiter').append(html)

            })
        }
    })

}