import * as readline from "readline";
import { GameType } from "./Constants";
import { IGame, IPlayer } from "./Contracts";
import { omahaHoldemGameFactory, texasHoldemGameFactory } from "./Factory";
import fiveCardDrawGameFactory from "./Factory/FiveCardDrawGameFactory";
import processGame from "./GameProcessors/GameProcessor";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const viewGameResults = (game: IGame) => {
  let output = '';
  game.players.reduce((previousWeight: number, player: IPlayer) => {
    output += player.bestHand?.weight == previousWeight ? "=" : " ";
    output += player.name;
    return player.bestHand === undefined ? -1 : player.bestHand.weight;
  }, 0);

  console.log(output.trim());
}

rl.on("line", function (line: String) {
  const errorPrefix = "Error: ";

  let game;
  let input: String[] = line.split(" ");
  const gameType = input.shift();

  switch (gameType) {
    case GameType.TEXAS_HOLDEM: {
      game = texasHoldemGameFactory(input);
      break;
    }
    case GameType.OMAHA_HOLDEM: {
      game = omahaHoldemGameFactory(input);
      break;
    }
    case GameType.FIVE_CARD_DRAW: {
      game = fiveCardDrawGameFactory(input);
      break;
    }
    case undefined: {
      console.log(errorPrefix + "Invalid input");
      return;
    }
    default: {
      console.log("Unrecognized game type");
      return;
    }
  }

  processGame(game);
  viewGameResults(game);
});
