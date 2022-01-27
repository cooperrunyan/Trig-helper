import { Component } from '@angular/core';
import { Triangle } from './models/Triangle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  triangle = new Triangle();

  onKey(target: 'X' | 'Y' | 'a' | 'b' | 'c', e: any) {
    this.triangle[target] = +e.target.value;
  }
}
