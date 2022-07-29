import { Component } from '@angular/core';
import { Info } from './shared/info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
}
