import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})

export class StarsComponent implements OnInit, OnChanges {

  @Input()//输入属性,注意：导入INPUT,()
  rating: number = 0;
  @Input()
  readonly: boolean = true;
  @Output()
  ratingChage: EventEmitter<number> = new EventEmitter();
  stars: boolean[];

  constructor() { }

  ngOnInit() {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  clickStart(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.stars = [];
      for (let i = 1; i <= 5; i++) {
        this.stars.push(i > this.rating);
      }
      this.ratingChage.emit(this.rating);
    }
  }

}
