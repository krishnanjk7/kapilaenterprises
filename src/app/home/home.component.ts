import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('nav') slider: NgImageSliderComponent;
  imageSize = { width: '400px', height: '300px', space: 4 };
  animationSpeed = 4;
  autoSlide = 1;
  slideInfinite = true;
  imageObject = [
    {
      image: 'assets/img/turbo-vendilator.jpg',
      thumbImage: 'assets/img/turbo-vendilator.jpg',
      alt: 'Turbo Ventilator',
      title: 'Turbo Ventilator'
    },
    {
      image: 'assets/img/fan.jpg',
      thumbImage: 'assets/img/fan.jpg',
      alt: 'Fan',
      title: 'Fan'
    },
    {
      image: 'assets/img/fan-solo.jpg',
      thumbImage: 'assets/img/fan-solo.jpg',
      alt: 'Fan',
      title: 'Fan'
    },
    {
      image: 'assets/img/poly-corb-sheets.jpg',
      thumbImage: 'assets/img/poly-corb-sheets.jpg',
      alt: 'Polycarbonate sheet',
      title: 'Polycarbonate sheet'
    },
    {
      image: 'assets/img/polynum-roll-al-foil.jpg',
      thumbImage: 'assets/img/polynum-roll-al-foil.jpg',
      alt: 'polynum roll aluminium foil',
      title: 'polynum roll aluminium foil'
    },
    {
      image: 'assets/img/self-drilling-screws.jpg',
      thumbImage: 'assets/img/self-drilling-screws.jpg',
      alt: 'Self Drilling Screws',
      title: 'Self Drilling Screws'
    },
    {
      image: 'assets/img/set.jpg',
      thumbImage: 'assets/img/set.jpg',
      alt: 'Set',
      title: 'Set'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }

}
