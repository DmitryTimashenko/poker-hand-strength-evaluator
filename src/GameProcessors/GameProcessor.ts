import { GameType } from "../Constants";
import { ICard, IGame, IPokerHand } from "../Contracts";
import { getPokerHand } from "../Factory";
import { produceCombinations } from "../Helpers/Сombinatorics";

const boardSetsCountMap = {
  [GameType.TEXAS_HOLDEM]: 3,
  [GameType.OMAHA_HOLDEM]: 3,
  [GameType.FIVE_CARD_DRAW]: 0,
}

const handSetsCountMap = {
  [GameType.TEXAS_HOLDEM]: 2,
  [GameType.OMAHA_HOLDEM]: 2,
  [GameType.FIVE_CARD_DRAW]: 5,
}

const processGame = (game: IGame): IGame => {
  let boardSetsCount = boardSetsCountMap[game.type]
  let handSetsCount = handSetsCountMap[game.type];

  let boardSets = produceCombinations(game.board, boardSetsCount);

  game.players.forEach(player => {

      let handSets = produceCombinations(player.cards, handSetsCount);
      let sets = combineTwoSets(handSets, boardSets);

      player.bestHand = sets
        .map(set => getPokerHand(set))
        .reduce((max: IPokerHand, pokerHand: IPokerHand) => max.weight > pokerHand.weight ? max : pokerHand);
    return player;
  });

  game.players.sort((a, b) => {
    let aWeight = a.bestHand?.weight ?? 0;
    let bWeight = b.bestHand?.weight ?? 0;
    if (aWeight < bWeight) {
      return -1;
    }
    return 1;
  });

  return game;
}

const combineTwoSets = (firstSet: Array<ICard[]>, secondSet: Array<ICard[]>): Array<ICard[]> => {
  if (0 === firstSet.length) {
    return secondSet;
  }

  if (0 === secondSet.length) {
    return firstSet;
  }

  let result: Array<ICard[]> = [];
  firstSet.forEach(itemFirstSet => {
    secondSet.forEach(itemSecondSet => {
      result.push([...itemFirstSet, ...itemSecondSet])
    })
  })
  return result;
}

export default processGame;