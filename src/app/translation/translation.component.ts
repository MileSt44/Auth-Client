import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  currentLanguage: string = 'en';

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.setDefaultLang('en'); // Set default language (e.g., English)
    this.translateService.use('en'); // Use the default language
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'hr' : 'en'; // Toggle between 'en' and 'hr'
    this.translateService.use(this.currentLanguage); // Set the selected language
  }

  translate(){
    
  }
}
