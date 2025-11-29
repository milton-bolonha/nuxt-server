import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, defineAsyncComponent, createVNode, toDisplayString, createBlock, createCommentVNode, withDirectives, isRef, vModelText, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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

const useFederalRulesStore = defineStore("federal-rules", {
  state: () => ({
    selectedSection: "frcp",
    searchQuery: "",
    filterType: "all",
    frcp_group: [],
    frcmp_group: [],
    frcpLoaded: false,
    frcmpLoaded: false,
    loading: false,
    error: null
  }),
  getters: {
    filterList: (state) => {
      let data = state.selectedSection == "frcp" ? state.frcp_group : state.frcmp_group;
      return data.map((d) => d.label);
    },
    filteredFederalRules: (state) => {
      let data = state.selectedSection == "frcp" ? state.frcp_group : state.frcmp_group;
      if (state.filterType !== "all") {
        const index = state.filterType;
        data = data.filter((_, i) => i == index);
      }
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        data = data.map(
          (dt) => {
            return {
              ...dt,
              data: dt.data.filter((d) => d.title.toLowerCase().includes(query) || d.subtitle.toLowerCase().includes(query) || d.content.toLowerCase().includes(query) || d.excerp.toLowerCase().includes(query))
            };
          }
        );
      }
      return data;
    }
  },
  actions: {
    async setSection(section) {
      this.selectedSection = section;
      this.searchQuery = "";
      this.filterType = "all";
      if (section === "frcp" && !this.frcpLoaded) {
        await this.fetchFRCP();
      } else if (section === "frcmp" && !this.frcmpLoaded) {
        await this.fetchFRCMP();
      }
    },
    async fetchFRCP() {
      if (this.frcpLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "federal-rules/frcp" }
        });
        const data = await $fetch("/api/federal-rules/frcp", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.frcp_group = data;
        this.frcpLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch FRCP";
        console.error("Failed to fetch FRCP:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchFRCMP() {
      if (this.frcmpLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "federal-rules/frcmp" }
        });
        const data = await $fetch("/api/federal-rules/frcmp", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.frcmp_group = data;
        this.frcmpLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch FRCMP";
        console.error("Failed to fetch FRCMP:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const __nuxt_component_1_lazy = defineAsyncComponent(() => import('./modal-C5R4_sZ3.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "frcp-frcmp",
  __ssrInlineRender: true,
  setup(__props) {
    const FederalRulesStore = useFederalRulesStore();
    const { setSection, fetchFRCP } = FederalRulesStore;
    const { loading, selectedSection, searchQuery, filteredFederalRules, filterList, filterType } = storeToRefs(FederalRulesStore);
    const title = computed(() => {
      return selectedSection.value === "frcp" ? "Federal Rules of Civil Procedure" : "Federal Rules of Criminal Procedure";
    });
    const showDetail = ref(false);
    const dataDetail = ref(null);
    useHead({
      title: "FRCP/FRCMP - nUSA Legal",
      meta: [
        {
          name: "description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        },
        {
          property: "og:title",
          content: "nUSA Legal - FRCP/FRCMP"
        },
        {
          property: "og:description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_LazyModal = __nuxt_component_1_lazy;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        "sub-menu": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sub-menu-container"${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="sub-menu-list"${_scopeId}><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "frcp",
              "btn-outline": unref(selectedSection) !== "frcp"
            }, "btn"])}"${_scopeId}> FRCP </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "frcmp",
              "btn-outline": unref(selectedSection) !== "frcmp"
            }, "btn"])}"${_scopeId}> FRCMP </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sub-menu-container" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("frcp"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "frcp",
                          "btn-outline": unref(selectedSection) !== "frcp"
                        }]
                      }, " FRCP ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("frcmp"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "frcmp",
                          "btn-outline": unref(selectedSection) !== "frcmp"
                        }]
                      }, " FRCMP ", 10, ["onClick"])
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
              "btn-primary": unref(selectedSection) === "frcp",
              "btn-outline": unref(selectedSection) !== "frcp"
            }, "btn"])}"${_scopeId}> FRCP </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "frcmp",
              "btn-outline": unref(selectedSection) !== "frcmp"
            }, "btn"])}"${_scopeId}> FRCMP </button></div><h2 class="section-title"${_scopeId}>${ssrInterpolate(unref(title))}</h2><div class="search-filter"${_scopeId}><div class="form-control flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(searchQuery))} type="text"${ssrRenderAttr("placeholder", unref(selectedSection) === "frcp" ? "Search FRCP..." : "Search FRCMP...")} class="input input-bordered w-full"${_scopeId}></div><div class="form-control w-full md:w-80"${_scopeId}><select class="select select-bordered w-full"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "all") : ssrLooseEqual(unref(filterType), "all")) ? " selected" : ""}${_scopeId}>All ${ssrInterpolate(unref(selectedSection) === "frcp" ? "FRCP" : "FRCMP")}</option><!--[-->`);
            ssrRenderList(unref(filterList), (filter, i) => {
              _push2(`<option${ssrRenderAttr("value", i)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), i) : ssrLooseEqual(unref(filterType), i)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(filter)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div${_scopeId}>`);
            if (unref(loading)) {
              _push2(`<div class="flex justify-center"${_scopeId}><span class="loading"${_scopeId}></span></div>`);
            } else if (unref(filteredFederalRules).length === 0) {
              _push2(`<div class="alert alert-warning"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>No data found matching your search.</span></div>`);
            } else {
              _push2(`<div class="data-grid"${_scopeId}><!--[-->`);
              ssrRenderList(unref(filteredFederalRules), (data, index) => {
                _push2(`<!--[--><div class="data-group"${_scopeId}><div${_scopeId}><h3${_scopeId}>${ssrInterpolate(data.label)}</h3></div></div><!--[-->`);
                ssrRenderList(data.data, (dt, index2) => {
                  _push2(`<div class="card"${_scopeId}><div class="card-body"${_scopeId}><h3${_scopeId}>${ssrInterpolate(dt.title)}</h3><p${_scopeId}>${ssrInterpolate(dt.excerp)}</p></div></div>`);
                });
                _push2(`<!--]--><!--]-->`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></section>`);
            if (unref(showDetail) && unref(dataDetail) != null) {
              _push2(ssrRenderComponent(_component_LazyModal, {
                show: unref(showDetail),
                "max-width": "max-w-3xl",
                onClose: ($event) => {
                  showDetail.value = false;
                  dataDetail.value = null;
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="data-detail"${_scopeId2}><h3${_scopeId2}>${ssrInterpolate(unref(dataDetail).title)}</h3><p class="font-bold"${_scopeId2}>${ssrInterpolate(unref(dataDetail).subtitle)}</p><p class="text-sm"${_scopeId2}>${unref(dataDetail).content ?? ""}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "data-detail" }, [
                        createVNode("h3", null, toDisplayString(unref(dataDetail).title), 1),
                        createVNode("p", { class: "font-bold" }, toDisplayString(unref(dataDetail).subtitle), 1),
                        createVNode("p", {
                          class: "text-sm",
                          innerHTML: unref(dataDetail).content
                        }, null, 8, ["innerHTML"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("section", null, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list-mobile" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("frcp"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "frcp",
                          "btn-outline": unref(selectedSection) !== "frcp"
                        }]
                      }, " FRCP ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("frcmp"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "frcmp",
                          "btn-outline": unref(selectedSection) !== "frcmp"
                        }]
                      }, " FRCMP ", 10, ["onClick"])
                    ]),
                    createVNode("h2", { class: "section-title" }, toDisplayString(unref(title)), 1),
                    createVNode("div", { class: "search-filter" }, [
                      createVNode("div", { class: "form-control flex-1" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                          type: "text",
                          placeholder: unref(selectedSection) === "frcp" ? "Search FRCP..." : "Search FRCMP...",
                          class: "input input-bordered w-full"
                        }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(searchQuery)]
                        ])
                      ]),
                      createVNode("div", { class: "form-control w-full md:w-80" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => isRef(filterType) ? filterType.value = $event : null,
                          class: "select select-bordered w-full",
                          onChange: ($event) => searchQuery.value = ""
                        }, [
                          createVNode("option", { value: "all" }, "All " + toDisplayString(unref(selectedSection) === "frcp" ? "FRCP" : "FRCMP"), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(filterList), (filter, i) => {
                            return openBlock(), createBlock("option", {
                              key: i,
                              value: i
                            }, toDisplayString(filter), 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue", "onChange"]), [
                          [vModelSelect, unref(filterType)]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-center"
                      }, [
                        createVNode("span", { class: "loading" })
                      ])) : unref(filteredFederalRules).length === 0 ? (openBlock(), createBlock("div", {
                        key: 1,
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
                        createVNode("span", null, "No data found matching your search.")
                      ])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "data-grid"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredFederalRules), (data, index) => {
                          return openBlock(), createBlock(Fragment, { key: index }, [
                            createVNode("div", { class: "data-group" }, [
                              createVNode("div", null, [
                                createVNode("h3", null, toDisplayString(data.label), 1)
                              ])
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(data.data, (dt, index2) => {
                              return openBlock(), createBlock("div", {
                                key: index2,
                                onClick: ($event) => {
                                  showDetail.value = true;
                                  dataDetail.value = dt;
                                },
                                class: "card"
                              }, [
                                createVNode("div", { class: "card-body" }, [
                                  createVNode("h3", null, toDisplayString(dt.title), 1),
                                  createVNode("p", null, toDisplayString(dt.excerp), 1)
                                ])
                              ], 8, ["onClick"]);
                            }), 128))
                          ], 64);
                        }), 128))
                      ]))
                    ])
                  ])
                ])
              ]),
              unref(showDetail) && unref(dataDetail) != null ? (openBlock(), createBlock(_component_LazyModal, {
                key: 0,
                show: unref(showDetail),
                "max-width": "max-w-3xl",
                onClose: ($event) => {
                  showDetail.value = false;
                  dataDetail.value = null;
                }
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "data-detail" }, [
                    createVNode("h3", null, toDisplayString(unref(dataDetail).title), 1),
                    createVNode("p", { class: "font-bold" }, toDisplayString(unref(dataDetail).subtitle), 1),
                    createVNode("p", {
                      class: "text-sm",
                      innerHTML: unref(dataDetail).content
                    }, null, 8, ["innerHTML"])
                  ])
                ]),
                _: 1
              }, 8, ["show", "onClose"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/frcp-frcmp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=frcp-frcmp-CWs7JjO4.mjs.map
