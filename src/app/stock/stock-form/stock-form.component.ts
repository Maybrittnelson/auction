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
  stock: Stock;
  categories = ['IT', '互联网', '金融'];
  constructor(private activateRouter: ActivatedRoute, private stockService: StockService,
              private router: Router) { }
  ngOnInit() {
    const stockId = this.activateRouter.snapshot.params['id'];
    this.stockService.getStock(stockId);

    const fb = new FormBuilder();
    this.formMoudle = fb.group(
      {
          name: [this.stock.name, [Validators.required, Validators.minLength(3)]],
          price: [this.stock.price, Validators.required],
          desc: [this.stock.desc],
          categories: fb.array([
            new FormControl(this.stock.categories.indexOf(this.categories[0]) !== -1),
            new FormControl(this.stock.categories.indexOf(this.categories[1]) !== -1),
            new FormControl(this.stock.categories.indexOf(this.categories[2]) !== -1)
          ], this.categoriesSelectValidator)
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
