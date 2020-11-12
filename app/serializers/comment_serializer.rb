class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :gnar, :signed_in_user
  
  belongs_to :mountain
  belongs_to :user

  def signed_in_user
    if current_user
      return current_user
    else
      return false
    end
  end
end