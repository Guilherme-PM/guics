export class PmTableColumnsConfig {
  // Propriedade para definir a identificação do item
  public id: string;

  // Propriedade para definir o nome que será exibido do item
  public label: string;

  // Propriedade para definir o tipo de texto exibido
  public type?: 'text' | 'numeric' | 'boolean' | 'date' | 'datetime' = 'text';

  // Propriedade para dicionar um sufixo ao texto exibido
  public suffix?: string = '';

  public badgeColorHEX?: string;

  public tag?: { text?: (item: any) => string, style?: string, styleFunc?: (item: any) => string , class?: string, iconColor?: string, icon?: (item: any) => string };

  public dualText?: { title: string, subTitle: string, colorHEX?: string, class?: { title?: string, subtitle?: string } };

  // Propriedade para transformar o resultado exibido em outro texto
  public replaceText?: (item: any) => string;

  public copy?: boolean;

  public icon?: string;

  public code?: boolean;

  constructor(config?: Partial<PmTableColumnsConfig>) {
    this.id = config?.id ?? '';
    this.label = config?.label ?? '';

    if(config?.tag){
      this.tag = {
        iconColor: config.tag.iconColor ?? 'text-zinc-800'
      };
    }

    Object.assign(this, config);
  }}
