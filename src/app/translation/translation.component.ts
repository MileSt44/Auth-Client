import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  currentLanguage: string = 'en';

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.setDefaultLang('en'); // Set default language (e.g., English)
    this.translateService.use('en'); // Use the default language

    // Load translation files
    this.translateService.setTranslation('en', require('./assets/i18n/en.json'));
    this.translateService.setTranslation('hr', require('./assets/i18n/hr.json'));
  }

  switchLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'hr' : 'en'; // Toggle between 'en' and 'hr'
    this.translateService.use(this.currentLanguage); // Set the selected language
  }
}
