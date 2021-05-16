import { IMahsulot } from 'app/entities/mahsulot/mahsulot.model';
import { IMahsulotVariant } from 'app/entities/mahsulot-variant/mahsulot-variant.model';

export interface IMahsulotOlchov {
  id?: number;
  nom?: string;
  izoh?: string | null;
  mahsulots?: IMahsulot[] | null;
  mahsulotVariants?: IMahsulotVariant[] | null;
}

export class MahsulotOlchov implements IMahsulotOlchov {
  constructor(
    public id?: number,
    public nom?: string,
    public izoh?: string | null,
    public mahsulots?: IMahsulot[] | null,
    public mahsulotVariants?: IMahsulotVariant[] | null
  ) {}
}

export function getMahsulotOlchovIdentifier(mahsulotOlchov: IMahsulotOlchov): number | undefined {
  return mahsulotOlchov.id;
}
