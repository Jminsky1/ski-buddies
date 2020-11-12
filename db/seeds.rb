# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

MOUNTAIN_IMAGE1 = File.open(File.join(
  Rails.root, '/public/images_seed/jaypeakprofile2.jpg'
))

MOUNTAIN_IMAGE2 = File.open(File.join(
  Rails.root, 'public/images_seed/About_MS_Hero.jpg'
))

mountain = Mountain.create!(name: 'Jay Peak', location: 'Vermont', size: 3858, zip_code: '05859', mountain_picture: MOUNTAIN_IMAGE1, description: "Awesome glades!")

mountain2 = Mountain.create!(name: 'Sunapee', location: 'New Hampshire', size: 2726, zip_code: '03255', mountain_picture: MOUNTAIN_IMAGE2, description: "Small steep mountain.")