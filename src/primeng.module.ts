import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  exports: [ButtonModule, CalendarModule ,InputTextModule ],
})
export class PrimengModule {}