import { defineComponent, watchEffect, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';

const useCourtProcedureStore = defineStore("resource-court-procedure", {
  state: () => ({
    searchQuery: "",
    data: [],
    isLoaded: false,
    loading: false,
    error: null
  }),
  getters: {
    filteredData: (state) => {
      let data = state.data;
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        data = data.filter((d) => d.toLowerCase().includes(query));
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
          body: { endpoint: "resources/court-procedure" }
        });
        const data = await $fetch("/api/resources/court-procedure", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.data = data;
        this.isLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch Court Procedure";
        console.error("Failed to fetch Court Procedure:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "court-procedure",
  __ssrInlineRender: true,
  props: {
    search: {}
  },
  setup(__props) {
    const props = __props;
    const CourtProcedureStore = useCourtProcedureStore();
    const { filteredData, loading } = storeToRefs(CourtProcedureStore);
    const { get } = CourtProcedureStore;
    watchEffect(() => {
      CourtProcedureStore.searchQuery = props.search;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(filteredData).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No data found matching your search.</span></div>`);
      } else {
        _push(`<div><div class="card"><div class="card-body"><table class="table"><tbody><!--[-->`);
        ssrRenderList(unref(filteredData), (dt, index) => {
          _push(`<tr><td>${ssrInterpolate(dt)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/resources/court-procedure.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const courtProcedure = Object.assign(_sfc_main, { __name: "ResourcesCourtProcedure" });

export { courtProcedure as default };
//# sourceMappingURL=court-procedure-BQnePnUX.mjs.map
