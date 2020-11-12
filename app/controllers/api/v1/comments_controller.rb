class Api::V1::CommentsController < ApiController
  before_action :authenticate_user, only: [:create]

  def show
    comment = Comment.find(params["id"])
    render json: comment
  end
  
  def create
    mountain = Mountain.find(params[:mountain_id])
    new_comment= Comment.new(comment_params)
    new_comment.mountain = mountain
    new_comment.user = current_user 
    if new_comment.save
      render json: new_comment 
    else 
      render json: { errors: new_comment.errors}
    end
  end

  def update
    comment = Comment.find(params[:id])
    mountain = comment.mountain
    if comment.update(comment_params)
        render json: mountain.comments
    else
        render json: { errors: comment.errors.full_messages }
    end
  end    
  
  # def edit
  #   render json: Comment.find(params[:id]), serializer: CommentUpdateSerializer
  # end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: {destroyed: true}
    end
  end

  private
  
  def comment_params
    params.require(:comment).permit(:body, :gnar)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end

