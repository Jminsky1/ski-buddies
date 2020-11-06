class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :gnar

  belongs_to :mountain
  belongs_to :user
end