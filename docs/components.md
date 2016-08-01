## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * **LoginForm**
  * **RegisterForm**
  * Navbar
  * ProfileShow (currentuser)
    * Profile Text
    * Profile Looking For
    * Profile Photo Album
    * Profile Questions
    * Edit Profile icons
  * **BrowseMatches**
    * Like form (Star)
    * ProfileShow
      * Profile Text
      * Profile Looking For
      * Profile Photo Album
      * Profile Questions
      * Send Message
  * **MessageInbox**
    * View threads (inbox)
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
