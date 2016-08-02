class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params.require(:user).permit(:username, :password)
    )

    if @user
      sign_in(@user)
      render "/api/users/show"
    else
      render json: ['Invalid credentials'], status: 422
    end

  end

  def destroy
    if signed_in?
      sign_out
      render json: {}
    else
      render json: ['Sign in to log out, silly'], status: 404
    end
  end

end
