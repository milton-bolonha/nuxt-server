import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { b as _export_sfc } from './server.mjs';
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
  __name: "roblox-check",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const loading = ref(false);
    const error = ref("");
    const result = ref(null);
    const showProfile = ref(false);
    const isDark = ref(false);
    const assessments = ref({
      hiring: { result: "", reason: "" },
      eos: { result: "", reason: "" },
      ban: { result: "", reason: "" }
    });
    const accountAge = computed(() => {
      if (!result.value?.created) return { date: "", ageString: "" };
      const created = new Date(result.value.created);
      const createdDate = created.toLocaleDateString();
      const now = /* @__PURE__ */ new Date();
      const ageInDays = Math.floor((now.getTime() - created.getTime()) / (1e3 * 60 * 60 * 24));
      const ageInYears = Math.floor(ageInDays / 365);
      const ageString = ageInYears > 0 ? `${ageInYears} years` : `${ageInDays} days`;
      return { date: createdDate, ageString };
    });
    function getStatusColor(status) {
      switch (status) {
        case "DO NOT HIRE":
        case "BANNED":
        case "WARNING":
          return "#d32f2f";
        case "CAUTION":
          return "#ff9800";
        case "CONSIDER HIRING":
        case "PASS":
        case "CLEAN":
          return "#2e7d32";
        default:
          return "#000000";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "roblox-check-page" }, _attrs))} data-v-3ceb0556><div class="search-container" style="${ssrRenderStyle({ "width": "90%" })}" data-v-3ceb0556><h1 data-v-3ceb0556>Roblox User Background Check</h1><div class="search-input-group" data-v-3ceb0556><input${ssrRenderAttr("value", username.value)} type="text" placeholder="Enter Roblox username" data-v-3ceb0556><button class="search-button" role="button" data-v-3ceb0556>Search</button></div>`);
      if (loading.value) {
        _push(`<div class="loading" data-v-3ceb0556>Searching...</div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="error" data-v-3ceb0556>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (result.value) {
        _push(`<div id="result" data-v-3ceb0556><h2 data-v-3ceb0556>Background Check Results for ${ssrInterpolate(result.value.name)}</h2><div class="assessment-section" data-v-3ceb0556><h3 data-v-3ceb0556>Background Check Results</h3><p data-v-3ceb0556><strong data-v-3ceb0556>Hiring Status:</strong><span style="${ssrRenderStyle({ color: getStatusColor(assessments.value.hiring.result) })}" data-v-3ceb0556>${ssrInterpolate(assessments.value.hiring.result)}</span><br data-v-3ceb0556><small data-v-3ceb0556>${ssrInterpolate(assessments.value.hiring.reason)}</small></p><p data-v-3ceb0556><strong data-v-3ceb0556>EOS Compliance:</strong><span style="${ssrRenderStyle({ color: getStatusColor(assessments.value.eos.result) })}" data-v-3ceb0556>${ssrInterpolate(assessments.value.eos.result)}</span><br data-v-3ceb0556><small data-v-3ceb0556>${ssrInterpolate(assessments.value.eos.reason)}</small></p><p data-v-3ceb0556><strong data-v-3ceb0556>Ban Status:</strong><span style="${ssrRenderStyle({ color: getStatusColor(assessments.value.ban.result) })}" data-v-3ceb0556>${ssrInterpolate(assessments.value.ban.result)}</span><br data-v-3ceb0556><small data-v-3ceb0556>${ssrInterpolate(assessments.value.ban.reason)}</small></p></div><button class="${ssrRenderClass([{ open: showProfile.value }, "profile-toggle"])}" role="button" data-v-3ceb0556>${ssrInterpolate(showProfile.value ? "Hide Profile" : "View Full Profile")}</button>`);
        if (showProfile.value) {
          _push(`<div class="profile-section" style="${ssrRenderStyle({ "display": "block" })}" data-v-3ceb0556><h3 data-v-3ceb0556>Profile Information</h3><p data-v-3ceb0556><strong data-v-3ceb0556>Display Name:</strong> ${ssrInterpolate(result.value.display_name)}</p><p data-v-3ceb0556><strong data-v-3ceb0556>Account Created:</strong> ${ssrInterpolate(accountAge.value.date)} (${ssrInterpolate(accountAge.value.ageString)} old)</p><p data-v-3ceb0556><strong data-v-3ceb0556>Account Status:</strong> ${ssrInterpolate(result.value.is_banned ? "BANNED" : "Active")}</p><p data-v-3ceb0556><strong data-v-3ceb0556>Friends Count:</strong> ${ssrInterpolate(result.value.friends_count)}</p><p data-v-3ceb0556><strong data-v-3ceb0556>Badges:</strong> <span class="badge-count" data-v-3ceb0556>${ssrInterpolate(result.value.badges_count)}</span></p><p data-v-3ceb0556><strong data-v-3ceb0556>Description:</strong> ${ssrInterpolate(result.value.description || "No description")}</p><p data-v-3ceb0556><strong data-v-3ceb0556>Groups:</strong></p><ul class="group-list" data-v-3ceb0556><!--[-->`);
          ssrRenderList(result.value.groups, (group, index) => {
            _push(`<li data-v-3ceb0556>${ssrInterpolate(group.group_name)} (${ssrInterpolate(group.role_name)}) </li>`);
          });
          _push(`<!--]--></ul><p data-v-3ceb0556><a${ssrRenderAttr("href", `https://www.roblox.com/users/${result.value.userId}/profile`)} target="_blank" data-v-3ceb0556>View Roblox Profile</a></p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="theme-toggle"${ssrRenderAttr("aria-label", isDark.value ? "Switch to light mode" : "Switch to dark mode")} role="button" data-v-3ceb0556>${ssrInterpolate(isDark.value ? "☀️" : "🌙")}</button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/roblox-check.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const robloxCheck = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ceb0556"]]);

export { robloxCheck as default };
//# sourceMappingURL=roblox-check-CTt5cw1T.mjs.map
