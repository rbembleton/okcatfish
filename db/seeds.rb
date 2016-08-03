# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.delete_all

demo = User.create!({username: "pro_catfisher", password: "okcatfish"});

rb = User.create!({username: "rbrb", password: "okcatfish"});
pikachu = User.create!({username: "pikachu", password: "okcatfish"});
trumpsux = User.create!({username: "trumpsux", password: "okcatfish"});
pizza = User.create!({username: "pizza", password: "okcatfish"});
ash = User.create!({username: "ash_k", password: "okcatfish"});
