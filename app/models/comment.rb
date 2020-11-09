class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :mountain

  validates :body, presence: true
  validates :gnar, numericality: true
  validates :mountain, presence: true
  validates :user, presence: true
end