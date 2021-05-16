import { IMahsulot } from 'app/entities/mahsulot/mahsulot.model';
import { IMahsulotOlchov } from 'app/entities/mahsulot-olchov/mahsulot-olchov.model';

export interface IMahsulotVariant {
  id?: number;
  nom?: string | null;
  izoh?: string | null;
  mahsulot?: IMahsulot | null;
  mahsulotOlchov?: IMahsulotOlchov | null;
}

export class MahsulotVariant implements IMahsulotVariant {
  constructor(
    public id?: number,
    public nom?: string | null,
    public izoh?: string | null,
    public mahsulot?: IMahsulot | null,
    public mahsulotOlchov?: IMahsulotOlchov | null
  ) {}
}

export function getMahsulotVariantIdentifier(mahsulotVariant: IMahsulotVariant): number | undefined {
  return mahsulotVariant.id;
}
