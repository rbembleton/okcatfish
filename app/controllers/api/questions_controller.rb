class Api::QuestionsController < ApplicationController

  def index
    @questions = Question.next_twenty(question_params[:user_id])
    render :index
  end


  def show
    @question = Question
      .find(params[:id])
      .includes(:answers)

    if @question
      render :show
    else
      render json: @question.errors.full_messages
    end

  end


  private

  def question_params
    params.require(:question).permit(:user_id)

  end


end
