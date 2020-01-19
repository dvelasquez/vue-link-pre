import Vue from 'vue';

export type ResourceType = 'script' | 'style' | 'image' | 'media' | 'document' | 'font'
export type ElementRelType = 'prefetch' | 'preload'
export type ResourceMap = {
  [k in ResourceType]?: string[];
};

declare module 'vue/types/vue' {
  interface Vue {
    addPreLink: (elementHref: string, elementAs: string, elementRel: ElementRelType) => void
    preGroup: (resourcesMap: ResourceMap, elementRel: ElementRelType) => void
  }
  interface VueConstructor {
    addPreLink: (elementHref: string, elementAs: string, elementRel: ElementRelType) => void
    preGroup: (resourcesMap: ResourceMap, elementRel: ElementRelType) => void
  }
}


const validateAs = (type: string) => ['', 'script', 'style', 'image', 'media', 'document', 'font'].indexOf(type) > -1;
const validateRel = (type: string) => ['preload', 'prefetch'].indexOf(type) > -1;

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

    Vue.addPreLink = function (elementHref: string, elementAs: string, elementRel: string) {
      if (!isSupported) return;
      if (elementAs === undefined) elementAs = 'script';
      if (!validateAs(elementAs)) return;
      if(elementRel === undefined) elementRel = 'preload'
      if (!validateRel(elementRel)) return;

      const lnk = document.createElement('link');

      const rel = document.createAttribute('rel');
      rel.value = elementRel;
      lnk.setAttributeNode(rel);

      const as = document.createAttribute('as');
      as.value = elementAs;
      lnk.setAttributeNode(as);

      const href = document.createAttribute('href');
      href.value = elementHref;
      lnk.setAttributeNode(href);

      document.head.appendChild(lnk);
    };

    Vue.preGroup = function (resourcesMap: ResourceMap, elementRel: ElementRelType) {
      for (const [key, value] of Object.entries(resourcesMap)) {
        if (validateAs(key) && value.length) {
          value.forEach((item) => Vue.addPreLink(item, key, elementRel));
        }
      }
    };

    init();
  },
};


export default VueLinkPre;
