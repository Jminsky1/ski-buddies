class MountainShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :size, :mountain_picture

  has_many :comments
end