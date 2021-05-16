import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MahsulotComponentsPage, MahsulotDeleteDialog, MahsulotUpdatePage } from './mahsulot.page-object';

const expect = chai.expect;

describe('Mahsulot e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mahsulotComponentsPage: MahsulotComponentsPage;
  let mahsulotUpdatePage: MahsulotUpdatePage;
  let mahsulotDeleteDialog: MahsulotDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Mahsulots', async () => {
    await navBarPage.goToEntity('mahsulot');
    mahsulotComponentsPage = new MahsulotComponentsPage();
    await browser.wait(ec.visibilityOf(mahsulotComponentsPage.title), 5000);
    expect(await mahsulotComponentsPage.getTitle()).to.eq('resusTemplateApp.mahsulot.home.title');
    await browser.wait(ec.or(ec.visibilityOf(mahsulotComponentsPage.entities), ec.visibilityOf(mahsulotComponentsPage.noResult)), 1000);
  });

  it('should load create Mahsulot page', async () => {
    await mahsulotComponentsPage.clickOnCreateButton();
    mahsulotUpdatePage = new MahsulotUpdatePage();
    expect(await mahsulotUpdatePage.getPageTitle()).to.eq('resusTemplateApp.mahsulot.home.createOrEditLabel');
    await mahsulotUpdatePage.cancel();
  });

  it('should create and save Mahsulots', async () => {
    const nbButtonsBeforeCreate = await mahsulotComponentsPage.countDeleteButtons();

    await mahsulotComponentsPage.clickOnCreateButton();

    await promise.all([
      mahsulotUpdatePage.setNomInput('nom'),
      mahsulotUpdatePage.turSelectLastOption(),
      mahsulotUpdatePage.setIzohInput('izoh'),
      mahsulotUpdatePage.mahsulotOlchovSelectLastOption(),
    ]);

    expect(await mahsulotUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await mahsulotUpdatePage.getIzohInput()).to.eq('izoh', 'Expected Izoh value to be equals to izoh');

    await mahsulotUpdatePage.save();
    expect(await mahsulotUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mahsulotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Mahsulot', async () => {
    const nbButtonsBeforeDelete = await mahsulotComponentsPage.countDeleteButtons();
    await mahsulotComponentsPage.clickOnLastDeleteButton();

    mahsulotDeleteDialog = new MahsulotDeleteDialog();
    expect(await mahsulotDeleteDialog.getDialogTitle()).to.eq('resusTemplateApp.mahsulot.delete.question');
    await mahsulotDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(mahsulotComponentsPage.title), 5000);

    expect(await mahsulotComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
