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
        isReading: true,
      },
      {
        sender: ESender.Partner,
        message: "ANSWER MEEEEEEE!!!!",
        timeSend: "10:56",
        isReading: true,
      },
      {
        sender: ESender.Me,
        message:
          "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        timeSend: "10:56",
        isReading: true,
      },
      {
        sender: ESender.Partner,
        message: "Good",
        timeSend: "10:56",
        isReading: false,
      },
    ],
  },
  {
    id: 3,
    partner: {
      name: "Timur",
      avatar: null,
    },
    messages: [],
  },
];
