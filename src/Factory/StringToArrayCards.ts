import { ICard } from "../Contracts";

const stringToCardsArray = (str: String): ICard[] => {
  return str.match(/.{1,2}/g)!.map((cardStr) => <ICard>{
    suit: cardStr[1],
    rank: cardStr[0],
  });
}

export default stringToCardsArray;