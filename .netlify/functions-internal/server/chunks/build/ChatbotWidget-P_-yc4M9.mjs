import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as _export_sfc, c as useRoute } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChatbotWidget",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isOpen = ref(false);
    const userInput = ref("");
    const messages = ref([]);
    const isLoading = ref(false);
    ref(null);
    ref(null);
    const isOnMockTrialPage = computed(() => {
      return route.path.includes("mock-trial");
    });
    const shouldShowChatbot = computed(() => {
      return !isOnMockTrialPage.value;
    });
    const parseMarkdown = (text) => {
      if (!text) return "";
      let html = text;
      html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
      html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
      html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
      html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
      html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      html = html.replace(/^\* (.+)$/gm, "<li>$1</li>");
      html = html.replace(/(<li>.+<\/li>)(\n<li>)/g, "$1$2");
      html = html.replace(/(<li>.+<\/li>\n?)+/g, "<ul>$&</ul>");
      html = html.replace(/^([^<\n].+)$/gm, "<p>$1</p>");
      html = html.replace(/<p><\/p>/g, "");
      html = html.replace(/<p>(<h[1-3]>)/g, "$1");
      html = html.replace(/(<\/h[1-3]>)<\/p>/g, "$1");
      html = html.replace(/<p>(<ul>)/g, "$1");
      html = html.replace(/(<\/ul>)<\/p>/g, "$1");
      return html;
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(shouldShowChatbot)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-86358e08><button id="chat-toggle-btn"${ssrRenderAttr("title", unref(isOpen) ? "Close chat" : "Open chat")}${ssrRenderAttr("aria-label", unref(isOpen) ? "Close chat" : "Open chat")} data-v-86358e08> 💬 </button>`);
        if (unref(isOpen)) {
          _push(`<div id="chat-container" role="region" aria-label="Chatbot window" data-v-86358e08><div id="chat-header" data-v-86358e08>🧑‍⚖️ CaseBot</div><div id="chat-messages" aria-live="polite" data-v-86358e08><!--[-->`);
          ssrRenderList(unref(messages), (message, index) => {
            _push(`<div class="${ssrRenderClass(["message", message.type])}" role="log" data-v-86358e08>`);
            if (message.isMarkdown) {
              _push(`<div data-v-86358e08>${parseMarkdown(message.text) ?? ""}</div>`);
            } else {
              _push(`<div data-v-86358e08>${ssrInterpolate(message.text)}</div>`);
            }
            _push(`</div>`);
          });
          _push(`<!--]-->`);
          if (unref(isLoading)) {
            _push(`<div class="spinner" data-v-86358e08></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div id="chat-input" data-v-86358e08><input${ssrRenderAttr("value", unref(userInput))} type="text" id="query-input" placeholder="Ask your legal question..." autocomplete="off" aria-label="Chat input" data-v-86358e08><button id="send-btn" aria-label="Send message" type="button" data-v-86358e08><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-v-86358e08><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" data-v-86358e08></path></svg></button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChatbotWidget.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-86358e08"]]), { __name: "ChatbotWidget" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ChatbotWidget-P_-yc4M9.mjs.map
