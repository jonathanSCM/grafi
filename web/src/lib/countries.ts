export interface Country {
  code: string;
  name: string;
  dial: string;
}

export const COUNTRIES: Country[] = [
  { code: 'BO', name: 'Bolivia', dial: '591' },
  { code: 'AR', name: 'Argentina', dial: '54' },
  { code: 'BR', name: 'Brasil', dial: '55' },
  { code: 'CL', name: 'Chile', dial: '56' },
  { code: 'CO', name: 'Colombia', dial: '57' },
  { code: 'EC', name: 'Ecuador', dial: '593' },
  { code: 'ES', name: 'España', dial: '34' },
  { code: 'MX', name: 'México', dial: '52' },
  { code: 'PE', name: 'Perú', dial: '51' },
  { code: 'PY', name: 'Paraguay', dial: '595' },
  { code: 'US', name: 'Estados Unidos', dial: '1' },
  { code: 'UY', name: 'Uruguay', dial: '598' },
  { code: 'VE', name: 'Venezuela', dial: '58' },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];
