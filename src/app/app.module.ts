import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TrashComponent } from './components/trash/trash.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarComponent,
    ListViewComponent,
    TrashComponent,
  ],
  providers: [
    provideRouter(routes),
    provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
