## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * **LoginForm**
  * **RegisterForm**
  * Navbar
  * ProfileShow (currentuser)
    * Profile Text
    * Profile Looking For
    * **Profile Photo Album**
      * Photo Album
    * **Profile Questions**
      * Questions View
      * Answer Questions
    * Edit Profile icons
  * **BrowseMatches**
    * Like form (Star)
    * ProfileShow (same as before, but without editing features)
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
  * **component** `LoginForm` **path:** `login`
  * **component** `RegisterForm` **path:** `signup`
  * **component:** `ProfileShow` **path:** `username`
    * **component** `PhotoAlbum` **path:** `username/photos`
    * **component** `Questions` **path:** `username/questions`
  * **component:** `BrowseMatches` **path:** `matches/`
  * **component:** `ShowMatch` **path:** `username`
  * **component:** `MessageInbox` **path:** `messages/`
    * **component:** `MessageDetail` **path:** `messages/:messageId`
