console.log('we are runnin...');

document
  .querySelector('html')
  .addEventListener('click', function (event) {

    console.log('A click, a click!');
    console.log('Lets do something asynchronous');

    $.getJSON('http://swapi.co/api/planets/1', function (planetData) {

        var numberOfFilms = planetData.films.length;
        var receivedFilms = [];

        planetData.films.forEach(function (link) {
          $.getJSON(link, receiveFilm);
        });

        function receiveFilm(theFilm) {

          receivedFilms.push(theFilm.title);

          if (receivedFilms.length === numberOfFilms) {
            console.log(receivedFilms);
          }
        }

      });
  });

console.log('we are really runnin...')
