import { HandType, Rank, ranksOrder } from "../../Constants";
import { ICard } from "../../Contracts";

const getHandType = (groups: Array<ICard[]>): HandType => {

  let flush = isFlush(groups);
  let straight = isStraight(groups);

  if (flush && straight) {
    return HandType.STRAIGHT_FLUSH;
  }
  if (isFourOfAKind(groups)) {
    return HandType.FOUR_OF_A_KIND;
  }
  if (isFullHouse(groups)) {
    return HandType.FULL_HOUSE;
  }
  if (flush) {
    return HandType.FLUSH;
  }
  if (straight) {
    return HandType.STRAIGHT;
  }
  if (isThreeOfAKind(groups)) {
    return HandType.THREE_OF_KIND;
  }
  if (isTwoPair(groups)) {
    return HandType.TWO_PAIR;
  }
  if (isOnePair(groups)) {
    return HandType.ONE_PAIR;
  }

  return HandType.HIGH_CARD;
}

const isOnePair = (groups: Array<ICard[]>): boolean => {
  return 2 === groups[0].length && 1 === groups[1].length;
}

const isTwoPair = (groups: Array<ICard[]>): boolean => {
  return 2 === groups[0].length && 2 === groups[1].length
}

const isThreeOfAKind = (groups: Array<ICard[]>): boolean => {
  return 3 === groups[0].length && 1 === groups[1].length;
}

const isFullHouse = (groups: Array<ICard[]>): boolean => {
  return 3 === groups[0].length && 2 === groups[1].length;
}

const isFourOfAKind = (groups: Array<ICard[]>): boolean => {
  return 4 === groups[0].length;
}

const isStraight = (groups: Array<ICard[]>): boolean => {
  if (5 !== groups.length) {
    return false;
  }

  if (Rank.ACE === groups[0][0].rank && Rank.FOUR === groups[1][0].rank) {
    return true;
  }

  const distance = ranksOrder[groups[0][0].rank] - ranksOrder[groups[4][0].rank];

  if (distance < 5) {
    return true;
  }

  return false;
};

const isFlush = (groups: Array<ICard[]>): boolean => {
  if (5 !== groups.length) {
    return false;
  }

  return groups.every((group: ICard[]) => group[0].suit === groups[0][0].suit);
}

export default getHandType;
