import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './Components/form-builder/form-builder.component';

const routes: Routes = [
  { path: '', redirectTo: 'form-builder', pathMatch: 'full' }, 
  { path: 'form-builder', component: FormBuilderComponent },
  { path: '**', redirectTo: 'form-builder' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
