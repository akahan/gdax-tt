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
import { getSubscribedFeeds } from '../factories/bittrexFactories';
import { ConsoleLoggerFactory } from '../utils/Logger';
import { BittrexFeed } from '../exchanges/bittrex/BittrexFeed';
import { ExchangeFeedConfig } from '../exchanges/ExchangeFeed';
import { ExchangeAuthConfig } from '../exchanges/AuthConfig';

// program
//     .option('--api [value]', 'API url', 'https://api.gdax.com')
//     .option('--ws [value]', 'WSI url', 'https://ws-feed.gdax.com')
//     .option('-p --product [value]', 'The GDAX product to query', 'BTC-USD')
//     .parse(process.argv);

const product: string = 'USDT-BTC';
const logger = ConsoleLoggerFactory();

const auth: ExchangeAuthConfig = {
    key: '0656de17e22d4ef2af66969c90f4c1a0',
    secret: '135d3075e6bd430285948033a4e7593c'
};

const config: ExchangeFeedConfig = {
    logger: logger,
    auth: auth,
    wsUrl: null
};

getSubscribedFeeds(config, [product]).then((feed: BittrexFeed) => {
    feed.on('data', (msg: any) => {
        if (msg.type !== 'snapshot') {
            logger.log('info', JSON.stringify(msg));
        }
    });
}).catch((err) => {
    logger.log('error', err.message);
    process.exit(1);
});
