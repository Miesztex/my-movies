# MyMovies
App MyMovies allows you to keep all your favourite movies in one place.
All you need to do is to enter your movie's basic data: URL or ID.
- Please note, that at this moment the url has to be finished by an ID, with any following strings the app won't work.

## Methodology
### How does it work?
1. URL or ID are subject of extracting ID and proper API request is being formed.
2. Response is formed into proper movie object and saved in MoviesContext state as part of movies array.
3. Movies are being shared to FilterContext state as all_movies.
4. Every input change (on /movies page) cause FilterContext state change and init filter and sort of movies saved as filtered_movies.
5. Then, filtered movies are paginated and saved as an array of arrays with maximum length of selected per_page property.
6. The results are being displayed categorized by clicked navbar option 'movies (= all)' / 'YouTube' / 'Vimeo'
- At start, the app displays demo data, which can be removed. If you refresh with empty list, demo data will be restored.
- The app is prepared for expanding movies providers list by establishing seperate functions parsing input, forming query url and parsing received data (src/utils/fetch*)

### Styling
- Reactstrap components
- Bootstrap styling and util classNames
- global index.css for customization 

### Additional libraries
- react-router (please read build info)
- react-moment
- react-player

## Build

In order to avoid issues connected with deploiyng app at Netlify using React Router: 
- the build command is following: 
```
"build": "CI= react-scripts build"
```
in which `CI= ` has to be removed in cases of CRA build.
- in public folder `_redirects` file is included

#### Warnings

You will find warnings when using Reactstrap moving components, which seems to be common problem with the library.
