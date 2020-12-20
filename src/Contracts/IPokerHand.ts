import { HandType } from "../Constants";
import { ICard } from ".";

interface IPokerHand {
  handType: HandType;
  cardGroups: Array<ICard[]>;
  weight: number;
  label: string;
}

export default IPokerHand;
