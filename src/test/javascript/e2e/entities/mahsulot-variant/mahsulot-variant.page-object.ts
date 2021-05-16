import { element, by, ElementFinder } from 'protractor';

export class MahsulotVariantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-mahsulot-variant div table .btn-danger'));
  title = element.all(by.css('jhi-mahsulot-variant div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MahsulotVariantUpdatePage {
  pageTitle = element(by.id('jhi-mahsulot-variant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomInput = element(by.id('field_nom'));
  izohInput = element(by.id('field_izoh'));

  mahsulotSelect = element(by.id('field_mahsulot'));
  mahsulotOlchovSelect = element(by.id('field_mahsulotOlchov'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setIzohInput(izoh: string): Promise<void> {
    await this.izohInput.sendKeys(izoh);
  }

  async getIzohInput(): Promise<string> {
    return await this.izohInput.getAttribute('value');
  }

  async mahsulotSelectLastOption(): Promise<void> {
    await this.mahsulotSelect.all(by.tagName('option')).last().click();
  }

  async mahsulotSelectOption(option: string): Promise<void> {
    await this.mahsulotSelect.sendKeys(option);
  }

  getMahsulotSelect(): ElementFinder {
    return this.mahsulotSelect;
  }

  async getMahsulotSelectedOption(): Promise<string> {
    return await this.mahsulotSelect.element(by.css('option:checked')).getText();
  }

  async mahsulotOlchovSelectLastOption(): Promise<void> {
    await this.mahsulotOlchovSelect.all(by.tagName('option')).last().click();
  }

  async mahsulotOlchovSelectOption(option: string): Promise<void> {
    await this.mahsulotOlchovSelect.sendKeys(option);
  }

  getMahsulotOlchovSelect(): ElementFinder {
    return this.mahsulotOlchovSelect;
  }

  async getMahsulotOlchovSelectedOption(): Promise<string> {
    return await this.mahsulotOlchovSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MahsulotVariantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mahsulotVariant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mahsulotVariant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
