require 'sinatra/base'
require 'dm-postgres-adapter'
require 'json'
require_relative 'temp'

class Thermostat < Sinatra::Base
  enable :sessions

  post '/temp' do
    headers 'Access-Control-Allow-Origin' => '*'
    Temp.create(temp: params[:temp])
  end

  get '/temp' do
    headers 'Access-Control-Allow-Origin' => '*'
    { temp: Temp.last.temp}.to_json
  end



  # start the server if ruby file executed directly
  run! if app_file == $0
end
