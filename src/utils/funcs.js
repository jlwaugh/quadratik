import {
  detect,
} from 'detect-browser';

import * as routes from './routes';
import {
  store,
} from '../state/store';

export const checkUsingInjectedProvider = (provider) => {
    const {
      isFortmatic,
      isPortis,
      isWalletConnect,
    } = provider;
  
    if (isFortmatic || isPortis || isWalletConnect) return false;
    return true;
    // isCipher,
    // isMetaMask,
    // isDapper,
  };
  
  export const checkIsMobile = () => {
    let isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobile = true;
    } else {
      isMobile = false;
    }
    return isMobile;
  };
  
  export const checkIsMobileWithoutWeb3 = () => {
    let isMobileWithWeb3 = false;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasWeb3 = typeof window.web3 !== 'undefined' || typeof window.ethereum !== 'undefined';
    if (isMobile && !hasWeb3) isMobileWithWeb3 = true;
    return isMobileWithWeb3;
  };
  
  export const isBrowserCompatible = () => {
    const browser = detect();
    const {
      version,
      name
    } = browser;
  
    if (name !== 'safari') return true;
  
    const majorVersion = parseInt(version.split('.')[0]);
    const minorVersion = parseInt(version.split('.')[1]);
    if (majorVersion > 11 || (majorVersion === 11 && minorVersion >= 1)) return true;
    if (majorVersion < 11 || (majorVersion === 11 && minorVersion < 1)) {
      store.dispatch({
        type: 'UI_UNSUPPORTED_BROWSER_MODAL',
        showUnsupportedBrowser: true,
      });
      return false;
    }
  };

  export const checkIsEthAddress = (string) => {
    const isEthereumAddress = /^(0x)?[0-9a-f]{40}$/i.test(string);
    return isEthereumAddress;
  };

  export const shortenEthAddr = (str) => {
    const shortenStr = str && `${str.substring(0, 5)}...${str.substring(str.length - 5, str.length)}`;
    return shortenStr;
  };
  
  export const checkRequestRoute = (splitRoute) => {
    const route2 = splitRoute[2] && splitRoute[2].toLowerCase();
    const route3 = splitRoute[3] && splitRoute[3].toLowerCase();
    const isRequest =
      route2 === 'twitterrequest' ||
      route2 === 'previewrequest' ||
      route3 === 'twitterrequest' ||
      route3 === 'previewrequest';
    return isRequest;
  };

  export const matchProtectedRoutes = (secondRoute) => {
    if (
      secondRoute === routes.PROFILE ||
      secondRoute === routes.DETAILS
    ) {
      return true;
    }
    return false;
  };

  export const normalizeURL = (pathname) => {
    const lowercasePathname = pathname.toLowerCase();
    const fuzzyLowercasePathname = lowercasePathname.charAt(lowercasePathname.length - 1) === '/' ?
      lowercasePathname.slice(0, -1) :
      lowercasePathname;
  
    return fuzzyLowercasePathname;
  };