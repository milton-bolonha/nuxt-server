import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "game",
  __ssrInlineRender: true,
  setup(__props) {
    const gameStarted = ref(false);
    const currentLives = ref(3);
    const currentQuestionIndex = ref(0);
    const textAnswer = ref("");
    const isGameOver = ref(false);
    const isVictory = ref(false);
    const questions = [
      {
        type: "multiple-choice",
        text: "What branch of government is established in Article I of the nUSA Constitution?",
        options: ["Legislative", "Executive", "Judicial", "Municipal"],
        answer: "Legislative"
      }
    ];
    const currentQuestionData = computed(() => {
      return questions[currentQuestionIndex.value];
    });
    const progressPercentage = computed(() => {
      return (currentQuestionIndex.value + 1) / questions.length * 100;
    });
    const gameEnded = computed(() => isGameOver.value || isVictory.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "game-page" }, _attrs))}>`);
      if (!unref(gameStarted)) {
        _push(`<div id="main-menu"><h1 class="game-title">The Impossible<br>nUSA Quiz</h1><button id="start-btn">Start the Quiz!</button></div>`);
      } else {
        _push(`<div id="game-container"><div id="lives"><!--[-->`);
        ssrRenderList(unref(currentLives), (life, index) => {
          _push(`<div class="life"></div>`);
        });
        _push(`<!--]--></div><div id="progress-bar"><div id="progress" style="${ssrRenderStyle({ width: unref(progressPercentage) + "%" })}"></div></div>`);
        if (!unref(gameEnded)) {
          _push(`<div id="question-container"><div id="question">${ssrInterpolate(unref(currentQuestionData)?.text)}</div><div id="answer-container">`);
          if (unref(currentQuestionData)?.type === "multiple-choice") {
            _push(`<!--[-->`);
            ssrRenderList(unref(currentQuestionData).options, (option, index) => {
              _push(`<button class="answer-btn">${ssrInterpolate(option)}</button>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (unref(currentQuestionData)?.type === "text-input") {
            _push(`<!--[--><input${ssrRenderAttr("value", unref(textAnswer))} type="text" id="answer-input"><button id="submit-btn">Submit</button><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isGameOver)) {
          _push(`<div class="game-over">Game Over!</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isVictory)) {
          _push(`<div class="victory">Congratulations! You&#39;ve Won!</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(gameEnded)) {
          _push(`<button class="restart-btn">Play Again</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/game.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=game-ndQTxd8G.mjs.map
