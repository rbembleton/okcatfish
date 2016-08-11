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
      @match_percentage_hash = User.find(search_params[:user_id]).calculate_matches(@users)

      if search_params[:order_by] == 'match'
        @ordered_keys = @match_percentage_hash.sort_by{ |k,v| v }.reverse
        render :sorted_index
      elsif search_params[:order_by] == 'surprise'
        @ordered_keys = @match_percentage_hash.sort_by{ |k,v| v }.shuffle
        render :sorted_index
      elsif search_params[:order_by] == 'username'
        @ordered_keys = @match_percentage_hash.sort_by{ |k,v| User.find(k).username }
        render :sorted_index
      else
        render :index
      end

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
      :orientation,
      :order_by
    )
  end

end
