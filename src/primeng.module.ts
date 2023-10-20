import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { ImageModule } from 'primeng/image';

@NgModule({
  exports: [ButtonModule, CalendarModule ,InputTextModule, DropdownModule, SplitterModule, ImageModule],
})
export class PrimengModule {}