# Tretton37 Project

This project contains a React application (FE) as well as a NodeJS/PostgreSQL server (BE) that interacts with each other in the Dockerized environment.

## Installation

Since this is a Dockerized project and the instructions said it was ok to use Docker, I assume you have docker-compose installed, so simply run the following command in the project root:

```bash
  docker-compose up
```

The web app can be accessed in http://localhost:3000 and the API from http://localhost:3001/employees

## Personal thoughts

I wanted to create a full scale "full stack" project so my main focus was to complete that. I am not happy with the CSS, but had to prioritize evenly between different tasks and the timeframe. Unfortunately did not have time to implement unit testing either nor have the time to test thoroughly. I also wanted to deploy this project to Digital Ocean were experiencing some never before seen and "un-googable" problems when deploying with the Docker machine. If I would have managed to deploy today, I just want to clarify that I would create a separate Dockerfile and docker-compose for a prod environment (that would use a compressed build bundle for react and different npm scripts for the API instead of using nodemon).

## Stories

#### Responsive Design

Thought this was an important task. Worked with media queries etc. But not fully satisfied.

#### No UI framework used

Thought it would be fun to challange myself to do this without a framework and to show you what I know.

#### Sort by name/office / Filter by name/office

Initially I used the tretton37 employee API but realized there were no built in support for passing query params (I take it this was done on purpose for the sake of this test). By using your API I first decided I would make an initial request and cache the result, then use various array functions to process the data. This worked fine. But decided and API with query param support would be more of a real world scenario so I decided to create one with support for these query params that would sort and filter directly in the response.

#### Don't use the 1337 API, instead build my own

As explained above I did this using NodeJS and Express with one endpoint `/employee` that fetches data from a Postgres database. The database is populated with scraped data from [here](https://tretton37.com/meet) which gets scraped during the migration phases. How ever was unable to find github/linkedin/twitter urls in the page content so I "faked" these urls based on employee names. I thought of mapping the scraped result with a request to the 1337 API but realize that probably over-engineering.

#### Only render a set of profiles

I might have misunderstood the task. Since your API was fetching all the employees at once and since it seems your're loading everything at once [here](https://tretton37.com/meet) (but hiding and animating elements based on scroll pos) I was thinking maybe you wanted just that. How ever, I came to think of this after I created the API and implemented infinity scroll with lazy loading support. So rather lazy scrolling.

#### Works in Chrome/Firefox/Edge

Have only been able to test on Chrome/Firefox and it works fine there. Unsure about IE11. Was thinking install it on a VM but simply did not have time to do so.
