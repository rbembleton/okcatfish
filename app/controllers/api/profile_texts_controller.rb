class Api::ProfileTextsController < ApplicationController

  def update
    @profile_text = ProfileText.find(params[:id])

    if @profile_text
      @profile_text[profile_text_params["text_type"]] = profile_text_params["text"]
      @profile_text.save!
      render json: :show
    else
      render json: @profile_text.errors.full_messages
    end
  end


  private

  def profile_text_params
    params.require(:profile_text).permit(:text_type, :text)
  end


end
