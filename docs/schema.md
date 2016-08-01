# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## user_infos
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key
location        | string    | not null, indexed, unique
birthdate       | datetime  | not null
location        | string    | not null
orientation id  | integer   | not null, foreign key
gender id       | integer   | not null, foreign key

## orientations
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
label           | string    | not null

## genders
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
label           | string    | not null

## profile_texts
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
user_id        | integer    | not null, foreign key, indexed
about_me       | text       |
what_im_doing  | text       |
favorites      | text       |
three_things   | text       |
think_about    | text       |
saturday_night | text       |
message_me_if  | text       |  

## looking_fors
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
user_id        | integer    | not null, foreign key, indexed
bottom_age     | integer    | not null, (default to 5/6 age, lowest 18)
top_age        | integer    | not null, (default to 6/5 age)

## looking_for_gender_links
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
looking_for_id | integer    | not null, foreign key, indexed
gender_id      | integer    | not null, foreign key, indexed

## looking_for_orientation_links
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
looking_for_id | integer    | not null, foreign key, indexed
orientation_id | integer    | not null, foreign key, indexed


## photo_albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key, indexed
repo_id     | integer   | not null, foreign key, ref phot repos

## photo_repos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, indexed

## photo_repo_pic
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
repo_id     | integer   | not null, foreign key
url         | string    | not null, indexed

## photo_album_links
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
photo_album_id    | integer   | not null, foreign key, indexed
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
