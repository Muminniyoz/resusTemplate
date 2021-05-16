import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MahsulotOlchovComponentsPage, MahsulotOlchovDeleteDialog, MahsulotOlchovUpdatePage } from './mahsulot-olchov.page-object';

const expect = chai.expect;

describe('MahsulotOlchov e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mahsulotOlchovComponentsPage: MahsulotOlchovComponentsPage;
  let mahsulotOlchovUpdatePage: MahsulotOlchovUpdatePage;
  let mahsulotOlchovDeleteDialog: MahsulotOlchovDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MahsulotOlchovs', async () => {
    await navBarPage.goToEntity('mahsulot-olchov');
    mahsulotOlchovComponentsPage = new MahsulotOlchovComponentsPage();
    await browser.wait(ec.visibilityOf(mahsulotOlchovComponentsPage.title), 5000);
    expect(await mahsulotOlchovComponentsPage.getTitle()).to.eq('resusTemplateApp.mahsulotOlchov.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(mahsulotOlchovComponentsPage.entities), ec.visibilityOf(mahsulotOlchovComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MahsulotOlchov page', async () => {
    await mahsulotOlchovComponentsPage.clickOnCreateButton();
    mahsulotOlchovUpdatePage = new MahsulotOlchovUpdatePage();
    expect(await mahsulotOlchovUpdatePage.getPageTitle()).to.eq('resusTemplateApp.mahsulotOlchov.home.createOrEditLabel');
    await mahsulotOlchovUpdatePage.cancel();
  });

  it('should create and save MahsulotOlchovs', async () => {
    const nbButtonsBeforeCreate = await mahsulotOlchovComponentsPage.countDeleteButtons();

    await mahsulotOlchovComponentsPage.clickOnCreateButton();

    await promise.all([mahsulotOlchovUpdatePage.setNomInput('nom'), mahsulotOlchovUpdatePage.setIzohInput('izoh')]);

    expect(await mahsulotOlchovUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await mahsulotOlchovUpdatePage.getIzohInput()).to.eq('izoh', 'Expected Izoh value to be equals to izoh');

    await mahsulotOlchovUpdatePage.save();
    expect(await mahsulotOlchovUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mahsulotOlchovComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MahsulotOlchov', async () => {
    const nbButtonsBeforeDelete = await mahsulotOlchovComponentsPage.countDeleteButtons();
    await mahsulotOlchovComponentsPage.clickOnLastDeleteButton();

    mahsulotOlchovDeleteDialog = new MahsulotOlchovDeleteDialog();
    expect(await mahsulotOlchovDeleteDialog.getDialogTitle()).to.eq('resusTemplateApp.mahsulotOlchov.delete.question');
    await mahsulotOlchovDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(mahsulotOlchovComponentsPage.title), 5000);

    expect(await mahsulotOlchovComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
