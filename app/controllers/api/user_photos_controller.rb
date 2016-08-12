class Api::UserPhotosController < ApplicationController


  def index
    @user = User.find(photo_params[:user_id])
    @photos = @user.photos

    if @photos
      render :index
    else
      render json: @photos.errors.full_messages
    end

  end


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



  def update
    @photo = User
      .find(photo_params[:user_id])
      .set_profile_pic({
        type: photo_params[:photo_type],
        id: photo_params[:photo_id]
      });

    if @photo
      @photos = User.find(photo_params[:user_id]).photos
      render :index
    else
      render json: @photo.errors.full_messages
    end
  end




  def destroy
    @photo = User.find(photo_params[:user_id])
      .remove_pic(
        photo_params[:photo_id],
        photo_params[:photo_type])

    if @photo
      @photos = User.find(photo_params[:user_id]).photos
      render :index
    else
      render json: @photo.errors.full_messages
    end


  end

  private

  def photo_params
    params.require(:user).permit(:image, :user_id, :photo_id, :photo_type, :repo_pic_id)
  end
end
