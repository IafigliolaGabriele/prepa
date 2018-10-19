import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, ButtonsModule, ModalModule,  BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    AccordionModule,
    ButtonsModule,
    ModalModule,
    BsDropdownModule
  ],
  declarations: [],
  providers: []
})
export class AppBootstrapModule { }
