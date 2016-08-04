class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end

  end

  def show
    @user = User.find(params[:id])

    if @user
      render :show
    else
      render json: "User not found"
    end
  end


  private

  def user_params
    params.require(:user).permit(
      :password,
      :username,
      :zip,
      :birthdate,
      :gender,
      :orientation,
      :location
    )
  end

end
