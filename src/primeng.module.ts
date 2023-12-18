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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { KnobModule } from 'primeng/knob';

@NgModule({
  exports: [
    ButtonModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    InputMaskModule,
    ContextMenuModule,
    DropdownModule,
    ProgressSpinnerModule,
    SplitterModule,
    ImageModule,
    MenubarModule,
    KnobModule,
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
