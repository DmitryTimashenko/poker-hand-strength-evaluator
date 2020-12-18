import { HandType } from "../Constants";
import { ICard } from ".";

interface IPokerHand {
  handType: HandType;
  cardGroups: Array<ICard[]>;
  weight: number;
}

export default IPokerHand;
