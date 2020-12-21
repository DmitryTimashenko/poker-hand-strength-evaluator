import { GameType } from "../Constants";
import { ICard, IGame, IPlayer, IPokerHand } from "../Contracts";
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

const processGame = (game: IGame) => {
  let boardSetsCount = boardSetsCountMap[game.type]
  let handSetsCount = handSetsCountMap[game.type];

  let boardSets = produceCombinations(game.board, boardSetsCount);
  let players: IPlayer[] = game.players.map(player => {

    if (0 === boardSetsCount) {
      player.bestHand = getPokerHand(player.cards);
    } else {

      let handSets = produceCombinations(player.cards, handSetsCount);
      let sets = combineTwoSets(boardSets, handSets);

      player.bestHand = sets
        .map(set => getPokerHand(set))
        .reduce((max: IPokerHand, pokerHand: IPokerHand) => max.weight > pokerHand.weight ? max : pokerHand);
    }
    return player;
  });

  players.sort((a, b) => {
    let aWeight = a.bestHand?.weight ?? 0;
    let bWeight = b.bestHand?.weight ?? 0;
    if(aWeight < bWeight) {
      return -1;
    }
    return 1;
  });


  let output = '';
  players.reduce((previousWeight: number, player: IPlayer) => {
    output += player.bestHand?.weight == previousWeight ? "=" : " ";
    output += player.name;
    return player.bestHand === undefined ? -1 : player.bestHand.weight;
  }, 0);

  console.log(output.trim());

}

const combineTwoSets = (firstSet: Array<ICard[]>, secondSet: Array<ICard[]>): Array<ICard[]> => {
  let result: Array<ICard[]> = [];
  firstSet.forEach(itemFirstSet => {
    secondSet.forEach(itemSecondSet => {
      result.push([...itemFirstSet, ...itemSecondSet])
    })
  })
  return result;
}

export default processGame;