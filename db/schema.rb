# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160805133943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.integer  "thread_id",               null: false
    t.integer  "author_id",               null: false
    t.text     "body",       default: "", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["author_id"], name: "index_messages_on_author_id", using: :btree
  add_index "messages", ["thread_id"], name: "index_messages_on_thread_id", using: :btree

  create_table "photo_album_links", force: :cascade do |t|
    t.integer "user_id",           null: false
    t.integer "photo_repo_pic_id", null: false
  end

  add_index "photo_album_links", ["photo_repo_pic_id"], name: "index_photo_album_links_on_photo_repo_pic_id", using: :btree
  add_index "photo_album_links", ["user_id"], name: "index_photo_album_links_on_user_id", using: :btree

  create_table "photo_repo_pics", force: :cascade do |t|
    t.integer "repo_id", null: false
    t.string  "url",     null: false
  end

  add_index "photo_repo_pics", ["repo_id"], name: "index_photo_repo_pics_on_repo_id", using: :btree

  create_table "photo_repos", force: :cascade do |t|
    t.string "label", null: false
  end

  add_index "photo_repos", ["label"], name: "index_photo_repos_on_label", using: :btree

  create_table "profile_texts", force: :cascade do |t|
    t.integer "user_id",   null: false
    t.text    "about"
    t.text    "doing"
    t.text    "faves"
    t.text    "things"
    t.text    "think"
    t.text    "sat_night"
    t.text    "msg_me_if"
  end

  add_index "profile_texts", ["user_id"], name: "index_profile_texts_on_user_id", unique: true, using: :btree

  create_table "threads", force: :cascade do |t|
    t.integer  "user1_id",   null: false
    t.integer  "user2_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "threads", ["user1_id"], name: "index_threads_on_user1_id", using: :btree
  add_index "threads", ["user2_id"], name: "index_threads_on_user2_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.integer  "location",        null: false
    t.datetime "birthdate",       null: false
    t.string   "orientation",     null: false
    t.string   "gender",          null: false
    t.integer  "lf_bottom_age",   null: false
    t.integer  "lf_top_age",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "loc_desc",        null: false
    t.float    "lat",             null: false
    t.float    "lng",             null: false
  end

  add_index "users", ["gender"], name: "index_users_on_gender", using: :btree
  add_index "users", ["lat"], name: "index_users_on_lat", using: :btree
  add_index "users", ["lf_bottom_age"], name: "index_users_on_lf_bottom_age", using: :btree
  add_index "users", ["lf_top_age"], name: "index_users_on_lf_top_age", using: :btree
  add_index "users", ["lng"], name: "index_users_on_lng", using: :btree
  add_index "users", ["location"], name: "index_users_on_location", using: :btree
  add_index "users", ["orientation"], name: "index_users_on_orientation", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "zip_lat_lng_references", force: :cascade do |t|
    t.integer "zip_code",    null: false
    t.float   "lat",         null: false
    t.float   "lng",         null: false
    t.string  "description", null: false
  end

end
