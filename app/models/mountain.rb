class Mountain < ApplicationRecord
  has_many :comments
  
  validates :name, presence: true
  validates :location, presence: true
  validates :size, numericality: true
  mount_uploader :mountain_picture, MountainPictureUploader
end