import { Component, OnInit } from '@angular/core';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) {
    title.setTitle('Home Page');
    meta.addTags([
      { name: 'description', content: 'This is a Home Page' },
      { name: 'keywords', content: 'angular,ssr,seo' }
    ]);
  }

  ngOnInit() {
  }

}
