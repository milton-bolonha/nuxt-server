import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { b as _export_sfc } from './server.mjs';
import * as Ably from 'ably';
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

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const toasts = ref([]);
function useToast() {
  function show(message, type = "info", duration = 3e3) {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast = {
      id,
      message,
      type,
      duration
    };
    toasts.value.push(toast);
    setTimeout(() => {
      remove(id);
    }, duration);
    return id;
  }
  function remove(id) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  }
  function success(message, duration = 3e3) {
    return show(message, "success", duration);
  }
  function error(message, duration = 4e3) {
    return show(message, "error", duration);
  }
  function warning(message, duration = 3500) {
    return show(message, "warning", duration);
  }
  function info(message, duration = 3e3) {
    return show(message, "info", duration);
  }
  return {
    toasts,
    show,
    remove,
    success,
    error,
    warning,
    info
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ToastContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts: toasts2 } = useToast();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "toast-container" }, _attrs))} data-v-d3c03178><!--[-->`);
      ssrRenderList(unref(toasts2), (toast) => {
        _push(`<div class="${ssrRenderClass([`toast-${toast.type}`, "toast"])}" data-v-d3c03178><div class="toast-icon" data-v-d3c03178>`);
        if (toast.type === "success") {
          _push(`<span data-v-d3c03178>✓</span>`);
        } else if (toast.type === "error") {
          _push(`<span data-v-d3c03178>✕</span>`);
        } else if (toast.type === "warning") {
          _push(`<span data-v-d3c03178>⚠</span>`);
        } else {
          _push(`<span data-v-d3c03178>ℹ</span>`);
        }
        _push(`</div><div class="toast-message" data-v-d3c03178>${ssrInterpolate(toast.message)}</div><button class="toast-close" data-v-d3c03178>×</button></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ToastContainer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-d3c03178"]]), { __name: "ToastContainer" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReconnectionDialog",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    attempts: {},
    countdown: {}
  },
  emits: ["cancel"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "reconnection-overlay" }, _attrs))} data-v-9658aa2a><div class="reconnection-dialog" data-v-9658aa2a><div class="reconnection-icon" data-v-9658aa2a><span class="spinner" data-v-9658aa2a>⟳</span></div><h3 data-v-9658aa2a>Connection Lost</h3><p data-v-9658aa2a>Attempting to reconnect to the lobby...</p><div class="reconnection-progress" data-v-9658aa2a><div class="progress-bar" data-v-9658aa2a><div class="progress-fill" style="${ssrRenderStyle({ width: `${__props.countdown / 10 * 100}%` })}" data-v-9658aa2a></div></div><div class="reconnection-info" data-v-9658aa2a><span data-v-9658aa2a>Attempt ${ssrInterpolate(__props.attempts)}/3</span><span data-v-9658aa2a>${ssrInterpolate(__props.countdown)}s remaining</span></div></div><button class="cancel-button" data-v-9658aa2a> Return to Lobby Selection </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReconnectionDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-9658aa2a"]]), { __name: "ReconnectionDialog" });
