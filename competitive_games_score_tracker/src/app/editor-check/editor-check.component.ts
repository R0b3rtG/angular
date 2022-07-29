import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-editor-check',
  templateUrl: './editor-check.component.html',
  styleUrls: ['./editor-check.component.css'],
})
export class EditorCheckComponent {
  @Output() editorCheckPassed = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient) {}

  isOwner: boolean;
  passwordWrong = false;

  onEnterAsEditor(password: string) {
    let hashedPassword: string;
    this.httpClient
      .get(
        'https://r0b3rtg-scoretracker-default-rtdb.europe-west1.firebasedatabase.app/passwordHash.json'
      )
      .subscribe(
        (response) => {
          hashedPassword = response.toString();
          if (bcrypt.compareSync(password, hashedPassword)) {
            this.passwordWrong = false;
            this.editorCheckPassed.emit(true);
          } else {
            this.passwordWrong = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onEnterAsVisitor() {
    this.editorCheckPassed.emit(false);
  }
}
