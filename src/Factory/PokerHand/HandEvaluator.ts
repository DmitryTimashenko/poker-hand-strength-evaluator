import { HandType, handTypeOrders, ranksOrder } from "../../Constants";
import { ICard } from "../../Contracts";

const getWeight = (handType: HandType, cardGroups: Array<ICard[]>): number => {
    let weightString: String = '';

    cardGroups.forEach(group => group.forEach(card => {
        weightString += String(ranksOrder[card.rank]).padStart(2, '0');
    }));

    weightString = String(handTypeOrders[handType]) + weightString;
    return parseInt(<string>weightString);
}

export default getWeight;
