import { b as _export_sfc, c as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ChatbotWidget-P_-yc4M9.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'pinia';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/svg/menu.svg");
const _imports_1 = publicAssetsURL("/svg/close.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isHome = computed(() => route.path == "/");
    const menus = [
      {
        label: "Courts",
        to: "/courts"
      },
      {
        label: "Bills",
        to: "/bills"
      },
      {
        label: "FRCP/FRCMP",
        to: "/frcp-frcmp"
      },
      {
        label: "Laws",
        to: "/laws"
      },
      {
        label: "Constitution",
        to: "/constitution"
      },
      {
        label: "Mock Trial",
        to: "/mock-trial"
      }
    ];
    const theme = ref("light");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ChatbotWidget = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "drawer drawer-end",
        "data-theme": unref(theme)
      }, _attrs))} data-v-e2dff027><input id="nusalegal-drawer" type="checkbox" class="drawer-toggle" data-v-e2dff027><div class="drawer-content" data-v-e2dff027><div class="navbar custom-navbar" data-v-e2dff027><div class="navbar-left" data-v-e2dff027>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "app-name"
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
        class: "game-icon",
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
      _push(`</div>`);
      if (!unref(isHome)) {
        _push(`<div class="navbar-right" data-v-e2dff027><div class="hidden lg:flex" data-v-e2dff027><!--[-->`);
        ssrRenderList(menus, (menu, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: i,
            to: menu.to,
            class: "nav-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(menu.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(menu.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><div class="flex lg:hidden" data-v-e2dff027><label for="nusalegal-drawer" aria-label="open sidebar" class="menu-toggle" data-v-e2dff027><img${ssrRenderAttr("src", _imports_0)} data-v-e2dff027></label></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex-1 p-6 flex gap-6" data-v-e2dff027><div class="max-lg:hidden w-[30%] xl:w-[20%]" data-v-e2dff027>`);
      ssrRenderSlot(_ctx.$slots, "sub-menu", {}, null, _push, _parent);
      _push(`</div><div class="w-full lg:w-[70%] xl:w-[60%]" data-v-e2dff027>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div class="max-lg:hidden w-[20%]" data-v-e2dff027></div></div><footer class="flex flex-col gap-2 text-center py-4" data-v-e2dff027><p data-v-e2dff027>© 2024 nUSA Legal</p><p data-v-e2dff027>THIS IS NOT REAL LIFE!</p></footer><button class="theme-toggle" aria-label="Toggle theme" data-v-e2dff027>`);
      if (unref(theme) === "light") {
        _push(`<span data-v-e2dff027>☀️</span>`);
      } else {
        _push(`<span data-v-e2dff027>🌙</span>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_component_ChatbotWidget, null, null, _parent));
      _push(`</div><div class="drawer-side" data-v-e2dff027><label for="nusalegal-drawer" aria-label="close sidebar" class="drawer-overlay" data-v-e2dff027></label><ul class="menu" data-v-e2dff027><label for="nusalegal-drawer" aria-label="open sidebar" class="menu-toggle" data-v-e2dff027><img${ssrRenderAttr("src", _imports_1)} data-v-e2dff027></label><!--[-->`);
      ssrRenderList(menus, (menu, i) => {
        _push(`<li data-v-e2dff027>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: menu.to
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(menu.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(menu.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2dff027"]]);

export { _default as default };
//# sourceMappingURL=default-D7mIOHg7.mjs.map
