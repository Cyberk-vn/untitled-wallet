import './src/background/background';

import {Titan} from '@titan-wallet/provider';
import {RNMessageRequesterInternal} from './src/router';

// @ts-ignore
window.titan = new Titan('', 'core', new RNMessageRequesterInternal());
