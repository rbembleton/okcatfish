class Api::MessagesController < ApplicationController

  def index
    # MessageThread.uncached do
    #   Message.uncached do

      @threads = MessageThread.
        find_by_user_id(message_user_params[:user_id]).
        order(updated_at: :desc)
      # end
    # end
    if @threads
      render :index
    else
      render json: @threads.errors.full_messages
    end

  end


  def show
    @thread = MessageThread.find(params[:id])

    if @thread
      render :show
    else
      render json: @thread.errors.full_messages
    end

  end

  def update
    @thread = MessageThread.find(params[:id])

    if @thread.messages.update_all(is_read: true)
      render :show
    else
      render json: @thread.errors.full_messages
    end
    
  end


  def create
    if message_params[:thread_id] != ""
      @message = MessageThread.find(message_params[:thread_id]).new_message(
        body: message_params[:body],
        author_id: message_params[:author_id]
      )
    else
      @message = MessageThread.send_message(message_params)
    end


    if @message
      render :message
    else
      render json: @message.errors.full_messages
    end

  end


  private

  def message_params
    params.require(:messages).permit(:author_id, :recipient_id, :body, :thread_id, :is_read)
  end

  def message_user_params
    params.require(:messages).permit(:user_id)
  end

end
