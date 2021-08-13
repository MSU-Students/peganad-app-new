import { IPlayer } from 'src/interfaces/player.interface';
import { localbaseService } from 'src/services/localbase.service';

const playersSize = 5;

class PlayerService {
  async checkPlayersStat(category: string, score: number) {
    const playerList: IPlayer[] = await localbaseService.getPlayer(category);
    if (
      !playerList ||
      playerList.length != playersSize ||
      playerList.some(item => item.score < score)
    ) {
      if (score != 0) {
        return true;
      }
    } else {
      return false;
    }
  }

  async savePlayerStat(category: string, playerStat: IPlayer) {
    const playerList: IPlayer[] = await localbaseService.getPlayer(category);
    if (!playerList) {
      await localbaseService.setPlayer(category, [playerStat]);
    } else if (playerList.length != playersSize) {
      playerList.push(playerStat);
      await localbaseService.setPlayer(category, playerList);
    } else {
      if (playerList.some(item => item.score < playerStat.score)) {
        const sortPlayers = playerList.sort((a, b) => a.score - b.score);
        sortPlayers[0] = Object.assign({}, playerStat);
        await localbaseService.setPlayer(category, playerList);
      } else {
        console.log('something happened!');
      }
    }
  }
}

const playerService = new PlayerService();
export default playerService;
