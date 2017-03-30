console.log('we are runnin...');

document
  .querySelector('body')
  .addEventListener('click', function (event) {
    console.log('A click, a click!');
    console.log('Lets do something asynchronous');
    $.getJSON('http://swapi.co/api/planets/1', function (planetData) {
        console.log(planetData);
        var numberOfFilms = planetData.films.length;
        var allFilms = [];

        planetData.films.forEach(function (link) {
          $.getJSON(link, receiveFilm);
        })

        function receiveFilm(theFilm) {
          allFilms.push(theFilm);
          if (allFilms.length === numberOfFilms) {
            console.log('we got em all');
            console.log(allFilms);
          } else {
            console.log('we got a film, but more are on the way');
          }
        }

      });
  });

console.log('we are really runnin...')
