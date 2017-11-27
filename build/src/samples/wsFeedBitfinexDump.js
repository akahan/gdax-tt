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
// import program  = require('commander');
// import { getSubscribedFeeds } from '../factories/bitfinexFactories';
const ExchangeFeed_1 = require("../exchanges/ExchangeFeed");
const Logger_1 = require("../utils/Logger");
const BitfinexFeed_1 = require("../exchanges/bitfinex/BitfinexFeed");
const BitfinexCommon_1 = require("../exchanges/bitfinex/BitfinexCommon");
// program
//     .option('--api [value]', 'API url', 'https://api.gdax.com')
//     .option('--ws [value]', 'WSI url', 'https://ws-feed.gdax.com')
//     .option('-p --product [value]', 'The GDAX product to query', 'BTC-USD')
//     .parse(process.argv);
const products = ['BTCUSD'];
const logger = Logger_1.ConsoleLoggerFactory();
const auth = {
    key: 'hJfmwO1YK2IhDzCzrbFpc9lgbM0BSlfyZyx9TBrYPos',
    secret: 'N8nbGAv2dRkBUHQSONm4n9yD13v1qplnTvfhXBEN27P'
};
const config = {
    wsUrl: BitfinexCommon_1.BITFINEX_WS_FEED,
    auth: auth,
    logger: logger,
    standardMessages: true,
};
const feed = ExchangeFeed_1.getFeed(BitfinexFeed_1.BitfinexFeed, config);
feed.once('websocket-open', () => {
    products.forEach((product) => {
        // const product = PRODUCT_MAP[gdaxProduct] || gdaxProduct;
        feed.subscribe('ticker', product);
        // feed.subscribe('trades', product);
        // feed.subscribe('book', product);
    });
    feed.on('data', (msg) => {
        // if (msg.type === 'ticker' && products.includes(msg.productId)) {
        logger.log('info', JSON.stringify(msg));
        // }
    });
});
//# sourceMappingURL=wsFeedBitfinexDump.js.map