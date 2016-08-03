# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.delete_all

demo = User.create!({
  username: "pro_catfisher",
  password: "okcatfish",
  birthdate: DateTime.new(1980,10,3),
  location: 10018,
  orientation: "straight",
  gender: "female",
})

#------------------------------------------------

rb = User.create!({
  username: "rbem",
  password: "okcatfish",
  birthdate: DateTime.new(1988,8,4),
  location: 10032,
  orientation: "gay",
  gender: "male",
})

pikachu = User.create!({
  username: "pikachu",
  password: "okcatfish",
  birthdate: DateTime.new(1995,10,10),
  location: 10012,
  orientation: "gay",
  gender: "male",
})

trumpsux = User.create!({
  username: "trumpsux",
  password: "okcatfish",
  birthdate: DateTime.new(1960,2,6),
  location: 10012,
  orientation: "straight",
  gender: "male",
})

pizza = User.create!({
  username: "pizza",
  password: "okcatfish",
  birthdate: DateTime.new(1994,3,18),
  location: 10014,
  orientation: "lesbian",
  gender: "female",
})
