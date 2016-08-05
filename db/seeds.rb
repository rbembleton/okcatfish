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
  zip: 10018,
  orientation: "straight",
  gender: "female",
})

#------------------------------------------------

rb = User.create!({
  username: "rbem",
  password: "okcatfish",
  birthdate: DateTime.new(1988,8,4),
  zip: 10032,
  orientation: "gay",
  gender: "male",
})

pikachu = User.create!({
  username: "pikachu",
  password: "okcatfish",
  birthdate: DateTime.new(1995,10,10),
  zip: 10012,
  orientation: "gay",
  gender: "male",
})

trumpsux = User.create!({
  username: "trumpsux",
  password: "okcatfish",
  birthdate: DateTime.new(1960,2,6),
  zip: 10012,
  orientation: "straight",
  gender: "male",
})

pizza = User.create!({
  username: "pizza",
  password: "okcatfish",
  birthdate: DateTime.new(1994,3,18),
  zip: 10014,
  orientation: "lesbian",
  gender: "female",
})

zip_codes = (10001..10014).to_a + (10016..10041).to_a
go_combos = {"male" => ["straight", "gay", "bisexual"],
  "female" => ["straight", "lesbian", "bisexual"]};

50.times do
  rand(2) == 1 ? gend = "male" : gend = "female"
  ori = go_combos[gend][rand(3)];

  uname = Faker::Internet.user_name
  while uname.length < 4 || uname.length > 16 do
    uname = Faker::Internet.user_name
  end

  u1 = User.create!({
    username: uname,
    password: "okcatfish",
    birthdate: Faker::Date.between(18.years.ago, 40.years.ago),
    zip: zip_codes[rand(39)],
    orientation: ori,
    gender: gend,
  })

  u1.profile_text.update!({
    about: Faker::Hipster.paragraph,
    doing: Faker::Hipster.paragraph,
    faves: "Book: #{Faker::Book.title}, Beer: #{Faker::Beer.name}",
    things: Faker::Hipster.words(3).join(", "),
    think: Faker::Hipster.paragraph,
    sat_night: Faker::Hipster.paragraph,
    msg_me_if: Faker::Hipster.paragraph,
  })

  if rand(3) == 0
    mt = MessageThread.new_from_user_ids(u1.id, demo.id)
    1.upto(rand(12)) do
      mt.new_message({
        body: Faker::Hipster.sentence,
        author_id: [u1.id, demo.id, demo.id].sample
      })
    end
  end

end



# ---------------------------------------------------

PhotoAlbumLink.delete_all
PhotoRepoPic.delete_all
PhotoRepo.delete_all

pr1 = PhotoRepo.create!({ label: "Ariana" })

prp1_1 = PhotoRepoPic.create!({
    url: "http://sev.h-cdn.co/assets/cm/15/09/54eec5bf13937_-_sev-ariana-head-tilt-lgn.jpg",
    repo_id: pr1.id
  })
prp1_2 = PhotoRepoPic.create!({
    url: "http://i3.mirror.co.uk/incoming/article4184479.ece/ALTERNATES/s615/Ariana-Grande.png",
    repo_id: pr1.id
  })
prp1_3 = PhotoRepoPic.create!({
    url: "https://s-media-cache-ak0.pinimg.com/236x/90/ba/4f/90ba4f76a4a72840de0b3c74f7f45f96.jpg",
    repo_id: pr1.id
  })

pr2 = PhotoRepo.create!({ label: "John" })

prp2_1 = PhotoRepoPic.create!({
    url: "https://cdn1.lockerdome.com/uploads/cf51b07c35e96a827cf4c61cd9a0428f32c8f8e37df58ffbbe997a2cb1c0c9f8_large",
    repo_id: pr2.id
  })
prp2_2 = PhotoRepoPic.create!({
    url: "http://confitdent.com/wp-content/uploads/2013/06/john-cena-workout1.jpg",
    repo_id: pr2.id
  })
prp2_3 = PhotoRepoPic.create!({
    url: "http://i.huffpost.com/gen/1576336/images/o-JOHN-CENA-WWE-facebook.jpg",
    repo_id: pr2.id
  })

pr3 = PhotoRepo.create!({ label: "Andy" })
prp3_1 = PhotoRepoPic.create!({
    url: "https://s-media-cache-ak0.pinimg.com/236x/f4/fa/a9/f4faa95158d5fc212a55028a67e2c04d.jpg",
    repo_id: pr3.id
  })
prp3_2 = PhotoRepoPic.create!({
    url: "http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2016/04/cooper-book.jpg",
    repo_id: pr3.id
  })
prp3_3 = PhotoRepoPic.create!({
    url: "https://s-media-cache-ak0.pinimg.com/236x/4b/31/0c/4b310cd0643a66b3aab7c59c7cb54add.jpg",
    repo_id: pr3.id
  })

# ---------------------------------------

pal1 = PhotoAlbumLink.create!({
    user_id: demo.id,
    photo_repo_pic_id: prp1_1.id
  })

pal2 = PhotoAlbumLink.create!({
    user_id: demo.id,
    photo_repo_pic_id: prp1_2.id
  })

# ---------------------------------------

demo.profile_text.update!({
  about: "I'm just a small town girl, living in a lonely world.
    Head in the clouds, got no weight on my shoulders.",
  doing: "Working in a factory outside of NYC making horseshoes."
})
