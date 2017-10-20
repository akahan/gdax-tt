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

// import program  = require('commander');
// import { getSubscribedFeeds } from '../factories/bitfinexFactories';
import { getFeed } from '../exchanges/ExchangeFeed';
import { ConsoleLoggerFactory } from '../utils/Logger';
import { BitfinexFeed, BitfinexFeedConfig } from '../exchanges/bitfinex/BitfinexFeed';
import { ExchangeAuthConfig } from '../exchanges/AuthConfig';
import { BITFINEX_WS_FEED } from '../exchanges/bitfinex/BitfinexCommon';
import { BitfinexTickerMessage } from '../exchanges/bitfinex/BitfinexMessages';

// program
//     .option('--api [value]', 'API url', 'https://api.gdax.com')
//     .option('--ws [value]', 'WSI url', 'https://ws-feed.gdax.com')
//     .option('-p --product [value]', 'The GDAX product to query', 'BTC-USD')
//     .parse(process.argv);

const products: string[] = ['BTCUSD'];
const logger = ConsoleLoggerFactory();

const auth: ExchangeAuthConfig = {
    key: 'hJfmwO1YK2IhDzCzrbFpc9lgbM0BSlfyZyx9TBrYPos',
    secret: 'N8nbGAv2dRkBUHQSONm4n9yD13v1qplnTvfhXBEN27P'
};

const config: BitfinexFeedConfig = {
    wsUrl: BITFINEX_WS_FEED,
    auth: auth,
    logger: logger,
    standardMessages: true,
    // snapshotDepth: bookDepth || 250
};
const feed = getFeed<BitfinexFeed, BitfinexFeedConfig>(BitfinexFeed, config);
feed.once('websocket-open', () => {
    products.forEach((product: string) => {
        // const product = PRODUCT_MAP[gdaxProduct] || gdaxProduct;
        feed.subscribe('ticker', product);
        // feed.subscribe('trades', product);
        // feed.subscribe('book', product);
    });

    feed.on('data', (msg: BitfinexTickerMessage) => {
        // if (msg.type === 'ticker' && products.includes(msg.productId)) {
            logger.log('info', JSON.stringify(msg));
        // }
    });
});
