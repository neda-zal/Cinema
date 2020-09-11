// jshint esversion:6
$(document).ready(function() {
  // The base url for all API calls
  var apiBaseURL = 'https://api.themoviedb.org/3/';
  var apiKey = "177171d8e6052aa2e12394d9149a17aa";

  var imageBaseUrl = 'https://image.tmdb.org/t/p/';

  const nowPlayingURL = apiBaseURL + 'movie/upcoming?api_key=' + apiKey;

  function getNowPlayingData() {
    $.getJSON(nowPlayingURL, function(nowPlayingData) {
      for (let i = 0; i < nowPlayingData.results.length; i++) {
        var dataRes = nowPlayingData.results[i].id;

        var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;

        $.getJSON(thisMovieUrl, function(movieKey) {

          var poster = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;

          var title = nowPlayingData.results[i].original_title;

          var releaseDate = nowPlayingData.results[i].release_date;

          var overview = nowPlayingData.results[i].overview;

          var voteAverage = nowPlayingData.results[i].vote_average;

          var youtubeKey = movieKey.results[0].key;

          var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
          // console.log(youtubeLink)
          var nowPlayingHTML = '';
          // added in i (looping through the results) to nowPlayingHTML. Without it, only the details for the first movie in the results display in the modal no matter which movie poster you click on.
          nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
          nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
          nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          nowPlayingHTML += '<div class="modal-dialog" role="document">';
          nowPlayingHTML += '<div class="modal-content col-sm-12">';
          nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
          nowPlayingHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          nowPlayingHTML += '</div><br>'; //close trailerLink
          nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
          nowPlayingHTML += '<div class="movieName">' + title + '</div><br>';
          nowPlayingHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
          nowPlayingHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
          // nowPlayingHTML += '<div class="genre">Genre: '+genre+'</div><br>';
          nowPlayingHTML += '<div class="overview">' + overview + '</div><br>'; // Put overview in a separate div to make it easier to style
          nowPlayingHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:30 AM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:00 AM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">12:30 PM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
          // nowPlayingHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
          nowPlayingHTML += '</div>'; //close movieDetails
          nowPlayingHTML += '</div>'; //close modal-content
          nowPlayingHTML += '</div>'; //close modal-dialog
          nowPlayingHTML += '</div>'; //close modal
          nowPlayingHTML += '</div>'; //close off each div

          $('#movie-grid').append(nowPlayingHTML);
          //Without this line, there is nowhere for the posters and overviews to display so it doesn't show up
        });
      }
    });
  }

  getNowPlayingData();

  var searchTerm = '';
  searchMovies();
  //reference entire search form
  $('.searchForm').submit(function(event) {
    $('#movie-grid').html('');
    event.preventDefault();
    searchTerm = $('.form-control').val();
    searchMovies();
  });

  function searchMovies() {
    //need to include query in url. (ex: &query=boss+baby)
    const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
    // console.log(searchMovieURL);
    $.getJSON(searchMovieURL, function(movieSearchResults) {
      // console.log(movieSearchResults);
      for (let i = 0; i < movieSearchResults.results.length; i++) {
        var dataRes = movieSearchResults.results[i].id;
        var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;

        $.getJSON(thisMovieUrl, function(movieKey) {
          // console.log(movieKey)
          var poster = imageBaseUrl + 'w300' + movieSearchResults.results[i].poster_path;
          var title = movieSearchResults.results[i].original_title;
          var releaseDate = movieSearchResults.results[i].release_date;
          var overview = movieSearchResults.results[i].overview;
          var voteAverage = movieSearchResults.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
          var searchResultsHTML = '';
          searchResultsHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
          searchResultsHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
          searchResultsHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          searchResultsHTML += '<div class="modal-dialog" role="document">';
          searchResultsHTML += '<div class="modal-content col-sm-12 col-lg-12">';
          searchResultsHTML += '<div class="col-sm-6 moviePosterInModal">';
          searchResultsHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          searchResultsHTML += '</div><br>'; //close trailerLink
          searchResultsHTML += '<div class="col-sm-6 movieDetails">';
          searchResultsHTML += '<div class="movieName">' + title + '</div><br>';
          searchResultsHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
          searchResultsHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
          searchResultsHTML += '<div class="overview">' + overview + '</div><br>';
          searchResultsHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">8:30 AM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">10:00 AM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">12:30 PM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">3:00 PM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">4:10 PM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">5:30 PM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">8:00 PM' + '</div>';
          searchResultsHTML += '<div class="col-sm-3 btn btn-primary">10:30 PM' + '</div>';
          searchResultsHTML += '</div>'; //close movieDetails
          searchResultsHTML += '</div>'; //close modal-dialog
          searchResultsHTML += '</div>'; //close modal
          searchResultsHTML += '</div>'; //close off each div
          // console.log(searchResultsHTML)
          $('#movie-grid').append(searchResultsHTML);
          //Label will be whatever user input was
          $('#movieGenreLabel').html(searchTerm);
        })
      }
    })
  }
});
