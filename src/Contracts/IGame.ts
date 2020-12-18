import { GameType } from "../Constants";
import { ICard } from ".";

interface IGame {
  type: GameType;
  board: ICard[] | undefined;
  hands: ICard[][] | undefined;
}

export default IGame;
