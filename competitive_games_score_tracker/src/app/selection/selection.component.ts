import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Info } from '../shared/info.model';
import { Player2 } from '../shared/player2.model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
})
export class SelectionComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
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

  @Output() infoSent = new EventEmitter<Info>();

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
    this.httpClient
      .get(
        `https://r0b3rtg-scoretracker-default-rtdb.europe-west1.firebasedatabase.app/${branch}.json`
      )
      .subscribe((response) => {
        let branchShort = branch.replace('List', '');
        let info = JSON.parse(JSON.stringify(response)).info;
        this[branchShort] = info != undefined ? info : [];
      });
  }

  firebasePut(branch: string) {
    this.httpClient
      .put(
        `https://r0b3rtg-scoretracker-default-rtdb.europe-west1.firebasedatabase.app/${branch}.json`,
        { info: this[branch.replace('List', '')], idk: 'idk' }
      )
      .subscribe();
  }
}
