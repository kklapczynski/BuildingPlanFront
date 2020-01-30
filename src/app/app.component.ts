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
  imageToShow: any;
  imageToShow2: SafeHtml;
  isImageLoaded: boolean;

  constructor(private httpService: HttpService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.isImageLoaded = false;
  }

  getImage() {
    this.httpService.getImage(this.imageUrl).subscribe(
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

  createStringFromBlob(blob: Blob) {
    let reader = new FileReader();
    // set listener: when loaded save result in property
    reader.onload = () => { 
      this.imageToShow2 = this.domSanitizer.bypassSecurityTrustHtml(<string>reader.result) ;
      console.log("imageToShow2:");
      console.log(this.imageToShow2);
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

}
