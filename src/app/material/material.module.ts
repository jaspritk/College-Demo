import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


const materialCompoments = [
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatStepperModule,
  MatDatepickerModule,
  MatTableModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatIconModule,
  ReactiveFormsModule,
  FormsModule,
  MatDividerModule
]

@NgModule({
  imports: [materialCompoments],
  exports: [materialCompoments]
})

export class MaterialModule { }
