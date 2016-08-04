class Api::SearchController < ApplicationController

  def index
    if search_params[:distance]!="none"
      @users = User.within(
        search_params[:distance],
        origin: [search_params[:location][:lat], search_params[:location][:lng]]
      ).where.not(id: search_params[:user_id])
    else
      @users = User.where.not(id: search_params[:user_id])
    end

    if @users
      render :index
    else
      render json: "No matches found!"
    end
  end


  private

  def search_params
    params.require(:search).permit(:user_id, :distance, {location: [:lat, :lng]})
  end

end
