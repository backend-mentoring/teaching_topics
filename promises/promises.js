console.log('we are runnin...');

document
  .querySelector('html')
  .addEventListener('click', event => {

    console.log('A click, a click!');
    console.log('Lets do something asynchronous');

    fetch('http://swapi.co/api/planets/1')
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        throw new Error('not ok');
      })
      .then(planetData =>
        Promise.all(planetData.films.map(link =>
          fetch(link)
            .then(r => r.json())
            .then(f => f.title))))
      .then(filmTitles => { console.log(filmTitles); })
      .catch(err => {
        console.log(`well, I really wanted to see some starwars films, but I guess I'll just have to not... :( ${err}`);
      });
  });

console.log('we are really runnin...')
