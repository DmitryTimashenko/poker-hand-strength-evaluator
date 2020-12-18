import { HandType, handTypeOrders, Rank, ranksOrder } from "../../Constants";
import { ICard } from "../../Contracts";

const getWeight = (handType: HandType, cardGroups: Array<ICard[]>): number => {
    let weight = 0;

    cardGroups.forEach(group => group.forEach(card => {
        weight |= getRankBinaryFlag(card.rank)
    }));

    weight |= getHandTypeBinaryFlag(handType);

    return weight;
}

const getRankBinaryFlag = (rank: Rank): number => {
    return Math.pow(2, ranksOrder[rank] - 1);
}

const getHandTypeBinaryFlag = (handType: HandType): number => {
    const maxRankOrder = Object.values(ranksOrder).length;
    return Math.pow(2, handTypeOrders[handType] + maxRankOrder - 1);
}

export default getWeight;
