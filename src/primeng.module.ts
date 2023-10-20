import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';

@NgModule({
  exports: [ButtonModule, CalendarModule, InputTextModule, DropdownModule, SplitterModule, ImageModule, TableModule, ToastModule],
})
export class PrimengModule { }