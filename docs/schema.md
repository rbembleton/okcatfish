# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
 indexed
<!-- country_id      | integer   | not null, foreign key, indexed -->
location        | integer   | not null, indexed
birthdate       | datetime  | not null
orientation     | string    | not null, indexed
gender          | string    | not null, indexed
lf_bottom_age   | integer   | not null, (default to 5/6 age, lowest 18)
lf_top_age      | integer   | not null, (default to 6/5 age)


<!-- ## countries
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null -->


## profile_texts
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
user_id        | integer    | not null, foreign key, indexed
about          | text       |
doing          | text       |
faves          | text       |
things         | text       |
think          | text       |
sat_night      | text       |
msg_me_if      | text       |  

## photo_repos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label        | string    | not null, indexed

## photo_repo_pic
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
repo_id     | integer   | not null, foreign key, indexed
url         | string    | not null

## photo_album_links
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key, indexed
photo_repo_pic_id | integer   | not null, foreign key, indexed


## favorites
column name | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign key, indexed
liked_user_id | integer   | not null, foreign key, indexed, ref users

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
category    | text      | not null (optional)

## responses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key
body        | text      | not null
order       | integer   | not null (optional)

## user_responses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key, indexed
response_id | integer   | not null, foreign key, indexed (holds ref to question)
strength    | integer   | not null, default to 1 (options 0-3) (BONUS)

## threads
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id_1   | integer   | not null, foreign key, indexed
user_id_2   | integer   | not null, foreign key, indexed

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
thread_id   | integer   | not null, foreign key, indexed
author_id   | integer   | not null, foreign key, references user, indexed
body        | text      | not null




<!-- ## orientations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
label           | string    | not null

## genders
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
label           | string    | not null -->


<!-- ## photo_albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key, indexed
repo_id     | integer   | not null, foreign key, ref phot repos -->



<!-- ## looking_for_gender_links
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
looking_for_id | integer    | not null, foreign key, indexed
gender         | string     | not null, foreign key, indexed

## looking_for_orientation_links
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
looking_for_id | integer    | not null, foreign key, indexed
orientation_id | integer    | not null, foreign key, indexed -->
