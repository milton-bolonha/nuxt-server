import { defineComponent, watchEffect, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';

const useResourceOfficeStore = defineStore("resource-office", {
  state: () => ({
    searchQuery: "",
    filterType: "all",
    data: [],
    loading: false,
    isLoaded: false,
    error: null
  }),
  getters: {
    officeGroupList: (state) => {
      let data = state.data;
      return data.map((d) => d.label);
    },
    filteredData: (state) => {
      let data = state.data;
      if (state.filterType !== "all") {
        data = data.filter((d) => d.label === state.filterType);
      }
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        data = data.map((dt) => {
          return {
            ...dt,
            data: dt.data.filter((d) => d.title.toLocaleLowerCase().includes(query) || d.description.toLocaleLowerCase().includes(query))
          };
        }).filter((dt) => dt.data.length > 0);
      }
      return data;
    }
  },
  actions: {
    async get() {
      this.searchQuery = "";
      if (!this.isLoaded) {
        await this.fetchData();
      }
    },
    async fetchData() {
      if (this.isLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "resources/office" }
        });
        const data = await $fetch("/api/resources/office", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.data = data;
        this.isLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch office resource";
        console.error("Failed to fetch office resource:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "office",
  __ssrInlineRender: true,
  props: {
    search: {}
  },
  emits: ["reset_search"],
  setup(__props) {
    const props = __props;
    const ResourceOfficeStore = useResourceOfficeStore();
    const { filteredData, officeGroupList, loading, filterType } = storeToRefs(ResourceOfficeStore);
    const { get } = ResourceOfficeStore;
    watchEffect(() => {
      ResourceOfficeStore.searchQuery = props.search;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(filteredData).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No data found matching your search.</span></div>`);
      } else {
        _push(`<div><div class="office-group form-control"><select class="select select-bordered w-full"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), "all") : ssrLooseEqual(unref(filterType), "all")) ? " selected" : ""}>All Office</option><!--[-->`);
        ssrRenderList(unref(officeGroupList), (filter, i) => {
          _push(`<option${ssrRenderAttr("value", filter)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterType)) ? ssrLooseContain(unref(filterType), filter) : ssrLooseEqual(unref(filterType), filter)) ? " selected" : ""}>${ssrInterpolate(filter)}</option>`);
        });
        _push(`<!--]--></select></div><div class="office-card"><div class="card-body"><!--[-->`);
        ssrRenderList(unref(filteredData), (office2) => {
          _push(`<div><div>${ssrInterpolate(office2.label)}</div>`);
          if (office2.data.length) {
            _push(`<table class="table"><tbody><!--[-->`);
            ssrRenderList(office2.data, (dt, index) => {
              _push(`<tr><td><p>${ssrInterpolate(dt.title)}</p><p>${ssrInterpolate(dt.description)}</p></td></tr>`);
            });
            _push(`<!--]--></tbody></table>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/resources/office.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const office = Object.assign(_sfc_main, { __name: "ResourcesOffice" });

export { office as default };
//# sourceMappingURL=office-CRiCt0QS.mjs.map
