import { ranksOrder } from "../../Constants";
import { ICard } from "../../Contracts";

const produceCardGroups = (cards: ICard[]): Array<ICard[]> => {
  return cards.reduce((hash: Array<ICard[]>, card: ICard) => {
    let rankIndex = ranksOrder[card.rank];
    hash[rankIndex] = [...hash[rankIndex] || [], card];
    return hash;
  }, [])
    .filter(group => group.length > 0)
    .sort((a: ICard[], b: ICard[]) => {
      let deltaLength = b.length - a.length;
      if (0 !== deltaLength) {
        return deltaLength;
      }
      return ranksOrder[b[0].rank] - ranksOrder[a[0].rank];
    });
}

export default produceCardGroups;
