import { Entry } from "../interfaces";

interface Props {
  cards: Entry[];
}
export const suggestCards: Props = {
  cards: [
    {
      _id: "suggest-card-1",
      title: "Pillow",
      description:
        "a rectangular cloth bag filled with soft material, used for resting your head on in bed ",
      meaning: "Almohada",
      phrase: "Do you prefer a feather pillow or a foam pillow?",
      list: "",
      slugTitleValue: "pillow",
      memoCount: 0,
      imagen:
        "https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDQ3NDR8MHwxfHNlYXJjaHwxfHxwaWxsb3d8ZW58MHwwfHx8MTY1NzU2NDg5OA&ixlib=rb-1.2.1&q=80&w=1080",
      fav: false,
    },
  ],
};
