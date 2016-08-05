class Api::SearchController < ApplicationController

  def index

    @users = User.find_by_looking_for(
      search_params[:looking_for],
      search_params[:orientation]
    )


    if search_params[:distance]!="none"
      @users = @users.within(
        search_params[:distance],
        origin: [search_params[:location][:lat], search_params[:location][:lng]]
      ).where.not(id: search_params[:user_id])
    else
      @users = @users.where.not(id: search_params[:user_id])
    end

    if @users
      render :index
    else
      render json: "No matches found!"
    end
  end


  private

  def search_params
    params.require(:search).permit(
      :user_id,
      :distance,
      {location: [:lat, :lng]},
      :looking_for,
      :orientation
    )
  end

end
