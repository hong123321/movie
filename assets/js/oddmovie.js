   //render nomination movie  to homepage
   const pageOddmovie = $.ajax({
       url: `${url}/movie/now_playing`,
       type: 'GET',
       data: {
           api_key: apiKey,
           language: "vi-VN",
           page: 1
       },
   })
   pageOddmovie.then((value) => {
           var playing = value.results.slice(0, 4);
           var movieOdd = value.results.slice(5, 17);
           playing.map((movie) => {
               var html = renderPage(
                   movie.id,
                   movie.poster_path,
                   movie.original_title,
                   movie.title
               )
               $('.movie').append(html);
           })
           movieOdd.map((odd) => {
               var html = renderPage(
                   odd.id,
                   odd.poster_path,
                   odd.original_title,
                   odd.title
               )
               $('.row-oddmovie').append(html)
           })
           return value.total_pages;
       })
       // render page number
       .then((val) => {
           $('.sync-pagination').twbsPagination({
               totalPages: val,
               onPageClick: function(evt, page) {
                   $.ajax({
                       url: `${url}/movie/now_playing`,
                       type: 'GET',
                       data: {
                           api_key: apiKey,
                           language: "vi-VN",
                           page: page
                       },
                   }).done((val) => {
                       $('#content').empty()
                       val.results.map((movie) => {
                           var htmls = renderPage(
                               movie.id,
                               movie.poster_path,
                               movie.original_title,
                               movie.title
                           )
                           $('#content').append(htmls);
                       })
                   })
               }
           })
       })
       //render oddmovie to home page
   $.ajax({
       url: `${url}/movie/popular`,
       type: 'GET',
       data: {
           api_key: apiKey,
           language: "vi-VN",
           page: 2
       }
   }).done((val) => {
       var popular = val.results.slice(0, 8);
       popular.map((popula) => {
           var html = renderPage(
               popula.id,
               popula.poster_path,
               popula.original_title,
               popula.title
           )
           $('.popular').append(html);

       })
   })