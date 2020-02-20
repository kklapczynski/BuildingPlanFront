import { Directive, HostListener, Renderer2, ElementRef } from "@angular/core";

@Directive({
    selector: '[svgAddCircleOnClick]'
})
export class SvgAddCircleOnClickDirective {
    hostDOMElement: Element;
    svg: SVGSVGElement; // this interface gives access to SVGElement

    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.hostDOMElement = el.nativeElement;
    }
    
    // gets first svg element of directive's host and ...
    getHostSvg() : SVGSVGElement {
        // get first SVGElement of host and return it as ElementRef
        return this.hostDOMElement.getElementsByTagName('svg').item(0);
    }

    onMousePosSVG(event: MouseEvent) {
        // credits: https://stackoverflow.com/questions/54799299/click-event-coordinates-in-svg
        const p = this.svg.createSVGPoint();
        // set coordinates of Point in client coordinate system
        p.x = event.clientX;
        p.y = event.clientY;
        // transform coordinates into SVGElement's coordinate system
        var ctm = this.svg.getScreenCTM().inverse();
        const clickPoint =  p.matrixTransform(ctm);
        // return point with coordinates in SVGElement's coordinate system
        return clickPoint;
    }

    @HostListener('click',['$event']) onMouseClick(event: MouseEvent) {
        // get svg element to work on
        // TODO: when svg added through [innerHTML] changes added items are lost and adding new ones doesn't work
        // this.svg should be reloaded in this case ?
        if(!this.svg) {
            this.svg = this.getHostSvg();
        }

        if(event.target['tagName'] === 'path') {
            // get click point in SVGElement's coordinate system
            const clickPoint = this.onMousePosSVG(event);
            const svgCircle = this.renderer.createElement('circle', 'svg');
            // set coordinates of circle center in SVGElement's coordinate system, radius, fill
            this.renderer.setAttribute(svgCircle,'cx', '' + clickPoint.x);
            this.renderer.setAttribute(svgCircle,'cy', '' + clickPoint.y);
            this.renderer.setAttribute(svgCircle,'r', '10');
            this.renderer.setAttribute(svgCircle,'fill','red');
            // add circle scg element to SVG 
            this.renderer.appendChild(this.svg, svgCircle);
        }
    }
}