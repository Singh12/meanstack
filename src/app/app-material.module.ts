import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
} from '@angular/material';
@NgModule({
  imports: [MatInputModule,
     MatCardModule,
     MatButtonModule,
     MatToolbarModule,
     MatExpansionModule,
     MatProgressSpinnerModule,
     MatPaginatorModule],
  exports: [MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule]
})
export class AppMaterial {}
