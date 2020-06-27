import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [
    {
      name: 'Turbo Ventilator',
      description: `This Aluminum Roof Ventilator is ensured for dependable execution Decode from g ertatumim as has 13 the
      heaviness of steel and in this way the inc reded to move the ventilator from array Dict Is a great deal
      less.`,
      image: 'turbo-ventilator.jpg'
    },
    {
      name: 'Aluminium Foil (Polynum roll)',
      description: `The energy crisis globally has brought about an increase in combustible costs, where only an appropriate insulation system can bring about significant economic savings. The need to insulate buildings at all exposed or susceptible surfaces from inside or outside is an indisputable reality that finally goes on to increasing the comfort of occupants both temporary and permanent, humans and livestock and finally products and good that are heat and moisture sensitive`,
      image: 'aluminium-foil.jpg'
    },
    {
      name: 'Polycarbonate Sheet',
      description: '',
      image: 'polycarbonate-sheet.jpeg'
    },
    {
      name: 'Self Drilling Screws',
      description: '',
      image: 'self-drilling-screws.jpg'
    },
    {
      name: 'Butyle Tape',
      description: '',
      image: 'butyle-tape.jpg'
    },
    {
      name: 'Sealant',
      description: '',
      image: 'Sealant.png'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
