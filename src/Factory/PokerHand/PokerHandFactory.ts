import { ICard, IPokerHand } from "../../Contracts";
import produceCardGroups from "./CardGroupsProducer";
import getWeight from "./HandEvaluator";
import getHandType from "./HandTypeDetector";

const getPokerHand = (cards: ICard[]): IPokerHand => {
  let groups = produceCardGroups(cards);
  let handType = getHandType(groups);
  let weight = getWeight(handType, groups);
  return {
    handType: handType,
    cardGroups: groups,
    weight: weight
  };
}

export default getPokerHand;
