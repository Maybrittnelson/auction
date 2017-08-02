import { Component, OnInit } from '@angular/core';
import {Stock, StockService} from '../stock.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formMoudle: FormGroup;
  stock: Stock = new Stock(0, '', 0, 0, '', []);
  categories = ['IT', '互联网', '金融'];
  constructor(private activateRouter: ActivatedRoute, private stockService: StockService,
              private router: Router) { }
  ngOnInit() {

    const stockId = this.activateRouter.snapshot.params['id'];

    const fb = new FormBuilder();
    this.formMoudle = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', Validators.required],
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], this.categoriesSelectValidator)
      }
    );

    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        this.formMoudle.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categories:[
            data.categories.indexOf(this.categories[0]) != -1,
            data.categories.indexOf(this.categories[1]) != -1,
            data.categories.indexOf(this.categories[2]) != -1,
          ]
        })
      }

    );


  }

  categoriesSelectValidator (control: FormArray) {
    let valid = false;
    control.controls.forEach(control => {
      if (control.value) {
        valid = true;
      }
    })
    if (valid) {
      return null;
    } else {
      return {categoriesLength: true};
    }
  }
  cancle() {
    this.router.navigateByUrl('/stock');
  }
  save() {
    const chinsesCategories = [];
    let index = 0;
    for (let i = 0; i < 3; i++) {
      if (this.formMoudle.value.categories[i]) {
        chinsesCategories[index ++ ] = this.categories[i];
      }
    }
    this.formMoudle.value.categories = chinsesCategories;
    this.formMoudle.value.rating = this.stock.rating;
    console.log(this.formMoudle.value) ;
    //this.router.navigateByUrl('/stock');
  }
}
