import * as readline from "readline";
import { GameType } from "./Constants";
import { ICard, IGame } from "./Contracts";
import processGame from "./GameProcessors/GameProcessor";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const texasHoldemGameBuilder = (input: String[]): IGame => {
  const board = input.shift();
  return {
    type: GameType.TEXAS_HOLDEM,
    board: undefined === board ? [] : stringToCardsArray(board),
    players: input.map((str: String) => {
      return {
        name: str,
        cards: stringToCardsArray(str),
        bestHand: undefined
      }
    }),
  };
}

const omahaHoldemGameBuilder = (input: String[]): IGame => {
  const board = input.shift();
  return {
    type: GameType.OMAHA_HOLDEM,
    board: undefined === board ? [] : stringToCardsArray(board),
    players: input.map((str: String) => {
      return {
        name: str,
        cards: stringToCardsArray(str),
        bestHand: undefined
      }
    }),
  };
}

const fiveCardDrawGameBuilder = (input: String[]): IGame => {
  return {
    type: GameType.FIVE_CARD_DRAW,
    board: [],
    players: input.map((str: String) => {
      return {
        name: str,
        cards: stringToCardsArray(str),
        bestHand: undefined
      }
    }),
  };
}

const stringToCardsArray = (str: String): ICard[] => {
  return str.match(/.{1,2}/g)!.map((cardStr) => <ICard>{
    suit: cardStr[1],
    rank: cardStr[0],
  });
}


rl.on("line", function (line: String) {
  const errorPrefix = "Error: ";

  let game;
  let input: String[] = line.split(" ");
  const gameType = input.shift();

  switch (gameType) {
    case GameType.TEXAS_HOLDEM: {
      game = texasHoldemGameBuilder(input);
      break;
    }
    case GameType.OMAHA_HOLDEM: {
      game = omahaHoldemGameBuilder(input);
      break;
    }
    case GameType.FIVE_CARD_DRAW: {
      game = fiveCardDrawGameBuilder(input);
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
});
