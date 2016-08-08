Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json} do
    resources :users, only: [:create, :show]
    resources :profile_texts, only: [:update]
    resource :session, only: [:create, :destroy]
    resources :search, only: [:index]
    resources :messages, only: [:index, :show, :create]
    resources :user_photos, only: [:index, :create, :destroy]
    resources :likes, only: [:index, :create, :destroy]
  end
end
