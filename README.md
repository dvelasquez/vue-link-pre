This is a forked project from https://github.com/shershen08/vue-preload

Tool for [Vue.js SSR apps](https://vuejs.org/v2/guide/ssr.html) that include other resources that may be handy to preload to improve performance.

## Install

```sh
npm install vue-link-pre --save
yarn add vue-link-pre
```

## Usage

```js
import VueLinkPre from 'vue-link-pre'

Vue.use(VueLinkPre)

// dynamically add single item
// by default the type 'script' is assigned
// and the rel="preload"
Vue.addPreLink('https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/ext-all.js')

// add multiple items at once
Vue.preGroup({
  script: [
    'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/ext-all.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
  ],
  style: ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap-reboot.min.css'],
  image: ['https://www.google.nl/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'],
}, 'prefetch')
```

## API

**Vue.addPreLink(link, elementRef)**

Preload single resource. You can provide type ('image'|'script'|'font'|'etc') and a elementRef ('preload'|'prefetch')

**Vue.preloadGroup(resourceMap)**

Preload group of resources of multiple types. The map keys are limited to valid preload asset types:
script, style, image, media, document, font.
Also, you can define if is a preload or a prefetch.

## Other details

This library adds an id using `vue-link-pre${hash}` of the url to preload, to avoid duplicating the element in the DOM.

## See also

- [smashingmagazine.com Preload: What Is It Good For? By Yoav Weiss](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)
- [current browser support for <link rel="preload"](http://caniuse.com/#search=preload)

## License 

MIT
