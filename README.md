# OKCatfish

[Heroku link][heroku]

[heroku]: http://okcatfish.herokuapp.com

## Minimum Viable Product

OKCatfish is a web application inspired by OKCupid that will be built using Ruby on Rails and React.js. By the end of Week 9, this app will, at the very least, satisfy the following criteria:

- [x] Hosting on Heroku
- [x] New user creation, login, and demo login
- [ ] A production README, replacing this README
- [x] Profile CRUD, Match Search by location and "looking for"
  - [x] Smooth, bug-free navigation
  - [ ] "Celebrity" photo repositories
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Elegant, Simple, and Clear CSS styling
- [x] Messaging and Likes
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Elegant, Simple, and Clear CSS styling
- [ ] Personality Questions
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Elegant, Simple, and Clear CSS styling
- [ ] Match Percentages based on Questions
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Elegant, Simple, and Clear CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

**Objective:** Functioning rails project with front-end Authentication and CSS'd Home Page

- [x] create new project
- [x] create `User` table/model
- [x] authentication backend setup
- [x] create `StaticPages` controller and root view
- [x] set up webpack & flux folders
- [x] setup `APIUtil` to interact with the API
- [x] set up flux cycle for frontend authentication
- [x] user signup/signin components
- [x] blank landing component after signin
- [x] style signin/signup components
- [x] well designed home page
- [x] seed users

### Phase 2: Profile Model, API, and components (2 days, W1 F 6pm)

**Objective:** Logged in user's profile can be viewed and edited,
User can view and search for others profiles. Profiles have text, details, looking for, and photo albums.

- [x] create `Profile` model
- [x] create `Photo Repository` table and add several repositories of photos for seeding
- [x] seed the database with a small amount of test data
- [x] CRUD API for profiles (`ProfileTextController`) and (`ProfilePhotoAlbumController`)
- [x] jBuilder views for profiles
- [x] test out API interaction in the console.
- implement each profile component, building out the flux loop as needed.
  - [x] `ProfileShow`
  - [ ] `ProfilePhotoAlbumShow`
  - [x] `UserProfileShow`
  - [x] `UserProfileEdit`
  - [ ] `UserProfilePhotoAlbumShow`
  - [ ] `UserProfilePhotoAlbumEdit`
  - [x] `ProfileSearch`
- [x] save Profile Information to the DB when the user saves
- [x] seed profiles
- [x] CSS profiles

### Phase 3: Messaging and Likes (2 days, W2 Tu 6pm)

**Objective:** Users can message each other, Users can "like" each other.

- [x] create `Thread` and `Message` model
- [x] create `Like` model
- build out API, Flux loop, and components for:
  - [x] Message CRUD
  - [x] writing messages
  - [x] reading messages
  - [x] viewing thread
  - [x] liking Users
  - [x] unliking Users
- [x] Use CSS to style new components
- [x] Seed messages and likes
- [x] Add automated messages if two users like each other


### Phase 4: Questions (1 day, W2 W 6pm)

**Objective:** Users can answer a series of questions to improve the quality of their matches.

- [ ] create `Question` and `Response` models
- build out API, Flux loop, and components for:
  - [ ] answering questions
  - [ ] skipping questions
  - [ ] viewing questions
- [ ] Style new elements
- [ ] Seed questions, responses and user responses

### Phase 5: Match Percentages based on Questions (1 day, W2 Th 6pm)

**objective:** Calculate and display match percentages based on Questions, add weight to questions.

- [ ] calculate match percentages, add weight to `user responses`
- [ ] add `MatchPercentage` store, updating whenever new questions are answered
- [ ] add match percentages to profile search
- [ ] update CSS


### Phase 6: - Infinite scroll for Match Search (1 day, W2 F 6pm)

**objective:** Add infinite scroll to Match Search

- [ ] Paginate Match Search API to send 20 results at a time
- [ ] Append next set of results when user scrolls and is near bottom
- [ ] Make sure styling still looks good
- [ ] Ensure we have enough seeded profiles to demo infinite scroll

### Bonus Features (TBD)
- [ ] Search for users based on username
- [ ] Block or Hide users
- [ ] Integrate messaging with chat
- [ ] Build up repositories of photos

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
[phase-six]: docs/phases/phase6.md
