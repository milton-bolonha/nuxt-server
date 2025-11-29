import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, defineAsyncComponent, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, withDirectives, isRef, vModelText, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';
import { u as useApiToken } from './useApiToken-ByLpIoFd.mjs';
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

const useConstitutionStore = defineStore("constitution", {
  state: () => ({
    selectedSection: "constitution",
    searchQuery: "",
    constitution: [],
    constitutionAmendments: [],
    constitutionLoaded: false,
    constitutionAmandmentsLoaded: false,
    loading: false,
    error: null
  }),
  getters: {
    filteredData: (state) => {
      let data = state.selectedSection == "constitution" ? state.constitution : state.constitutionAmendments;
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        data = data.filter((d) => d.title.toLowerCase().includes(query) || d.description.toLowerCase().includes(query) || (d.content ?? "").toLowerCase().includes(query));
      }
      return data;
    }
  },
  actions: {
    async setSection(section) {
      this.selectedSection = section;
      this.searchQuery = "";
      if (section === "constitution" && !this.constitutionLoaded) {
        await this.fetchConstitution();
      } else if (section === "constitution-amendments" && !this.constitutionAmandmentsLoaded) {
        await this.fetchConstitutionAmandments();
      }
    },
    async fetchConstitution() {
      if (this.constitutionLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { getToken } = useApiToken();
        const token = await getToken("constitution/constitution");
        const data = await $fetch("/api/constitution/constitution", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.constitution = data;
        this.constitutionLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch Constitution";
        console.error("Failed to fetch Constitution:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchConstitutionAmandments() {
      if (this.constitutionAmandmentsLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "constitution/constitution-amandments" }
        });
        const data = await $fetch("/api/constitution/constitution-amandments", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.constitutionAmendments = data;
        this.constitutionAmandmentsLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch Constitution Amandments";
        console.error("Failed to fetch Constitution Amandments:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const __nuxt_component_1_lazy = defineAsyncComponent(() => import('./modal-C5R4_sZ3.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "constitution",
  __ssrInlineRender: true,
  setup(__props) {
    const ConstitutionStore = useConstitutionStore();
    const { setSection, fetchConstitution } = ConstitutionStore;
    const { loading, searchQuery, selectedSection, filteredData } = storeToRefs(ConstitutionStore);
    const title = computed(() => {
      return selectedSection.value === "constitution" ? "Constitution" : "Constitution Amendments";
    });
    const showDetail = ref(false);
    const dataDetail = ref(null);
    const article = ref(null);
    const isLoadingArticle = ref(false);
    const articlePage = ref(1);
    const articleContent = computed(() => {
      if (!article.value) return null;
      return article.value.sections[articlePage.value - 1];
    });
    const handleClick = async () => {
      showDetail.value = true;
      if (dataDetail.value?.hasArticle) {
        isLoadingArticle.value = true;
        articlePage.value = 1;
        try {
          const tokenResponse = await $fetch("/api/auth/token", {
            method: "POST",
            body: { endpoint: "constitution/articles" }
          });
          const response = await $fetch("/api/constitution/articles/" + dataDetail.value.key, {
            headers: {
              Authorization: `Bearer ${tokenResponse.token}`
            }
          });
          article.value = response;
        } catch (error) {
        } finally {
          isLoadingArticle.value = false;
        }
      }
    };
    useHead({
      title: "Constitution - nUSA Legal",
      meta: [
        {
          name: "description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        },
        {
          property: "og:title",
          content: "nUSA Legal - Constitution"
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
              "btn-primary": unref(selectedSection) === "constitution",
              "btn-outline": unref(selectedSection) !== "constitution"
            }, "btn"])}"${_scopeId}> Constitution </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "constitution-amendments",
              "btn-outline": unref(selectedSection) !== "constitution-amendments"
            }, "btn"])}"${_scopeId}> Constitution Amendments </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sub-menu-container" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("constitution"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "constitution",
                          "btn-outline": unref(selectedSection) !== "constitution"
                        }]
                      }, " Constitution ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("constitution-amendments"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "constitution-amendments",
                          "btn-outline": unref(selectedSection) !== "constitution-amendments"
                        }]
                      }, " Constitution Amendments ", 10, ["onClick"])
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
              "btn-primary": unref(selectedSection) === "constitution",
              "btn-outline": unref(selectedSection) !== "constitution"
            }, "btn"])}"${_scopeId}> Constitution </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "constitution-amendments",
              "btn-outline": unref(selectedSection) !== "constitution-amendments"
            }, "btn"])}"${_scopeId}> Constitution Amendments </button></div><h2 class="section-title"${_scopeId}>${ssrInterpolate(unref(title))}</h2><div class="search-filter"${_scopeId}><div class="form-control flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(searchQuery))} type="text"${ssrRenderAttr("placeholder", `Search ${unref(title)}...`)} class="input input-bordered w-full"${_scopeId}></div></div><div${_scopeId}>`);
            if (unref(loading)) {
              _push2(`<div class="flex justify-center"${_scopeId}><span class="loading"${_scopeId}></span></div>`);
            } else if (unref(filteredData).length === 0) {
              _push2(`<div class="alert alert-warning"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"${_scopeId}></path></svg><span${_scopeId}>No data found matching your search.</span></div>`);
            } else {
              _push2(`<div class="grid"${_scopeId}><!--[-->`);
              ssrRenderList(unref(filteredData), (dt, index) => {
                _push2(`<div class="card"${_scopeId}><div class="card-body"${_scopeId}><div${_scopeId}><h3${_scopeId}>${ssrInterpolate(dt.title)}</h3><div${_scopeId}><p${_scopeId}><strong${_scopeId}>Description:</strong> ${ssrInterpolate(dt.description)}</p></div>`);
                if (dt.hasArticle) {
                  _push2(`<button class="btn"${_scopeId}>Read Article</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
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
                    _push3(`<div class="${ssrRenderClass([{ "min-h-[75vh]": unref(dataDetail).hasArticle }, "detail-modal"])}"${_scopeId2}><h3${_scopeId2}>${ssrInterpolate(unref(dataDetail).title + (unref(articleContent) ? ` | ${unref(articleContent).title}` : ""))}</h3>`);
                    if (unref(dataDetail).content) {
                      _push3(`<p${_scopeId2}>${unref(dataDetail).content ?? ""}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(dataDetail).hasArticle) {
                      _push3(`<!--[-->`);
                      if (unref(isLoadingArticle)) {
                        _push3(`<div class="flex justify-center"${_scopeId2}><span class="loading"${_scopeId2}></span></div>`);
                      } else if (unref(articleContent)) {
                        _push3(`<!--[--><div class="flex-1"${_scopeId2}><p class="text-sm"${_scopeId2}>${unref(articleContent).content ?? ""}</p></div><div class="join"${_scopeId2}><button class="join-item btn"${ssrIncludeBooleanAttr(unref(articlePage) == 1) ? " disabled" : ""}${_scopeId2}>«</button><button class="join-item btn"${_scopeId2}> Section ${ssrInterpolate(unref(articlePage))} of ${ssrInterpolate(unref(article)?.sections.length)}</button><button class="join-item btn"${ssrIncludeBooleanAttr(unref(articlePage) == unref(article)?.sections.length) ? " disabled" : ""}${_scopeId2}>»</button></div><!--]-->`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["detail-modal", { "min-h-[75vh]": unref(dataDetail).hasArticle }]
                      }, [
                        createVNode("h3", null, toDisplayString(unref(dataDetail).title + (unref(articleContent) ? ` | ${unref(articleContent).title}` : "")), 1),
                        unref(dataDetail).content ? (openBlock(), createBlock("p", {
                          key: 0,
                          innerHTML: unref(dataDetail).content
                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                        unref(dataDetail).hasArticle ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          unref(isLoadingArticle) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-center"
                          }, [
                            createVNode("span", { class: "loading" })
                          ])) : unref(articleContent) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode("p", {
                                class: "text-sm",
                                innerHTML: unref(articleContent).content
                              }, null, 8, ["innerHTML"])
                            ]),
                            createVNode("div", { class: "join" }, [
                              createVNode("button", {
                                class: "join-item btn",
                                disabled: unref(articlePage) == 1,
                                onClick: ($event) => --articlePage.value
                              }, "«", 8, ["disabled", "onClick"]),
                              createVNode("button", { class: "join-item btn" }, " Section " + toDisplayString(unref(articlePage)) + " of " + toDisplayString(unref(article)?.sections.length), 1),
                              createVNode("button", {
                                class: "join-item btn",
                                disabled: unref(articlePage) == unref(article)?.sections.length,
                                onClick: ($event) => ++articlePage.value
                              }, "»", 8, ["disabled", "onClick"])
                            ])
                          ], 64)) : createCommentVNode("", true)
                        ], 64)) : createCommentVNode("", true)
                      ], 2)
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
                        onClick: ($event) => unref(setSection)("constitution"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "constitution",
                          "btn-outline": unref(selectedSection) !== "constitution"
                        }]
                      }, " Constitution ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("constitution-amendments"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "constitution-amendments",
                          "btn-outline": unref(selectedSection) !== "constitution-amendments"
                        }]
                      }, " Constitution Amendments ", 10, ["onClick"])
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
                      ])
                    ]),
                    createVNode("div", null, [
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-center"
                      }, [
                        createVNode("span", { class: "loading" })
                      ])) : unref(filteredData).length === 0 ? (openBlock(), createBlock("div", {
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
                        class: "grid"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredData), (dt, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            onClick: ($event) => {
                              dataDetail.value = dt;
                              handleClick();
                            },
                            class: "card"
                          }, [
                            createVNode("div", { class: "card-body" }, [
                              createVNode("div", null, [
                                createVNode("h3", null, toDisplayString(dt.title), 1),
                                createVNode("div", null, [
                                  createVNode("p", null, [
                                    createVNode("strong", null, "Description:"),
                                    createTextVNode(" " + toDisplayString(dt.description), 1)
                                  ])
                                ]),
                                dt.hasArticle ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  class: "btn"
                                }, "Read Article")) : createCommentVNode("", true)
                              ])
                            ])
                          ], 8, ["onClick"]);
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
                  createVNode("div", {
                    class: ["detail-modal", { "min-h-[75vh]": unref(dataDetail).hasArticle }]
                  }, [
                    createVNode("h3", null, toDisplayString(unref(dataDetail).title + (unref(articleContent) ? ` | ${unref(articleContent).title}` : "")), 1),
                    unref(dataDetail).content ? (openBlock(), createBlock("p", {
                      key: 0,
                      innerHTML: unref(dataDetail).content
                    }, null, 8, ["innerHTML"])) : createCommentVNode("", true),
                    unref(dataDetail).hasArticle ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      unref(isLoadingArticle) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-center"
                      }, [
                        createVNode("span", { class: "loading" })
                      ])) : unref(articleContent) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("p", {
                            class: "text-sm",
                            innerHTML: unref(articleContent).content
                          }, null, 8, ["innerHTML"])
                        ]),
                        createVNode("div", { class: "join" }, [
                          createVNode("button", {
                            class: "join-item btn",
                            disabled: unref(articlePage) == 1,
                            onClick: ($event) => --articlePage.value
                          }, "«", 8, ["disabled", "onClick"]),
                          createVNode("button", { class: "join-item btn" }, " Section " + toDisplayString(unref(articlePage)) + " of " + toDisplayString(unref(article)?.sections.length), 1),
                          createVNode("button", {
                            class: "join-item btn",
                            disabled: unref(articlePage) == unref(article)?.sections.length,
                            onClick: ($event) => ++articlePage.value
                          }, "»", 8, ["disabled", "onClick"])
                        ])
                      ], 64)) : createCommentVNode("", true)
                    ], 64)) : createCommentVNode("", true)
                  ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/constitution.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=constitution-DpVgal5-.mjs.map
