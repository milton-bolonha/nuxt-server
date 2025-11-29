import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, createBlock, withDirectives, vModelText, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';
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
import 'vue-router';

const useCourtsStore = defineStore("courts", {
  state: () => ({
    selectedVolume: 2,
    searchQuery: "",
    volumesCache: {},
    loading: false,
    error: null,
    availableVolumeNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  }),
  getters: {
    currentVolume: (state) => {
      return state.volumesCache[state.selectedVolume] || null;
    },
    availableVolumes: (state) => {
      return state.availableVolumeNumbers.map((vol) => ({
        volume: vol,
        title: `Supreme Court Board Volume ${vol}`
      }));
    },
    filteredCases: (state) => {
      const currentVol = state.volumesCache[state.selectedVolume];
      if (!currentVol || currentVol.isEmpty) {
        return [];
      }
      if (!state.searchQuery.trim()) {
        return currentVol.cases;
      }
      const query = state.searchQuery.toLowerCase();
      return currentVol.cases.filter((courtCase) => {
        return courtCase.title.toLowerCase().includes(query) || courtCase.description.toLowerCase().includes(query) || courtCase.type.toLowerCase().includes(query) || courtCase.docket.toLowerCase().includes(query) || courtCase.citation.toLowerCase().includes(query);
      });
    }
  },
  actions: {
    async setVolume(vol) {
      this.searchQuery = "";
      this.selectedVolume = vol;
      if (!this.volumesCache[vol]) {
        await this.fetchVolume(vol);
      }
    },
    async fetchVolume(vol) {
      if (this.volumesCache[vol]) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: `courts/${vol}` }
        });
        const data = await $fetch(`/api/courts/${vol}`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.volumesCache[vol] = data;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || `Failed to fetch volume ${vol}`;
        console.error(`Failed to fetch volume ${vol}:`, err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "courts",
  __ssrInlineRender: true,
  setup(__props) {
    const courtsStore = useCourtsStore();
    const { setVolume, fetchVolume } = courtsStore;
    const { loading } = storeToRefs(courtsStore);
    useHead({
      title: "Courts - nUSA Legal",
      meta: [
        {
          name: "description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        },
        {
          property: "og:title",
          content: "nUSA Legal - Courts"
        },
        {
          property: "og:description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        "sub-menu": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sub-menu-container"${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="sub-menu-list"${_scopeId}><!--[-->`);
            ssrRenderList(unref(courtsStore).availableVolumes, (vol) => {
              _push2(`<button class="${ssrRenderClass([{
                "btn-primary": unref(courtsStore).selectedVolume === vol.volume,
                "btn-outline": unref(courtsStore).selectedVolume !== vol.volume
              }, "btn"])}"${_scopeId}> Volume ${ssrInterpolate(vol.volume)}</button>`);
            });
            _push2(`<!--]--></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sub-menu-container" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(courtsStore).availableVolumes, (vol) => {
                        return openBlock(), createBlock("button", {
                          key: vol.volume,
                          onClick: ($event) => unref(setVolume)(vol.volume),
                          class: ["btn", {
                            "btn-primary": unref(courtsStore).selectedVolume === vol.volume,
                            "btn-outline": unref(courtsStore).selectedVolume !== vol.volume
                          }]
                        }, " Volume " + toDisplayString(vol.volume), 11, ["onClick"]);
                      }), 128))
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section${_scopeId}><div class="card shadow-xl rounded-3xl"${_scopeId}><div class="card-body"${_scopeId}><div class="search form-control"${_scopeId}><input${ssrRenderAttr("value", unref(courtsStore).searchQuery)} type="text" placeholder="Search cases by title, description, type, docket, or citation..." class="input-bordered"${_scopeId}></div><div class="sub-menu-list-mobile"${_scopeId}><!--[-->`);
            ssrRenderList(unref(courtsStore).availableVolumes, (vol) => {
              _push2(`<button class="${ssrRenderClass([{
                "btn-primary": unref(courtsStore).selectedVolume === vol.volume,
                "btn-outline": unref(courtsStore).selectedVolume !== vol.volume
              }, "btn btn-sm"])}"${_scopeId}> Volume ${ssrInterpolate(vol.volume)}</button>`);
            });
            _push2(`<!--]--></div><h2 class="text-2xl font-bold text-center mb-6"${_scopeId}>${ssrInterpolate(unref(courtsStore).currentVolume?.title)}</h2>`);
            if (unref(loading)) {
              _push2(`<span class="loading mx-auto"${_scopeId}></span>`);
            } else if (unref(courtsStore).currentVolume?.isEmpty) {
              _push2(`<div class="alert alert-info"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(courtsStore).currentVolume?.emptyMessage)}</span></div>`);
            } else if (unref(courtsStore).filteredCases.length === 0) {
              _push2(`<div class="alert alert-warning"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>No cases found matching &quot;${ssrInterpolate(unref(courtsStore).searchQuery)}&quot;</span></div>`);
            } else {
              _push2(`<div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"${_scopeId}><!--[-->`);
              ssrRenderList(unref(courtsStore).filteredCases, (courtCase, index) => {
                _push2(`<div class="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"${_scopeId}><div class="card-body p-4"${_scopeId}><h3 class="card-title text-lg"${_scopeId}>${ssrInterpolate(courtCase.title)}</h3><p class="text-sm text-gray-600 mb-4"${_scopeId}>${ssrInterpolate(courtCase.description)}</p><div class="space-y-2"${_scopeId}><div class="flex items-start"${_scopeId}><span class="font-semibold text-sm w-24"${_scopeId}>TYPE:</span><p class="text-sm"${_scopeId}><span class="${ssrRenderClass({
                  "badge-error": courtCase.type === "CRIMINAL",
                  "badge-info": courtCase.type === "CIVIL" || courtCase.type === "Civil"
                })}"${_scopeId}>${ssrInterpolate(courtCase.type)}</span></p></div><div class="flex items-start"${_scopeId}><span class="font-semibold text-sm w-24"${_scopeId}>DOCKET #:</span><p class="text-sm"${_scopeId}>${ssrInterpolate(courtCase.docket)}</p></div><div class="flex items-start"${_scopeId}><span class="font-semibold text-sm w-24"${_scopeId}>CITATION:</span><p class="text-sm"${_scopeId}>${ssrInterpolate(courtCase.citation)}</p></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode("section", null, [
                createVNode("div", { class: "card shadow-xl rounded-3xl" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "search form-control" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(courtsStore).searchQuery = $event,
                        type: "text",
                        placeholder: "Search cases by title, description, type, docket, or citation...",
                        class: "input-bordered"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(courtsStore).searchQuery]
                      ])
                    ]),
                    createVNode("div", { class: "sub-menu-list-mobile" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(courtsStore).availableVolumes, (vol) => {
                        return openBlock(), createBlock("button", {
                          key: vol.volume,
                          onClick: ($event) => unref(setVolume)(vol.volume),
                          class: ["btn btn-sm", {
                            "btn-primary": unref(courtsStore).selectedVolume === vol.volume,
                            "btn-outline": unref(courtsStore).selectedVolume !== vol.volume
                          }]
                        }, " Volume " + toDisplayString(vol.volume), 11, ["onClick"]);
                      }), 128))
                    ]),
                    createVNode("h2", { class: "text-2xl font-bold text-center mb-6" }, toDisplayString(unref(courtsStore).currentVolume?.title), 1),
                    unref(loading) ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "loading mx-auto"
                    })) : unref(courtsStore).currentVolume?.isEmpty ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-info"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        class: "h-6 w-6 shrink-0 stroke-current"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", null, toDisplayString(unref(courtsStore).currentVolume?.emptyMessage), 1)
                    ])) : unref(courtsStore).filteredCases.length === 0 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "alert alert-warning"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        class: "h-6 w-6 shrink-0 stroke-current"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        })
                      ])),
                      createVNode("span", null, 'No cases found matching "' + toDisplayString(unref(courtsStore).searchQuery) + '"', 1)
                    ])) : (openBlock(), createBlock("div", {
                      key: 3,
                      class: "grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(courtsStore).filteredCases, (courtCase, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
                        }, [
                          createVNode("div", { class: "card-body p-4" }, [
                            createVNode("h3", { class: "card-title text-lg" }, toDisplayString(courtCase.title), 1),
                            createVNode("p", { class: "text-sm text-gray-600 mb-4" }, toDisplayString(courtCase.description), 1),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-start" }, [
                                createVNode("span", { class: "font-semibold text-sm w-24" }, "TYPE:"),
                                createVNode("p", { class: "text-sm" }, [
                                  createVNode("span", {
                                    class: {
                                      "badge-error": courtCase.type === "CRIMINAL",
                                      "badge-info": courtCase.type === "CIVIL" || courtCase.type === "Civil"
                                    }
                                  }, toDisplayString(courtCase.type), 3)
                                ])
                              ]),
                              createVNode("div", { class: "flex items-start" }, [
                                createVNode("span", { class: "font-semibold text-sm w-24" }, "DOCKET #:"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(courtCase.docket), 1)
                              ]),
                              createVNode("div", { class: "flex items-start" }, [
                                createVNode("span", { class: "font-semibold text-sm w-24" }, "CITATION:"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(courtCase.citation), 1)
                              ])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/courts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=courts-ixfBbLDh.mjs.map
