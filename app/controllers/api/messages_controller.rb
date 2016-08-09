class Api::MessagesController < ApplicationController

  def index

    @threads = MessageThread
      .find_by_user_id(message_user_params[:user_id])
      .order(updated_at: :desc).includes(messages: [:author], users: [:user_photos, :repo_photos, :location])

    if @threads
      render :index
    else
      render json: @threads.errors.full_messages
    end

  end


  def show
    @thread = MessageThread
      .includes(messages: [:author], users: [:user_photos, :repo_photos, :location])
      .find(params[:id])

    if @thread
      render :show
    else
      render json: @thread.errors.full_messages
    end

  end

  def update
    @thread = MessageThread
      .includes(messages: [:author], users: [:user_photos, :repo_photos, :location])
      .find(params[:id])

    if @thread.messages.update_all(is_read: true)
      pusher_triggers(@thread.users.first.id, @thread.users.second.id, {thread_id: @thread.id})
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
      pusher_triggers(@message.author_id, @message.recipient.id, {thread_id: @message.thread_id})
      render :message
    else
      render json: @message.errors.full_messages
    end

  end


  private

  def pusher_triggers(user1_id, user2_id, data_hash)
    Pusher.trigger(
      "threads_channel_#{user1_id}",
      'update_threads',
      data_hash
    )

    Pusher.trigger(
      "threads_channel_#{user2_id}",
      'update_threads',
      data_hash
    )
  end

  def message_params
    params.require(:messages).permit(:author_id, :recipient_id, :body, :thread_id, :is_read)
  end

  def message_user_params
    params.require(:messages).permit(:user_id)
  end

end
