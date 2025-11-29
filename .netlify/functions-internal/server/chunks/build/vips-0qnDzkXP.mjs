import { defineComponent, watchEffect, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { defineStore, storeToRefs } from 'pinia';

const API_CONFIG = {
  PRIMARY_URL: "https://www.nusa.gg/resource-vips",
  FALLBACK_URL: "https://api.nusa.gg/resource-vips",
  TIMEOUT: 5e3
};
const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VklQPC90ZXh0Pjwvc3ZnPg==";
const useResourceVIPStore = defineStore("resource-vips", {
  state: () => ({
    searchQuery: "",
    data: [],
    loading: false,
    isLoaded: false,
    error: null
  }),
  getters: {
    filteredData: (state) => {
      let data = state.data;
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase();
        data = data.filter(
          (vip) => vip.title.toLowerCase().includes(query) || vip.reason.toLowerCase().includes(query) || vip.user.username.toLowerCase().includes(query)
        );
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
    async fetchWithFallback(endpoint) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      try {
        const response = await fetch(`${API_CONFIG.PRIMARY_URL}${endpoint}`, {
          signal: controller.signal
        });
        clearTimeout(timeout);
        return response;
      } catch (error) {
        console.warn(`Primary API failed for ${endpoint}, trying fallback`);
        try {
          const fallbackResponse = await fetch(`${API_CONFIG.FALLBACK_URL}${endpoint}`);
          return fallbackResponse;
        } catch (fallbackError) {
          throw new Error(`Both primary and fallback APIs failed for ${endpoint}`);
        }
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
          body: { endpoint: "resources/vips" }
        });
        const baseData = await $fetch("/api/resources/vips", {
          headers: {
            Authorization: `Bearer ${tokenResponse.token}`
          }
        });
        this.data = baseData.map((vip) => ({
          ...vip,
          user: {
            username: `User ${vip.userId}`,
            profileUrl: `https://www.roblox.com/users/${vip.userId}/profile`
          },
          avatar: {
            imageUrl: DEFAULT_AVATAR
          },
          isLoading: true,
          hasError: false
        }));
        this.isLoaded = true;
        this.loading = false;
        await this.enrichVIPData();
      } catch (err) {
        this.error = err?.data?.statusMessage || err?.message || "Failed to fetch VIP resource";
        console.error("Failed to fetch VIP resource:", err);
        this.loading = false;
      }
    },
    async enrichVIPData() {
      const enrichmentPromises = this.data.map(async (vip, index) => {
        try {
          const [userResponse, avatarResponse] = await Promise.allSettled([
            this.fetchWithFallback(`/users/${vip.userId}`),
            this.fetchWithFallback(`/avatar/${vip.userId}`)
          ]);
          let userData = null;
          let avatarData = null;
          if (userResponse.status === "fulfilled" && userResponse.value.ok) {
            userData = await userResponse.value.json();
          }
          if (avatarResponse.status === "fulfilled" && avatarResponse.value.ok) {
            avatarData = await avatarResponse.value.json();
          }
          this.data[index] = {
            ...vip,
            user: {
              username: userData?.name || `User ${vip.userId}`,
              profileUrl: `https://www.roblox.com/users/${vip.userId}/profile`
            },
            avatar: {
              imageUrl: avatarData?.data?.[0]?.imageUrl || DEFAULT_AVATAR
            },
            isLoading: false,
            hasError: !userData && !avatarData
          };
        } catch (error) {
          console.warn(`Failed to enrich data for user ${vip.userId}:`, error);
          this.data[index] = {
            ...vip,
            isLoading: false,
            hasError: true
          };
        }
      });
      await Promise.all(enrichmentPromises);
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "vips",
  __ssrInlineRender: true,
  props: {
    search: {}
  },
  emits: ["reset_search"],
  setup(__props) {
    const props = __props;
    const ResourceVIPStore = useResourceVIPStore();
    const { filteredData, loading, error } = storeToRefs(ResourceVIPStore);
    const { get } = ResourceVIPStore;
    watchEffect(() => {
      ResourceVIPStore.searchQuery = props.search;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center"><span class="loading"></span></div>`);
      } else if (unref(error)) {
        _push(`<div class="alert alert-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(error))}</span></div>`);
      } else if (unref(filteredData).length === 0) {
        _push(`<div class="alert alert-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><span>No VIPs found matching your search.</span></div>`);
      } else {
        _push(`<div class="grid"><!--[-->`);
        ssrRenderList(unref(filteredData), (vip) => {
          _push(`<div class="card"><figure><div class="avatar"><div>`);
          if (vip.isLoading) {
            _push(`<div class="skeleton w-32 h-32 rounded-full"></div>`);
          } else {
            _push(`<img${ssrRenderAttr("src", vip.avatar.imageUrl)}${ssrRenderAttr("alt", vip.user.username)} loading="lazy">`);
          }
          _push(`</div></div></figure><div class="card-body">`);
          if (vip.isLoading) {
            _push(`<div class="skeleton h-8 w-32 mb-2"></div>`);
          } else {
            _push(`<h2 class="card-title text-xl">${ssrInterpolate(vip.user.username)}</h2>`);
          }
          _push(`<p class="vip-name">ID: ${ssrInterpolate(vip.userId)}</p><div class="divider my-2"></div><div>${ssrInterpolate(vip.title)}</div><p class="vip-reason">${ssrInterpolate(vip.reason)}</p>`);
          if (vip.hasError && !vip.isLoading) {
            _push(`<div class="badge"> Limited info available </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/resources/vips.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vips = Object.assign(_sfc_main, { __name: "ResourcesVips" });

export { vips as default };
//# sourceMappingURL=vips-0qnDzkXP.mjs.map
