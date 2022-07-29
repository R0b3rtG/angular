import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player2 } from 'src/app/shared/player2.model';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css'],
})
export class AddPlayerComponent implements OnInit {
  @Output() playerAddEnded = new EventEmitter<Player2>();
  constructor() {}

  ngOnInit(): void {}

  onPlayerAddEnd(inputObject: Player2) {
    this.playerAddEnded.emit(inputObject);
  }
}
