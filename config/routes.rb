Rails.application.routes.draw do
  devise_for :users

  root 'homes#index'
  get "/mountains", to: "homes#index"
  get "/mountains/new", to: "homes#authenticated"
  get "/mountains/:id", to: "homes#index"
  
  namespace :api do
    namespace :v1 do
      resources :mountains, only: [:index, :show, :create] do
        resources :comments, only: [:create, :update, :destroy]
      end
    end
  end
end
