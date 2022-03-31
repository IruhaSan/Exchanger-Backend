import { Bid } from '../modules/bid/entities/bid.entity';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { CurrencyUnitEnum } from 'src/const/currency';

export type CurrencyCourse = {
  [k in CurrencyUnitEnum]: number;
};

export type CurrencyCourseConfig = {
  [k in CurrencyUnitEnum]: CurrencyCourse;
};

export class Currency {
  static async getDataFromApi() {
    const response = await axios({
      url: `${process.env.COINMARKET_API_URL}/cryptocurrency/listings/latest`,
      method: 'GET',
      params: {
        convert: 'USD',
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
      },
    });
    const info = JSON.stringify(response.data);
    writeFile('src/data/currencyData.json', info);
    return response.data;
  }

  static async getRubFromApi() {
    const response = await axios({
      url: `${process.env.M3O_API_URL}/currency/Convert`,
      method: 'GET',
      params: {
        from: 'RUB',
        to: 'USD',
      },
      headers: {
        // eslint-disable-next-line prettier/prettier
        'Authorization': process.env.M3O_API_KEY,
      },
    });
    const info = JSON.stringify(response.data);
    writeFile('src/data/rubData.json', info);
    return response.data;
  }

  static async updateOfAllExchangePairs() {
    const result: Partial<CurrencyCourseConfig> = {};
    const readRub = await readFileSync('src/data/rubData.json', 'utf8');
    const readData = await readFileSync('src/data/currencyData.json', 'utf8');
    const allData = JSON.parse(readData);
    const rubData = JSON.parse(readRub);
    const pairData: Partial<CurrencyCourse> = {};

    allData.data.forEach((el) => {
      for (const key in CurrencyUnitEnum) {
        if (el.symbol == key) {
          pairData[key] = el.quote.USD.price;
        }
      }
    });

    pairData['RUB'] = rubData.rate;

    for (const key in CurrencyUnitEnum) {
      if (!result[key]) result[key] = {};
      for (const innerKey in CurrencyUnitEnum) {
        result[key][innerKey] = pairData[key] / pairData[innerKey];
      }
    }

    writeFile('src/data/exchangePairs.json', JSON.stringify(result));
    return result;
  }
}
