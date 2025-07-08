import { PmTableColumnsConfig } from "./pm-table-columns";
import { PmColumnsButtonConfig } from "./pm-table-columns-buttons";

/**
 * Classe de configuração completa para a PmTable
 * Implementa todas as interfaces de configuração
 */
export class PmTableConfig {
  name: string = 'default-table';
  columns: PmTableColumnsConfig[] = [];
  onExcelExportClick?: () => boolean | void;
  onExcelImportClick?: () => boolean | void;
  excelExportButton?: boolean;
  excelImportButton?: boolean;
  loading?: boolean = false;
  data?: any[] = [];
  buttons: PmColumnsButtonConfig[] = [];

  [key: string]: any;

  /**
   * Construtor da PmTableConfig
   * @param config Objeto de configuração contendo todas as propriedades necessárias
   * @throws Exibe um erro se o nome não for fornecido ou se as colunas não forem um array
   */
  constructor(config: PmTableConfig) {
    this.validateRequiredConfig(config);
    Object.assign(this, this.getDefaultValues(), config);
    this.initExcelCallbacks(config);

    this.columns = (this.columns ?? []).map(col =>
      col instanceof PmTableColumnsConfig ? col : new PmTableColumnsConfig(col)
    );
  }

  /**
   * Valida as configurações obrigatórias
   * @param config Objeto de configuração
   * @private
   */
  private validateRequiredConfig(config: PmTableConfig): void {
    if (!config?.name)
      throw new Error("O parâmetro 'name' é obrigatório na configuração da tabela");

    if (config.columns && !Array.isArray(config.columns))
      throw new Error("'columns' é obrigatório e deve ser um array");
  }

  /**
   * Inicializa os callbacks para exportação/importação de Excel
   * @param config Objeto de configuração
   * @private
   */
  private initExcelCallbacks(config: PmTableConfig): void {
    this.onExcelExportClick = config.onExcelExportClick ?? (() => true);
    this.onExcelImportClick = config.onExcelImportClick ?? (() => true);
  }

  /**
   * Retorna os valores padrão para as propriedades da tabela
   * @returns Objeto com valores padrão
   * @private
   */
  private getDefaultValues(): Partial<PmTableConfig> {
    return {

    };
  }

  /**
   * Verifica se deve mostrar o botão de exportação para Excel
   * @returns boolean
   * @public
   */
  public shouldShowExcelButton(): boolean | undefined {
    return this.excelExportButton &&
      (typeof this.onExcelExportClick !== 'function' || this.onExcelExportClick() !== false);
  }

  /**
   * Valida se a configuração básica está correta
   * @returns boolean
   * @public
   */
  public validate(): boolean {
    return !!this.name &&
           Array.isArray(this.columns) &&
           Array.isArray(this.data);
  }

  public setLoading(loading: boolean): this {
    if(loading === true)
      this.data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    this.loading = loading;
    return this;
  }

  /**
   * Método factory para criação de uma instância de PmTableConfig
   * @param config Configuração parcial da tabela
   * @returns Instância de PmTableConfig
   * @public
   * @static
   */

  public static create(config: Partial<PmTableConfig>): PmTableConfig {
    return new PmTableConfig(config as PmTableConfig);
  }
}
