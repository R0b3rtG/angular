import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent implements OnInit {
  @Output() gameAddEnded = new EventEmitter<null | string>();
  constructor() {}

  ngOnInit(): void {}

  onGameAddEnd(inputValue: null | string) {
    this.gameAddEnded.emit(inputValue);
  }
}
