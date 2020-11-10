class Mountain < ApplicationRecord
  has_many :comments
  
  validates :zip_code, presence: true
  validates :name, presence: true
  validates :location, presence: true
  validates :size, numericality: true
  mount_uploader :mountain_picture, MountainPictureUploader
end