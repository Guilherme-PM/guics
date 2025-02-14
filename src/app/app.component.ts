import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PmConfigService } from 'pm-angular-components';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private primeng: PrimeNG, private pmConfig: PmConfigService) {}

  ngOnInit() {
    this.primeng.ripple.set(true);

    this.pmConfig.setConfig({
      booleanIcons: {
        falseIcon: 'pi pi-times-circle',
        trueIcon: 'pi pi-check-circle'
      }
    });
  }
}
