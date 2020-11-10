class Api::V1::MountainsController < ApiController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    mountains = Mountain.all
    render json: mountains
  end

  def create
    new_mountain = Mountain.new(mountain_params)

    if new_mountain.save
      render json: new_mountain
    else
      render json: { errors: new_mountain.errors }
    end
  end

  def show
    mountain = Mountain.find(params[:id])
    render json: mountain, serializer: MountainShowSerializer
    # render json: {
    #   mountain: serialized_data(mountain, MountainSerializer),
    #   comments: serialized_data(mountain.comments, CommentSerializer)
    # }
  end


  private
    def mountain_params
      params.require(:mountain).permit([:name, :location, :description, :zip_code, :size, :mountain_picture])
    end

    def authenticate_user
      if !user_signed_in?
        render json: {error: ["You need to be signed in first"]} 
      end
    end

    def serialized_data(data, serializer)
      ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
    end
  end