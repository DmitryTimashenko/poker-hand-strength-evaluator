import { GameType } from "../Constants";
import { ICard } from ".";
import IPlayer from "./IPlayer";

interface IGame {
  type: GameType;
  board: ICard[];
  players: IPlayer[];
}

export default IGame;
