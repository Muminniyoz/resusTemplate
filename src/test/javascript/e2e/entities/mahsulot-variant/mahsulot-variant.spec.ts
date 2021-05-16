import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MahsulotVariantComponentsPage, MahsulotVariantDeleteDialog, MahsulotVariantUpdatePage } from './mahsulot-variant.page-object';

const expect = chai.expect;

describe('MahsulotVariant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mahsulotVariantComponentsPage: MahsulotVariantComponentsPage;
  let mahsulotVariantUpdatePage: MahsulotVariantUpdatePage;
  let mahsulotVariantDeleteDialog: MahsulotVariantDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MahsulotVariants', async () => {
    await navBarPage.goToEntity('mahsulot-variant');
    mahsulotVariantComponentsPage = new MahsulotVariantComponentsPage();
    await browser.wait(ec.visibilityOf(mahsulotVariantComponentsPage.title), 5000);
    expect(await mahsulotVariantComponentsPage.getTitle()).to.eq('resusTemplateApp.mahsulotVariant.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(mahsulotVariantComponentsPage.entities), ec.visibilityOf(mahsulotVariantComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MahsulotVariant page', async () => {
    await mahsulotVariantComponentsPage.clickOnCreateButton();
    mahsulotVariantUpdatePage = new MahsulotVariantUpdatePage();
    expect(await mahsulotVariantUpdatePage.getPageTitle()).to.eq('resusTemplateApp.mahsulotVariant.home.createOrEditLabel');
    await mahsulotVariantUpdatePage.cancel();
  });

  it('should create and save MahsulotVariants', async () => {
    const nbButtonsBeforeCreate = await mahsulotVariantComponentsPage.countDeleteButtons();

    await mahsulotVariantComponentsPage.clickOnCreateButton();

    await promise.all([
      mahsulotVariantUpdatePage.setNomInput('nom'),
      mahsulotVariantUpdatePage.setIzohInput('izoh'),
      mahsulotVariantUpdatePage.mahsulotSelectLastOption(),
      mahsulotVariantUpdatePage.mahsulotOlchovSelectLastOption(),
    ]);

    expect(await mahsulotVariantUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await mahsulotVariantUpdatePage.getIzohInput()).to.eq('izoh', 'Expected Izoh value to be equals to izoh');

    await mahsulotVariantUpdatePage.save();
    expect(await mahsulotVariantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mahsulotVariantComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MahsulotVariant', async () => {
    const nbButtonsBeforeDelete = await mahsulotVariantComponentsPage.countDeleteButtons();
    await mahsulotVariantComponentsPage.clickOnLastDeleteButton();

    mahsulotVariantDeleteDialog = new MahsulotVariantDeleteDialog();
    expect(await mahsulotVariantDeleteDialog.getDialogTitle()).to.eq('resusTemplateApp.mahsulotVariant.delete.question');
    await mahsulotVariantDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(mahsulotVariantComponentsPage.title), 5000);

    expect(await mahsulotVariantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
