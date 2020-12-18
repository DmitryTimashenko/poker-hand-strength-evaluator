import { ICard, IPokerHand } from "../../Contracts";
import produceCardGroups from "./CardGroupsProducer";
import getHandType from "./HandTypeDetector";

const getPokerHand = (cards: ICard[]): IPokerHand => {
  let groups = produceCardGroups(cards);
  return {
    handType: getHandType(groups),
    cardGroups: groups
  };
}

export default getPokerHand;
