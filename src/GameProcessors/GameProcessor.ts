import { GameType } from "../Constants";
import { IGame, IPlayer, IPokerHand } from "../Contracts";
import { getPokerHand } from "../Factory";
import { produceCombinations } from "../Helpers/Сombinatorics";

const additionalCardsCountMap = {
  [GameType.TEXAS_HOLDEM]: 3,
  [GameType.OMAHA_HOLDEM]: 1,
  [GameType.FIVE_CARD_DRAW]: 0,
}

const processGame = (game: IGame) => {
  let additionalCardsCount = additionalCardsCountMap[game.type]
  let boardSets = produceCombinations(game.board, additionalCardsCount);

  let players: IPlayer[] = game.players.map(player => {
    player.bestHand = boardSets
      .map(set => set.concat(player.cards))
      .map(cards => getPokerHand(cards))
      .reduce((max: IPokerHand, pokerHand: IPokerHand) => max.weight > pokerHand.weight ? max : pokerHand);

    return player;
  });

  players.sort((a, b) => {
    let aWeight = a.bestHand?.weight ?? 0; 
    let bWeight = b.bestHand?.weight ?? 0;
    return aWeight - bWeight;
  });


  let output = '';
  players.reduce((previousWeight: number, player: IPlayer) => {
    output += player.bestHand?.weight == previousWeight ? "=" : " ";
    output += player.name;
    return player.bestHand === undefined ? -1 : player.bestHand.weight; 
  }, 0);

  console.log(output.trim());

}

export default processGame;