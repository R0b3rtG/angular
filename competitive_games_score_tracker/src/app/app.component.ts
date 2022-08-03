import { Component, OnInit } from '@angular/core';
import { Info } from './shared/info.model';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  infos: Info;

  editorCheckVisible: boolean = true;
  isEditor = false;

  onEditorCheckPassed(isEditor: boolean) {
    this.isEditor = isEditor;
    this.editorCheckVisible = false;
  }

  onInfoRecived(info: Info) {
    this.infos = info;
  }

  ngOnInit() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD5Xur7y6tE9JdJst8pD7-LIrl3cSfPjyM',
      authDomain: 'r0b3rtg-scoretracker.firebaseapp.com',
      databaseURL:
        'https://r0b3rtg-scoretracker-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'r0b3rtg-scoretracker',
      storageBucket: 'r0b3rtg-scoretracker.appspot.com',
      messagingSenderId: '565301428874',
      appId: '1:565301428874:web:944b33cf5277abfc176373',
    };

    const app = initializeApp(firebaseConfig);
  }
}
