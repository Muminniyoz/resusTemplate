import { element, by, ElementFinder } from 'protractor';

export class MahsulotComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-mahsulot div table .btn-danger'));
  title = element.all(by.css('jhi-mahsulot div h2#page-heading span')).first();
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

export class MahsulotUpdatePage {
  pageTitle = element(by.id('jhi-mahsulot-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nomInput = element(by.id('field_nom'));
  turSelect = element(by.id('field_tur'));
  izohInput = element(by.id('field_izoh'));

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

  async setTurSelect(tur: string): Promise<void> {
    await this.turSelect.sendKeys(tur);
  }

  async getTurSelect(): Promise<string> {
    return await this.turSelect.element(by.css('option:checked')).getText();
  }

  async turSelectLastOption(): Promise<void> {
    await this.turSelect.all(by.tagName('option')).last().click();
  }

  async setIzohInput(izoh: string): Promise<void> {
    await this.izohInput.sendKeys(izoh);
  }

  async getIzohInput(): Promise<string> {
    return await this.izohInput.getAttribute('value');
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

export class MahsulotDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mahsulot-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mahsulot'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
