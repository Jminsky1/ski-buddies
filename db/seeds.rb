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
mountain = Mountain.create(name: 'Jay Peak', location: 'Vermont', size: 922, mountain_picture: MOUNTAIN_IMAGE1, description: "Awesome glades!")