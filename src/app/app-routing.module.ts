import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContributionComponent } from './components/contribution/contribution.component';


const routes: Routes = [
  { path: 'app', component: HomeComponent },
  { path: 'contribution', component: ContributionComponent },
  { path: '**', redirectTo: 'app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
