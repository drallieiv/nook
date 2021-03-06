import got from 'got';
import cheerio from 'cheerio';
import {getHemisphereTable} from '../util/cheerioHelpers';
import {calculateSouthernMonthsFromNorthern, monthStringToBool} from '../util/animalCrossingHelpers'
import { Hemisphere, TableCell } from '../util/types';

export default async function getFish () {
  const {body} = await got('https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)#Northern%20Hemisphere');
  const $ = cheerio.load(body);
  const northernHemisphere = mapHemisphereRowsToData(getHemisphereTable($, Hemisphere.Northern));
  const combined = northernHemisphere.map(({months, ...d}) => {
    return {
      ...d,
      northernMonths: months,
      southernMonths: calculateSouthernMonthsFromNorthern(months)
    }
  });
  return combined;
}

function mapHemisphereRowsToData (rows: TableCell[][]) {
  return rows.map((cells) => {
    return {
      name: cells[0].text,
      wikiUrl: cells[0].href,
      wikiImageUrl: cells[1].src,
      price: cells[2].number,
      location: cells[3].text,
      shadowSize: cells[4].text,
      time: cells[5].text,
      months: {
        jan: monthStringToBool(cells[6].text),
        feb: monthStringToBool(cells[7].text),
        mar: monthStringToBool(cells[8].text),
        apr: monthStringToBool(cells[9].text),
        may: monthStringToBool(cells[10].text),
        jun: monthStringToBool(cells[11].text),
        jul: monthStringToBool(cells[12].text),
        aug: monthStringToBool(cells[13].text),
        sep: monthStringToBool(cells[14].text),
        oct: monthStringToBool(cells[15].text),
        nov: monthStringToBool(cells[16].text),
        dec: monthStringToBool(cells[17].text)
      }
    }
  })
}
