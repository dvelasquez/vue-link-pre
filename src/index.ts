import Vue from 'vue';
import { ResourceMap } from './vue'

const validateAs = (type: string) => ['', 'script', 'style', 'image', 'media', 'document', 'font'].indexOf(type) > -1;

const domTokenListSupports =  (): boolean => {
  try {
    return document.createElement('link').relList.supports('preload');
  } catch (e) {
    // link[rel=preload] is not supported
    console.warn('link[rel=preload] is not supported');
    return false;
  }
};

const VueLinkPre = {
  install: (Vue: Vue) => {
    let isSupported: boolean;
    const init = function () {
      isSupported = domTokenListSupports();

      if (!isSupported) console.info('Current browser does not support link[rel=preload] functionality');
    };

    Vue.addPreloadLink = function (elementHref: string, elementAs: string) {
      if (!isSupported) return;
      if (elementAs === undefined) elementAs = 'script';
      if (!validateAs(elementAs)) return;

      const lnk = document.createElement('link');

      const rel = document.createAttribute('rel');
      rel.value = 'preload';
      lnk.setAttributeNode(rel);

      const as = document.createAttribute('as');
      as.value = elementAs;
      lnk.setAttributeNode(as);

      const href = document.createAttribute('href');
      href.value = elementHref;
      lnk.setAttributeNode(href);

      document.head.appendChild(lnk);
    };

    Vue.preloadGroup = function (resourcesMap: ResourceMap) {
      for (const [key, value] of Object.entries(resourcesMap)) {
        if (validateAs(key) && value.length) {
          value.forEach((item) => Vue.addPreloadLink(item, key));
        }
      }
    };

    init();
  },
};


export default VueLinkPre;
