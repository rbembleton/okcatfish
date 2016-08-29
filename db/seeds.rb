# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv' # for csv parsing


PhotoAlbumLink.destroy_all
PhotoRepoPic.destroy_all
PhotoRepo.destroy_all
Message.destroy_all
MessageThread.destroy_all
ThreadUserLink.destroy_all
Like.destroy_all
UserMatchResponse.destroy_all
UserResponse.destroy_all
Answer.destroy_all
Question.destroy_all
User.destroy_all

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

rb.profile_text.update!({
  about: Faker::Hipster.paragraph,
  doing: Faker::Hipster.paragraph,
  faves: "Book: #{Faker::Book.title}, Beer: #{Faker::Beer.name}",
  things: Faker::Hipster.words(3).join(", "),
  think: Faker::Hipster.paragraph,
  sat_night: Faker::Hipster.paragraph,
  msg_me_if: Faker::Hipster.paragraph,
})

rp_arr = []

csv_text = File.read(Rails.root.join('lib', 'seeds', 'repo_urls.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |repo|
  next if repo['label'] == nil
    rp = PhotoRepo.create!(label: repo['label'])

  urls = [
    repo['url1'],
    repo['url2'],
    repo['url3'],
    repo['url4'],
    repo['url5']]

  add_to_rp_arr = {repo: rp, pics: []}

  urls.each do |url|
    next if url == nil
    pic = PhotoRepoPic.create!(
      url: url,
      repo_id: rp.id
    )
    add_to_rp_arr[:pics].push(pic)
  end

  rp_arr.push(add_to_rp_arr)
end


# --------------------------------------- QUESTIONS

q_arr = []

    # ======= Random
#
# (1..30).to_a.map do |idx|
#   q = Question.create!(
#     body: (Faker::Lorem.sentence[0..-2] + "?" ),
#     order: idx
#   )
#
#   (1..(rand(4)+2)).to_a.map do |idx2|
#     a = Answer.create!(
#       body: Faker::Lorem.sentence,
#       order: idx2,
#       question_id: q.id
#     )
#   end
#
# end

    # ======= CSV file instead

csv_text = File.read(Rails.root.join('lib', 'seeds', 'match_questions.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each_with_index do |question, q_idx|
  next if question['question'] == nil
  q = Question.create!(
    body: question['question'],
    order: (q_idx + 1)
  )
  add_to_q_arr = {question: q, answers: []}

  answers = [
    question['answer-1'],
    question['answer-2'],
    question['answer-3'],
    question['answer-4'],
    question['answer-5']]

  answers.each_with_index do |answer, a_idx|
    next if answer == nil
    a = Answer.create!(
      body: answer,
      order: (a_idx + 1),
      question_id: q.id
    )
    add_to_q_arr[:answers].push(a)
  end

  q_arr.push(add_to_q_arr)
end





# ----------------------------------------- GENERATE FAKE USERS

zip_codes = (10001..10014).to_a + (10016..10041).to_a
go_combos = {"male" => ["straight", "gay", "bisexual"],
  "female" => ["straight", "lesbian", "bisexual"]};

200.times do
  rand(2) == 1 ? gend = "male" : gend = "female"
  ori = go_combos[gend][rand(3)];

  uname = Faker::Internet.user_name
  while uname.length < 4 || uname.length > 16 || User.exists?(username: uname) do
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

  # POPULATE FAKE MESSAGES
  if rand(3) == 0
    mt = MessageThread.new_from_user_ids(u1.id, demo.id)
    mess1 = Message.create!({
      body: Faker::Hipster.sentence,
      author_id: [u1.id, demo.id, demo.id].sample,
      thread_id: mt.id
    })

    most_recent = Faker::Time.backward(14, :all)
    mess1.update!(created_at: most_recent, updated_at: most_recent);


    (rand(8)+1).times do
      mess2 = Message.create!({
        body: Faker::Hipster.sentence,
        author_id: [u1.id, demo.id, demo.id].sample,
        thread_id: mt.id
      })

      this_time = Faker::Time.backward(14, :all)
      mess2.update!(created_at: this_time, updated_at: this_time);

      if this_time > most_recent
        most_recent = this_time;
      end

    end

    mt.update!(updated_at: most_recent);

    if rand(2) == 0
      Like.from_to_ids_create!(u1.id, demo.id)
    end

    if rand(5) == 0
      Like.from_to_ids_create!(demo.id, u1.id)
    end

  end

  # POPULATE FAKE ANSWERS

  q_arr.each do |q_obj|
    u_answer_id1 = q_obj[:answers].sample.id
    ures = UserResponse.create!(
      answer_id: u_answer_id1,
      user_id: u1.id,
      weight: (((0..100).to_a.sample)/100.00),
      explanation: Faker::Hipster.sentence
    )
    u_answer_id2 = q_obj[:answers].sample.id
    while u_answer_id2 == u_answer_id1
      u_answer_id2 = q_obj[:answers].sample.id
    end
    ures.add_match_responses([u_answer_id1, u_answer_id2 ])
  end


  # ADD REPO PICS
  unless rand(6) == 0
    pr = rp_arr.sample

    prp1 = pr[:pics].first
    prp2 = pr[:pics].second


    pal1 = PhotoAlbumLink.create!({
        user_id: u1.id,
        photo_repo_pic_id: prp1.id
      })

    pal2 = PhotoAlbumLink.create!({
        user_id: u1.id,
        photo_repo_pic_id: prp2.id
      })

    pal_arr = [pal1, pal2]

    if rand(3) == 0
      pal3 = PhotoAlbumLink.create!({
          user_id: u1.id,
          photo_repo_pic_id: pr[:pics].third.id
        })
      pal_arr.push(pal3)
    end

    u1.set_profile_pic(type: 'repo', id: pal_arr.sample.id)
  end
end

MessageThread.where("updated_at < ?", 3.days.ago).each do |mt|
  mt.messages.update_all(is_read: true)
end

# MessageThread.where("updated_at >= ?", 3.days.ago).each do |mt|
#   first_message_author_id = mt.most_recent_message.author_id
#   keep_going = true
#   mt.messages.each do |message|
#     next if keep_going && message.author_id == first_message_author_id
#     keep_going = false
#     message.update!(is_read: true)
#   end
# end



# ---------------------------------------------------



pr1 = PhotoRepo.create!({ label: "Ariana" })

prp1_1 = PhotoRepoPic.create!({
    url: "https://s3.amazonaws.com/okcatfish-pro/repo_photos/ariana1.jpg",
    repo_id: pr1.id
  })
prp1_2 = PhotoRepoPic.create!({
    url: "https://s3.amazonaws.com/okcatfish-pro/repo_photos/ariana2.png",
    repo_id: pr1.id
  })
prp1_3 = PhotoRepoPic.create!({
    url: "https://s3.amazonaws.com/okcatfish-pro/repo_photos/ariana3.jpg",
    repo_id: pr1.id
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

UserPhoto.where(user_id: demo.id).destroy_all

# ---------------------------------------

demo.profile_text.update!({
  about: "Gosh I'm so bad at writing these things. Teehee. ;) I'm just a nice girl who's trying to find love. Libra!",
  doing: "I work at a Duane Reade in NYC. I love my job and my coworkers and can't wait to meet a nice guy or gurllll that sparks my interest",
  faves: "Ben n Jerrys, Vodka and Chocolate!",
  things: "I could never live without my friends and family. And my iPhone. And my dog, Mike Hat!",
  think: "How many licks DOES it take to get to the center of a tootsie pop?!?!",
  sat_night: "I'm probably drinking vodka with my friends. Or Netflix and Chilling!",
  msg_me_if: "Ummm I'm pretty baller ;) so just like message me."
})
