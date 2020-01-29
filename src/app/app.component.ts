import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { DOMPurify } from 'dompurify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BuildingPlanFront';
  imageUrl = 'http://localhost:8001/testImage';
  imageToShow: any;
  isImageLoaded: boolean;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.isImageLoaded = false;
  }

  getImage() {
    this.httpService.getImage(this.imageUrl).subscribe(
      imageBlob => {
        console.log(imageBlob);
        this.createImageFromBlob(imageBlob);
      },
      error => {
        console.log(error);
      }
    )
  }

  createImageFromBlob(image: Blob) {
    // js file reader :  https://developer.mozilla.org/en-US/docs/Web/API/FileReader

    let reader = new FileReader();
    // set listener: when loaded save result in property
    reader.onload = () => { 
      this.imageToShow = reader.result;
      this.isImageLoaded = true;
    }
    // load blob as data url , which can be used as src form img in html
    // reader.readAsDataURL(image);
    DOMPurify.sanitize(reader.readAsDataURL(image));
  }
  
}
