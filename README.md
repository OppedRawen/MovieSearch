# 07 Project 1: Interactive Front-End Application

For project one, our group wanted to create a movie related database that would give the user the ability to read about a movie with a basic description of the director, the actors, the rating, awards, and more. Done with the OMBD API

The site begins with an empty page that lets the user know to search up whatever movie they would like, based on the type of media it is, movie, tv series, and episode as well.

The user can even select the length of the plot description, to give either an in depth description, or a short description as well.

Below the information the user is given a related movie trailer based on their search, using the youtube v3 api to search up a youtube video that will then add that video link onto youtubes embedder found on the actual youtube page.

Added a movie review section as well, that will populate with multiple movie reviews, if there aren;t any reviews, then the section will remain empty.

The last section at the bottom is just extra information for the movie based on related articles from the newyork times. These articles jsut have short descriptions with a link leading towards the actual article. This was done using the New York Times API.

## APIs

The OMBD API used for the movie related info.

https://www.omdbapi.com/

The Youtube V3 API used to get the link to the trailer off youtube.

https://developers.google.com/youtube/v3

Lastly the New York Times API, used for the articles, and the review(s).

https://developer.nytimes.com/apis


## User Story

```
AS A movie searcher
I WANT to find more details about a movie
SO THAT I can make a decision if I want to watch that movie
```

## Acceptance Criteria

```md
GIVEN I am using a movie searcher
WHEN I search a movie
THEN the movie with a poster and details appear
WHEN I scroll down
THEN I am presented with the trailer for the movie
WHEN I continue to scroll
THEN I am presented with a a review if what I searched for has any
WHEN I continue to scroll
THEN I see a total of 8 related articles for the movie
WHEN I click the read more link
THEN I am taken to the full article on the New York Times
WHEN I return to the page
THEN I am taken back to the previously searched movie 
```