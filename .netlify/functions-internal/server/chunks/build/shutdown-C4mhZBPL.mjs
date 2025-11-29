import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { a as useSeoMeta, u as useHead } from './composables-BNPEOdWb.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "shutdown",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "nUSA Legal - Maintenance",
      description: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY.",
      ogTitle: "nUSA Legal - Maintenance",
      ogDescription: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY.",
      ogUrl: "https://nusalegal.netlify.app/shutdown",
      ogImage: "https://nusalegal.netlify.app/logo.png",
      ogType: "website"
    });
    useHead({
      meta: [
        { "http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate" },
        { "http-equiv": "Pragma", content: "no-cache" },
        { "http-equiv": "Expires", content: "0" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-base-200 flex items-center justify-center p-4" }, _attrs))}><div class="card bg-base-100 shadow-2xl max-w-2xl w-full"><div class="card-body text-center"><div class="text-6xl mb-4">🔧</div><h1 class="text-4xl font-bold mb-4">Site Under Maintenance</h1><div class="space-y-4"><p class="text-lg"> nUSA Legal is currently undergoing maintenance. We apologize for any inconvenience. </p><p class="text-lg"> Please check back later. </p><div class="divider"></div><div class="space-y-2"><p class="text-sm text-base-content/70"> If you think this is a mistake, please contact <span class="font-semibold">ElijahJunaid</span></p><p class="text-sm text-base-content/60 italic"> If you are the first to message me upon this being released, you can get a free prize. </p></div></div><div class="card-actions justify-center mt-6"><button class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Try Again </button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shutdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shutdown-C4mhZBPL.mjs.map
