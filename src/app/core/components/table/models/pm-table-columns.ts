export class PmTableColumnsConfig {
  // Propriedade para definir a identificação do item
  public id: string;

  // Propriedade para definir o nome que será exibido do item
  public label: string;

  public type?: 'text' | 'numeric' | 'boolean' | 'date' | 'datetime' = 'text';

  public suffix?: string = '';

  public badgeColorHEX?: string;

  public tag?: { color?: string, style?: string, styleFunc?: (item: any) => string , backgroundColor?: string, borderColor?: string, iconColor?: string, icon?: (item: any) => string | string };

  public dualTextColor?: { title: string, subTitle: string, colorHEX: string };

  constructor(config?: Partial<PmTableColumnsConfig>) {
    this.id = config?.id ?? '';
    this.label = config?.label ?? '';

    if(config?.tag){
      this.tag = {
        color: config.tag.color ?? 'white',
        backgroundColor: config.tag.backgroundColor ?? 'transparent',
        borderColor: config.tag.borderColor ?? 'text-zinc-800',
        iconColor: config.tag.iconColor ?? 'text-zinc-800'
      };
    }

    Object.assign(this, config);
  }}
