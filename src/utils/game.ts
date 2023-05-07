import { DEFAULT_CHIPS_PER_PLAYER, DICE_FACES, MAX_DICE_COUNT, MAX_PLAYERS } from "./constants";

export const playLCR = (input: string): string => {
  const lines = input.trim().replace(/\\n/g, '\n').split('\n');
  let gameCount = 1;
  let i = 0;
  let result = '';
  
  while (lines[i]) {
    const currentLine = lines[i].trim();
    let [playerNumbers, rolls] = currentLine.split(' ');
    if(playerNumbers === '0' || +playerNumbers > MAX_PLAYERS) {
      i++;
      continue;
    }
    const chipsPerPlayer = Array.from({ length: +playerNumbers }, () => DEFAULT_CHIPS_PER_PLAYER);
    let center = 0;
    let currentPlayer = 0;

    result += `Game ${gameCount++}:\n`;
    i++;
    while (rolls.length > 0 && chipsPerPlayer.filter(p => p > 0).length > 1) {
      const diceCount = Math.min(MAX_DICE_COUNT, chipsPerPlayer[currentPlayer]);

      for (let j = 0; j < diceCount; j++) {
        if(!rolls.length) break;
        const dice = rolls.charAt(0);
        rolls = rolls.slice(1);

        switch(dice) {
          case DICE_FACES.L:
            if(chipsPerPlayer[currentPlayer] > 0) {
              chipsPerPlayer[(currentPlayer + 1) % +playerNumbers]++;
              chipsPerPlayer[currentPlayer]--;
            }
            break;
          case DICE_FACES.R:
            if(chipsPerPlayer[currentPlayer] > 0) {
              chipsPerPlayer[currentPlayer > 0 ? currentPlayer - 1 : +playerNumbers - 1]++;
              chipsPerPlayer[currentPlayer]--;
            }
            break;
          case DICE_FACES.C:
            if(chipsPerPlayer[currentPlayer] > 0) {
              chipsPerPlayer[currentPlayer]--;
              center++;
            }
            break;
        }
        
      }
      currentPlayer = (currentPlayer + 1) % +playerNumbers;
    }
    result += printResults(currentPlayer, center, chipsPerPlayer);
  }
  return result;
}

export const printResults = (currentPlayer: number, center: number, chipsPerPlayer:number[]): string => {
  let result = '';
  const existsWinner = chipsPerPlayer.filter(num => num !== 0).length === 1;
  for (let j = 0; j < chipsPerPlayer.length; j++) {
    const winnerPrefix = existsWinner && chipsPerPlayer[j] ? '(W)' : '';
    const currentPrefix = !existsWinner && j === currentPlayer ? '(*)' : '';
    result += `Player ${j + 1}: ${chipsPerPlayer[j]}${winnerPrefix}${currentPrefix}\n`;
  }
  result += `Center: ${center}\n`;
  return result;
}