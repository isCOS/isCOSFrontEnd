import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { TreeModule } from 'primeng/tree';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputMaskModule,
    ContextMenuModule,
    DropdownModule,
    SplitterModule,
    ImageModule,
    MenubarModule,
    AccordionModule,
    TableModule,
    ToastModule,
    AvatarGroupModule,
    TreeModule,
    TabMenuModule,
    AvatarModule,
  ],
})
export class PrimengModule {}
