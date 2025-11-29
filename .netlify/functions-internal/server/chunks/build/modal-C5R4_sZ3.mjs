import { d as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, watchEffect, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "modal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    maxWidth: { default: "" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const _show = ref(false);
    watchEffect(() => {
      _show.value = props.show;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const modal = Object.assign(_sfc_main, { __name: "Modal" });

export { modal as default };
//# sourceMappingURL=modal-C5R4_sZ3.mjs.map
