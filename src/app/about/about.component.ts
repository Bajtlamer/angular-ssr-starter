import { Component, OnInit } from '@angular/core';
import { Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) {
    title.setTitle('About Page');
    meta.addTags([
      { name: 'description', content: 'This is a About page' },
      { name: 'keywords', content: 'angular,ssr,seo' }
    ]);
  }


  ngOnInit() {
  }

}
