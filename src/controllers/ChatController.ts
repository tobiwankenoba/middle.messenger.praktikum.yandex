import Api, { ChatsAPI } from "../api/ChatsApi";
import { store } from "../framework/Store";
import { IMessagesState } from "../types/api";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = Api;
  }

  async create(title: string) {
    await this.api
      .create(title)
      .catch((error) => store.set("error", error))
      .finally(async () => {
        if (!store.getState().error) {
          await this.getChats();
        }
      });
  }

  async getChats() {
    const chats = (await this.api.read()).response;

    (chats as unknown as IMessagesState[]).map(async (chat: IMessagesState) => {
      const token = await this.getToken(chat.id);
      await MessagesController.connect(chat?.id, token);
    });

    store.set("chats", chats as unknown as IMessagesState[]);
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);
    } catch (error) {
      store.set("error", error);
    } finally {
      store.set("modalAddUserVisible", false);
    }
  }

  async removeUserFromChat(id: number, userId: number) {
    try {
      await this.api.removeUsers(id, [userId]);
    } catch (error) {
      store.set("error", error);
    } finally {
      store.set("modalAddUserVisible", false);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
    } catch (error) {
      store.set("error", error);
    } finally {
      if (!store.getState().error) {
        this.getChats();
      }
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }
}

const chatsController = new ChatsController();

export default chatsController;
