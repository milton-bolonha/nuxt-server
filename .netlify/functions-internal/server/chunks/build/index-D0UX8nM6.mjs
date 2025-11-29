import { a as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ChatbotWidget-P_-yc4M9.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "button-link",
  __ssrInlineRender: true,
  props: {
    to: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: "btn btn-xl"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/button-link.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ButtonLink = Object.assign(_sfc_main$1, { __name: "ButtonLink" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = ref("light");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ChatbotWidget = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen bg-base-200",
        "data-theme": unref(theme)
      }, _attrs))}><div class="navbar bg-base-100 shadow-lg px-6 py-6"><div class="navbar-start">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-4xl font-bold text-primary normal-case"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`nUSA Legal`);
          } else {
            return [
              createTextVNode("nUSA Legal")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/game",
        class: "ml-6 text-3xl hover:scale-110 transition-transform",
        title: "Play Game"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`🎮`);
          } else {
            return [
              createTextVNode("🎮")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><section class="p-8"><div class="w-full max-w-4xl mx-auto"><div class="card shadow-xl bg-base-100 mb-8"><div class="card-body p-12"><div class="grid md:grid-cols-2 gap-8">`);
      _push(ssrRenderComponent(ButtonLink, {
        class: "btn-accent",
        to: "/courts"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Courts`);
          } else {
            return [
              createTextVNode("Courts")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ButtonLink, {
        class: "btn-accent",
        to: "/bills"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Bills`);
          } else {
            return [
              createTextVNode("Bills")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ButtonLink, {
        class: "btn-accent",
        to: "/frcp-frcmp"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`FRCP/FRCMP`);
          } else {
            return [
              createTextVNode("FRCP/FRCMP")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ButtonLink, {
        class: "btn-accent",
        to: "/laws"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Laws`);
          } else {
            return [
              createTextVNode("Laws")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ButtonLink, {
        class: "btn-accent col-span-full",
        to: "/constitution"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Constitution`);
          } else {
            return [
              createTextVNode("Constitution")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ButtonLink, {
        class: "btn-primary col-span-full",
        to: "/resources"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Resources`);
          } else {
            return [
              createTextVNode("Resources")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="card shadow-lg bg-base-100"><div class="card-body p-8 text-center"><p class="text-sm">As of August 4th, 2025 (before april)<br>Total Website Cost: $995.13</p><p class="text-xs mt-4">© 2024 nUSA Legal<br>THIS IS NOT REAL LIFE!</p></div></div></div></section><button class="fixed bottom-4 left-4 btn btn-circle btn-primary text-2xl shadow-lg z-50">`);
      if (unref(theme) === "light") {
        _push(`<span>☀️</span>`);
      } else {
        _push(`<span>🌙</span>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_component_ChatbotWidget, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D0UX8nM6.mjs.map
