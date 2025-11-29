import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, createBlock, toDisplayString, withDirectives, isRef, vModelText, openBlock, Fragment, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';
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

const useBillsStore = defineStore("bills", {
  state: () => ({
    selectedSection: "congress",
    searchQuery: "",
    filterType: "all",
    congressBills: [],
    dcBills: [],
    congressLoaded: false,
    dcLoaded: false,
    loading: false,
    error: null
  }),
  getters: {
    filteredCongressBills: (state) => {
      let bills = state.congressBills;
      if (state.filterType !== "all") {
        bills = bills.filter((bill) => bill.type === state.filterType);
      }
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        bills = bills.filter(
          (bill) => bill.number.toLowerCase().includes(query) || bill.description.toLowerCase().includes(query)
        );
      }
      return bills;
    },
    filteredDCBills: (state) => {
      let bills = state.dcBills;
      if (state.filterType !== "all") {
        bills = bills.filter((bill) => bill.type === state.filterType);
      }
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        bills = bills.filter(
          (bill) => bill.title.toLowerCase().includes(query) || bill.description.toLowerCase().includes(query)
        );
      }
      return bills;
    }
  },
  actions: {
    async setSection(section) {
      this.selectedSection = section;
      this.searchQuery = "";
      this.filterType = "all";
      if (section === "congress" && !this.congressLoaded) {
        await this.fetchCongressBills();
      } else if (section === "city-council" && !this.dcLoaded) {
        await this.fetchDCBills();
      }
    },
    async fetchCongressBills() {
      if (this.congressLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { getToken } = useApiToken();
        const token = await getToken("bills/congress");
        const data = await $fetch("/api/bills/congress", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.congressBills = data;
        this.congressLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch congress bills";
        console.error("Failed to fetch congress bills:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchDCBills() {
      if (this.dcLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "bills/city-council" }
        });
        const data = await $fetch("/api/bills/city-council", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.dcBills = data;
        this.dcLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch DC bills";
        console.error("Failed to fetch DC bills:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "congress",
  __ssrInlineRender: true,
  emits: ["open-pdf"],
  setup(__props) {
    const billsStore = useBillsStore();
    const { loading, filteredCongressBills } = storeToRefs(billsStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(filteredCongressBills).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No bills found matching your search.</span></div>`);
      } else {
        _push(`<div class="grid"><!--[-->`);
        ssrRenderList(unref(filteredCongressBills), (bill, index) => {
          _push(`<div class="card"><div class="card-body"><div><h3>${ssrInterpolate(bill.number)}</h3><button class="btn hover:text-primary-focus"> [View Bill Text] </button></div><p><strong>Description:</strong> ${ssrInterpolate(bill.description)}</p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bills/congress.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "BillsCongress" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "city-council",
  __ssrInlineRender: true,
  emits: ["open-pdf"],
  setup(__props) {
    const billsStore = useBillsStore();
    const { loading, filteredDCBills } = storeToRefs(billsStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(filteredDCBills).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No DC bills found matching your search.</span></div>`);
      } else {
        _push(`<div class="grid"><!--[-->`);
        ssrRenderList(unref(filteredDCBills), (bill, index) => {
          _push(`<div class="card"><div class="card-body"><div><h3>${ssrInterpolate(bill.title)}</h3><button class="btn hover:text-primary-focus"> [View Bill Text] </button></div><p><strong>Description:</strong> ${ssrInterpolate(bill.description)}</p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/bills/city-council.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "BillsCityCouncil" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bills",
  __ssrInlineRender: true,
  setup(__props) {
    const billsStore = useBillsStore();
    const { setSection, fetchCongressBills } = billsStore;
    const { loading, searchQuery, selectedSection, filterType, filteredCongressBills, filteredDCBills } = storeToRefs(billsStore);
    async function openPDF(pdfPath) {
      try {
        const response = await $fetch("/api/pdf/token", {
          method: "POST",
          body: { pdfPath }
        });
        const opened = (void 0).open(response.url, "_blank");
        if (!opened || opened.closed || typeof opened.closed === "undefined") {
          alert("Pop-up was blocked. Please allow pop-ups for this site to view PDFs.");
        }
      } catch (error) {
        console.error("Failed to open PDF:", error);
        const errorMessage = error?.data?.statusMessage || error?.message || "Failed to open PDF";
        if (error?.statusCode === 403) {
          alert("⏱️ Access Denied\n\nThis PDF link may have expired or is invalid. Please try again.");
        } else if (error?.statusCode === 404) {
          alert("🔍 PDF Not Found\n\nThe requested PDF file could not be found.");
        } else {
          alert(`❌ Error

${errorMessage}

Please try again or contact support.`);
        }
      }
    }
    useHead({
      title: "Bills - nUSA Legal",
      meta: [
        {
          name: "description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        },
        {
          property: "og:title",
          content: "nUSA Legal - Bills"
        },
        {
          property: "og:description",
          content: "Your go-to source for legal information and resources in nUSA P.S ROBLOX ROLEPLAY."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_BillsCongress = __nuxt_component_1;
      const _component_BillsCityCouncil = __nuxt_component_2;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "default" }, _attrs), {
        "sub-menu": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sub-menu-container"${_scopeId}><div class="card"${_scopeId}><div class="card-body"${_scopeId}><div class="sub-menu-list"${_scopeId}><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "congress",
              "btn-outline": unref(selectedSection) !== "congress"
            }, "btn"])}"${_scopeId}> Congress </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "city-council",
              "btn-outline": unref(selectedSection) !== "city-council"
            }, "btn"])}"${_scopeId}> City Council </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sub-menu-container" }, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("congress"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "congress",
                          "btn-outline": unref(selectedSection) !== "congress"
                        }]
                      }, " Congress ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("city-council"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "city-council",
                          "btn-outline": unref(selectedSection) !== "city-council"
                        }]
                      }, " City Council ", 10, ["onClick"])
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
              "btn-primary": unref(selectedSection) === "congress",
              "btn-outline": unref(selectedSection) !== "congress"
            }, "btn"])}"${_scopeId}> Congress </button><button class="${ssrRenderClass([{
              "btn-primary": unref(selectedSection) === "city-council",
              "btn-outline": unref(selectedSection) !== "city-council"
            }, "btn"])}"${_scopeId}> City Council </button></div><h2 class="section-title"${_scopeId}>${ssrInterpolate(unref(selectedSection) === "congress" ? "Congress" : "City Council")}</h2><div class="search-filter"${_scopeId}><div class="form-control flex-1"${_scopeId}><input${ssrRenderAttr("value", unref(searchQuery))} type="text"${ssrRenderAttr("placeholder", unref(selectedSection) === "congress" ? "Search bills..." : "Search DC bills...")} class="input input-bordered w-full"${_scopeId}></div><div class="form-control w-full md:w-80"${_scopeId}><select class="select select-bordered w-full"${_scopeId}>`);
            if (unref(selectedSection) === "congress") {
              _push2(`<!--[--><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "all") : ssrLooseEqual(unref(filterType), "all")) ? " selected" : ""}${_scopeId}>All Bills</option><option value="hr"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "hr") : ssrLooseEqual(unref(filterType), "hr")) ? " selected" : ""}${_scopeId}>House Bills (H.R.)</option><option value="s"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "s") : ssrLooseEqual(unref(filterType), "s")) ? " selected" : ""}${_scopeId}>Senate Bills (S.)</option><option value="hjres"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "hjres") : ssrLooseEqual(unref(filterType), "hjres")) ? " selected" : ""}${_scopeId}>House Joint Resolutions (H.J.Res.)</option><option value="sjres"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "sjres") : ssrLooseEqual(unref(filterType), "sjres")) ? " selected" : ""}${_scopeId}>Senate Joint Resolutions (S.J.Res.)</option><option value="hconres"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "hconres") : ssrLooseEqual(unref(filterType), "hconres")) ? " selected" : ""}${_scopeId}>House Concurrent Resolutions (H.Con.Res.)</option><option value="sconres"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "sconres") : ssrLooseEqual(unref(filterType), "sconres")) ? " selected" : ""}${_scopeId}>Senate Concurrent Resolutions (S.Con.Res.)</option><option value="hres"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "hres") : ssrLooseEqual(unref(filterType), "hres")) ? " selected" : ""}${_scopeId}>House Resolutions (H.Res.)</option><option value="sres"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "sres") : ssrLooseEqual(unref(filterType), "sres")) ? " selected" : ""}${_scopeId}>Senate Resolutions (S.Res.)</option><!--]-->`);
            } else {
              _push2(`<!--[--><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "all") : ssrLooseEqual(unref(filterType), "all")) ? " selected" : ""}${_scopeId}>All DC Bills</option><option value="act"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "act") : ssrLooseEqual(unref(filterType), "act")) ? " selected" : ""}${_scopeId}>Acts</option><option value="ordinance"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "ordinance") : ssrLooseEqual(unref(filterType), "ordinance")) ? " selected" : ""}${_scopeId}>Ordinances</option><option value="resolution"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "resolution") : ssrLooseEqual(unref(filterType), "resolution")) ? " selected" : ""}${_scopeId}>Resolutions</option><!--]-->`);
            }
            _push2(`</select></div></div>`);
            if (unref(selectedSection) === "congress") {
              _push2(ssrRenderComponent(_component_BillsCongress, { onOpenPdf: openPDF }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_BillsCityCouncil, { onOpenPdf: openPDF }, null, _parent2, _scopeId));
            }
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode("section", null, [
                createVNode("div", { class: "card" }, [
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "sub-menu-list-mobile" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("congress"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "congress",
                          "btn-outline": unref(selectedSection) !== "congress"
                        }]
                      }, " Congress ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setSection)("city-council"),
                        class: ["btn", {
                          "btn-primary": unref(selectedSection) === "city-council",
                          "btn-outline": unref(selectedSection) !== "city-council"
                        }]
                      }, " City Council ", 10, ["onClick"])
                    ]),
                    createVNode("h2", { class: "section-title" }, toDisplayString(unref(selectedSection) === "congress" ? "Congress" : "City Council"), 1),
                    createVNode("div", { class: "search-filter" }, [
                      createVNode("div", { class: "form-control flex-1" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                          type: "text",
                          placeholder: unref(selectedSection) === "congress" ? "Search bills..." : "Search DC bills...",
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
                          unref(selectedSection) === "congress" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("option", { value: "all" }, "All Bills"),
                            createVNode("option", { value: "hr" }, "House Bills (H.R.)"),
                            createVNode("option", { value: "s" }, "Senate Bills (S.)"),
                            createVNode("option", { value: "hjres" }, "House Joint Resolutions (H.J.Res.)"),
                            createVNode("option", { value: "sjres" }, "Senate Joint Resolutions (S.J.Res.)"),
                            createVNode("option", { value: "hconres" }, "House Concurrent Resolutions (H.Con.Res.)"),
                            createVNode("option", { value: "sconres" }, "Senate Concurrent Resolutions (S.Con.Res.)"),
                            createVNode("option", { value: "hres" }, "House Resolutions (H.Res.)"),
                            createVNode("option", { value: "sres" }, "Senate Resolutions (S.Res.)")
                          ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode("option", { value: "all" }, "All DC Bills"),
                            createVNode("option", { value: "act" }, "Acts"),
                            createVNode("option", { value: "ordinance" }, "Ordinances"),
                            createVNode("option", { value: "resolution" }, "Resolutions")
                          ], 64))
                        ], 40, ["onUpdate:modelValue", "onChange"]), [
                          [vModelSelect, unref(filterType)]
                        ])
                      ])
                    ]),
                    unref(selectedSection) === "congress" ? (openBlock(), createBlock(_component_BillsCongress, {
                      key: 0,
                      onOpenPdf: openPDF
                    })) : (openBlock(), createBlock(_component_BillsCityCouncil, {
                      key: 1,
                      onOpenPdf: openPDF
                    }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bills.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=bills-CSo8bV8I.mjs.map
