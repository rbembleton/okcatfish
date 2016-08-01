## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * Navbar
  * ProfileShow (user)
    * Profile Text
    * Profile Looking For
    * Profile Photo Album
    * Profile Questions
    * Edit Profile
  * **LoginForm**
  * **RegisterForm**
  * **BrowseMatches**
    * ProfileShow
      * Profile Text
      * Profile Looking For
      * Profile Photo Album
      * Profile Questions
      * Send Message
  * **MessageInbox**
    * Read messages
    * See sent messages


## Routes

* **component:** `App` **path:** `/`
  * **component** `LoginForm` **path:** /login
  * **component** `RegisterForm` **path:** /signup
  * **component:** `ProfileShow` **path:** `username`
  * **component:** `BrowseMatches` **path:** `matches/`
  * **component:** `ShowMatch` **path:** `username`
  * **component:** `MessageInbox` **path:** `messages/`
    * **component:** `MessageDetail` **path:** `messages/:messageId`
