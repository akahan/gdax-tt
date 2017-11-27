"use strict";
/***************************************************************************************************************************
 * @license                                                                                                                *
 * Copyright 2017 Coinbase, Inc.                                                                                           *
 *                                                                                                                         *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance          *
 * with the License. You may obtain a copy of the License at                                                               *
 *                                                                                                                         *
 * http://www.apache.org/licenses/LICENSE-2.0                                                                              *
 *                                                                                                                         *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on     *
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the                      *
 * License for the specific language governing permissions and limitations under the License.                              *
 ***************************************************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../utils/Logger");
// import { TickerMessage } from '../core/Messages';
const poloniexFactories_1 = require("../factories/poloniexFactories");
// import { ExchangeAuthConfig } from '../exchanges/AuthConfig';
const PoloniexCommon_1 = require("../exchanges/poloniex/PoloniexCommon");
const logger = Logger_1.ConsoleLoggerFactory();
const products = ['BTC-USDT', 'DASH-USDT', 'LTC-USDT', 'NXT-USDT', 'STR-USDT', 'XMR-USDT', 'XRP-USDT', 'ETH-USDT', 'ETC-USDT', 'REP-USDT', 'ZEC-USDT', 'BCH-USDT'];
// const auth: ExchangeAuthConfig = {
//     key: 'H60U6B3Q-WNQCQL96-QL0XJNIF-1BZ4B2SJ',
//     secret: '40ed05ab16b3dcb8f446bc6151a626b0a89e9bf09e869838429bc99633e4220e6059f0d6604fa045e268c55daf7e1d91f8d85b0ae459b8e737a307461a0b7fb2'
// };
const config = {
    logger: logger,
    auth: null,
    tickerChannel: true,
    wsUrl: PoloniexCommon_1.POLONIEX_WS_FEED,
};
poloniexFactories_1.getSubscribedFeeds(config, products).then((feed) => {
    feed.on('data', (msg) => {
        if (msg.type !== 'snapshot' && products.includes(msg.productId)) {
            logger.log('info', JSON.stringify(msg));
        }
        // count++;
        // if (!(msg as any).productId) {
        //     tallies.other += 1;
        // } else {
        //     // Polo ticker channel pushes all product tickers through, so check for valid product
        //     if (!products.includes(msg.productId)) {
        //         return;
        //     }
        //     const tally = tallies[msg.productId];
        //     if (!tally[msg.type]) {
        //         tally[msg.type] = 0;
        //     }
        //     tally[msg.type] += 1;
        // }
        // if (count % 100 === 0) {
        //     printTallies();
        // }
    });
}).catch((err) => {
    logger.log('error', err.message);
    process.exit(1);
});
// function printTallies() {
//     console.log(`${count} messages received`);
//     for (const p in tallies) {
//         const types = Object.keys(tallies[p]).sort();
//         const tally: string = types.map((t) => `${t}: ${tallies[p][t]}`).join('\t');
//         console.log(`${p}: ${tally}`);
//     }
// }
//# sourceMappingURL=poloWSdemo2.js.map