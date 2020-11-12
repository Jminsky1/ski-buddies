class Mountain < ApplicationRecord
  has_many :comments
  has_many :favorites
  has_many :users, through: :favorites
  
  validates :zip_code, presence: true
  validates :name, presence: true
  validates :location, presence: true
  validates :size, numericality: true
  mount_uploader :mountain_picture, MountainPictureUploader
end