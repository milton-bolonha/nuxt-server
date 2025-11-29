import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, defineAsyncComponent, createVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, isRef, vModelText, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead } from './composables-BNPEOdWb.mjs';
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

const __nuxt_component_1_lazy = defineAsyncComponent(() => import('./definitions-klETZ56r.mjs').then((c) => c.default || c));
const __nuxt_component_2_lazy = defineAsyncComponent(() => import('./files-3wWLljQl.mjs').then((c) => c.default || c));
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./court-procedure-BQnePnUX.mjs').then((c) => c.default || c));
const __nuxt_component_4_lazy = defineAsyncComponent(() => import('./office-CRiCt0QS.mjs').then((c) => c.default || c));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import('./vips-0qnDzkXP.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resources",
  __ssrInlineRender: true,
  setup(__props) {
    const selected = ref("definition");
    const searchQuery = ref("");
    useHead({
      title: "Resources - nUSA Legal",
      meta: [
        {
          name: "description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        },
        {
          property: "og:title",
          content: "nUSA Legal - Resources"
        },
        {
          property: "og:description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_LazyResourcesDefinitions = __nuxt_component_1_lazy;
      const _component_LazyResourcesFiles = __nuxt_component_2_lazy;
      const _component_LazyResourcesCourtProcedure = __nuxt_component_3_lazy;
      const _component_LazyResourcesOffice = __nuxt_component_4_lazy;
      const _component_LazyResourcesVips = __nuxt_component_5_lazy;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        "sub-menu": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sub-menu-container"${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="sub-menu-list"${_scopeId}><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "definition",
              "btn-outline": unref(selected) !== "definition"
            }, "btn"])}"${_scopeId}> Definition </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "files",
              "btn-outline": unref(selected) !== "files"
            }, "btn"])}"${_scopeId}> Files </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "court-procedure",
              "btn-outline": unref(selected) !== "court-procedure"
            }, "btn"])}"${_scopeId}> Court Procedure </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "office",
              "btn-outline": unref(selected) !== "office"
            }, "btn"])}"${_scopeId}> Office of Public Defender </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "vips",
              "btn-outline": unref(selected) !== "vips"
            }, "btn"])}"${_scopeId}> nUSA Legal VIPS </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sub-menu-container" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list" }, [
                      createVNode("button", {
                        onClick: ($event) => selected.value = "definition",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "definition",
                          "btn-outline": unref(selected) !== "definition"
                        }]
                      }, " Definition ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "files",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "files",
                          "btn-outline": unref(selected) !== "files"
                        }]
                      }, " Files ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "court-procedure",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "court-procedure",
                          "btn-outline": unref(selected) !== "court-procedure"
                        }]
                      }, " Court Procedure ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "office",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "office",
                          "btn-outline": unref(selected) !== "office"
                        }]
                      }, " Office of Public Defender ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "vips",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "vips",
                          "btn-outline": unref(selected) !== "vips"
                        }]
                      }, " nUSA Legal VIPS ", 10, ["onClick"])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="sub-menu-list-mobile"${_scopeId}><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "definition",
              "btn-outline": unref(selected) !== "definition"
            }, "btn"])}"${_scopeId}> Definition </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "files",
              "btn-outline": unref(selected) !== "files"
            }, "btn"])}"${_scopeId}> Files </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "court-procedure",
              "btn-outline": unref(selected) !== "court-procedure"
            }, "btn"])}"${_scopeId}> Court Procedure </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "office",
              "btn-outline": unref(selected) !== "office"
            }, "btn"])}"${_scopeId}> Office of Public Defender </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selected) === "vips",
              "btn-outline": unref(selected) !== "vips"
            }, "btn"])}"${_scopeId}> nUSA Legal VIPS </button></div><h2 class="section-title capitalize"${_scopeId}>${ssrInterpolate(unref(selected))}</h2><div class="search-filter"${_scopeId}><div class="form-control flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(searchQuery))} type="text"${ssrRenderAttr("placeholder", `Search ${unref(selected).replaceAll("-", " ")}...`)} class="input input-bordered w-full"${_scopeId}></div></div>`);
            if (unref(selected) === "definition") {
              _push2(ssrRenderComponent(_component_LazyResourcesDefinitions, { search: unref(searchQuery) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(selected) === "files") {
              _push2(ssrRenderComponent(_component_LazyResourcesFiles, { search: unref(searchQuery) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(selected) === "court-procedure") {
              _push2(ssrRenderComponent(_component_LazyResourcesCourtProcedure, { search: unref(searchQuery) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(selected) === "office") {
              _push2(ssrRenderComponent(_component_LazyResourcesOffice, {
                search: unref(searchQuery),
                onReset_search: ($event) => searchQuery.value = ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(selected) === "vips") {
              _push2(ssrRenderComponent(_component_LazyResourcesVips, {
                search: unref(searchQuery),
                onReset_search: ($event) => searchQuery.value = ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode("section", null, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list-mobile" }, [
                      createVNode("button", {
                        onClick: ($event) => selected.value = "definition",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "definition",
                          "btn-outline": unref(selected) !== "definition"
                        }]
                      }, " Definition ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "files",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "files",
                          "btn-outline": unref(selected) !== "files"
                        }]
                      }, " Files ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "court-procedure",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "court-procedure",
                          "btn-outline": unref(selected) !== "court-procedure"
                        }]
                      }, " Court Procedure ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "office",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "office",
                          "btn-outline": unref(selected) !== "office"
                        }]
                      }, " Office of Public Defender ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => selected.value = "vips",
                        class: ["btn", {
                          "btn-primary": unref(selected) === "vips",
                          "btn-outline": unref(selected) !== "vips"
                        }]
                      }, " nUSA Legal VIPS ", 10, ["onClick"])
                    ]),
                    createVNode("h2", { class: "section-title capitalize" }, toDisplayString(unref(selected)), 1),
                    createVNode("div", { class: "search-filter" }, [
                      createVNode("div", { class: "form-control flex-1" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                          type: "text",
                          placeholder: `Search ${unref(selected).replaceAll("-", " ")}...`,
                          class: "input input-bordered w-full"
                        }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(searchQuery)]
                        ])
                      ])
                    ]),
                    unref(selected) === "definition" ? (openBlock(), createBlock(_component_LazyResourcesDefinitions, {
                      key: 0,
                      search: unref(searchQuery)
                    }, null, 8, ["search"])) : createCommentVNode("", true),
                    unref(selected) === "files" ? (openBlock(), createBlock(_component_LazyResourcesFiles, {
                      key: 1,
                      search: unref(searchQuery)
                    }, null, 8, ["search"])) : createCommentVNode("", true),
                    unref(selected) === "court-procedure" ? (openBlock(), createBlock(_component_LazyResourcesCourtProcedure, {
                      key: 2,
                      search: unref(searchQuery)
                    }, null, 8, ["search"])) : createCommentVNode("", true),
                    unref(selected) === "office" ? (openBlock(), createBlock(_component_LazyResourcesOffice, {
                      key: 3,
                      search: unref(searchQuery),
                      onReset_search: ($event) => searchQuery.value = ""
                    }, null, 8, ["search", "onReset_search"])) : createCommentVNode("", true),
                    unref(selected) === "vips" ? (openBlock(), createBlock(_component_LazyResourcesVips, {
                      key: 4,
                      search: unref(searchQuery),
                      onReset_search: ($event) => searchQuery.value = ""
                    }, null, 8, ["search", "onReset_search"])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resources.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resources-voQgYH17.mjs.map
