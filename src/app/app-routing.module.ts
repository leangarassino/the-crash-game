import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "play",
    loadChildren: () => import('./app/home/home.module').then(m => m.HomeModule)    
  },
  {
    path: "**",
    redirectTo: "/play",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
