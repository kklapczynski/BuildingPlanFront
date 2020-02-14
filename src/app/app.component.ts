import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BuildingPlanFront';
  imageUrl = 'http://localhost:8001/testImage';
  mapsListUrl = 'http://localhost:8001/testMapsList';
  imageToShow: any;
  imageToShow2: SafeHtml;
  isImageLoaded: boolean;
  mapNames: String[];

  constructor(private httpService: HttpService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.isImageLoaded = false;
  }

  getImage(mapName?: string) {
    // TODO: add parameter with file name and add query param in http service
    const url = mapName ? this.imageUrl + "?" + mapName : this.imageUrl;
    this.httpService.getImage(url).subscribe(
      imageBlob => {
        // console.log(imageBlob);
        this.createImageFromBlob(imageBlob);
        this.createStringFromBlob(imageBlob);
        
      },
      error => {
        console.log(error);
      }
    )
  }

  getMapsList() {
    this.httpService.getMapsList(this.mapsListUrl).subscribe(
      mapsNamesJson => {
        this.mapNames = mapsNamesJson;
        console.log(this.mapNames);
      }
    )
  }

  createStringFromBlob(blob: Blob) {
    let reader = new FileReader();
    // set listener: when loaded save result in property
    reader.onload = () => { 
      this.imageToShow2 = this.domSanitizer.bypassSecurityTrustHtml(<string>reader.result) ;
      this.isImageLoaded = true;
    }
    // load blob as data url , which can be used as src form img in html
    // reader.readAsDataURL(image);
    reader.readAsBinaryString(blob);
  }

  createImageFromBlob(image: Blob) {
    // js file reader :  https://developer.mozilla.org/en-US/docs/Web/API/FileReader

    let reader = new FileReader();
    // set listener: when loaded save result in property
    reader.onload = () => { 
      this.imageToShow = reader.result;
      // console.log(this.imageToShow);
      this.isImageLoaded = true;
    }
    // load blob as data url , which can be used as src form img in html
    reader.readAsDataURL(image);
  }
  
  // adding svg element to html
  // https://stackoverflow.com/questions/39582832/how-do-i-use-an-svg-tag-when-all-i-have-is-a-base64-string-for-the-image

  // show svg path title or id on mouse hover
  // showPathTitleOrId(event) {
  //   if(event.target.tagName === 'path') {
  //     const currentPath = event.target;
  //   }

  // }

  // setSvgPathOpacity(svgPath, opacityPercent: number) {
  //   svgPath.setAttributeNS(null, 'opacity', `${opacityPercent}%`);
  // }

  // onMouseOver(event) {
  //   if(event.target.tagName === 'path') {
  //     const currentPath = event.target;
  //     this.setSvgPathOpacity(currentPath, 50);
  //   }
    
  // }

  // onMouseOut(event) {
  //   if(event.target.tagName === 'path') {
  //     const currentPath = event.target;
  //     this.setSvgPathOpacity(currentPath, 100);
  //   }
  // }
}
