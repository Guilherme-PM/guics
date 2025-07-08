export class PmColumnsButtonConfig {
  public icon: string = '';
  public title: string = '';
  public routerLink?: string;
  public routerLinkParams?: () => void;
  public action?: () => void;
  public onView?: (item: any) => void;

  constructor(config?: Partial<PmColumnsButtonConfig>) {

    Object.assign(this, config);
  }
}