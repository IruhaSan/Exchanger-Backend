import { join } from 'path';
import { PATHS_CONFIG } from './paths';

export enum CurrencyUnitEnum {
  BTC = 'BTC',
  ETH = 'ETH',
  RUB = 'RUB',
  XRP = 'XRP',
  BNB = 'BNB',
  LTC = 'LTC',
  MATIC = 'MATIC',
  XLM = 'XLM',
  TRX = 'TRX',
  ATOM = 'ATOM',
  DASH = 'DASH',
  DOGE = 'DOGE',
  WAVES = 'WAVES',
  SOL = 'SOL',
  USDT = 'USDT',
}

export type CurrencyType = {
  title: string;
  unit: CurrencyUnitEnum;
  isCoin: boolean;
  wallet: string;
  reserve: number;
  img: string;
};

const getImgPath: { (filename: string): string } = (filename) =>
  join(PATHS_CONFIG.currency, 'units', filename);

export const CURRENCY_LIST: CurrencyType[] = [
  {
    title: 'Bitcoin',
    unit: CurrencyUnitEnum.BTC,
    isCoin: true,
    wallet: 'bc1qr7fw4x2dt4lp3gjh427njfq2l8vcw5420sc08h',
    reserve: 6,
    img: getImgPath('BTC.svg'),
  },
  {
    title: 'Ethereum',
    unit: CurrencyUnitEnum.ETH,
    isCoin: true,
    wallet: '0x5B4a943Ad1A9C59cB00DB5Eac15f2f1b684EfA29',
    reserve: 118,
    img: getImgPath('ETH.svg'),
  },
  {
    title: 'Ripple',
    unit: CurrencyUnitEnum.XRP,
    isCoin: true,
    wallet: 'rNNxf7j7HVhhdnkMDERsq9TNhhgSSpfakS',
    reserve: 120000,
    img: getImgPath('XRP.svg'),
  },
  {
    title: 'Binance Chain',
    unit: CurrencyUnitEnum.BNB,
    isCoin: true,
    wallet: 'bnb17wt70r4clut6xle4my7l8q90ae2yd7efckkw3p',
    reserve: 2521,
    img: getImgPath('BNB.svg'),
  },
  {
    title: 'Litecoin',
    unit: CurrencyUnitEnum.LTC,
    isCoin: true,
    wallet: 'ltc1ql4me2skxlgn82tmy0v2gn6gt80dphw8hk57q4a',
    reserve: 628,
    img: getImgPath('LTC.svg'),
  },
  {
    title: 'Polygon',
    unit: CurrencyUnitEnum.MATIC,
    isCoin: true,
    wallet: '0x5B4a943Ad1A9C59cB00DB5Eac15f2f1b684EfA29',
    reserve: 10000000,
    img: getImgPath('MATIC.jpg'),
  },
  {
    title: 'Stellar Lumens',
    unit: CurrencyUnitEnum.XLM,
    isCoin: true,
    wallet: 'GD4AUYERLCQMJRWDO3S2BZAKLA2NGAVKDTRKQQPZXM77SMDV4HBI3OIZ',
    reserve: 80000,
    img: getImgPath('XLM.svg'),
  },
  {
    title: 'Tron',
    unit: CurrencyUnitEnum.TRX,
    isCoin: true,
    wallet: 'TNjYBmHTUXPVapnATtiwFDiuHgZczyH5Nz',
    reserve: 7300000,
    img: getImgPath('TRX.svg'),
  },
  {
    title: 'Cosmos',
    unit: CurrencyUnitEnum.ATOM,
    isCoin: true,
    wallet: 'TNjYBmHTUXPVapnATtiwFDiuHgZczyH5Nz',
    reserve: 6452,
    img: getImgPath('ATOM.png'),
  },
  {
    title: 'Dash',
    unit: CurrencyUnitEnum.DASH,
    isCoin: true,
    wallet: 'Xm4Z6CyDW9tK6g11XpLCNMfVdQWdgVLBsf',
    reserve: 1221,
    img: getImgPath('DASH.svg'),
  },
  {
    title: 'Dogecoin',
    unit: CurrencyUnitEnum.DOGE,
    isCoin: true,
    wallet: 'DKvKLoD8kwSBX5JPmQ7sjBgqUScppBKKNP',
    reserve: 8000000,
    img: getImgPath('DOGE.svg'),
  },
  {
    title: 'Waves',
    unit: CurrencyUnitEnum.WAVES,
    isCoin: true,
    wallet: '3PNYAhpEUqj58L1P7Zj5fkU9UAd3yPjNyYx',
    reserve: 7400,
    img: getImgPath('WAVES.jpg'),
  },
  {
    title: 'Solana',
    unit: CurrencyUnitEnum.SOL,
    isCoin: true,
    wallet: '7Hn42XExQ9WJtnQfkttJFx1SjhuqFrNccMpBuwkoHF77',
    reserve: 4500,
    img: getImgPath('SOL.jpg'),
  },
  {
    title: 'Tether',
    unit: CurrencyUnitEnum.USDT,
    isCoin: true,
    wallet: 'TNjYBmHTUXPVapnATtiwFDiuHgZczyH5Nz',
    reserve: 16200,
    img: getImgPath('USDT.svg'),
  },
  {
    title: 'Sberbank',
    unit: CurrencyUnitEnum.RUB,
    isCoin: false,
    wallet: 'TNjYBmHTUXPVapnATtiwFDiuHgZczyH5Nz',
    reserve: 10000000,
    img: getImgPath('RUB.png'),
  },
];