function useLobbyConnection() {
  const { success, error, warning, info } = useToast();
  let ably = null;
  let channel = null;
  let clientId = null;
  const isConnected = ref(false);
  const isConnecting = ref(false);
  const isReconnecting = ref(false);
  const reconnectAttempts = ref(0);
  const reconnectCountdown = ref(10);
  let heartbeatInterval = null;
  let activityCheckInterval = null;
  let reconnectTimeout = null;
  let reconnectCountdownInterval = null;
  const lobbyState = ref({
    lobbyCode: "",
    selectedCaseType: null,
    selectedCase: null,
    players: [],
    roles: {}
  });
  const connectionStatus = computed(() => {
    if (isReconnecting.value) return "reconnecting";
    if (isConnecting.value) return "connecting";
    if (isConnected.value) return "connected";
    return "disconnected";
  });
  async function connect(lobbyCode, playerName, isLeader) {
    isConnecting.value = true;
    try {
      ably = new Ably.Realtime({ authUrl: "/api/ably-auth" });
      channel = ably.channels.get(`lobby:${lobbyCode}`);
      await new Promise((resolve, reject) => {
        ably.connection.on("connected", () => {
          clientId = ably.auth.clientId;
          resolve(true);
        });
        ably.connection.on("failed", reject);
        setTimeout(() => reject(new Error("Connection timeout")), 1e4);
      });
      lobbyState.value.lobbyCode = lobbyCode;
      lobbyState.value.players = [{
        id: clientId || "local",
        name: playerName,
        role: null,
        isLeader,
        lastSeen: Date.now()
      }];
      isConnected.value = true;
      isConnecting.value = false;
      channel.subscribe("player-joined", onPlayerJoined);
      channel.subscribe("player-left", onPlayerLeft);
      channel.subscribe("role-claimed", onRoleClaimed);
      channel.subscribe("case-selected", onCaseSelected);
      channel.subscribe("trial-start", onTrialStart);
      channel.subscribe("heartbeat", onHeartbeat);
      await channel.publish("player-joined", {
        id: clientId,
        name: playerName,
        isLeader,
        timestamp: Date.now()
      });
      startHeartbeat();
      startActivityMonitoring();
      success("Connected to lobby");
      return true;
    } catch (err) {
      console.error("Failed to connect to lobby:", err);
      isConnecting.value = false;
      error("Failed to connect to lobby");
      return false;
    }
  }
  function disconnect() {
    stopHeartbeat();
    stopActivityMonitoring();
    stopReconnection();
    if (channel && clientId) {
      channel.publish("player-left", {
        id: clientId,
        timestamp: Date.now()
      });
    }
    if (channel) {
      channel.unsubscribe();
      channel = null;
    }
    if (ably) {
      ably.close();
      ably = null;
    }
    clientId = null;
    isConnected.value = false;
    lobbyState.value = {
      lobbyCode: "",
      selectedCaseType: null,
      selectedCase: null,
      players: [],
      roles: {}
    };
    info("Disconnected from lobby");
  }
  function startHeartbeat() {
    if (heartbeatInterval) return;
    heartbeatInterval = setInterval();
  }
  function stopHeartbeat() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }
  function startActivityMonitoring() {
    if (activityCheckInterval) return;
    activityCheckInterval = setInterval();
  }
  function stopActivityMonitoring() {
    if (activityCheckInterval) {
      clearInterval(activityCheckInterval);
      activityCheckInterval = null;
    }
  }
  async function attemptReconnect() {
    if (isReconnecting.value || reconnectAttempts.value >= 3) return;
    isReconnecting.value = true;
    reconnectAttempts.value++;
    reconnectCountdown.value = 10;
    info(`Reconnecting... (${reconnectAttempts.value}/3)`);
    reconnectCountdownInterval = setInterval();
    reconnectTimeout = setTimeout(async () => {
      const success2 = await connect(
        lobbyState.value.lobbyCode,
        "You",
        false
      );
      if (success2) {
        isReconnecting.value = false;
        reconnectAttempts.value = 0;
        stopReconnection();
      } else if (reconnectAttempts.value < 3) {
        isReconnecting.value = false;
        setTimeout(() => attemptReconnect(), 2e3);
      } else {
        isReconnecting.value = false;
        error("Failed to reconnect after 3 attempts");
      }
    }, 3e3);
  }
  function stopReconnection() {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
    if (reconnectCountdownInterval) {
      clearInterval(reconnectCountdownInterval);
      reconnectCountdownInterval = null;
    }
  }
  function onConnectionLost() {
    isConnected.value = false;
    warning("Connection lost - attempting to reconnect...");
    attemptReconnect();
  }
  function onPlayerJoined(message) {
    const { id, name, isLeader } = message.data;
    if (id === clientId) return;
    const existingPlayer = lobbyState.value.players.find((p) => p.id === id);
    if (!existingPlayer) {
      lobbyState.value.players.push({
        id,
        name,
        role: null,
        isLeader,
        lastSeen: Date.now()
      });
      info(`${name} joined the lobby`);
    }
  }
  function onPlayerLeft(message) {
    const { id } = message.data;
    const player = lobbyState.value.players.find((p) => p.id === id);
    if (player) {
      lobbyState.value.players = lobbyState.value.players.filter((p) => p.id !== id);
      if (player.role) {
        lobbyState.value.roles[player.role] = null;
      }
      warning(`${player.name} left the lobby`);
    }
  }
  function onRoleClaimed(message) {
    const { playerId, playerName, roleId, roleName } = message.data;
    const player = lobbyState.value.players.find((p) => p.id === playerId);
    if (player) {
      if (player.role) {
        lobbyState.value.roles[player.role] = null;
      }
      player.role = roleName;
      lobbyState.value.roles[roleId] = playerName;
      if (playerId !== clientId) {
        info(`${playerName} claimed ${roleName}`);
      }
    }
  }
  function onCaseSelected(message) {
    const { case: selectedCase } = message.data;
    lobbyState.value.selectedCase = selectedCase;
    if (message.clientId !== clientId) {
      info(`Case selected: ${selectedCase.title}`);
    }
  }
  function onTrialStart(message) {
    if (message.clientId !== clientId) {
      info("Trial is starting!");
    }
  }
  function onHeartbeat(message) {
    const { playerId, timestamp } = message.data;
    const player = lobbyState.value.players.find((p) => p.id === playerId);
    if (player) {
      player.lastSeen = timestamp;
    }
  }
  function claimRole(roleId, roleName) {
    const localPlayer = lobbyState.value.players.find((p) => p.id === clientId);
    if (localPlayer) {
      if (localPlayer.role) {
        lobbyState.value.roles[localPlayer.role] = null;
      }
      localPlayer.role = roleName;
      lobbyState.value.roles[roleId] = localPlayer.name;
    }
    if (channel && clientId) {
      channel.publish("role-claimed", {
        playerId: clientId,
        playerName: localPlayer?.name || "Unknown",
        roleId,
        roleName
      });
    }
  }
  function selectCase(caseItem) {
    lobbyState.value.selectedCase = caseItem;
    if (channel) {
      channel.publish("case-selected", {
        case: caseItem
      });
    }
  }
  function startTrial() {
    if (channel) {
      channel.publish("trial-start", {
        case: lobbyState.value.selectedCase,
        roles: lobbyState.value.roles,
        timestamp: Date.now()
      });
    }
    return {
      case: lobbyState.value.selectedCase,
      roles: lobbyState.value.roles
    };
  }
  return {
    isConnected,
    isConnecting,
    isReconnecting,
    reconnectAttempts,
    reconnectCountdown,
    connectionStatus,
    lobbyState,
    connect,
    disconnect,
    claimRole,
    selectCase,
    startTrial,
    onConnectionLost,
    attemptReconnect
  };
}
function useTrialState() {
  const currentCase = ref(null);
  const playerRole = ref(null);
  const caseType = ref(null);
  const isActive = ref(false);
  const isSinglePlayer = ref(false);
  const currentTurn = ref(null);
  const trialPhase = ref("opening");
  const messages = ref([]);
  const evidence = ref([]);
  const objections = ref([]);
  const participants = ref(
    /* @__PURE__ */ new Map()
  );
  const caseDetailsHtml = computed(() => {
    if (!currentCase.value) return "";
    let html = `
      <p><strong>Case Type:</strong> ${caseType.value?.charAt(0).toUpperCase()}${caseType.value?.slice(1)}</p>
      <p><strong>Your Role:</strong> ${playerRole.value?.charAt(0).toUpperCase()}${playerRole.value?.slice(1)}</p>
      <p><strong>Title:</strong> ${currentCase.value.title}</p>
      <p><strong>Description:</strong> ${currentCase.value.description}</p>
      <p><strong>Facts:</strong> ${currentCase.value.facts}</p>
    `;
    if (currentCase.value.statute) {
      html += `<p><strong>Statute:</strong> ${currentCase.value.statute}</p>`;
    }
    html += `<p><strong>Difficulty:</strong> ${currentCase.value.difficulty}</p>`;
    if (currentCase.value.roles && currentCase.value.roles[playerRole.value || ""]) {
      const roleData = currentCase.value.roles[playerRole.value || ""];
      html += '<div class="role-info">';
      if (roleData.objectives && roleData.objectives.length > 0) {
        html += "<h3>Your Role Objectives:</h3><ul>";
        roleData.objectives.forEach((obj) => {
          html += `<li>${obj}</li>`;
        });
        html += "</ul>";
      }
      if (roleData.key_arguments && roleData.key_arguments.length > 0) {
        html += "<h3>Key Arguments:</h3><ul>";
        roleData.key_arguments.forEach((arg) => {
          html += `<li>${arg}</li>`;
        });
        html += "</ul>";
      }
      if (roleData.key_decisions && roleData.key_decisions.length > 0) {
        html += "<h3>Key Decisions:</h3><ul>";
        roleData.key_decisions.forEach((dec) => {
          html += `<li>${dec}</li>`;
        });
        html += "</ul>";
      }
      html += "</div>";
    }
    return html;
  });
  function startTrial(caseData, role, type) {
    currentCase.value = caseData;
    playerRole.value = role;
    caseType.value = type;
    isActive.value = true;
    currentTurn.value = "judge";
    trialPhase.value = "opening";
    messages.value = [];
    evidence.value = [];
    objections.value = [];
    participants.value.clear();
  }
  function addMessage(message) {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: Date.now()
    };
    messages.value.push(newMessage);
  }
  function addEvidence(evidence2) {
    evidence2.id = `ev-${Date.now()}-${Math.random()}`;
    evidence2.value.push(evidence2);
  }
  function addObjection(objection) {
    objection.id = `obj-${Date.now()}-${Math.random()}`;
    objections.value.push(objection);
  }
  function advanceTurn() {
    const turnOrder = ["judge", "prosecutor", "defense", "witness", "jury"];
    const currentIndex = turnOrder.indexOf(currentTurn.value || "");
    const nextIndex = (currentIndex + 1) % turnOrder.length;
    currentTurn.value = turnOrder[nextIndex];
  }
  function endTrial() {
    currentCase.value = null;
    playerRole.value = null;
    caseType.value = null;
    isActive.value = false;
    isSinglePlayer.value = false;
    currentTurn.value = null;
    trialPhase.value = "opening";
    messages.value = [];
    evidence.value = [];
    objections.value = [];
    participants.value.clear();
  }
  return {
    currentCase,
    playerRole,
    caseType,
    isActive,
    isSinglePlayer,
    currentTurn,
    trialPhase,
    messages,
    evidence,
    objections,
    participants,
    caseDetailsHtml,
    startTrial,
    addMessage,
    addEvidence,
    addObjection,
    advanceTurn,
    endTrial
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mock-trial",
  __ssrInlineRender: true,
  setup(__props) {
    const { warning, info } = useToast();
    const lobbyConnection = useLobbyConnection();
    useTrialState();
    const {
      isReconnecting,
      reconnectAttempts,
      reconnectCountdown
    } = lobbyConnection;
    const showLobby = ref(false);
    const showTrialSetup = ref(false);
    const showSimulation = ref(false);
    const showTrialInterface = ref(false);
    const isSinglePlayer = ref(false);
    const isLoading = ref(false);
    const lobbyCodeError = ref("");
    const lobbyCodeInput = ref("");
    const lobbyCode = ref("");
    const isLobbyLeader = ref(false);
    const selectedCaseType = ref(null);
    const selectedCase = ref(null);
    const availableCases = ref([]);
    const players = ref([]);
    const playerCount = computed(() => players.value.length);
    const setupCaseType = ref(null);
    const setupRole = ref(null);
    const courtroomLoading = ref(false);
    const courtroomError = ref(false);
    const caseDetailsHtml = ref("");
    const chatMessages = ref([]);
    const chatInput = ref("");
    const chatRecipient = ref("all");
    const currentTurn = ref(null);
    const turnOrder = ["judge", "prosecutor", "defense", "witness", "jury"];
    const evidenceList = ref([]);
    const evidenceInput = ref("");
    const objectionTypes = [
      { id: "hearsay", label: "Hearsay" },
      { id: "relevance", label: "Irrelevant" },
      { id: "leading", label: "Leading Question" },
      { id: "speculation", label: "Speculation" },
      { id: "argumentative", label: "Argumentative" }
    ];
    const pendingObjections = ref([]);
    const verdictPhase = ref(false);
    ref({});
    const finalVerdict = ref(null);
    const availableRoles = ref([
      { id: "judge", name: "Judge", description: "Oversee the trial and make rulings", claimedBy: null },
      { id: "prosecutor", name: "Prosecutor", description: "Present the case against the defendant", claimedBy: null },
      { id: "defense", name: "Defense", description: "Defend the accused", claimedBy: null },
      { id: "witness", name: "Witness", description: "Testify about case events", claimedBy: null },
      { id: "jury", name: "Jury", description: "Decide the verdict", claimedBy: null }
    ]);
    const canStartTrial = computed(() => {
      return selectedCase.value && availableRoles.value.some((r) => r.claimedBy === "You");
    });
    function handleReconnectCancel() {
      lobbyConnection.disconnect();
      showLobby.value = false;
      showTrialSetup.value = false;
      showSimulation.value = false;
      warning("Reconnection cancelled - returned to lobby selection");
    }
    function isMyTurn() {
      return currentTurn.value === setupRole.value;
    }
    watch(showSimulation, (newValue) => {
      if (newValue && !currentTurn.value) {
        currentTurn.value = turnOrder[0];
        currentTurn.value = "judge";
        info("Trial session started. Judge has the floor.");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ToastContainer = __nuxt_component_0;
      const _component_ReconnectionDialog = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mock-trial-page" }, _attrs))} data-v-9ddb44c4>`);
      _push(ssrRenderComponent(_component_ToastContainer, null, null, _parent));
      _push(ssrRenderComponent(_component_ReconnectionDialog, {
        show: unref(isReconnecting),
        attempts: unref(reconnectAttempts),
        countdown: unref(reconnectCountdown),
        onCancel: handleReconnectCancel
      }, null, _parent));
      _push(`<main id="main-content" data-v-9ddb44c4><h1 data-v-9ddb44c4>Mock Trial Simulator</h1><p data-v-9ddb44c4>Experience an interactive court simulation with AI-powered roles. Choose your role and participate in a realistic trial proceeding.</p>`);
      if (!showLobby.value && !showTrialSetup.value && !showSimulation.value) {
        _push(`<div class="mode-selection" role="navigation" aria-label="Trial mode selection" data-v-9ddb44c4><button class="mode-button"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} aria-label="Start single player trial" data-v-9ddb44c4> Single Player </button><button class="mode-button"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} aria-label="Create multiplayer lobby" data-v-9ddb44c4>`);
        if (!isLoading.value) {
          _push(`<span data-v-9ddb44c4>Create Lobby</span>`);
        } else {
          _push(`<span class="loading" data-v-9ddb44c4>Creating...</span>`);
        }
        _push(`</button><div class="join-section" data-v-9ddb44c4><input${ssrRenderAttr("value", lobbyCodeInput.value)} type="text" id="lobby-code" placeholder="Enter Lobby Code" maxlength="6" class="${ssrRenderClass({ "input-error": lobbyCodeError.value })}"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} aria-label="Lobby code input" aria-describedby="lobby-code-error"${ssrRenderAttr("aria-invalid", !!lobbyCodeError.value)} tabindex="0" data-v-9ddb44c4><button class="mode-button"${ssrIncludeBooleanAttr(isLoading.value || !lobbyCodeInput.value.trim()) ? " disabled" : ""} aria-label="Join existing lobby" data-v-9ddb44c4>`);
        if (!isLoading.value) {
          _push(`<span data-v-9ddb44c4>Join Lobby</span>`);
        } else {
          _push(`<span class="loading" data-v-9ddb44c4>Joining...</span>`);
        }
        _push(`</button></div>`);
        if (lobbyCodeError.value) {
          _push(`<span class="error-message" id="lobby-code-error" role="alert" data-v-9ddb44c4>${ssrInterpolate(lobbyCodeError.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showLobby.value) {
        _push(`<div class="lobby-interface" data-v-9ddb44c4><div class="lobby-header" data-v-9ddb44c4><h2 data-v-9ddb44c4>Trial Lobby</h2><div class="lobby-code-display" data-v-9ddb44c4> Lobby Code: <span data-v-9ddb44c4>${ssrInterpolate(lobbyCode.value)}</span></div></div><div class="lobby-content" data-v-9ddb44c4>`);
        if (isLobbyLeader.value) {
          _push(`<div class="lobby-settings" data-v-9ddb44c4><div class="case-selection" data-v-9ddb44c4><h3 data-v-9ddb44c4>Select Case Type</h3><div class="toggle-buttons" data-v-9ddb44c4><button class="${ssrRenderClass([{ selected: selectedCaseType.value === "criminal" }, "toggle-button"])}" data-v-9ddb44c4> Criminal </button><button class="${ssrRenderClass([{ selected: selectedCaseType.value === "civil" }, "toggle-button"])}" data-v-9ddb44c4> Civil </button></div></div>`);
          if (selectedCaseType.value) {
            _push(`<div class="case-browser" data-v-9ddb44c4><h3 data-v-9ddb44c4>Select Case</h3>`);
            if (availableCases.value.length > 0) {
              _push(`<div class="case-list" data-v-9ddb44c4><!--[-->`);
              ssrRenderList(availableCases.value, (caseItem) => {
                _push(`<div class="${ssrRenderClass([{ selected: selectedCase.value?.id === caseItem.id }, "case-card"])}" data-v-9ddb44c4><div class="case-card-header" data-v-9ddb44c4><h4 data-v-9ddb44c4>${ssrInterpolate(caseItem.title)}</h4>`);
                if (caseItem.difficulty) {
                  _push(`<span class="case-difficulty" data-v-9ddb44c4>${ssrInterpolate(caseItem.difficulty)}</span>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div><p class="case-description" data-v-9ddb44c4>${ssrInterpolate(caseItem.description)}</p>`);
                if (selectedCase.value?.id === caseItem.id) {
                  _push(`<div class="selected-badge" data-v-9ddb44c4>✓ Selected</div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</div>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<div class="no-cases" data-v-9ddb44c4><p data-v-9ddb44c4>Loading cases...</p></div>`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (!isLobbyLeader.value && selectedCase.value) {
            _push(`<div class="selected-case-display" data-v-9ddb44c4><h3 data-v-9ddb44c4>Selected Case</h3><div class="case-card selected" data-v-9ddb44c4><div class="case-card-header" data-v-9ddb44c4><h4 data-v-9ddb44c4>${ssrInterpolate(selectedCase.value.title)}</h4>`);
            if (selectedCase.value.difficulty) {
              _push(`<span class="case-difficulty" data-v-9ddb44c4>${ssrInterpolate(selectedCase.value.difficulty)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><p class="case-description" data-v-9ddb44c4>${ssrInterpolate(selectedCase.value.description)}</p></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (!isLobbyLeader.value && !selectedCase.value) {
            _push(`<div class="waiting-message" data-v-9ddb44c4><p data-v-9ddb44c4>⏳ Waiting for leader to select a case...</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="players-section" data-v-9ddb44c4><div class="players-header" data-v-9ddb44c4><h3 data-v-9ddb44c4>Players</h3><div class="player-count" data-v-9ddb44c4><span data-v-9ddb44c4>${ssrInterpolate(playerCount.value)}</span> / 5 </div></div><div class="players-list" data-v-9ddb44c4><!--[-->`);
        ssrRenderList(players.value, (player) => {
          _push(`<div class="player-item" data-v-9ddb44c4><div class="player-avatar" data-v-9ddb44c4>${ssrInterpolate(player.name.charAt(0).toUpperCase())}</div><div class="player-info" data-v-9ddb44c4><span class="player-name" data-v-9ddb44c4>${ssrInterpolate(player.name)}</span>`);
          if (player.role) {
            _push(`<span class="player-role" data-v-9ddb44c4>${ssrInterpolate(player.role)}</span>`);
          } else {
            _push(`<span class="player-role no-role" data-v-9ddb44c4>No role</span>`);
          }
          _push(`</div>`);
          if (player.isLeader) {
            _push(`<span class="leader-badge" data-v-9ddb44c4>👑</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="roles-header" data-v-9ddb44c4><h3 data-v-9ddb44c4>Roles</h3><div class="role-status" data-v-9ddb44c4>Click to claim</div></div><div class="role-list" data-v-9ddb44c4><!--[-->`);
        ssrRenderList(availableRoles.value, (role) => {
          _push(`<div class="${ssrRenderClass([{ claimed: role.claimedBy }, "role-item"])}" data-v-9ddb44c4><div class="role-info" data-v-9ddb44c4><span class="role-name" data-v-9ddb44c4>${ssrInterpolate(role.name)}</span><span class="role-description" data-v-9ddb44c4>${ssrInterpolate(role.description)}</span></div><span class="player-name" data-v-9ddb44c4>${ssrInterpolate(role.claimedBy || "Unclaimed")}</span></div>`);
        });
        _push(`<!--]--></div></div></div><div class="lobby-controls" data-v-9ddb44c4><button class="start-button"${ssrIncludeBooleanAttr(!canStartTrial.value || isLoading.value) ? " disabled" : ""} data-v-9ddb44c4>`);
        if (!isLoading.value) {
          _push(`<span data-v-9ddb44c4>Start Trial</span>`);
        } else {
          _push(`<span class="loading" data-v-9ddb44c4>Starting...</span>`);
        }
        _push(`</button><button class="leave-button"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-9ddb44c4> Leave Lobby </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showTrialSetup.value) {
        _push(`<form class="trial-setup" role="form" aria-label="Trial setup form" data-v-9ddb44c4><section class="selection-row visible" data-v-9ddb44c4><h2 data-v-9ddb44c4>Select Case Type</h2><div class="card-container" data-v-9ddb44c4><div class="${ssrRenderClass([{ selected: setupCaseType.value === "criminal" }, "selection-card"])}" role="button" tabindex="0" aria-label="Select criminal case type" data-v-9ddb44c4><h3 data-v-9ddb44c4>Criminal Case</h3><p data-v-9ddb44c4>Government prosecution of an individual for alleged criminal conduct</p></div><div class="${ssrRenderClass([{ selected: setupCaseType.value === "civil" }, "selection-card"])}" role="button" tabindex="0" aria-label="Select civil case type" data-v-9ddb44c4><h3 data-v-9ddb44c4>Civil Case</h3><p data-v-9ddb44c4>Dispute between parties seeking to resolve legal obligations</p></div></div></section><section class="${ssrRenderClass([{ visible: setupCaseType.value }, "selection-row"])}" data-v-9ddb44c4><h2 data-v-9ddb44c4>Select Your Role</h2><div class="card-container"${ssrRenderAttr("data-case-type", setupCaseType.value)} data-v-9ddb44c4><div class="${ssrRenderClass([{ selected: setupRole.value === "judge" }, "selection-card"])}" data-v-9ddb44c4><h3 data-v-9ddb44c4>Judge</h3><p data-v-9ddb44c4>Preside over the trial, make rulings on objections, and ensure proper court procedure</p></div><div class="${ssrRenderClass([{ selected: setupRole.value === "prosecutor" }, "selection-card criminal-role"])}" data-v-9ddb44c4><h3 data-v-9ddb44c4>Prosecutor</h3><p data-v-9ddb44c4>Represent the government in criminal cases, present evidence, and examine witnesses</p></div><div class="${ssrRenderClass([{ selected: setupRole.value === "plaintiff" }, "selection-card civil-role"])}" data-v-9ddb44c4><h3 data-v-9ddb44c4>Plaintiff</h3><p data-v-9ddb44c4>The party initiating the civil lawsuit, presents evidence to prove their case</p></div><div class="${ssrRenderClass([{ selected: setupRole.value === "defense" }, "selection-card"])}" data-v-9ddb44c4><h3 data-v-9ddb44c4>Defense</h3><p data-v-9ddb44c4>Represent the defendant, challenge evidence, and present defense arguments</p></div><div class="${ssrRenderClass([{ selected: setupRole.value === "witness" }, "selection-card"])}" data-v-9ddb44c4><h3 data-v-9ddb44c4>Witness</h3><p data-v-9ddb44c4>Provide testimony and respond to questioning from both sides</p></div><div class="${ssrRenderClass([{ selected: setupRole.value === "jury" }, "selection-card center-card"])}" data-v-9ddb44c4><h3 data-v-9ddb44c4>Jury</h3><p data-v-9ddb44c4>Listen to evidence and arguments, deliberate, and reach a verdict</p></div></div></section><div class="confirm-button-container" data-v-9ddb44c4><button type="submit" class="confirm-button"${ssrIncludeBooleanAttr(!setupCaseType.value || !setupRole.value || isLoading.value) ? " disabled" : ""} aria-label="Begin trial" data-v-9ddb44c4>`);
        if (!isLoading.value) {
          _push(`<span data-v-9ddb44c4>Begin Trial</span>`);
        } else {
          _push(`<span class="loading" data-v-9ddb44c4>Starting...</span>`);
        }
        _push(`</button></div></form>`);
      } else {
        _push(`<!---->`);
      }
      if (showTrialInterface.value) {
        _push(`<div id="trial-interface" data-v-9ddb44c4><div class="courtroom-container" data-v-9ddb44c4><canvas id="renderCanvas" touch-action="none" data-v-9ddb44c4></canvas>`);
        if (courtroomLoading.value) {
          _push(`<div class="canvas-loading" data-v-9ddb44c4> Loading 3D courtroom... </div>`);
        } else {
          _push(`<!---->`);
        }
        if (courtroomError.value) {
          _push(`<div class="canvas-error" role="alert" data-v-9ddb44c4><span data-v-9ddb44c4>Failed to load 3D courtroom</span><button class="error-retry-button" aria-label="Retry loading 3D courtroom" data-v-9ddb44c4> Retry </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showSimulation.value) {
        _push(`<section class="${ssrRenderClass([{ "single-player": isSinglePlayer.value }, "simulation-area"])}" data-v-9ddb44c4><div class="trial-content" data-v-9ddb44c4><div class="case-info" data-v-9ddb44c4><h2 data-v-9ddb44c4>Case Information</h2><div id="case-details" data-v-9ddb44c4>${caseDetailsHtml.value ?? ""}</div></div>`);
        if (currentTurn.value) {
          _push(`<div class="turn-indicator" data-v-9ddb44c4><strong data-v-9ddb44c4>Current Turn:</strong> ${ssrInterpolate(currentTurn.value.charAt(0).toUpperCase() + currentTurn.value.slice(1))} `);
          if (isMyTurn()) {
            _push(`<span class="your-turn" data-v-9ddb44c4>👈 Your turn!</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (evidenceList.value.length > 0) {
          _push(`<div class="evidence-section" data-v-9ddb44c4><h3 data-v-9ddb44c4>Evidence</h3><!--[-->`);
          ssrRenderList(evidenceList.value, (ev) => {
            _push(`<div class="${ssrRenderClass([{ admitted: ev.admitted }, "evidence-item"])}" data-v-9ddb44c4><p data-v-9ddb44c4>${ssrInterpolate(ev.description)}</p><span class="evidence-status" data-v-9ddb44c4>${ssrInterpolate(ev.admitted ? "✓ Admitted" : "Pending")}</span>`);
            if (setupRole.value === "judge" && !ev.admitted) {
              _push(`<div class="evidence-actions" data-v-9ddb44c4><button class="btn-admit" data-v-9ddb44c4>Admit</button><button class="btn-deny" data-v-9ddb44c4>Deny</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (pendingObjections.value.length > 0) {
          _push(`<div class="objections-section" data-v-9ddb44c4><h3 data-v-9ddb44c4>Objections</h3><!--[-->`);
          ssrRenderList(pendingObjections.value, (obj) => {
            _push(`<div class="objection-item" data-v-9ddb44c4><p data-v-9ddb44c4><strong data-v-9ddb44c4>${ssrInterpolate(obj.type)}</strong> by ${ssrInterpolate(obj.madeBy)}</p>`);
            if (obj.ruling) {
              _push(`<span class="ruling" data-v-9ddb44c4>${ssrInterpolate(obj.ruling.toUpperCase())}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (setupRole.value === "judge" && !obj.ruling) {
              _push(`<div class="objection-actions" data-v-9ddb44c4><button class="btn-sustain" data-v-9ddb44c4>Sustain</button><button class="btn-overrule" data-v-9ddb44c4>Overrule</button></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (verdictPhase.value) {
          _push(`<div class="verdict-section" data-v-9ddb44c4><h2 data-v-9ddb44c4>Jury Deliberation</h2><p data-v-9ddb44c4>Cast your verdict:</p><div class="verdict-buttons" data-v-9ddb44c4><button class="btn-verdict btn-guilty" data-v-9ddb44c4>${ssrInterpolate(setupCaseType.value === "criminal" ? "Guilty" : "Liable")}</button><button class="btn-verdict btn-not-guilty" data-v-9ddb44c4>${ssrInterpolate(setupCaseType.value === "criminal" ? "Not Guilty" : "Not Liable")}</button></div>`);
          if (finalVerdict.value) {
            _push(`<div class="final-verdict" data-v-9ddb44c4><h2 data-v-9ddb44c4>Final Verdict: ${ssrInterpolate(finalVerdict.value)}</h2><button class="btn-end-trial" data-v-9ddb44c4>End Trial</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="trial-controls" data-v-9ddb44c4><div id="interaction-area" class="interaction-area" data-v-9ddb44c4><h3 data-v-9ddb44c4>Actions</h3>`);
        if (setupRole.value === "judge") {
          _push(`<div class="role-actions" data-v-9ddb44c4><button${ssrIncludeBooleanAttr(!isMyTurn()) ? " disabled" : ""} aria-label="Call witness to stand" data-v-9ddb44c4>Call Witness</button><button aria-label="Advance to next turn" data-v-9ddb44c4>Advance Turn</button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (setupRole.value === "prosecutor" || setupRole.value === "defense") {
          _push(`<div class="role-actions" data-v-9ddb44c4><button${ssrIncludeBooleanAttr(!isMyTurn()) ? " disabled" : ""} aria-label="Examine witness" data-v-9ddb44c4>Examine Witness</button><div class="evidence-input-group" data-v-9ddb44c4><input${ssrRenderAttr("value", evidenceInput.value)} type="text" placeholder="Describe evidence..." aria-label="Evidence description" data-v-9ddb44c4><button${ssrIncludeBooleanAttr(!isMyTurn()) ? " disabled" : ""} aria-label="Present evidence" data-v-9ddb44c4>Present Evidence</button></div><div class="objection-buttons" data-v-9ddb44c4><!--[-->`);
          ssrRenderList(objectionTypes, (objType) => {
            _push(`<button${ssrIncludeBooleanAttr(!isMyTurn()) ? " disabled" : ""} class="btn-objection" data-v-9ddb44c4>${ssrInterpolate(objType.label)}</button>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (setupRole.value === "witness") {
          _push(`<div class="role-actions" data-v-9ddb44c4><button${ssrIncludeBooleanAttr(!isMyTurn()) ? " disabled" : ""} aria-label="Respond to question" data-v-9ddb44c4>Respond to Question</button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (setupRole.value === "jury") {
          _push(`<div class="role-actions" data-v-9ddb44c4><button aria-label="Begin jury deliberation" data-v-9ddb44c4>Begin Deliberation</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="btn-end-trial" data-v-9ddb44c4>End Trial</button></div><div id="chat-interface" class="chat-interface" data-v-9ddb44c4><h3 data-v-9ddb44c4>Chat</h3><div class="chat-messages" id="chat-messages" data-v-9ddb44c4><!--[-->`);
        ssrRenderList(chatMessages.value, (msg) => {
          _push(`<div class="chat-message" data-v-9ddb44c4><strong data-v-9ddb44c4>${ssrInterpolate(msg.sender)}:</strong> ${ssrInterpolate(msg.content)}</div>`);
        });
        _push(`<!--]--></div><div class="chat-input-container" data-v-9ddb44c4><select id="chat-recipient" class="chat-recipient" aria-label="Message recipient" data-v-9ddb44c4><option value="all" data-v-9ddb44c4${ssrIncludeBooleanAttr(Array.isArray(chatRecipient.value) ? ssrLooseContain(chatRecipient.value, "all") : ssrLooseEqual(chatRecipient.value, "all")) ? " selected" : ""}>Everyone</option><option value="judge" data-v-9ddb44c4${ssrIncludeBooleanAttr(Array.isArray(chatRecipient.value) ? ssrLooseContain(chatRecipient.value, "judge") : ssrLooseEqual(chatRecipient.value, "judge")) ? " selected" : ""}>Judge</option><option value="prosecutor" data-v-9ddb44c4${ssrIncludeBooleanAttr(Array.isArray(chatRecipient.value) ? ssrLooseContain(chatRecipient.value, "prosecutor") : ssrLooseEqual(chatRecipient.value, "prosecutor")) ? " selected" : ""}>Prosecutor</option><option value="defense" data-v-9ddb44c4${ssrIncludeBooleanAttr(Array.isArray(chatRecipient.value) ? ssrLooseContain(chatRecipient.value, "defense") : ssrLooseEqual(chatRecipient.value, "defense")) ? " selected" : ""}>Defense</option><option value="witness" data-v-9ddb44c4${ssrIncludeBooleanAttr(Array.isArray(chatRecipient.value) ? ssrLooseContain(chatRecipient.value, "witness") : ssrLooseEqual(chatRecipient.value, "witness")) ? " selected" : ""}>Witness</option><option value="jury" data-v-9ddb44c4${ssrIncludeBooleanAttr(Array.isArray(chatRecipient.value) ? ssrLooseContain(chatRecipient.value, "jury") : ssrLooseEqual(chatRecipient.value, "jury")) ? " selected" : ""}>Jury</option></select><input${ssrRenderAttr("value", chatInput.value)} type="text" id="chat-input" class="chat-input" placeholder="Type your message..." autocomplete="off" data-v-9ddb44c4><button id="chat-send" class="chat-send" data-v-9ddb44c4>Send</button></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mock-trial.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mockTrial = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ddb44c4"]]);

export { mockTrial as default };
//# sourceMappingURL=mock-trial-CYfFQhhh.mjs.map
