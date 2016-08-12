class Api::PhotoAlbumLinksController < ApplicationController

  def create
    @user = User.find(photo_params[:user_id])

    if @user
      @user.add_repo_pic(photo_params[:repo_pic_id])
      @photos = @user.photos
      render 'api/user_photos/index.json.jbuilder'
    else
      render json: "Couldn't add Photo"
    end

  end

  private

  def photo_params
    params.require(:photo).permit(:user_id, :repo_pic_id)
  end

end
