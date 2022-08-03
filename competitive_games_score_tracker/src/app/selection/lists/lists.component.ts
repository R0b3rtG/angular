import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getDatabase, ref, set } from 'firebase/database';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Player2 } from 'src/app/shared/player2.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {
  trashIcon = faTrashAlt;
  addGameVisible: boolean = false;
  addPlayerVisible: boolean = false;

  @Input() isEditor: boolean;

  @Input() listsVisible: boolean;

  @Input() playersList;
  @Output() playersListChange = new EventEmitter<Player2[]>();

  @Input() gamesList;
  @Output() gamesListChange = new EventEmitter<string[]>();

  @Input() scoresList;
  @Output() scoresListChange = new EventEmitter<number[][][]>();

  navIdSelected: number = 0;

  onDeletePlayer(index: number): void {
    this.playersList = [
      ...this.playersList.slice(0, index),
      ...this.playersList.slice(index + 1, this.playersList.length),
    ];
    this.playersListChange.emit(this.playersList);

    for (let i = 0; i < this.scoresList.length; i++) {
      for (let j = 0; j < this.scoresList[i].length; j++) {
        this.scoresList[i][j] = [
          ...this.scoresList[i][j].slice(0, index),
          ...this.scoresList[i][j].slice(
            index + 1,
            this.scoresList[i][j].length
          ),
        ];
      }
    }

    for (let i = 0; i < this.scoresList.length; i++) {
      this.scoresList[i] = [
        ...this.scoresList[i].slice(0, index),
        ...this.scoresList[i].slice(index + 1, this.scoresList[i].length),
      ];
    }
    this.firebasePut('playersList');
    this.firebasePut('scoresList');
  }

  onDeleteGame(index: number): void {
    this.gamesList = [
      ...this.gamesList.slice(0, index),
      ...this.gamesList.slice(index + 1, this.gamesList.length),
    ];
    this.gamesListChange.emit(this.gamesList);

    this.scoresList = [
      ...this.scoresList.slice(0, index),
      ...this.scoresList.slice(index + 1, this.scoresList.length),
    ];
    this.scoresListChange.emit(this.scoresList);
    this.firebasePut('gamesList');
    this.firebasePut('scoresList');
  }

  onAddPlayer() {
    this.addPlayerVisible = true;
  }

  onAddGame() {
    this.addGameVisible = true;
  }

  onGameAddEnded(inputValue: null | string) {
    if (inputValue === null) {
      this.addGameVisible = false;
    } else {
      this.createGame(inputValue);
      this.addGameVisible = false;
    }
    this.firebasePut('gamesList');
    this.firebasePut('scoresList');
  }

  onPlayerAddEnded(playerObj: Player2) {
    if (playerObj === null) {
      this.addPlayerVisible = false;
    } else {
      this.createPlayer(playerObj);
      this.addPlayerVisible = false;
    }
    this.firebasePut('playersList');
    this.firebasePut('scoresList');
  }

  createGame(gameName: string) {
    this.gamesList.push(gameName);
    this.gamesListChange.emit(this.gamesList);

    let newGame = [];
    this.playersList.map((player: Player2[]) => {
      newGame.push([]);
    });
    this.playersList.map((player: Player2[], index1: number) => {
      this.playersList.map((player: Player2[], index2: number) => {
        if (index1 === index2) {
          newGame[index1].push(null);
        } else {
          newGame[index1].push(0);
        }
      });
    });
    this.scoresList = [...this.scoresList, newGame];
    this.scoresListChange.emit(this.scoresList);
  }

  createPlayer(playerObj: Player2) {
    if (this.scoresList.length > 0) {
      this.scoresList.forEach((game) => {
        game.forEach((player) => {
          player.push(0);
        });
      });

      this.scoresList.forEach((game) => {
        if (this.playersList.length > 0) {
          game[game.length] = [...game[0]];
          for (let i = 0; i < game[game.length - 1].length; i++) {
            game[game.length - 1][i] = 0;
          }
          game[game.length - 1][game[game.length - 1].length - 1] = null;
        } else {
          game.push([null]);
        }
      });
      this.scoresListChange.emit(this.scoresList);
    }

    this.playersList.push(playerObj);
    this.playersListChange.emit(this.playersList);
  }

  firebasePut(branch: string) {
    const database = getDatabase();
    set(ref(database, branch), {
      info: this[branch],
      idk: 'idk',
    });
  }
}
