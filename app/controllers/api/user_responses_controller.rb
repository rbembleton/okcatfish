class Api::UserResponsesController < ApplicationController

  def index
    @user_responses = UserResponse
      .where(user_id: response_params[:user_id])
      .includes(questions: [:answers], :answer)

    if @user_responses
      render :index
    else
      render json: @user_responses.errors
    end

  end


  def show
    @user_response = UserResponse.find(params[:id])

    if @user_response
      render :show
    else
      render json: @user_response.errors
    end

  end


  def create
    @user_response = UserResponse.new(response_params)

    if @user_response.save
      render :show
    else
      render json: @user_response.errors
    end

  end

  def update


  end


  def destroy


  end


  private

  def response_params
    params.require(:response).permit(
      :answer_id,
      :user_id,
      :weight,
      :explanation,
      :match_responses => [])
  end

end
