import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, ButtonsModule, ModalModule, CollapseModule, BsDropdownModule} from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
    AccordionModule,
    ButtonsModule,
    ModalModule,
    BsDropdownModule,
    CollapseModule
  ],
  declarations: [],
  providers: []
})
export class AppBootstrapModule { }
