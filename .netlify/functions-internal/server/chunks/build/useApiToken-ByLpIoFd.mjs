const tokenCache = /* @__PURE__ */ new Map();
function useApiToken() {
  const getToken = async (endpoint) => {
    const cached = tokenCache.get(endpoint);
    if (cached && cached.expiresAt > Date.now() + 3e4) {
      return cached.token;
    }
    try {
      const response = await $fetch("/api/auth/token", {
        method: "POST",
        body: { endpoint }
      });
      const cachedToken = {
        token: response.token,
        expiresAt: Date.now() + 4 * 60 * 1e3,
        // 4 minutos
        endpoint
      };
      tokenCache.set(endpoint, cachedToken);
      return response.token;
    } catch (error) {
      console.error("Failed to get API token:", error);
      throw error;
    }
  };
  const clearCache = (endpoint) => {
    if (endpoint) {
      tokenCache.delete(endpoint);
    } else {
      tokenCache.clear();
    }
  };
  return {
    getToken,
    clearCache
  };
}

export { useApiToken as u };
//# sourceMappingURL=useApiToken-ByLpIoFd.mjs.map
