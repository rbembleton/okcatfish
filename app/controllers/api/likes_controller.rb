class Api::LikesController < ApplicationController

  def index
    if like_params[:user_from_id]
      @likes = Like.where(user_from_id: like_params[:user_from_id])

      if @likes
        render :index_likes
      else
        render json: []
      end

    elsif like_params[:user_to_id]
      @likes = Like.where(user_to_id: like_params[:user_to_id])

      if @likes
        render :index_likers
      else
        render json: []
      end

    end

  end

  def create
    @like = Like.from_to_ids_new(
      like_params[:user_from_id],
      like_params[:user_to_id])
    # @like = Like.new(like_params)

    if @like.save
      render :show
    else
      render json: @like.errors.full_messages
    end

  end

  def destroy
    @like = Like.find_by(
      user_to_id: like_params[:user_to_id],
      user_from_id: like_params[:user_from_id])

    if @like.delete
      render :show
    else
      render json: @like.errors.full_messages
    end


  end


  private

  def like_params
    params.require(:like).permit(:user_from_id, :user_to_id)
  end


end
