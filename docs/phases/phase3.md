# Phase 3: Notebooks (2 day, W2 Tu 6pm)

## Rails
### Models
* Message
* Like

### Controllers
* Api::MessagesController (create, destroy, index, show, update)


### Views
* messages/index.json.jbuilder
* messages/show.json.jbuilder

## Flux
### Views (React Components)
* Inbox
  - ReadMessage
* CreateMessage
* LikeBox

### Stores
* Inbox
* Like

### Actions
* `ApiActions.receiveAllMessages`
* `ApiActions.receiveSingleMessage`
* `ApiActions.deleteMessage`
* `MessageActions.fetchAllMessages`
* `MessageActions.fetchSingleMessage`
* `MessageActions.createMessage`
* `MessageActions.destroyMessage`
* `ApiActions.receiveAllLikes`
* `ApiActions.receiveSingleLike`
* `ApiActions.deleteLike`
* `LikeActions.fetchAllLikes`
* `LikeActions.fetchSingleLike`
* `LikeActions.createLike`
* `LikeActions.destroyLike`

### ApiUtil
* `ApiUtil.fetchAllMessages`
* `ApiUtil.fetchSingleMessage`
* `ApiUtil.createMessage`
* `ApiUtil.destroyMessage`
* `ApiUtil.fetchAllLikes`
* `ApiUtil.fetchSingleLike`
* `ApiUtil.createLike`
* `ApiUtil.destroyLike`

## Gems/Libraries
