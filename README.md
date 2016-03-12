# Tindair API

A JSON API for the Tindair mobile apps.

## Routes

- `GET /` returns a list of links.
- `GET /users` returns a list of users.
- `GET /users/:username` returns information about the specific user.
- `GET /users/:username/destinations` returns a list of destinations "liked" by the user.
- `POST /users/:username/destinations` with a JSON body on the form `{"destination": "some destination"}` adds the destination to the user's "liked" destinations.
- `GET /destinations` returns a list of all destinations.
- `GET /destinations/random` returns a random sample of destinations. Accepts an integer as the query parameter `count` to limit the sample size: for example, `/destinations/random?count=2` will return at most 2 destinations.
- `GET /destinations/:name` returns information about the specific destination.
- `GET /destinations/:name/users` returns all users who have "liked" the specific destination. Accepts a string as the query parameter `friendsWith` to only show friends of a specific person: for example, `/destination/:name/users?friendsWith=martin` will only show friends of Martin who have "liked" the destinationonly show friends of a specific person: for example, `/destination/:name/users?friendsWith=martin` will only show friends of the user "martin" who have also "liked" the destination.
