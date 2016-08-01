# Phase 2: Flux Architecture and Note CRUD (2 days, W1 F 6pm)

## Rails
### Models
* Profile

### Database
* Photo Repository
* Profile Text
* Looking for
* Personal Details
* Photo Album  

### Controllers
* Api::ProfilesController (show, update, destroy)

### Views
* profiles/search.json.jbuilder
* profiles/show.json.jbuilder

## Flux
### Views (React Components)
* ProfileShow
  - ProfilePic
    - ProfilePhotoAlbum
  - ProfileText
  - ProfileLookingFor
  - ProfileDetails
* ProfileSearch

### Stores
* Profile

### Actions
* `ApiActions.receiveProfiles`
* `ApiActions.receiveSingleProfile`
* `ApiActions.deleteProfile`
* `ProfileActions.fetchProfiles`
* `ProfileActions.fetchSingleProfile`
* `ProfileActions.createProfile`
* `ProfileActions.editProfile`
* `ProfileActions.destroyProfile`

### ApiUtil
* `ApiUtil.fetchProfiles`
* `ApiUtil.fetchSingleProfile`
* `ApiUtil.createProfile`
* `ApiUtil.editProfile`
* `ApiUtil.destroyProfile`

## Gems/Libraries
