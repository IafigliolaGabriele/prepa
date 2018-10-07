import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, ButtonsModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [
    AccordionModule,
    ButtonsModule
  ],
  declarations: [],
  providers: []
})
export class AppBootstrapModule { }
