import { HandType } from "../Constants";

const handTypeWeight = {
  [HandType.HIGH_CARD]: 1,
  [HandType.ONE_PAIR]: 2,
  [HandType.TWO_PAIR]: 3,
  [HandType.THREE_OF_KIND]: 4,
  [HandType.STRAIGHT]: 5,
  [HandType.FLUSH]: 6,
  [HandType.FULL_HOUSE]: 7,
  [HandType.FOUR_OF_A_KIND]: 8,
  [HandType.STRAIGHT_FLUSH]: 9,
}

export default handTypeWeight;
