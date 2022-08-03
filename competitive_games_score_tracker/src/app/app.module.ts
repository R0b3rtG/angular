import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { SelectionComponent } from './selection/selection.component';
import { ResultsComponent } from './results/results.component';
import { ListsComponent } from './selection/lists/lists.component';
import { AddGameComponent } from './selection/lists/add-game/add-game.component';
import { AddPlayerComponent } from './selection/lists/add-player/add-player.component';
import { EditorCheckComponent } from './editor-check/editor-check.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    ResultsComponent,
    ListsComponent,
    AddGameComponent,
    AddPlayerComponent,
    EditorCheckComponent,
  ],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
