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
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Info message 2',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Info message 3',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      const now = new Date();
      this.currentSlideIndex = now.getSeconds() % 3; // Update the index every 3 seconds
    }, 3000);
  }
}

