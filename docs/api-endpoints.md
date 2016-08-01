# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Profiles

- `GET /api/profiles`
  * Matching search criteria
- `POST /api/profiles`
- `GET /api/profiles/:id`
- `PATCH /api/profiles/:id`
- `DELETE /api/profiles/:id`

### Messages

- `GET /api/users/:userid/messages`
  * Inbox
- `POST /api/users/:userid/messages`
- `GET /api/users/:userid/messages/:id`
- `PATCH /api/users/:userid/messages/:id`
- `DELETE /api/users/:userid/messages/:id`

### Likes
- `GET /api/users/:userid/likes`
- `POST /api/users/:userid/likes`
- `GET /api/users/:userid/likes/:id`
- `DELETE /api/users/:userid/likes/:id`


### Questions (and Responses)

- `GET /api/questions/:id`
  * Get Specific question
- `GET /api/users/:userid/questions`
  * Get responses from a user
- `POST /api/users/:userid/questions`
  * Add responses using THIS url
- `GET /api/users/:userid/questions/:id`
- `PATCH /api/users/:userid/questions/:id`
- `DELETE /api/users/:userid/messages/:id`
