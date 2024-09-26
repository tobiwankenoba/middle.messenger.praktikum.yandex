import { ESender, IChatState } from "../types/profile";

export const MOCK_CHAT: IChatState[] = [
  {
    id: 1,
    partner: {
      name: "Igor",
      avatar: null,
    },
    messages: [
      {
        sender: ESender.Me,
        message: "hello",
        timeSend: "10:50",
        isReading: true,
      },
      {
        sender: ESender.Me,
        message: "how do you do?",
        timeSend: "10:51",
        isReading: true,
      },
      {
        sender: ESender.Partner,
        message: "Hello!",
        timeSend: "10:55",
        isReading: true,
      },
      {
        sender: ESender.Partner,
        message: "I'm Fine, you?",
        timeSend: "10:56",
        isReading: true,
      },
      {
        sender: ESender.Me,
        message: "Fine!",
        timeSend: "10:59",
        isReading: true,
      },
    ],
  },
  {
    id: 2,
    partner: {
      name: "Roman",
      avatar: "https://cdn-icons-png.flaticon.com/512/6460/6460121.png",
    },
    messages: [
      {
        sender: ESender.Partner,
        message: "Hello!",
        timeSend: "10:55",
        isReading: false,
      },
      {
        sender: ESender.Partner,
        message: "ANSWER MEEEEEEE!!!!",
        timeSend: "10:56",
        isReading: false,
      },
    ],
  },
];
