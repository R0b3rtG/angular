import { Component, EventEmitter, Output } from '@angular/core';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-editor-check',
  templateUrl: './editor-check.component.html',
  styleUrls: ['./editor-check.component.css'],
})
export class EditorCheckComponent {
  @Output() editorCheckPassed = new EventEmitter<boolean>();
  wrongPasswordOrEmail = false;

  onEnterAsEditor(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.wrongPasswordOrEmail = false;
        this.editorCheckPassed.emit(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.wrongPasswordOrEmail = true;
      });
  }

  onEnterAsVisitor() {
    this.editorCheckPassed.emit(false);
  }
}
