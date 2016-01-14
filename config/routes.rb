Rails.application.routes.draw do
  resource :timer, only: [:show], controller: 'timer'
end
