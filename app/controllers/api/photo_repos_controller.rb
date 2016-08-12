class Api::PhotoReposController < ApplicationController

  def index
    @photo_repos = PhotoRepo.all
    render :index
  end

  def show
    @photo_repo = PhotoRepo.find(params[:id])

    if @photo_repo
      render :show
    else
      render json: @photo_repo.errors.full_messages
    end

  end


end
