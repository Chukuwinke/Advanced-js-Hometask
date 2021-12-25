## The task is

Receive the list of `Star Wars` films, and display a list of characters for each of them.

#### Technical requirements:
- Send an AJAX request to `https://swapi.co/api/films/` and get a list of all the films in the Star Wars series
- For each movie, get a list of the characters that have been shown in this movie from the server. The list of characters can be obtained from the `characters` property.
- As soon as the information about the films is received from the server, the list of all the films will be immediately displayed on the screen. It is necessary to specify the episode number, the title of the film, as well as the short content (fields `episode_id`, `title` and `opening_crawl`).
- As soon as the information about characters of any film is received from a server, display this information on the screen under the name of a film.
- It is necessary to write two variants of implementation in different `.js` files. One with `XMLHttpRequest`, another with `fetch` or `axios`.
- In order for all AJAX requests for characters to be executed in parallel, in the implementation of `fetch/axios` the list of characters from each film must be obtained using the function `Promise.all()`.

#### ADVANCED COMPLEXITY
 - Write a third implementation using jQuery with `$.get()` or `$.ajax()`.
 - While film characters are loaded, display animation of loading under a film name. You can use any animation you like. It is recommended to find a variant on pure CSS without using JavaScript.