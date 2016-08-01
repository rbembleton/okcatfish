# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Profile Cycles

### Profiles API Request Actions

* `fetchProfiles`
  0. invoked from `ProfilesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/profiles` is called.
  0. sent search criteria
  0. `receiveProfiles` is set as the success callback.

* `createProfile`
  0. automatically invoked on User creation
  0. `POST /api/profiles` is called.
  0. `receiveSingleProfile` is set as the success callback.

* `fetchSingleProfile`
  0. invoked from `ProfileDetail` `didMount`/`willReceiveProps`
  0. `GET /api/profiles/:id` is called.
  0. `receiveSingleProfile` is set as the success callback.

* `updateProfile`
  0. invoked from `ProfileForm` `onSubmit`
  0. `PATCH /api/profiles` is called.
  0. `receiveSingleProfile` is set as the success callback.

### Profiles API Response Actions

* `receiveProfiles` (Matches)
  0. invoked from an API callback.
  0. `Profile` store updates `_profiles` and emits change.

* `receiveSingleProfile`
  0. invoked from an API callback.
  0. `Profile` store updates `_profiles[id]` and emits change.


### Store Listeners

* `ProfilesIndex` component listens to `Profile` store.
* `ProfileDetails` component listens to `Profile` store.
* `ProfileLookingFor` component listens to `Profile` store.
* `ProfilePhotoAlbum` component listens to `Profile` store.


## Message Cycles

### Message API Request Actions

* `fetchMessages`
  0. invoked from `MessagesInbox` `didMount`/`willReceiveProps`
  0. sent user id
  0. `GET /api/messages` is called.
  0. `receiveMessages` is set as the success callback.

* `createMessage`
  0. invoked from new message button `onClick` in profile OR in inbox
  0. `POST /api/messages` is called.
  0. `receiveSingleMessage` is set as the callback.

* `fetchSingleMessage `
  0. invoked from `MessageDetail` `didMount`/`willReceiveProps`
  0. `GET /api/messages/:id` is called.
  0. `receiveSingleMessage` is set as the success callback.


* `destroyMessage`
  0. invoked from delete message button `onClick`
  0. `DELETE /api/messages/:id` is called.
  0. `removeMessage` is set as the success callback.

### Messages API Response Actions

* `receiveAllMessages`
  0. invoked from an API callback.
  0. `Message` store updates `_messages` and emits change.

* `receiveSingleMessage`
  0. invoked from an API callback.
  0. `Message` store updates `_messages[id]` and emits change.

* `removeMessage`
  0. invoked from an API callback.
  0. `Message` store removes `_messages[id]` and emits change.

### Store Listeners

* `Inbox` component listens to `Messages` store.



## Question Cycles

### Question API Request Actions

* `fetchResponses`
  0. invoked from `Questions` button on a users page`didMount`/`willReceiveProps`
  0. `GET /api/responses` is called, sent user id
  0. `receiveResponses` is set as the success callback. (this also gets questions)

* `fetchSingleQuestion`
  0. invoked from `Answer Question` `didMount`/`willReceiveProps`
  0. `GET /api/messages/:id` is called.
  0. `receiveSingleQuestion` is set as the success callback.

* `createUserResponse`
  0. invoked from new message button `onClick`
  0. `POST /api/responses` is called.
  0. `receiveSingleResponse` is set as the callback.

* `updateSingleResponse`
  0. invoked from `Edit` button `didMount`/`willReceiveProps`
  0. `PATCH /api/responses/:id` is called.
  0. `receiveSingleResponse` is set as the success callback.

* `destroySingleResponee`
  0. invoked from delete message button `onClick`
  0. `DELETE /api/responses/:id` is called.
  0. `removeResponse` is set as the success callback.

### Messages API Response Actions

* `receiveAllResponses`
  0. invoked from an API callback.
  0. `Response` store updates `_responses` and emits change.

* `receiveSingleQuestion`
  0. invoked from an API callback.
  0. `Question` store updates `_questions[id]` and emits change.

* `receiveSingleResponse`
  0. invoked from an API callback.
  0. `Response` store updates `_responses[id]` and emits change.

* `removeResponse`
  0. invoked from an API callback.
  0. `Response` store removes `_responses[id]` and emits change.

### Store Listeners

* `QuestionForm` component listens to `Questions` store.
* `Questions` component listens to `Responses` store.
