import { ICard } from ".";
import IPokerHand from "./IPokerHand";

interface IPlayer {
  name: String;
  cards: ICard[];
  bestHand: IPokerHand | undefined;
}

export default IPlayer;
