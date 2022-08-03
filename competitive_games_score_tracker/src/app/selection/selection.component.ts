import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { getDatabase, ref, onValue, set } from 'firebase/database';

import { Info } from '../shared/info.model';
import { Player2 } from '../shared/player2.model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
})
export class SelectionComponent implements OnInit {
  @Output() infoSent = new EventEmitter<Info>();

  ngOnInit() {
    this.firebaseGet('playersList');
    this.firebaseGet('gamesList');
    this.firebaseGet('scoresList');
    this.infoSent.emit(this.info);
  }

  @Input() isEditor: boolean;
  scoreChangeVisible = false;

  players: Player2[] = [];
  games: string[] = [];

  info: Info = {
    resultsVisible: false,
    playerOneScore: null,
    playerOneName: null,
    playerTwoScore: null,
    playerTwoName: null,
    gameName: null,
    playerOneImageUrl: null,
    playerTwoImageUrl: null,
    playerOneDescription: null,
    playerTwoDescription: null,
  };

  scores: number[][][] = [];

  onShowScore(
    playerOneIndex: string,
    playerTwoIndex: string,
    gameIndex: string
  ): void {
    if (playerOneIndex !== '' && playerTwoIndex !== '' && gameIndex !== '') {
      this.updateInfo(playerOneIndex, playerTwoIndex, gameIndex, true);
      this.scoreChangeVisible = true ? this.info.playerOneScore != null : false;
    }
  }

  onShowLists() {
    this.info = {
      resultsVisible: false,
      playerOneScore: null,
      playerOneName: null,
      playerTwoScore: null,
      playerTwoName: null,
      playerOneDescription: null,
      playerTwoDescription: null,
      playerOneImageUrl: null,
      playerTwoImageUrl: null,
      gameName: null,
    };
    this.scoreChangeVisible = true ? this.info.playerOneScore != null : false;
    this.infoSent.emit(this.info);
  }

  onUpdateScorePlayerOne(
    playerOneIndex: string,
    playerTwoIndex: string,
    gameIndex: string,
    value: number
  ): void {
    if (playerOneIndex !== '' && playerTwoIndex !== '' && gameIndex !== '') {
      this.scores[gameIndex][playerOneIndex][playerTwoIndex] += value;
      this.updateInfo(playerOneIndex, playerTwoIndex, gameIndex, true);
      this.infoSent.emit(this.info);
      this.firebasePut('scoresList');
    }
  }

  onUpdateScorePlayerTwo(
    playerOneIndex: string,
    playerTwoIndex: string,
    gameIndex: string,
    value: number
  ): void {
    if (playerOneIndex !== '' && playerTwoIndex !== '' && gameIndex !== '') {
      this.scores[gameIndex][playerTwoIndex][playerOneIndex] += value;
      this.updateInfo(playerOneIndex, playerTwoIndex, gameIndex, true);
      this.firebasePut('scoresList');
    }
  }

  updateInfo(
    playerOneIndex: string,
    playerTwoIndex: string,
    gameIndex: string,
    resultsVisible: boolean
  ) {
    this.info = {
      resultsVisible: resultsVisible,
      playerOneScore: this.scores[gameIndex][playerOneIndex][playerTwoIndex],
      playerOneName: this.players[playerOneIndex].playerName,
      playerTwoScore: this.scores[gameIndex][playerTwoIndex][playerOneIndex],
      playerTwoName: this.players[playerTwoIndex].playerName,
      playerOneDescription: this.players[playerOneIndex].playerDescription,
      playerTwoDescription: this.players[playerTwoIndex].playerDescription,
      playerOneImageUrl: this.players[playerOneIndex].playerImageUrl,
      playerTwoImageUrl: this.players[playerTwoIndex].playerImageUrl,
      gameName: this.games[gameIndex],
    };
    this.infoSent.emit(this.info);
  }

  firebaseGet(branch: string) {
    const database = getDatabase();
    const gamesList = ref(database, branch);
    onValue(gamesList, (snapshot) => {
      let branchShort = branch.replace('List', '');
      const data = snapshot.val();
      this[branchShort] = data.info != undefined ? data.info : [];
    });
  }

  firebasePut(branch: string) {
    const database = getDatabase();
    set(ref(database, branch), {
      info: this[branch.replace('List', '')],
      idk: 'idk',
    });
  }
}
