import './style.scss';

import handleHouseClick from './components/houses/handleHouseClick';
import handleQuoteClick from './components/quoteGame/handleQuoteClick';
import handleSearchClick from './components/search/handleSearchClick';
import { handleSoundClick } from './components/buttons/soundButton/soundButton';
import handleCreditsClick from './components/credits/handleCreditsClick';
import { handleTextQuoteClick } from './components/header/handleTextQuoteClick';
import { handleHeaderClick } from './components/header/handleHeaderClick';

handleHeaderClick();

handleTextQuoteClick();

handleSearchClick();

handleQuoteClick();

handleCreditsClick();

handleHouseClick();

handleSoundClick();