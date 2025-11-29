import { defineComponent, watchEffect, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';

const useResourceFileStore = defineStore("resource-file", {
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
        data = data.filter((d) => d.title.toLowerCase().includes(query));
      }
      return data;
    }
  },
  actions: {
    async get() {
      this.searchQuery = "";
      if (!this.isLoaded) {
        await this.fetchResourceFile();
      }
    },
    async fetchResourceFile() {
      if (this.isLoaded) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const tokenResponse = await $fetch("/api/auth/token", {
          method: "POST",
          body: { endpoint: "resources/files" }
        });
        const data = await $fetch("/api/resources/files", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.data = data;
        this.isLoaded = true;
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch Resource Files";
        console.error("Failed to fetch Resource Files:", err);
      } finally {
        this.loading = false;
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "files",
  __ssrInlineRender: true,
  props: {
    search: {}
  },
  setup(__props) {
    const props = __props;
    const ResourceFileStore = useResourceFileStore();
    const { filteredData, loading } = storeToRefs(ResourceFileStore);
    const { get } = ResourceFileStore;
    watchEffect(() => {
      ResourceFileStore.searchQuery = props.search;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12"><span class="loading text-primary"></span></div>`);
      } else if (unref(filteredData).length === 0) {
        _push(`<div class="alert alert-warning shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No files found matching your search.</span></div>`);
      } else {
        _push(`<div class="grid"><!--[-->`);
        ssrRenderList(unref(filteredData), (dt, index) => {
          _push(`<a${ssrRenderAttr("href", dt.link)} target="_blank" class="card"><div class="card-body"><div><div class="flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><div class="data-content"><h3>${ssrInterpolate(dt.title)}</h3><div><span>Open Document</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></div></div></div></div></a>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/resources/files.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const files = Object.assign(_sfc_main, { __name: "ResourcesFiles" });

export { files as default };
//# sourceMappingURL=files-3wWLljQl.mjs.map
