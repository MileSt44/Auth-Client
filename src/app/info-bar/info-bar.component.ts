import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {
  currentSlideIndex: number = 0;
  slides: any[] = [
    {
      title: 'Info message 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'info',
      time: new Date()
    },
    {
      title: 'Info message 2',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      type: 'success',
      time: new Date()
    },
    {
      title: 'Info message 3',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      type: 'error',
      time: new Date()
    }
  ];

  showInfoBar: boolean = true; // added property to toggle info bar visibility

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      const now = new Date();
      this.currentSlideIndex = now.getSeconds() % 3; // Update the index every 3 seconds
    }, 3000);
  }

  close(): void { // added close method implementation
    this.showInfoBar = false;
  }

  removeMessage(message: any): void { // added removeMessage method implementation
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }

  get messages(): any[] { // added messages getter implementation
    return this.slides.filter(slide => slide.type !== 'info');
  }
}
