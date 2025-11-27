export default defineNuxtPlugin((nuxtApp) => {
  console.log('🔷 [DEBUG] Plugin initialized');

  // Log app ready
  nuxtApp.hook('app:created', () => {
    console.log('🔷 [DEBUG] App created');
  });

  nuxtApp.hook('app:mounted', () => {
    console.log('🔷 [DEBUG] App mounted');
  });

  nuxtApp.hook('app:beforeMount', () => {
    console.log('🔷 [DEBUG] App before mount');
  });

  nuxtApp.hook('page:start', () => {
    console.log('🔷 [DEBUG] Page start');
  });

  nuxtApp.hook('page:finish', () => {
    console.log('🔷 [DEBUG] Page finish');
  });

  // Log all fetch requests
  if (process.client) {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      console.log('🔷 [DEBUG] Fetch request:', args[0]);
      return originalFetch.apply(this, args)
        .then(response => {
          console.log('🔷 [DEBUG] Fetch response:', args[0], response.status);
          return response;
        })
        .catch(error => {
          console.error('🔷 [DEBUG] Fetch error:', args[0], error);
          throw error;
        });
    };

    // Log WebSocket connections
    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function(url, protocols) {
      console.log('🔷 [DEBUG] WebSocket connecting:', url);
      const ws = new OriginalWebSocket(url, protocols);
      
      ws.addEventListener('open', () => {
        console.log('🔷 [DEBUG] WebSocket opened:', url);
      });
      
      ws.addEventListener('close', () => {
        console.log('🔷 [DEBUG] WebSocket closed:', url);
      });
      
      ws.addEventListener('error', (error) => {
        console.error('🔷 [DEBUG] WebSocket error:', url, error);
      });
      
      return ws;
    };

    // Log XMLHttpRequest
    const OriginalXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const xhr = new OriginalXMLHttpRequest();
      const originalOpen = xhr.open;
      
      xhr.open = function(method, url, ...rest) {
        console.log('🔷 [DEBUG] XHR request:', method, url);
        return originalOpen.apply(this, [method, url, ...rest]);
      };
      
      xhr.addEventListener('load', function() {
        console.log('🔷 [DEBUG] XHR response:', this.status, this.responseURL);
      });
      
      xhr.addEventListener('error', function() {
        console.error('🔷 [DEBUG] XHR error:', this.responseURL);
      });
      
      return xhr;
    };

    // Log all errors
    window.addEventListener('error', (event) => {
      console.error('🔷 [DEBUG] Window error:', event.message, event.filename, event.lineno);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('🔷 [DEBUG] Unhandled promise rejection:', event.reason);
    });

    // Log Vue router navigation
    nuxtApp.$router.beforeEach((to, from) => {
      console.log('🔷 [DEBUG] Route navigation:', from.path, '->', to.path);
    });

    console.log('🔷 [DEBUG] All interceptors installed');
  }
});
