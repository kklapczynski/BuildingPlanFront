import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-instead-of-html',
  templateUrl: './world.svg',
  styleUrls: ['./svg-instead-of-html.component.scss']
})
export class SvgInsteadOfHtmlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // show svg path title or id on mouse hover
  showPathTitleOrId(event) {
    if(event.target.tagName === 'path') {
      const currentPath = event.target;
      console.log(currentPath.getAttributeNS(null,'title'));
    }

  }

  setSvgPathOpacity(svgPath, opacityPercent: number) {
    svgPath.setAttributeNS(null, 'opacity', `${opacityPercent}%`);
  }

  onMouseOver(event) {
    if(event.target.tagName === 'path') {
      const currentPath = event.target;
      this.setSvgPathOpacity(currentPath, 50);
    }
    
  }

  onMouseOut(event) {
    if(event.target.tagName === 'path') {
      const currentPath = event.target;
      this.setSvgPathOpacity(currentPath, 100);
    }
  }
}
