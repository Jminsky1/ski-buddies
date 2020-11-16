class Api::V1::FavoritesController < ApiController

  def index
    favorites = Favorite.all
    # favoriteListItem = favorites.map do |favorite|
    #   return(favorite.mountain.name)
    
    render json: favorites
  end

  def create
    Favorite.create(mountain_id: params["id"], user: current_user)
  end
end
