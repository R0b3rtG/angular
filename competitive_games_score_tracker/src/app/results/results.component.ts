import { Component, Input, OnChanges } from '@angular/core';
import { Info } from '../shared/info.model';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnChanges {
  @Input() infos: Info;
  playerOneInfo: Player;
  playerTwoInfo: Player;

  ngOnChanges() {
    this.playerOneInfo = {
      playerName: this.infos.playerOneName,
      playerScore: this.infos.playerOneScore,
      playerImageUrl: this.infos.playerOneImageUrl,
      playerDescription: this.infos.playerOneDescription,
    };

    this.playerTwoInfo = {
      playerName: this.infos.playerTwoName,
      playerScore: this.infos.playerTwoScore,
      playerImageUrl: this.infos.playerTwoImageUrl,
      playerDescription: this.infos.playerTwoDescription,
    };
  }
}
