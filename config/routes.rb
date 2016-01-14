Rails.application.routes.draw do
  root to: 'timer#show'
  resource :timer, only: [:show], controller: 'timer'
end
