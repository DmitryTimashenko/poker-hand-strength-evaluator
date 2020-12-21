import { GameType } from "../Constants";
import { IGame } from "../Contracts";
import stringToCardsArray from "./StringToArrayCards";

const texasHoldemGameFactory = (input: String[]): IGame => {
  const board = input.shift();
  return {
    type: GameType.TEXAS_HOLDEM,
    board: undefined === board ? [] : stringToCardsArray(board),
    players: input.map((str: String) => {
      return {
        name: str,
        cards: stringToCardsArray(str),
        bestHand: undefined
      }
    }),
  };
}

export default texasHoldemGameFactory;
