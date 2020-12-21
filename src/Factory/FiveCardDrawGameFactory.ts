import { GameType } from "../Constants";
import { IGame } from "../Contracts";
import stringToCardsArray from "./StringToArrayCards";

const fiveCardDrawGameFactory = (input: String[]): IGame => {
  return {
    type: GameType.FIVE_CARD_DRAW,
    board: [],
    players: input.map((str: String) => {
      return {
        name: str,
        cards: stringToCardsArray(str),
        bestHand: undefined
      }
    }),
  };
}

export default fiveCardDrawGameFactory