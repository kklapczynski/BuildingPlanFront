import { Directive, HostListener, Renderer2 } from "@angular/core";


@Directive({
    selector: '[svgPathShowTitleId]'
})
export class SvgPathShowTitleIdDirective {
    constructor(private renderer: Renderer2) {}
    // setSvgPathOpacity(svgPath, opacityPercent: number) {
    //     svgPath.setAttributeNS(null, 'opacity', `${opacityPercent}%`);
    // }
    
    @HostListener('click',['$event']) onMouseOver(event: MouseEvent) {
        if(event.target['tagName'] === 'path') {
            const path = document.getElementById(event.target['id']);
            // get coordinates of path's center
            const pathBoxCoordinates = path.getBoundingClientRect();
            // horizontal coordinate
            // const x = pathBoxCoordinates.left + 0.5*pathBoxCoordinates.width;
            // const y = pathBoxCoordinates.top + 0.5*pathBoxCoordinates.height;
            // console.log(path.getBoundingClientRect());
            const x = event.clientX;
            const y = event.clientY;
            const svgCircle = this.renderer.createElement('circle', 'svg');
            this.renderer.setAttribute(svgCircle,'cx', '200');
            this.renderer.setAttribute(svgCircle,'cy', '200');
            this.renderer.setAttribute(svgCircle,'r', '100');
            this.renderer.setAttribute(svgCircle,'fill','red');
            console.log(path.parentElement);
            this.renderer.appendChild(path.parentElement, svgCircle);

        }
    }

    // @HostListener('mouseout',['$event']) onMouseOut(event: Event) {
    //     if(event.target['tagName'] === 'path') {
    //       const currentPath = event.target;
    //       this.setSvgPathOpacity(currentPath, 100);
    //     }
    // }
}