class Api::UserPhotosController < ApplicationController

  def create
    @user = User.find(photo_params[:user_id])

    if @user
      @photo = @user.add_pic(photo_params[:image])

      if @photo
        @photos = @user.photos
        render :index
      else
        render json: @photos.errors.full_messages
      end


    else
      render json: @user.errors.full_messages
    end

  end


  private

  def photo_params
    params.require(:user).permit(:image, :user_id, :id)
  end
end
