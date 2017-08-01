import { Component, OnInit } from '@angular/core';
import {Stock, StockService} from "../stock.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock: Stock;
  constructor(private activateRouter: ActivatedRoute, private stockService: StockService,
              private router: Router) { }
  ngOnInit() {
    const stockId = this.activateRouter.snapshot.params['id'];
    this.stock = this.stockService.getStock(stockId);
  }

  cancle() {
    this.router.navigateByUrl('/stock');
  }
  save() {
    this.router.navigateByUrl('/stock');
  }
}
