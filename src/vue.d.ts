import Vue from 'vue';

type ResourceType = 'script' | 'style' | 'image' | 'media' | 'document' | 'font'

type ResourceMap = {
  [k in ResourceType]: string[];
};

declare module 'vue/types/vue' {
  interface Vue {
    addPreloadLink: (elementHref: string, elementAs: string) => void
    preloadGroup: (resourcesMap: ResourceMap) => void
  }
}
