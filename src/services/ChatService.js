class ChatService {
  handleChatEvent = (message)  =>{
    const event = JSON.parse(message.body);
    console.log(event);
  }
}

export const chatService = new ChatService();
