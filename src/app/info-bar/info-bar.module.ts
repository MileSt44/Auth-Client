import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InfoBarComponent } from './info-bar.component';

@NgModule({
  declarations: [InfoBarComponent],
  imports: [CommonModule],
  providers: [DatePipe], // Add DatePipe to providers array
  exports: [InfoBarComponent]
})
export class InfoBarModule {}
