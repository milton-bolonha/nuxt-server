import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, defineAsyncComponent, createVNode, toDisplayString, createBlock, createCommentVNode, withDirectives, isRef, vModelText, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttrs } from 'vue/server-renderer';
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

const useLawsStore = defineStore("laws-rules", {
  state: () => ({
    selectedSection: "federal",
    searchQuery: "",
    filterType: "all",
    federal: [],
    eo: [],
    municipal: [],
    federalLoaded: false,
    eoLoaded: false,
    municipalLoaded: false,
    loading: false,
    error: null
  }),
  getters: {
    filterMunicipalList: (state) => {
      let data = state.municipal;
      return data.map((d) => d.label);
    },
    filteredLaws: (state) => {
      let data = state.selectedSection == "federal" ? state.federal : state.eo;
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        data = data.filter(
          (d) => {
            return d.title.toLowerCase().includes(query) || d.subtitle.toLowerCase().includes(query) || d.content.toLowerCase().includes(query) || d.excerp.toLowerCase().includes(query);
          }
        );
      }
      return data;
    },
    filteredMunicipal: (state) => {
      let data = state.municipal;
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
      if (section === "federal" && !this.federalLoaded) {
        await this.fetchFederal();
      } else if (section === "eo" && !this.eoLoaded) {
        await this.fetchEO();
      } else if (section === "municipal" && !this.municipalLoaded) {
        await this.fetchMunicipal();
      }
    },
    async fetchFederal() {
      if (this.federalLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "laws/federal" }
        });
        const data = await $fetch("/api/laws/federal", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.federal = data;
        this.federalLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch Federal";
        console.error("Failed to fetch Federal:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchEO() {
      if (this.eoLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "laws/eo" }
        });
        const data = await $fetch("/api/laws/eo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.eo = data;
        this.eoLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch EO data";
        console.error("Failed to fetch EO data:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchMunicipal() {
      if (this.municipalLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "laws/municipal" }
        });
        const data = await $fetch("/api/laws/municipal", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.municipal = data;
        this.municipalLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch Municipal";
        console.error("Failed to fetch Municipal:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "federal-eo",
  __ssrInlineRender: true,
  emits: ["show-detail"],
  setup(__props) {
    const LawsStore = useLawsStore();
    const { loading, filteredLaws } = storeToRefs(LawsStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(filteredLaws).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No data found matching your search.</span></div>`);
      } else {
        _push(`<div class="grid"><!--[-->`);
        ssrRenderList(unref(filteredLaws), (dt, index) => {
          _push(`<div class="card"><div class="card-body"><h3>${ssrInterpolate(dt.title)}</h3><p>${ssrInterpolate(dt.excerp)}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/laws/federal-eo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "LawsFederalEo" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "municipal",
  __ssrInlineRender: true,
  emits: ["show-detail"],
  setup(__props) {
    const LawsStore = useLawsStore();
    const { loading, filteredMunicipal } = storeToRefs(LawsStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(filteredMunicipal).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No data found matching your search.</span></div>`);
      } else {
        _push(`<div class="grid"><!--[-->`);
        ssrRenderList(unref(filteredMunicipal), (data, index) => {
          _push(`<!--[--><div class="data-group"><div><h3>${ssrInterpolate(data.label)}</h3></div></div><!--[-->`);
          ssrRenderList(data.data, (dt, index2) => {
            _push(`<div class="data-list"><div><h3>${ssrInterpolate(dt.title)}</h3><p>${ssrInterpolate(dt.excerp)}</p></div></div>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/laws/municipal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "LawsMunicipal" });
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./modal-C5R4_sZ3.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "laws",
  __ssrInlineRender: true,
  setup(__props) {
    const LawsStore = useLawsStore();
    const { setSection, fetchFederal } = LawsStore;
    const { selectedSection, searchQuery, filterType, filterMunicipalList } = storeToRefs(LawsStore);
    const showDetail = ref(false);
    const dataDetail = ref(null);
    const title = computed(() => {
      return selectedSection.value === "federal" ? "Federal Criminal Code" : selectedSection.value === "eo" ? "Executive Orders" : "Municipal Criminal Code";
    });
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
      const _component_LawsFederalEo = __nuxt_component_1;
      const _component_LawsMunicipal = __nuxt_component_2;
      const _component_LazyModal = __nuxt_component_3_lazy;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        "sub-menu": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sub-menu-container"${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="sub-menu-list"${_scopeId}><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "federal",
              "btn-outline": unref(selectedSection) !== "federal"
            }, "btn"])}"${_scopeId}> Federal </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "eo",
              "btn-outline": unref(selectedSection) !== "eo"
            }, "btn"])}"${_scopeId}> EO </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "municipal",
              "btn-outline": unref(selectedSection) !== "municipal"
            }, "btn"])}"${_scopeId}> Municipal </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sub-menu-container" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("federal"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "federal",
                          "btn-outline": unref(selectedSection) !== "federal"
                        }]
                      }, " Federal ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("eo"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "eo",
                          "btn-outline": unref(selectedSection) !== "eo"
                        }]
                      }, " EO ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("municipal"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "municipal",
                          "btn-outline": unref(selectedSection) !== "municipal"
                        }]
                      }, " Municipal ", 10, ["onClick"])
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
              "btn-primary": unref(selectedSection) === "federal",
              "btn-outline": unref(selectedSection) !== "federal"
            }, "btn"])}"${_scopeId}> Federal </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "eo",
              "btn-outline": unref(selectedSection) !== "eo"
            }, "btn"])}"${_scopeId}> EO </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "municipal",
              "btn-outline": unref(selectedSection) !== "municipal"
            }, "btn"])}"${_scopeId}> Municipal </button></div><h2 class="section-title"${_scopeId}>${ssrInterpolate(unref(title))}</h2><div class="search-filter"${_scopeId}><div class="form-control flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(searchQuery))} type="text"${ssrRenderAttr("placeholder", `Search ${unref(title)}...`)} class="input input-bordered w-full"${_scopeId}></div>`);
            if (unref(selectedSection) == "municipal") {
              _push2(`<div class="form-control w-full md:w-80"${_scopeId}><select class="select select-bordered w-full"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "all") : ssrLooseEqual(unref(filterType), "all")) ? " selected" : ""}${_scopeId}>All Municipal Criminal Code</option><!--[-->`);
              ssrRenderList(unref(filterMunicipalList), (filter, i) => {
                _push2(`<option${ssrRenderAttr("value", i)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), i) : ssrLooseEqual(unref(filterType), i)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(filter)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (["federal", "eo"].includes(unref(selectedSection))) {
              _push2(ssrRenderComponent(_component_LawsFederalEo, {
                onShowDetail: (dt) => {
                  showDetail.value = true;
                  dataDetail.value = dt;
                }
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_LawsMunicipal, {
                onShowDetail: (dt) => {
                  showDetail.value = true;
                  dataDetail.value = dt;
                }
              }, null, _parent2, _scopeId));
            }
            _push2(`</div></div></section>`);
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
                        onClick: ($event) => unref(setSection)("federal"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "federal",
                          "btn-outline": unref(selectedSection) !== "federal"
                        }]
                      }, " Federal ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("eo"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "eo",
                          "btn-outline": unref(selectedSection) !== "eo"
                        }]
                      }, " EO ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("municipal"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "municipal",
                          "btn-outline": unref(selectedSection) !== "municipal"
                        }]
                      }, " Municipal ", 10, ["onClick"])
                    ]),
                    createVNode("h2", { class: "section-title" }, toDisplayString(unref(title)), 1),
                    createVNode("div", { class: "search-filter" }, [
                      createVNode("div", { class: "form-control flex-1" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                          type: "text",
                          placeholder: `Search ${unref(title)}...`,
                          class: "input input-bordered w-full"
                        }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, unref(searchQuery)]
                        ])
                      ]),
                      unref(selectedSection) == "municipal" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "form-control w-full md:w-80"
                      }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => isRef(filterType) ? filterType.value = $event : null,
                          class: "select select-bordered w-full",
                          onChange: ($event) => searchQuery.value = ""
                        }, [
                          createVNode("option", { value: "all" }, "All Municipal Criminal Code"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(filterMunicipalList), (filter, i) => {
                            return openBlock(), createBlock("option", {
                              key: i,
                              value: i
                            }, toDisplayString(filter), 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue", "onChange"]), [
                          [vModelSelect, unref(filterType)]
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    ["federal", "eo"].includes(unref(selectedSection)) ? (openBlock(), createBlock(_component_LawsFederalEo, {
                      key: 0,
                      onShowDetail: (dt) => {
                        showDetail.value = true;
                        dataDetail.value = dt;
                      }
                    }, null, 8, ["onShowDetail"])) : (openBlock(), createBlock(_component_LawsMunicipal, {
                      key: 1,
                      onShowDetail: (dt) => {
                        showDetail.value = true;
                        dataDetail.value = dt;
                      }
                    }, null, 8, ["onShowDetail"]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/laws.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=laws-Bc3sYS6q.mjs.map
