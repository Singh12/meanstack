import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [MatInputModule,
     MatCardModule,
     MatButtonModule,
     MatToolbarModule,
     MatExpansionModule,
     MatProgressSpinnerModule,
     MatPaginatorModule,
     MatSnackBarModule],
  exports: [MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule]
})
export class AppMaterial {}
