import { IMahsulotOlchov } from 'app/entities/mahsulot-olchov/mahsulot-olchov.model';
import { IMahsulotVariant } from 'app/entities/mahsulot-variant/mahsulot-variant.model';
import { MahsulotTur } from 'app/entities/enumerations/mahsulot-tur.model';

export interface IMahsulot {
  id?: number;
  nom?: string;
  tur?: MahsulotTur | null;
  izoh?: string | null;
  mahsulotOlchov?: IMahsulotOlchov | null;
  mahsulotVariants?: IMahsulotVariant[] | null;
}

export class Mahsulot implements IMahsulot {
  constructor(
    public id?: number,
    public nom?: string,
    public tur?: MahsulotTur | null,
    public izoh?: string | null,
    public mahsulotOlchov?: IMahsulotOlchov | null,
    public mahsulotVariants?: IMahsulotVariant[] | null
  ) {}
}

export function getMahsulotIdentifier(mahsulot: IMahsulot): number | undefined {
  return mahsulot.id;
}
