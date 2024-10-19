import { store } from "../framework/Store";
import { WSTransport, WSEvents } from "../framework/WsTransport";
import { IMessage, IProfile } from "../types/profile";

class MessagesController {
  private sockets: Map<Number, WSTransport> = new Map();

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSEvents.Message, (message) =>
      this.onMessage(chatId, message),
    );
    transport.on(WSEvents.Close, () => this.onClose(chatId));
  }

  public async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = (store.getState().profileState.profile as IProfile)?.id;
    const wsTransport = new WSTransport(
      `${this.baseURL}${userId}/${chatId}/${token}`,
    );
    this.sockets.set(chatId, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, chatId);

    this.getMessages(chatId);
  }

  public async postMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat with id:${chatId} is not connected.`);
    }

    await socket.send({
      type: "message",
      content: message,
    });
  }

  public getMessages(chatId: number) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat with id:${chatId} is not connected.`);
    }

    socket.send({
      type: "get old",
      content: null,
    });
  }

  public closeChats() {
    const chats = Array.from(this.sockets.values());

    chats.forEach((socket) => socket.close());
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  private onMessage(chatId: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = (messages as IMessage[]).reverse();
    } else {
      messagesToAdd.push(messages as IMessage);
    }

    const currentMessages = (store.getState().messages || {})[chatId] || [];
    messagesToAdd = [...(currentMessages as IMessage[]), ...messagesToAdd];
    store.set(`messages.${chatId}`, messagesToAdd);
    store.set(`activeMessages`, messagesToAdd);
  }
}

export default new MessagesController("wss://ya-praktikum.tech/ws/chats/");
