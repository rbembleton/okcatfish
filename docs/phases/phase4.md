# Phase 4: Tags (1 days, W2 W 6pm)

## Rails

### Models
* Question
* Response
* UserResponse

### Controllers
Api::QuestionController (show, index)
Api::UserResponseController (create, destroy, index, show, update)

### Views
* question/show.json.jbuilder
* user_response/show.json.jbuilder
* user/id/questions/index.json.jbuilder

## Flux
### Views (React Components)
* ProfileQuestions (responses)
* AnswerQuestions

### Stores
* Question

### Actions
* `ApiActions.receiveResponses`
* `ApiActions.receiveSingleQuestion`
* `ApiActions.deleteResponse`
* `ProfileActions.fetchResponses`
* `ProfileActions.fetchSingleQuestion`
* `ProfileActions.createResponse`
* `ProfileActions.editResponse`
* `ProfileActions.destroyResponse`

## Gems/Libraries
