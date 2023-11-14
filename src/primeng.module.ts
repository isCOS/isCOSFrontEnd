import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  exports: [ButtonModule, CalendarModule ,InputTextModule, DropdownModule, SplitterModule, ImageModule, TableModule, ToastModule, AvatarGroupModule, AvatarModule],
})
export class PrimengModule { }