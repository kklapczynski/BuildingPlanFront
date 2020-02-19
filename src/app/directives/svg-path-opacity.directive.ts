import { Directive, HostListener } from "@angular/core";


@Directive({
    selector: '[svgPathOpacity]'
})
export class SvgPathOpacityDirective {

    setSvgPathOpacity(svgPath, opacityPercent: number) {
        svgPath.setAttributeNS(null, 'opacity', `${opacityPercent}%`);
      }
    
    @HostListener('mouseover',['$event']) onMouseOver(event: Event) {
        if(event.target['tagName'] === 'path') {
          const currentPath = event.target;
          this.setSvgPathOpacity(currentPath, 50);
        }
    }

    @HostListener('mouseout',['$event']) onMouseOut(event: Event) {
        if(event.target['tagName'] === 'path') {
          const currentPath = event.target;
          this.setSvgPathOpacity(currentPath, 100);
        }
    }
}