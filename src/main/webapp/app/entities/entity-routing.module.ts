import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mahsulot-olchov',
        data: { pageTitle: 'resusTemplateApp.mahsulotOlchov.home.title' },
        loadChildren: () => import('./mahsulot-olchov/mahsulot-olchov.module').then(m => m.MahsulotOlchovModule),
      },
      {
        path: 'mahsulot',
        data: { pageTitle: 'resusTemplateApp.mahsulot.home.title' },
        loadChildren: () => import('./mahsulot/mahsulot.module').then(m => m.MahsulotModule),
      },
      {
        path: 'mahsulot-variant',
        data: { pageTitle: 'resusTemplateApp.mahsulotVariant.home.title' },
        loadChildren: () => import('./mahsulot-variant/mahsulot-variant.module').then(m => m.MahsulotVariantModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
