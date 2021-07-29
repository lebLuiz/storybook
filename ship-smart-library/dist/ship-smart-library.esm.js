//
//
//
//
//
//
var script$e = {
  name: 'BoxContent'
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "box-content"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$e = [];
/* style */

const __vue_inject_styles__$e = function (inject) {
  if (!inject) return;
  inject("data-v-7627c0c5_0", {
    source: ".box-content{width:100%;max-width:470px;border-radius:40px;box-shadow:0 1px 24px rgba(35,34,39,.1);padding:40px 100px;background-color:#fff}@media only screen and (max-width:550px){.box-content{max-width:100%;border-radius:0;box-shadow:none;padding:0;background-color:transparent}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$e = undefined;
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$e = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
var script$d = {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    },
    typeColor: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: false
    },
    //Button roundedBall:
    roundedBall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    handleTypesBtn() {
      return {
        //Types:
        '--primary': this.typeColor === 'primary' ? true : false,
        '--secondary': this.typeColor === 'secondary' ? true : false,
        //Disabled:
        '--disabled': this.disabled || this.loading
      };
    }

  }
};

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    class: [{
      '--rounded-ball': _vm.roundedBall
    }, _vm.handleTypesBtn],
    attrs: {
      "title": _vm.title,
      "disabled": _vm.disabled || _vm.loading
    },
    on: {
      "click": function ($event) {
        return _vm.$emit('onClick');
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.loading ? 'Loading...' : _vm.text) + "\n")]);
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = function (inject) {
  if (!inject) return;
  inject("data-v-56731f35_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);button[data-v-56731f35]{background:#fbbe2f;color:#fff;box-shadow:0 1px 24px rgba(35,34,39,.1);border-radius:40px;border:none;outline:0;cursor:pointer;width:100%;max-width:425px;min-height:44px;justify-content:center;align-items:center;font-family:Montserrat;font-style:normal;font-weight:700;font-size:14px;line-height:17px;text-align:center}button.--rounded-ball[data-v-56731f35]{border-radius:50%;height:70px;width:70px;font-weight:400;line-height:44px}button.--disabled[data-v-56731f35]{cursor:not-allowed;background:#fbbe2f;color:#fff;border:.1px solid rgba(56,56,56,.11)}button.--primary[data-v-56731f35]{background:#fbbe2f;color:#fff}button.--primary.--disabled[data-v-56731f35]{cursor:not-allowed;background:#fbbe2fa6;color:#00000040;border:.1px solid rgba(56,56,56,.11)}button.--secondary[data-v-56731f35]{background:#fff;color:#000}button.--secondary.--disabled[data-v-56731f35]{cursor:not-allowed;background:#e5e5e5a8;color:#00000063;border:.1px solid rgba(56,56,56,.11)}@media only screen and (max-width:550px){button.--rounded-ball[data-v-56731f35]{width:24px;height:24px;min-height:0;line-height:normal}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$d = "data-v-56731f35";
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$c = {
  name: 'BoxButtons',
  props: {
    step: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: Infinity
    },
    textBtnBack: {
      type: String,
      required: true
    },
    textBtnAdvance: {
      type: String,
      required: true
    },
    backTitle: {
      type: String,
      required: false
    },
    advancedTitle: {
      type: String,
      required: false
    },
    typeColor: {
      type: String,
      default: 'primary'
    },
    backDisabled: {
      type: Boolean
    },
    advancedDisabled: {
      type: Boolean
    }
  },
  computed: {
    handleTypesBtn() {
      return {
        //Types:
        '--primary': this.typeColor === 'primary' ? true : false,
        '--secondary': this.typeColor === 'secondary' ? true : false
      };
    }

  },
  methods: {
    backOne() {
      this.$emit('stepValue', 'back');
    },

    advanceOne() {
      this.$emit('stepValue', 'advance');
    }

  }
};

/* script */
const __vue_script__$c = script$c;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "principal-box-progress"
  }, [_vm.step > 1 ? _c('button', {
    staticClass: "btn-step",
    class: [{
      '--disabled': _vm.backDisabled
    }, _vm.handleTypesBtn],
    attrs: {
      "title": _vm.backTitle,
      "disabled": _vm.step <= 1 || _vm.backDisabled
    },
    on: {
      "click": _vm.backOne
    }
  }, [_vm._v("\n        " + _vm._s(_vm.textBtnBack) + "\n    ")]) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "btn-step",
    class: [{
      '--disabled': _vm.advancedDisabled
    }, _vm.handleTypesBtn],
    attrs: {
      "title": _vm.advancedTitle,
      "disabled": _vm.advancedDisabled
    },
    on: {
      "click": _vm.advanceOne
    }
  }, [_vm._v("\n        " + _vm._s(_vm.textBtnAdvance) + "\n    ")])]);
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = function (inject) {
  if (!inject) return;
  inject("data-v-18c4d902_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.principal-box-progress[data-v-18c4d902]{display:flex;width:100%;justify-content:flex-end;align-items:center;column-gap:10px}.principal-box-progress .btn-step[data-v-18c4d902]{background:#fbbe2f;color:#fff;box-shadow:0 1px 24px rgba(35,34,39,.1);border-radius:40px;border:none;outline:0;cursor:pointer;width:100%;max-width:250px;min-height:44px;justify-content:center;align-items:center;font-family:Montserrat;font-style:normal;font-weight:700;font-size:14px;line-height:17px;text-align:center}.principal-box-progress .btn-step.--disabled[data-v-18c4d902]{cursor:not-allowed;background:#fbbe2f;color:#fff;border:.1px solid rgba(56,56,56,.11)}.principal-box-progress .btn-step.--primary[data-v-18c4d902]{background:#fbbe2f;color:#fff}.principal-box-progress .btn-step.--primary.--disabled[data-v-18c4d902]{cursor:not-allowed;background:#fbbe2fa6;color:#00000040;border:.1px solid rgba(56,56,56,.11)}.principal-box-progress .btn-step.--secondary[data-v-18c4d902]{background:#fff;color:#000}.principal-box-progress .btn-step.--secondary.--disabled[data-v-18c4d902]{cursor:not-allowed;background:#e5e5e5a8;color:#00000063;border:.1px solid rgba(56,56,56,.11)}@media only screen and (max-width:550px){.principal-box-progress .btn-step[data-v-18c4d902]{font-size:18px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$c = "data-v-18c4d902";
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$b = {
  name: 'Footer',
  props: {
    withLink: {
      type: Boolean,
      default: false
    },
    titleLink: {
      type: String,
      required: false
    },
    hrefLink: {
      type: String,
      required: false
    },
    images: {
      type: Array,
      required: false
    }
  }
};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('footer', [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "footer-content"
  }, [_vm.withLink ? _c('a', {
    staticClass: "link-footer",
    style: {
      'fontSize': _vm.size + "px",
      'fontWeight': _vm.weight ? _vm.weight : ''
    },
    attrs: {
      "href": _vm.hrefLink,
      "target": "_blank"
    }
  }, [_vm._v(_vm._s(_vm.titleLink))]) : _vm._e(), _vm._v(" "), _vm.images != null && _vm.images.length > 0 ? _c('div', {
    staticClass: "imgs"
  }, _vm._l(_vm.images, function (img, i) {
    return _c('img', {
      key: i,
      staticClass: "img",
      attrs: {
        "src": img
      }
    });
  }), 0) : _c('div', {
    staticClass: "img-footer"
  }, [_c('svg', {
    attrs: {
      "width": "274",
      "height": "74",
      "viewBox": "0 0 274 74",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-1438.19",
      "y": "-738.932",
      "width": "1771.7",
      "height": "896.389",
      "fill": "url(#pattern0)"
    }
  }), _vm._v(" "), _c('defs', [_c('pattern', {
    attrs: {
      "id": "pattern0",
      "patternContentUnits": "objectBoundingBox",
      "width": "1",
      "height": "1"
    }
  }, [_c('use', {
    attrs: {
      "xlink:href": "#image0",
      "transform": "translate(-0.000282497) scale(0.000566571 0.00111982)"
    }
  })]), _vm._v(" "), _c('image', {
    attrs: {
      "id": "image0",
      "width": "1766",
      "height": "893",
      "xlink:href": "data:image/png;base64,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mUCiKf/TpSbXrVuXX3Wv3zP9DLj1VitzbYn2s/ybb07b1hu6hOUOXfrzlptvlu66X5+n5Wfdz2358uVWBtzo6GhX4DF3O31vukm6dO4siRs3Wtlzud8vymsTkNui+8SZveaMr9O4KG1yLgIIIIAAAggggAACCCCAAAIIIIAAAggggIAPBDQI93eWn6ScMNstEZDzwRUo812ylKWPL5HJ9ArXzLYPP/xQPvv8c2nfvr10u/xyadu2rUdBNZNd9v0PP8ibM2bI7t27rT3nzP51xVlMENHs4WYCZSZTbfS//y1vvv66hIaGFmc3YrLmTCDM7DFnsv/e/+9/raBY7my4n3/+WT766CNrrnfffbfHy2seP35clnz5pRXYG3znna4AaV6TqaVLTQ7RPn7SPl/TOT80cqS1z19edT09ZvYQ/Egz8cweeYPUt0qVKp42QX0EEEAAAQQQQAABBBBAAAEEEEAAAQQQQACBIgjsG7q8CGdzKgKFFyAwV3irEqlplkds06aNNNEsse07dkj06NFWP0FBQRLWurW00v3Mmp57rpj94mrpMbPnmcmwOqSBuL/++staVnH977/LH5s2WfvKmZNNYOe+e++VatWqFfuY77zjDvlh5Upr+UiTaXZply4y/P775Zb+/a1MLxO8K47910zA8t+619y3330nK1assIKOfSIjXfMxQbXHn3zSmvM111xj7c/nerOQT8zyoQu/+MLa2+1xDTLmt2+eee/SSy6RSy+9VL799lt5/Y03rPEVsqs8q5lAXEpKiox86CFr/7q2eh88OGJEnnU5iAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAuVfgMBcGbiGnTt1kmd0LzUTgPph1Sr5448/rP3VzDKL5lFQcQ8otWvXTvr362cF5go6z5v3TV/TNWPsojfjiKwAAEAASURBVA4dJHbOHPk1Pl7GTZggU6dNkws18y8iIsIKkrVo0cIKKpr92dzH50mfZp+5m6Oi5EPNijOPrppJaDLXTPn0008tm4YNGlhLdppAnqdlwYIFsnnzZrln6FBp2LBhgac3a9ZMrtU96H7Ra/Le++/L7bfdVqjzcjd87NgxK5D6k+4paLIBzTXupAG/sc8+Kw10PhQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBA4MwUIzJWB62qy424bNEj6aRDqhRdflPEa6LqiWzcr4LRLl6Xcu3evlVl19OhROXHihPj5+YkJRJ111lnWMo5NmzSRiZMnS2Jiolx15ZVisr/McpAlVUz/Q4cMsfZ0W6mBxC+/+kq+//57WeF4mLGZgJnZK65jx45y0403yiUXX+xVgO6RUaNkuWaoLVq8WO6+6y65SveR27dvn8zRpT9N1pzJljOBTU+LOfdVDTCerYaRmolXmCw/Y3pdnz4yc/Zs2aPZiouXLLEc8up7r47RZNUZKxOYzMrKkrS0NOu87du3i7mu5ndgQICYOd6m+wG2atWqRK9bXuPkGAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCJSeAIG50rMusKfAwEBruUpTsWnTpnKX7ntmAnFmyUPzsNlsVhvODDQTKDIPE/yZ/c471ntmGcuSDMpZnegPs6Tm+brMZsuWLeXWf/1Ljhw5IvEJCfLFokXyhS4PufXPP2XL1q1WsG7GzJlWkPGpmBipV6+es4lC/TbBqltvuUVeefVV+b/x463AnFne8kfNNjPBtCcff7xQQbXcnZmgmsmW63n11XKB7utX2GLGY4Kmb6v3119/bS3h6czic29j586d8qgGSN2LuX7mYQw6XnSRjBg+XPr07m0FWNlXzl2K5wgggAACCCCAAAIIIIAAAggggAACCCCAAAIInJkCJZdWdWZ6leqsTADOBMBMACpAM6tM4M48zHPzMMfN+85AXakOztGZ6duM5eyzz7aCXK9MmSKbNm6UH3/4QaIfecRaztIs3fjG9OkyZNgwSU5O9miYZr43asZdaGioFeR79913Zd78+VYG4aPR0VYA06MGtbIJds5++23LrpNm2zVq1KjQTZj5DtbMPRMMXbtunfy+YUOe555zzjnygO69d+8990jfm26ygph16tSxzmvXtq0M1qBrX51X/fr1rT0B82yEgwgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIHBGCZAxd0ZdzrIxGRO06qB70JnH/ffeay39OHPWLPnyf/+TZ8eOlddfe82jYGIH3bfuWl2y0mTe/UfPP3jokLRp00buv+8+ryZslvxM0L3xrOUrNYNtqWa+eVJMYC84OFi279ghCZolaJbpNHN2L2Z50RdfeMF1KDU11Vru89PPP5eFmlF45913y4033CAjR4yw9uVzVeQJAggggAACCCCAAAIIIIAAAggg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KsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAgTmKsylZqIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAK+FCAw50t9+kYAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEKgwAv4VZqZFmOjhw4eLcDanIoAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIV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H1J/BZ/0PU1/F+r2U7hft49y76Nc/fR8c5+pWz+1XfjfjbfeeisfUpcuXeI973lP/l2WlVf3LTknQIAAAQIECBAgsGkCAnOb5udpAgQIECBAgAABAltdIP0y/Ze//GV85Stfiddee63seHbeeee46qqr4hOf+EQe2ClbsYEb6Zf4c+bMif/+7/+O//qv/ypbM2X3pL7OOOOMSMGJ5pYUKPjxj3+ct9HQs8cdd1xccskl8aEPfahiQceG+tuS1suXL88N/uVf/qXskNI7/frXvx6nnXZak97p7373uxg1alTe3tlnnx3jxo1rtltpG6mtW265pdltlJ1QBW5UVVXFAw88EDfddFNMnTq1wRZPPfXU+NznPhdHHnlk2QBXQw2kvw/PP/983HbbbXHDDTeUrZr6Sd/T97///fHrX/86zjzzzA3qpoDZI488Eu973/tq3UvtH3LIIbWuFU5SEDw907t378Kl/PO+++6Lz3zmM7WupZPUx9ixY+PCCy+M5DRhwoT42te+VvZ/N9Lf469+9atxzjnnRNeuXTdozwUCBAgQIECAAAECBJovUJn/hLP5/XqCAAECBAgQIECAAIEKCEyePDnPbLngggtq/XI9/QK+8FPoJgXtLrroojjooIPiD3/4Q+Fykz9ToOjiiy+OI444YoOgXN2+VqxYEf/8z/8cBxxwQPz+979vch8pwy8F/AYOHLhBUK7QR/oslBSAOeWUU+LEE0+MefPmFS5vls8UAElLCTbHer/99ovf/va3zR7Pvffem2fElQbl6pt/eqf/+I//mI/r6aefbrSflNVVKK+//noxs6twrSmfpW0UMqya8tzmrpOCZMltl112iU996lONBuXSeO65554YPnx4HqycP39+s4aY+rv55pvzYFtDQblCPymI/IMf/CAefPDBsv2k/ePqltRPuVJf/VQ3ZVmWKz169MgzMFMwMn13Ggrmp7/Hl112WRx11FGRvi8KAQIECBAgQIAAAQKbLiBjbtMNtUCAAAECBAgQIEBgqwikzJerr7662HchYPVP//RPefBthx12iBQ4efTRR+PWW28tBmHSL+JPOumk+MlPfhIf+9jHis83dPDGG2/ERz7ykZg9e3axWuovZfeMHDky9tlnn/x6Cg6lLKxUUkAh/WI/ZQt94xvfiDFjxuTXy/2Rxprq/vGPfyxWSX2krLD07N57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v/7rv+KQQw4p2156h8mr7neu7AMlN+pmi5bcckiAAAECBAgQIECAQDsR2KadzNM0CRAgQIAAAQIECLQZgZSFdffdd0faj61Q0nJ96Zf+aQnEFBhKmUTpft1sspSZlfaKS/uEpYBOKinwcuKJJxaa2uAz7QmX+jvllFOKfaZn008KUp166qnRu3fvSPvHpWUo03KHpcG+FMBIGUjlAjvp/je/+c18ic1C8GnBggXx4Q9/OG//Yx/7WB6Y2n777eP//u//NshASssUjhs3Ls/GS/2mn5deeqnBINgGkyxzIY0t7Q02Y8aMPBstjS+1nzIBU/nCF76QBz2Tfdrvb/bs2fXuI5YCm1/5ylfK9LL+cmrv9ddfjxtvvLEYlEwZiuknBQjTEok77LBDLFq0KGbOnJlbr3868mDR+PHjIy3FWK4MHDgwvva1r+VtFoJvl156aZ55NmbMmNh3330jBTbT/nM//elPa73L9P256KKL8vdVrv0tfT29o2Sbvn/XXHNN0a2540jt/M///E+UBi7LtZG+y+l7cPnllzerv6ZmW5br13UCBAgQIECAAAECBFq/gMBc63+HZkCAAAECBAgQINBCBNauXVtrJIUgU62LFTjp2rVr3HvvvfHP//zPeeCk0E/6pX+5faxS0OHQQw+NtE9a2mPsl7/8ZXEkKcB2ySWX1Lt0X6FSCsikZ9KylqX7kj399NORfuorqc9U7rrrrnzvs/rqFK6l7LqnnnoqzjzzzDy4VZhTY+2npSxTkCkFZdKymylYkkrKbGsoOFXotymf2223XR40THaFvckK4yvnXWg3GXz+85/PA0fpvTVWUv1rr702z9g677zz8uqFvlImV/qpr6Tn0v5xKZCW3nNj5Ytf/GIeyE37/xXaT9+fFCCtr6T203fgvvvuiz59+pStV9+zW+JaGl+aS8p0+8QnPpF3WZhXY/03167QXgpipu9cCpg2pa+0t11abrSx70yh/c352dh46/5v2eYci7YJECBAgAABAgQItDcBS1m2tzduvgQIECBAgAABAptNIAUs0i/500/6JXz63FwlZWil5fR+85vfxP7771/st9B/6WdahjAtc/j73/8+D8qlMfXv37/4TMoua0omTwpQfe9734uHH344LrzwwuLzpXMs9Jvmf9NNN8W8efMaDcoVnt97773jkUceybPACn6F9up+pgBhWury29/+dqRMunS/dE6zZs2qd4+1Ql/N/Uz7jaUg4PPPP59nxNUdT33naYwp0y5luzUlKFc6ptNPPz1efvnluOWWWyK51Nd+4drxxx8fP/7xj/PMx6YE5VI/6dn0Dh999NH8/RTaqu/zoIMOyvdKS6YpQzItn1mol+wrVTp37lxst9B+4bOp/Zxwwgnx17/+NW6//fY46qijyrZXaDdlgf7sZz+LZ555pkkBzbpzTYHklLmYMh0Lbdb3mfaCTHvNJfPmlvraK1xL2az1lcYs0/MNlfR3vdBH3c9u3bo19Kh7BAgQIECAAAECBAg0ItAh+y/lqjegaKRie77dlF9StGcfcydAgAABAgQIENj6AmnpxxTIScsp7rjjjrFq1ao8OJj2pGtqUKO5s0h9pIBG2oetUKZPn55nEaXsrU0pKWPnxRdfzOeUgg+dOnXKf1LAbrfddmswu29T+m3qs2l8KQCU3JctWxZ9+/aNN954I1JAJI0v7UNWLmjS1D5K67366qt5XytXroxevXrlS3umbK3UV1pGdFNLmstzzz2Xf3/SdybNJX2P0jxSP621pD0W07Kf6ScFlNJ7W7duXf6+0ncpLQtaqZL+7qXvQ3pXKXCesjfTu0p7ISbLVFIm5/Dhw+vtMgXApkyZkgc/663gIgECBAgQIECAAIFWIpD+PayUFxCYK29TvCMwV6RwQIAAAQIECBAgQKCWQNpT7rjjjovdd989DwSm/eDS3nBpuUyFQFsXSHs4pizCFJhtrKSA4D/+4z/mezzWVzcFClNWXSUCrfW17xoBAgQIECBAgACBLSUgMNewtD3mGvZxlwABAgQIECBAgACBBgSmTZsWS5YsyX/SYhxpv7pUfvCDH+T7xTXwqFsEWrXA448/HqNGjcoD0mn/xUGDBpWdT/q7cf/995cNyqUHU2adX2CUJXSDAAECBAgQIECAQJsRsMdcm3mVJkKAAAECBAgQIEBgywukbLkUjBs7dmweoCiMIO3Hlpa5VAi0RYG01Od5552XT23x4sVx5JFH5vsBpqUzS3eLSMfp2g033BBp38ByJS1j+ZnPfGarL9FabnyuEyBAgAABAgQIECBQOQFLWTbB0lKWTUBShQABAgQIECBAoN0LpCDE1772tfjud7+bW1x//fVx4YUXtnsXAG1LoLElKc8+++w46KCDIgXbZs+eHT/84Q8bBUjLWD7yyCNNWhKz0cZUIECAAAECBAgQILCVBawE0fALsJRlwz7uEiBAgAABAgQIECDQRIEUiEhZRIXAXBMfU41AqxIYP358g0tS3nnnnc2aT/p7c9111wnKNUtNZQIECBAgQIAAAQKtV8BSlq333Rk5AQIECBAgQIAAgRYn8MQTTxTHVLqkX/GiAwKtXCBlt6VgWiVKaudLX/pSfOITn6hEc9ogQIAAAQIECBAgQKAVCAjMtYKXZIgECBAgQIAAAQIEWrJACsCtXr067rnnnjj33HOLQz300EOLxw4ItBWBtK/ib3/7200OzqWg3D/90z/Fl7/85bZCYx4ECBAgQIAAAQIECDRBwFKWTUBShQABAgQIECBAgACBDQVeffXVmDBhQixYsCBuuummYoUUcBg9enQIzBVJHLQxgQ984AMxd+7cuOqqq4rLWjY1QzT9/dh5553j+9//fgwfPryNyZgOAQIECBAgQIAAAQKNCXTI/s/Du41Vau/3V6xY0d4JzJ8AAQIECBAgQIDABgJLly6Nww47LF577bX8Xgo4pPKtb30r32uuS5cu+bk/CLRlgb/+9a9x//33R9pbbtq0aWWn2r1797jgggtixIgRcfDBB0fHjhawKYvlBgECBAgQIECAQKsWSP/2VcoLCMyVtyneEZgrUjggQIAAAQIECBAgUBRIy1eOGTMm1q1bF3vttVcce+yxeZac/xNWJHLQzgTefPPNWLJkSaxatSrWrFmTz75bt27Rp0+f6N279yYvf9nOOE2XAAECBAgQIECglQr4/4QNvziBuYZ98rsCc01AUoUAAQIECBAgQIAAAQIECBAgQIAAAQIECBBo9wICcw1/Bayd0bCPuwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQqIiAwVxFGjRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoWEBgrmEfdwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhUREBgriKMGiFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQsIDAXMM+7hIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoiIDAXEUYNUKAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgYQGBuYZ93CVAgAABAgQIECBAgAABAgQIECBAgADgvjvsAABAAElEQVQB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NjgrUyJAgAABAvULzJ07N/bdd9/o2LHlRbbWrs5y4jpmeXJ197GrfyquEiBAgAABAgQIENjqAuvWrYvnnnsuBgwYsNXHYgAECBAgQGBLCHTv3n1LdNNq+5Ax12pfnYETIECAAIH2J9Bp2/V5dO1v9mZMgAABAgQIECBAgAABAgQIECDQ2gVa3n8K39pFjZ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAPQICc/WguESAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECg0gICc5UW1R4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBegQE5upBcYkAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBApQUE5iotqj0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC9QgIzNWD4hIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBSgsIzFVaVHsECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE6hEQmKsHxSUCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEClRYQmKu0qPYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1COwTT3XXCJAgAABAgTaucBzzz3XzgVMnwABAgQIECBAgAABAgQIECBAgEDlBTq8m5XKN9u2WlyxYkXbmpDZECBAgAABAgQIECBAgAABAgQIECBAgAABAgQ2g0D37t03Q6ttp0lLWbadd2kmBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECLVhAYK4FvxxDI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQaDsCAnNt512aCQECBAgQIECAAAECBAgQIECAAAECBAgQIECAQAsWEJhrwS/H0AgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNqOgMBc23mXZkKAAAECBAgQIECAAAECBAgQIECAAAECBAgQINCCBQTmWvDLMTQCBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG2IyAw13bepZkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0YAGBuRb8cgyNAAECBAgQIECAAAECBAgQIECAAAECBAgQIECg7QgIzLWdd2kmBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECLVhAYK4FvxxDI0CAAAEC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Y6JmSYAAAQIE6gqkDLg1WUAsy2Srt2RpbFXZznHlbtf7TFMuZv2mPegq3m5T+laHAAECBAgQIECAAAECBAgQIEBgowW6d+++0c+2hwfz/669PUzUHAkQIECAAIGNEEj/UtimTFAuNZdFzhq4uxEd1jyS9Zsy7RQCBAgQIECAAAECBAgQIECAAAECbUnAUpZt6W2aCwECBAgQIECAAAECBAgQIECAAAECBAgQIECAQIsVEJhrsa/GwAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBNqSgMBcW3qb5kKAAAECBAgQIECAAAECBAgQIECAAAECBAgQINBiBQTmWuyrMTACBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG2JCAw15beprkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0WAGBuRb7agyMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgLQkIzLWlt2kuBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECLVZAYK7FvhoDI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQaEsC27SlyZgLAQIECBAgsOkCc+fO3fRGtECAAAECBAgQIECAQC2BAQMG1Dp3QoAAAQIECLRPAYG59vnezZoAAQIECDQosPPOOzd4300CBAgQIECAAAECBJou8NprrzW9spoECBAgQIBAmxYQmGvTr9fkCBAgQIDAxgl07949Ona04vXG6XmKAAECBAgQIECAwHqBdevWhcDceg9HBAgQIECgvQsIzLX3b4D5EyBAgACBegRSUE5grh4YlwgQIECAAAECBAgQIECAAAECBAhsgoD/FH4T8DxKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoKkCAnNNlVKPAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwCYICMxtAp5HCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDRVQGCuqVLqESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIENgEAYG5TcDzKAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGmCgjMNVVKPQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKbICAwtwl4HiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQVAGBuaZKqUeA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uXb76k2cAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgSwoIzG1JbX0RIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0WwGBuXb76k2cAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgSwoIzG1JbX0RIECAAAECBAgQIECAAAECBAgQIECAAAECBAi0W4Ft2u3MTZwAAQIECBAoK/Dcc8+VvecGAQIECBAgQIAAAQIECBAgQIAAAQIbJ9Dh3axs3KPt56kVK1a0n8maKQECBAgQIECAAAECBAgQIECAAAECBAgQIEBgIwW6d+++kU+2j8csZdk+3rNZEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIbGUBgbmt/AJ0T4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0D4EBObax3s2SwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAga0sIDC3lV+A7gkQIECAAAECBAgQIECAAAECBAgQIECAAAECBNqHgMBc+3jPZkmAAAECBAgQIECAAAECBAgQIECAAAECBAgQILCVBQTmtvIL0D0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgED7EBCYax/v2SwJECBAgAABAgQIECBAgAABAgQIECBAgAABAgS2soDA3FZ+AbonQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoHwLbtI9pmiUBAgQIECDQZIFli2LOwmURG/wroVf0G9A3uja5IRU3XqAqJl6yS0wa+ljcOGrgRjWzbMGMmDEnvcdeMeiIIdHXi9soRw8RIECAAAECBAgQIECAAAECBCopsMGv3CrZuLYIECBAgACB1icw5xcXxeGXTKpn4ENi6uKpMUSApx6byl+qWhgx462Na3fGbWNi6CV3lDw8PO57dkIc27fkkkMCBAgQIECAAAECBAgQIECAAIEtLmApyy1OrkMCBAgQINDCBbqmyNvwuP/FxfHm4sWxuPgjKLel39xGZbmtmRNXp6DcRXfF4jffjMXP3Je9zUkx7jdztvTw9UeAAAECBAgQIECAAAECBAgQIFBHQGCuDohTAgQIECBAIAl0jZ7bZwG6LEjXtfhTkKmK6XePjaE9ekSP7Oesr98Rc1YW7kVUzZ0Sl58+NL93+r/eHON/cHmM+d6U6govTIqzTh8b89YU6lfFpOvOiqvv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BAgQIECAAAECBAgQIECAAAECBAgQIECAQCMCAnONALlNgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBICAnOVUNQGAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgUYEBOYaAXKbAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCUEBOYqoagNAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAo0ICMw1AuQ2AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgUoICMxVQlEbBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBoREJhrBMhtAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABApUQEJirhKI2CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQiIDDXCJDbBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCohIDBXCUVtECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGhEQGCuESC3CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFRCQGCuEoraIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINCIgMBcI0BuEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKiEgMBcJRS1QYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKARgW0aue82AQIECBAg0M4Euj0+tJ3NuG1Pd9VhU9v2BM2OAAECBAgQIECAAAECBAgQINCKBGTMtaKXZagECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKtV0BgrvW+OyMnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoRQICc63oZRkqAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBA6xUQmGu9787ICRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEWpGAwFwrelmGSoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0HoFBOZa77szcgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVYkIDDXil6WoRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLReAYG51vvujJwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAVCQjMtaKXZagECBAgQIAAAQIECBAgQIAAAQIE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dB3Zy2VbfrWO7Cm7iQACCCCAAAIIIIAAAggggAAC+SDQuHHjfNiMvN0GMuby9tCwYQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAoUkQGCukI4m+4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC3AgTm8vbQsGEIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAKFJEBgrpCOJvuCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQtwIE5vL20LBhCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAAChSRAYK6Qjib7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkLcCBOby9tCwYQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAoUkQGCukI4m+4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC3AgTm8vbQsGEIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAKFJEBgrpCOJvuCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQtwIE5vL20LBhCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAAChSRAYK6Qjib7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkLcCBOby9tCwYQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAoUkULTGSiHtUC72pbi4OBeLZZkIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAQEEJNG7cuKD2J9s7Q8ZctkVZHgIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAJxBAjMxUHhLQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQSyLUBgLtuiLA8BBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQACBOAIE5uKg8BYCCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAAC2RYgMJdtUZaHAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAQBwBAnNxUHgLAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgWwLEJjLtijLQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQCCOAIG5OCi8hQACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggEC2BQjMZVuU5SGAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCAQR4DAXBwU3kIAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAg2wIE5rItyvIQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQiCNAYC4OCm8hgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggupULnwAAQABJREFUkG0BAnPZFmV5CCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCMQRIDAXB4W3EEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEMi2AIG5bIuyPAQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQTiCBCYi4PCWwgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAghkW4DAXLZFWR4CCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACcQQIzMVB4S0EEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEsi1AYC7boiwPAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgTgCBObioPAWAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAtkWIDCXbVGWhwACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggEAcAQJzcVB4CwEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAIFsCxCYy7Yoy0MAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAgjgCBuTgovIUAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIBAtgUIzGVblOUhgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggEEeAwFwcFN5CAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAINsCBOayLcryEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEIgjQGAuDgpvIYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJBtAQJz2RZleQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgjEESAwFweFtxBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBDItgCBuWyLsjwEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEE4ggQmIuDwlsIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIZFuAwFy2RVkeAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAnEECMzFQeEtBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBLItULTGSrYXyvIQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQCBagIy5aA9eIYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJATAQJzOWFloQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAghECxCYi/bgFQIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAI5ESAwlxNWFooAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIBAtACBuWgPXiGAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQEwECczlhZaEIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIRAsQmIv24BUCCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACOREgMJcTVhaKAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAQLQAgbloD14hgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkBMBAnM5YWWhCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCEQLEJiL9uAVAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAjkRIDCXE1YWigACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggEC0AIG5aA9eIYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJATAQJzOWFloQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAghECxCYi/bgFQIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAI5ESAwlxNWFooAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIBAtACBuWgPXiGAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQEwECczlhZaEIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIRAsQmIv24BUCCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACOREgMJcTVhaKAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAQLQAgbloD14hgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkBMBAnM5YWWhCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCEQLEJiL9uAVAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAjkRIDCXE1YWigACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggEC0AIG5aA9eIYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJATAQJzOWFloQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAghECxCYi/bgFQIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAI5ESAwlxNWFooAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIBAtACBuWgPXiGAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQE4FaOVlqgS109WebFtgesTsIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAQPYFau3yW/YXWkBLJGOugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/AgTm8vfYsGUIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIFJEBgroAOJruCAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCQvwIE5vL32LBlCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACBSRAYK6ADia7ggACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgggkL8CBOby99iwZQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgUkQGCugA4mu4IAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIJC/ArXyd9PYMgQQQAABBBBAAAEEEEAAgXVZYMWqNaHdr1mjyNWquS5LsO+5FigpdW51Sdn5pnXVrV2U61Wy/DwQ8K4xsZtSna85seeyf984r/0aPEcAAQQQQKDqBAjMVZ09a0YAAQQQQCBtgaXLS93K1Wtc7VpFrmE9Et/TBmQGBBBAAIFqI/D2/y1yB101PrS9+23X1L06uJurwa2v2hy/6rSh8xaVuG1PH+3GTVsR2uwmDWu6P57o4zq0osqkso/jshVr3G9jlrkVq0pdkf3Xu0td165Fbo7Da18sdIddOyHuLu5r15zXklxzxk1f6SbNXBmat0WTWm7DbvXy4vq0fOUat/0Zo93v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BAjmIuKiMwIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAJtEyCYa5sboxBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBCISIBgLiIuOiOAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCDQNgGCuba5MQoBBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQACBiAQI5iLiojMCCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACbRMgmGubG6MQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQiEiAYC4iLjojgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggg0DYBgrm2uTEKAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgYgECOYi4qIzAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAm0TIJhrmxujEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEIhIgGAuIi46I4AAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIINA2AYK5trkxCgEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAIGIBAjmIuKiMwIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAJtEyCYa5sboxBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBCISIBgLiIuOiOAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCDQNgGCuba5MQoBBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQACBiAQI5iLiojMCCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACbRMgmGubG6MQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQiEiAYC4iLjojgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggg0DYBgrm2uTEKAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgYgECOYi4qIzAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAm0TIJhrmxujEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEIhIgGAuIi46I4AAAggggAACCCCAAAIIIIAAAggggAACCCCAAAII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"
    }
  })])])])])])]);
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = function (inject) {
  if (!inject) return;
  inject("data-v-b677bf08_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.container[data-v-b677bf08]{width:100%;max-width:1280px;margin:0 auto;padding:0 20px}footer[data-v-b677bf08]{box-shadow:-1px -1px 1px 0 #f2f2f2;background:#fff;position:relative}footer .footer-content[data-v-b677bf08]{bottom:0;width:100%;max-height:87px;margin:0;background:#fff;display:flex;align-items:center;justify-content:space-between;width:100%}footer .footer-content .link-footer[data-v-b677bf08]{color:#757575;font-style:normal;font-family:Montserrat;font-weight:700;font-size:14px;line-height:15px}footer .footer-content .img-footer[data-v-b677bf08]{max-height:73px}footer .footer-content .imgs .img[data-v-b677bf08]{max-width:110px;max-height:25px}@media only screen and (max-width:550px){footer[data-v-b677bf08]{box-shadow:-1px -1px 1px 0 #f2f2f2}footer .footer-content[data-v-b677bf08]{height:48px}footer .footer-content .link-footer[data-v-b677bf08]{font-weight:400;font-size:12px}footer .footer-content .img-footer svg[data-v-b677bf08]{max-width:109px;max-height:24px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$b = "data-v-b677bf08";
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$a = {
  name: 'HeaderMenu',
  props: {
    imgLogo: {
      type: String,
      required: false
    },
    // { label: [LABEL], srcOrpath: [ancora or path] }
    linksRedirected: {
      type: Array,
      required: false
    },
    openOptionsRedirect: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      activeHamburguerOptions: false
    };
  },

  updated() {
    this.watchOptionsRedirect();
  },

  computed: {
    headerButtonMenu() {
      return document.querySelector('.header-button-menu');
    },

    nav() {
      return document.querySelector('nav');
    }

  },
  methods: {
    // watchOptionsRedirect() {
    //     if (this.openOptionsRedirect == true) {
    //         this.openOptionsRedirectMethod();
    //     } else {
    //         this.closeOptionsRedirectMethod();
    //     }
    // },
    watchOptionsRedirect() {
      if (this.openOptionsRedirect == true) {
        this.openOptionsRedirectMethod();
        this.activeHamburguerOptions = true;
        this.$emit('resOpenOptionsRedirectHamburguer', true);
      } else {
        this.closeOptionsRedirectMethod();
        this.activeHamburguerOptions = false;
        this.$emit('resOpenOptionsRedirectHamburguer', false);
      }
    },

    pathOrAncora(linkRedirect) {
      // Is path:
      if (linkRedirect.srcOrpath[0] === '/') {
        if (window.location.pathname == linkRedirect.srcOrpath) return true;else return false;
      } // Is URL Ancora:
      else {
          if (window.location.href == linkRedirect.srcOrpath) return true;else return false;
        }
    },

    redirect(linkRedirect) {
      // Is path:
      if (linkRedirect.srcOrpath[0] === '/') {
        window.location.pathname = linkRedirect.srcOrpath;
      } // Is URL Ancora:
      else {
          window.location.href = linkRedirect.srcOrpath;
        }

      this.closeOptionsRedirectMethod();
      this.activeHamburguerOptions = false;
      this.$emit('resOpenOptionsRedirectHamburguer', this.activeHamburguerOptions);
    },

    // MOBILE:
    activeHamburguer() {
      this.activeHamburguerOptions = !this.activeHamburguerOptions;

      if (this.activeHamburguerOptions) {
        this.openOptionsRedirectMethod();
      } else {
        this.closeOptionsRedirectMethod();
      }

      this.$emit('resOpenOptionsRedirectHamburguer', this.activeHamburguerOptions);
    },

    openOptionsRedirectMethod() {
      this.headerButtonMenu.classList.add("is-open-active");
      this.nav.classList.add("is-active");
    },

    closeOptionsRedirectMethod() {
      this.headerButtonMenu.classList.remove("is-open-active");
      this.nav.classList.remove("is-active");
    }

  }
};

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('header', [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "header-content"
  }, [_c('div', {
    staticClass: "header-logo"
  }, [_vm.imgLogo ? _c('img', {
    staticClass: "img-logo",
    attrs: {
      "src": _vm.imgLogo
    }
  }) : _c('svg', {
    staticClass: "svg-logo",
    attrs: {
      "viewBox": "0 0 56 24",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M20.6892 11.4623C19.7595 11.4623 18.8026 11.1878 18.2015 10.7486L18.0376 10.9818C18.7483 11.4623 19.7464 11.7369 20.7295 11.7369C22.3156 11.7369 23.8185 11.0091 23.8185 9.16977C23.8185 6.15028 18.4731 7.90688 18.4731 4.90147C18.4731 3.41944 19.7174 2.843 21.0284 2.843C21.8354 2.843 22.6688 3.06213 23.2568 3.41944L23.4066 3.17214C22.6728 2.77197 21.8502 2.56431 21.0152 2.56842C19.5527 2.56842 18.1594 3.21351 18.1594 4.90147C18.1594 8.25011 23.5047 6.46622 23.5047 9.16977C23.5039 10.8173 22.1237 11.4623 20.6892 11.4623Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M24.9935 7.17951H31.0206V11.5165H31.3344V2.78711H31.0206V6.90493H24.9935V2.78711H24.679V11.5165H24.9935V7.17951Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M33.2208 2.78711H32.9062V11.5165H33.2208V2.78711Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M35.1058 8.25074C35.6312 8.36584 36.1673 8.42484 36.705 8.42675C38.6048 8.42675 40.4634 7.65845 40.4634 5.46181C40.4634 3.65064 39.2611 2.56641 36.8286 2.56641C36.1437 2.57486 35.461 2.64466 34.7886 2.77498V11.5175H35.1023L35.1058 8.25074ZM35.1058 2.99412C35.6472 2.89589 36.1961 2.84553 36.7462 2.84363C38.5224 2.84363 40.1357 3.44735 40.1357 5.46446C40.1357 7.11193 38.9194 8.15481 36.7322 8.15481C36.1862 8.14981 35.6418 8.09472 35.1058 7.99024V2.99412Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M18.8577 15.6244C18.8577 14.4029 19.9233 13.8819 21.0852 13.8819C21.8333 13.8847 22.5683 14.0782 23.2216 14.4442L23.5634 13.8951C22.8939 13.4973 21.9782 13.25 21.0624 13.25C19.5456 13.25 18.0971 13.9224 18.0971 15.7203C18.0971 18.9185 23.1673 17.4365 23.1673 19.8382C23.1673 21.1697 22.0053 21.732 20.7478 21.732C19.8716 21.732 18.9033 21.468 18.2469 21.0183L17.9192 21.5816C18.6702 22.0621 19.7506 22.3639 20.789 22.3639C22.4154 22.3639 23.9323 21.6361 23.9323 19.7422C23.9279 16.75 18.8577 18.232 18.8577 15.6244Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M29.1208 18.7808C27.9729 16.6264 26.8521 13.8946 25.3081 13.4414H24.6658V22.1708H25.3896V14.2651C26.5244 14.9102 27.5803 17.4906 28.7379 19.5358H29.4626C30.6377 17.4906 31.6761 14.9102 32.824 14.2651V22.1708H33.5487V13.4414H32.9064C31.3624 13.8946 30.2547 16.6264 29.1208 18.7808Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M37.7575 13.4414C36.0496 15.5967 34.6028 18.8221 34.0271 22.1708H34.7509C34.9135 21.276 35.128 20.3915 35.3932 19.5218H40.5861C40.8708 20.387 41.0902 21.2725 41.2424 22.1708H41.9803C41.4063 18.8265 39.9718 15.5967 38.2631 13.4414H37.7575ZM35.5843 18.9216C36.2406 17.0136 37.1292 15.367 37.9765 14.2414C38.8099 15.367 39.7116 17.0136 40.3951 18.9216H35.5843Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M45.2471 18.2875C46.7499 18.1502 48.0617 17.381 48.0617 15.8717C48.0617 14.1424 46.7473 13.25 44.5767 13.25C43.8714 13.2506 43.1675 13.3148 42.4736 13.4419V22.1712H43.2115V18.4661H43.7583C45.5985 18.4661 47.4063 20.6478 47.9127 22.1712H48.6918C48.2834 20.7992 46.8726 18.768 45.2471 18.2875ZM43.2106 17.8474V14.0051C43.6586 13.9375 44.1106 13.9008 44.5636 13.8951C45.9981 13.8951 47.2695 14.3756 47.2695 15.8849C47.2695 17.066 46.2855 17.8615 44.235 17.8615C43.8932 17.8659 43.5515 17.8659 43.2106 17.8483V17.8474Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M48.1572 13.4414V14.0592H51.2321V22.1708H51.984V14.0592H55.0589V13.4414H48.1572Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.54307 8.23619C7.50066 8.23927 7.46099 8.25836 7.43203 8.28963C7.40306 8.3209 7.38696 8.36202 7.38696 8.40472C7.38696 8.44743 7.40306 8.48855 7.43203 8.51982C7.46099 8.55108 7.50066 8.57018 7.54307 8.57326C7.57194 8.56895 7.59946 8.55815 7.62359 8.54166C7.64771 8.52517 7.66781 8.50342 7.68239 8.47803C7.69697 8.45264 7.70564 8.42427 7.70777 8.39505C7.7099 8.36582 7.70542 8.33648 7.69467 8.30924C7.67976 8.28306 7.65727 8.26206 7.6302 8.24901C7.60312 8.23596 7.57274 8.23149 7.54307 8.23619Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M8.97848 7.71297C9.00495 7.71315 9.03099 7.70616 9.05384 7.69273L9.09853 7.66721C9.11579 7.65721 9.13092 7.6439 9.14306 7.62803C9.1552 7.61216 9.16411 7.59404 9.16927 7.57471C9.17444 7.55539 9.17577 7.53523 9.17317 7.51539C9.17058 7.49554 9.16413 7.47641 9.15417 7.45907C9.14422 7.44174 9.13096 7.42654 9.11516 7.41435C9.09936 7.40216 9.08132 7.39321 9.06208 7.38803C9.04283 7.38284 9.02276 7.3815 9.003 7.38411C8.98325 7.38671 8.96419 7.39319 8.94693 7.40319L8.90312 7.42871C8.86863 7.44892 8.84354 7.48206 8.83336 7.52083C8.82317 7.55961 8.82872 7.60086 8.84879 7.63553C8.86151 7.65892 8.88026 7.67845 8.90308 7.69208C8.92589 7.7057 8.95194 7.71292 8.97848 7.71297Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M8.49301 7.99596C8.51949 7.99614 8.54552 7.98914 8.56837 7.97571L8.61218 7.95019C8.62945 7.94025 8.64459 7.927 8.65675 7.91118C8.66891 7.89536 8.67785 7.8773 8.68306 7.85801C8.68826 7.83872 8.68964 7.8186 8.6871 7.79878C8.68456 7.77896 8.67816 7.75983 8.66827 7.7425C8.65837 7.72516 8.64517 7.70995 8.62942 7.69774C8.61367 7.68553 8.59568 7.67655 8.57648 7.67132C8.55728 7.66609 8.53724 7.66471 8.5175 7.66726C8.49777 7.66981 8.47872 7.67623 8.46146 7.68617L8.41765 7.7117C8.38864 7.72809 8.3659 7.75372 8.35301 7.78454C8.34011 7.81536 8.3378 7.84961 8.34644 7.88189C8.35508 7.91418 8.37418 7.94265 8.40072 7.96283C8.42726 7.983 8.45973 7.99373 8.49301 7.99332V7.99596Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M9.43314 7.12241L9.38933 7.14881C9.36032 7.16521 9.33758 7.19084 9.32469 7.22166C9.31179 7.25247 9.30948 7.28673 9.31812 7.31901C9.32676 7.35129 9.34586 7.37977 9.3724 7.39994C9.39894 7.42012 9.43141 7.43084 9.46469 7.43043C9.49124 7.43026 9.51725 7.42297 9.54005 7.40931L9.58386 7.38379C9.60113 7.37385 9.61627 7.36059 9.62843 7.34477C9.64059 7.32896 9.64953 7.31089 9.65474 7.2916C9.65994 7.27232 9.66132 7.25219 9.65878 7.23237C9.65624 7.21255 9.64984 7.19343 9.63995 7.17609C9.63005 7.15876 9.61685 7.14355 9.6011 7.13133C9.58535 7.11912 9.56736 7.11014 9.54816 7.10491C9.52896 7.09968 9.50892 7.0983 9.48918 7.10085C9.46945 7.1034 9.4504 7.10983 9.43314 7.11977V7.12241Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M8.181 8.02696C8.17112 8.0096 8.15789 7.9944 8.1421 7.98224C8.1263 7.97007 8.10825 7.96119 8.089 7.95611C8.06974 7.95103 8.04968 7.94985 8.02997 7.95265C8.01025 7.95545 7.9913 7.96216 7.9742 7.9724L7.93038 7.99792C7.90206 8.01476 7.88 8.04045 7.86758 8.07106C7.85517 8.10168 7.85307 8.13553 7.86161 8.16746C7.87015 8.19939 7.88887 8.22762 7.91489 8.24786C7.94092 8.2681 7.97283 8.27923 8.00574 8.27954C8.03216 8.27927 8.05808 8.27231 8.0811 8.2593L8.1258 8.23289C8.16019 8.21283 8.1853 8.17992 8.19564 8.14135C8.20598 8.10277 8.20072 8.06165 8.181 8.02696Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M13.3196 4.85678L13.2749 4.88318C13.2465 4.90003 13.2245 4.92572 13.2121 4.95633C13.1996 4.98695 13.1975 5.0208 13.2061 5.05273C13.2146 5.08465 13.2333 5.11289 13.2594 5.13313C13.2854 5.15337 13.3173 5.16449 13.3502 5.16481C13.3768 5.16476 13.4028 5.15746 13.4256 5.14368L13.4703 5.11816C13.5051 5.09809 13.5306 5.06493 13.5411 5.02598C13.5517 4.98703 13.5463 4.94548 13.5264 4.91047C13.5064 4.87546 13.4734 4.84985 13.4346 4.83929C13.3958 4.82873 13.3544 4.83407 13.3196 4.85414V4.85678Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M13.8067 4.57641L13.7629 4.60193C13.7339 4.61833 13.7111 4.64396 13.6982 4.67478C13.6853 4.7056 13.683 4.73985 13.6917 4.77213C13.7003 4.80442 13.7194 4.83289 13.7459 4.85307C13.7725 4.87324 13.8049 4.88397 13.8382 4.88355C13.8646 4.88329 13.8906 4.87633 13.9136 4.86331L13.9574 4.83691C13.9923 4.81684 14.0178 4.78368 14.0283 4.74473C14.0388 4.70578 14.0335 4.66423 14.0135 4.62922C13.9935 4.5942 13.9605 4.5686 13.9217 4.55804C13.8829 4.54748 13.8415 4.55282 13.8067 4.57289V4.57641Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M12.3485 5.42318L12.3047 5.4487C12.2702 5.46891 12.2452 5.50204 12.235 5.54082C12.2248 5.5796 12.2303 5.62085 12.2504 5.65551C12.2705 5.68991 12.3034 5.71494 12.3418 5.72516C12.3801 5.73538 12.421 5.72996 12.4555 5.71008L12.5001 5.68456C12.5343 5.66402 12.5591 5.6309 12.5692 5.59225C12.5794 5.55361 12.5741 5.51252 12.5545 5.47774C12.5446 5.46051 12.5314 5.44541 12.5157 5.43332C12.4999 5.42123 12.482 5.4124 12.4628 5.40732C12.4437 5.40225 12.4237 5.40104 12.4041 5.40376C12.3845 5.40648 12.3656 5.41308 12.3485 5.42318Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M12.835 5.13999L12.7912 5.16551C12.7622 5.1819 12.7394 5.20753 12.7265 5.23835C12.7136 5.26917 12.7113 5.30342 12.72 5.33571C12.7286 5.36799 12.7477 5.39647 12.7743 5.41664C12.8008 5.43682 12.8333 5.44754 12.8665 5.44713C12.893 5.44731 12.9191 5.44032 12.9419 5.42689L12.9857 5.40136C13.003 5.39143 13.0181 5.37817 13.0303 5.36235C13.0424 5.34654 13.0514 5.32847 13.0566 5.30918C13.0618 5.2899 13.0632 5.26977 13.0606 5.24995C13.0581 5.23013 13.0517 5.211 13.0418 5.19367C13.0319 5.17633 13.0187 5.16113 13.003 5.14891C12.9872 5.1367 12.9692 5.12772 12.95 5.12249C12.9308 5.11726 12.9108 5.11588 12.891 5.11843C12.8713 5.12098 12.8523 5.12741 12.835 5.13735V5.13999Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M11.863 5.70727L11.8183 5.73279C11.7899 5.74967 11.7678 5.77544 11.7554 5.80614C11.743 5.83684 11.741 5.87078 11.7497 5.90276C11.7583 5.93473 11.7772 5.96296 11.8034 5.98313C11.8295 6.0033 11.8616 6.01429 11.8946 6.01441C11.921 6.01403 11.9468 6.00708 11.9699 5.99417L12.0137 5.96777C12.0486 5.9477 12.0741 5.91454 12.0846 5.87559C12.0951 5.83664 12.0898 5.79509 12.0698 5.76008C12.0498 5.72506 12.0168 5.69946 11.978 5.6889C11.9392 5.67834 11.8979 5.68368 11.863 5.70375V5.70727Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M9.91965 6.83813L9.87496 6.86365C9.84664 6.88049 9.82458 6.90618 9.81216 6.9368C9.79975 6.96741 9.79765 7.00127 9.80619 7.0332C9.81473 7.06512 9.83345 7.09336 9.85947 7.1136C9.8855 7.13384 9.91741 7.14496 9.95033 7.14527C9.97689 7.14523 10.0029 7.13793 10.0257 7.12415L10.0704 7.09863C10.1052 7.07856 10.1307 7.0454 10.1412 7.00645C10.1518 6.9675 10.1464 6.92595 10.1265 6.89093C10.1065 6.85592 10.0735 6.83032 10.0347 6.81976C9.99589 6.8092 9.95452 6.81454 9.91965 6.83461V6.83813Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M11.3768 5.98803L11.333 6.01443C11.3157 6.02437 11.3006 6.03763 11.2884 6.05344C11.2763 6.06926 11.2673 6.08733 11.2621 6.10661C11.2569 6.1259 11.2555 6.14603 11.2581 6.16585C11.2606 6.18567 11.267 6.20479 11.2769 6.22212C11.2868 6.23946 11.3 6.25467 11.3158 6.26688C11.3315 6.27909 11.3495 6.28807 11.3687 6.2933C11.3879 6.29853 11.4079 6.29991 11.4277 6.29736C11.4474 6.29482 11.4664 6.28839 11.4837 6.27845L11.5275 6.25293C11.5448 6.24299 11.5599 6.22973 11.5721 6.21392C11.5842 6.1981 11.5932 6.18003 11.5984 6.16074C11.6036 6.14146 11.605 6.12133 11.6024 6.10151C11.5999 6.08169 11.5935 6.06257 11.5836 6.04523C11.5737 6.0279 11.5605 6.01269 11.5448 6.00048C11.529 5.98826 11.511 5.97928 11.4918 5.97405C11.4726 5.96882 11.4526 5.96744 11.4328 5.96999C11.4131 5.97254 11.3941 5.97897 11.3768 5.98891V5.98803Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M10.4051 6.556L10.3613 6.58152C10.333 6.59836 10.3109 6.62405 10.2985 6.65467C10.2861 6.68528 10.284 6.71914 10.2925 6.75107C10.3011 6.78299 10.3198 6.81123 10.3458 6.83147C10.3718 6.85171 10.4037 6.86283 10.4367 6.86314C10.4631 6.86332 10.4892 6.85633 10.512 6.8429L10.5558 6.81738C10.5907 6.79731 10.6162 6.76415 10.6267 6.7252C10.6372 6.68625 10.6319 6.6447 10.6119 6.60968C10.5919 6.57467 10.5589 6.54907 10.5201 6.53851C10.4813 6.52795 10.44 6.53329 10.4051 6.55336V6.556Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M10.8913 6.2728L10.8466 6.29832C10.8182 6.3152 10.7962 6.34097 10.7838 6.37167C10.7714 6.40237 10.7693 6.43631 10.778 6.46828C10.7866 6.50025 10.8055 6.52849 10.8317 6.54866C10.8578 6.56883 10.8899 6.57982 10.9229 6.57994C10.9491 6.58009 10.9748 6.5731 10.9974 6.5597L11.042 6.53418C11.0769 6.5141 11.1024 6.48094 11.1129 6.44199C11.1234 6.40304 11.1181 6.36149 11.0981 6.32648C11.0781 6.29147 11.0451 6.26587 11.0063 6.2553C10.9676 6.24474 10.9262 6.25008 10.8913 6.27016V6.2728Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M5.21112 6.86404L5.1673 6.83852C5.15004 6.82858 5.131 6.82215 5.11127 6.8196C5.09153 6.81705 5.07149 6.81843 5.05229 6.82366C5.03308 6.82889 5.01509 6.83787 4.99935 6.85008C4.9836 6.8623 4.9704 6.87751 4.9605 6.89484C4.9506 6.91218 4.9442 6.9313 4.94167 6.95112C4.93913 6.97094 4.9405 6.99107 4.94571 7.01035C4.95092 7.02964 4.95986 7.04771 4.97202 7.06352C4.98418 7.07934 4.99932 7.0926 5.01658 7.10254L5.0604 7.12806C5.0832 7.14172 5.10921 7.14901 5.13576 7.14918C5.16904 7.14959 5.20151 7.13887 5.22805 7.11869C5.25459 7.09852 5.27369 7.07004 5.28233 7.03776C5.29096 7.00548 5.28865 6.97122 5.27576 6.94041C5.26287 6.90959 5.24012 6.88396 5.21112 6.86756V6.86404Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6.66954 7.71387L6.62572 7.68835C6.60846 7.67835 6.58941 7.67186 6.56965 7.66926C6.5499 7.66666 6.52982 7.66799 6.51058 7.67318C6.49134 7.67837 6.4733 7.68732 6.45749 7.69951C6.44169 7.7117 6.42844 7.72689 6.41848 7.74423C6.40853 7.76157 6.40207 7.7807 6.39948 7.80054C6.39689 7.82038 6.39822 7.84054 6.40338 7.85987C6.40855 7.8792 6.41746 7.89731 6.4296 7.91318C6.44173 7.92905 6.45687 7.94237 6.47413 7.95236L6.51794 7.97877C6.5528 7.99896 6.59422 8.00441 6.63309 7.99393C6.67195 7.98345 6.70508 7.95789 6.72518 7.92288C6.74529 7.88787 6.75072 7.84627 6.74028 7.80724C6.72985 7.76821 6.7044 7.73494 6.66954 7.71475V7.71387Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M4.23944 6.29763L4.19562 6.27211C4.17836 6.26217 4.15932 6.25574 4.13959 6.2532C4.11985 6.25065 4.09981 6.25203 4.08061 6.25726C4.04182 6.26782 4.00881 6.29342 3.98882 6.32843C3.96883 6.36345 3.96351 6.405 3.97403 6.44395C3.98455 6.4829 4.01004 6.51606 4.0449 6.53613L4.08872 6.56165C4.11157 6.57508 4.1376 6.58207 4.16408 6.58189C4.19736 6.58231 4.22983 6.57158 4.25637 6.5514C4.28291 6.53123 4.30201 6.50275 4.31065 6.47047C4.31928 6.43819 4.31697 6.40394 4.30408 6.37312C4.29119 6.3423 4.26844 6.31667 4.23944 6.30027V6.29763Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6.18304 7.43045L6.13923 7.40492C6.12197 7.39498 6.10293 7.38856 6.08319 7.38601C6.06346 7.38346 6.04342 7.38484 6.02421 7.39007C6.00501 7.3953 5.98702 7.40428 5.97127 7.41649C5.95552 7.4287 5.94232 7.44391 5.93242 7.46125C5.92253 7.47858 5.91613 7.49771 5.91359 7.51753C5.91105 7.53735 5.91243 7.55747 5.91764 7.57676C5.92284 7.59605 5.93178 7.61411 5.94394 7.62993C5.9561 7.64575 5.97125 7.659 5.98851 7.66894L6.03232 7.69446C6.05517 7.70789 6.08121 7.71489 6.10768 7.71471C6.14096 7.71512 6.17344 7.70439 6.19998 7.68422C6.22651 7.66404 6.24561 7.63557 6.25425 7.60328C6.26289 7.571 6.26058 7.53675 6.24768 7.50593C6.23479 7.47511 6.21205 7.44948 6.18304 7.43309V7.43045Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M5.69597 7.14793L5.65215 7.12153C5.61747 7.10168 5.5764 7.09638 5.53784 7.10676C5.49929 7.11714 5.46637 7.14237 5.44622 7.17697C5.43619 7.19404 5.42963 7.21294 5.42694 7.23258C5.42424 7.25221 5.42545 7.27219 5.43051 7.29135C5.43556 7.31051 5.44436 7.32847 5.45638 7.34419C5.46841 7.35991 5.48342 7.37307 5.50055 7.38291L5.54525 7.40843C5.58011 7.4285 5.62148 7.43385 5.66026 7.42328C5.69905 7.41272 5.73206 7.38712 5.75205 7.35211C5.77204 7.3171 5.77736 7.27554 5.76684 7.23659C5.75632 7.19764 5.73083 7.16449 5.69597 7.14441V7.14793Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M3.55858 6.24833L3.60327 6.27385C3.62601 6.28763 3.65206 6.29493 3.67863 6.29498C3.71154 6.29466 3.74345 6.28354 3.76948 6.2633C3.7955 6.24306 3.81422 6.21482 3.82276 6.1829C3.8313 6.15097 3.82921 6.11712 3.81679 6.0865C3.80437 6.05589 3.78231 6.0302 3.75399 6.01336L3.7093 5.98695C3.67444 5.96688 3.63306 5.96154 3.59428 5.9721C3.5555 5.98266 3.52248 6.00827 3.50249 6.04328C3.48251 6.07829 3.47719 6.11984 3.4877 6.15879C3.49822 6.19774 3.52371 6.2309 3.55858 6.25097V6.24833Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M3.07322 5.9662L3.11704 5.99261C3.14006 6.00562 3.16598 6.01258 3.1924 6.01285C3.22568 6.01326 3.25815 6.00253 3.28469 5.98236C3.31123 5.96218 3.33033 5.93371 3.33897 5.90143C3.3476 5.86914 3.34529 5.83489 3.3324 5.80407C3.31951 5.77325 3.29676 5.74762 3.26776 5.73123L3.22395 5.7057C3.18908 5.68563 3.14771 5.68029 3.10893 5.69085C3.07015 5.70141 3.03713 5.72702 3.01714 5.76203C2.99715 5.79704 2.99183 5.83859 3.00235 5.87754C3.01287 5.91649 3.03836 5.94965 3.07322 5.96972V5.9662Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M1.32391 4.59841L1.2801 4.57289C1.26284 4.56295 1.24379 4.55653 1.22406 4.55398C1.20433 4.55143 1.18428 4.55281 1.16508 4.55804C1.14588 4.56327 1.12789 4.57225 1.11214 4.58446C1.09639 4.59667 1.08319 4.61188 1.07329 4.62922C1.0634 4.64655 1.057 4.66568 1.05446 4.6855C1.05192 4.70531 1.0533 4.72544 1.0585 4.74473C1.06371 4.76401 1.07265 4.78208 1.08481 4.7979C1.09697 4.81372 1.11211 4.82697 1.12938 4.83691L1.17319 4.86331C1.19621 4.87633 1.22213 4.88329 1.24855 4.88355C1.28183 4.88397 1.31431 4.87324 1.34084 4.85307C1.36738 4.83289 1.38648 4.80442 1.39512 4.77213C1.40376 4.73985 1.40145 4.7056 1.38855 4.67478C1.37566 4.64396 1.35292 4.61833 1.32391 4.60193V4.59841Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M1.61497 5.11747L1.65966 5.143C1.68241 5.15677 1.70846 5.16408 1.73502 5.16412C1.76794 5.16381 1.79985 5.15268 1.82587 5.13244C1.8519 5.1122 1.87061 5.08397 1.87916 5.05204C1.8877 5.02011 1.8856 4.98626 1.87318 4.95564C1.86077 4.92503 1.83871 4.89934 1.81038 4.8825L1.76569 4.8561C1.73083 4.83602 1.68946 4.83068 1.65068 4.84124C1.61189 4.85181 1.57888 4.87741 1.55889 4.91242C1.5389 4.94743 1.53358 4.98898 1.5441 5.02793C1.55462 5.06688 1.58011 5.10004 1.61497 5.12011V5.11747Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M2.10301 5.40068L2.14682 5.4262C2.16967 5.43963 2.19571 5.44662 2.22218 5.44644C2.25547 5.44686 2.28794 5.43613 2.31448 5.41595C2.34102 5.39578 2.36011 5.3673 2.36875 5.33502C2.37739 5.30274 2.37508 5.26848 2.36219 5.23767C2.34929 5.20685 2.32655 5.18122 2.29754 5.16482L2.25373 5.1393C2.23647 5.12936 2.21743 5.12293 2.19769 5.12038C2.17796 5.11783 2.15792 5.11921 2.13871 5.12445C2.09993 5.13501 2.06691 5.16061 2.04693 5.19562C2.02694 5.23063 2.02162 5.27218 2.03214 5.31113C2.04266 5.35009 2.06815 5.38324 2.10301 5.40332V5.40068Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M2.58665 5.68388L2.63134 5.7094C2.65416 5.72292 2.68022 5.72991 2.7067 5.72965C2.73962 5.72933 2.77153 5.71821 2.79755 5.69797C2.82358 5.67773 2.84229 5.64949 2.85084 5.61757C2.85938 5.58564 2.85728 5.55179 2.84486 5.52117C2.83245 5.49056 2.81039 5.46486 2.78206 5.44802L2.73737 5.4225C2.70251 5.40243 2.66114 5.39709 2.62236 5.40765C2.58357 5.41821 2.55056 5.44381 2.53057 5.47883C2.51058 5.51384 2.50526 5.55539 2.51578 5.59434C2.5263 5.63329 2.55179 5.66645 2.58665 5.68652V5.68388Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M4.72591 6.58084L4.68122 6.55531C4.66396 6.54537 4.64492 6.53895 4.62518 6.5364C4.60545 6.53385 4.58541 6.53523 4.5662 6.54046C4.52742 6.55102 4.4944 6.57663 4.47442 6.61164C4.45443 6.64665 4.44911 6.6882 4.45963 6.72715C4.47015 6.7661 4.49564 6.79926 4.5305 6.81933L4.57519 6.84486C4.59801 6.85837 4.62406 6.86537 4.65055 6.8651C4.68347 6.86479 4.71537 6.85366 4.7414 6.83342C4.76743 6.81318 4.78614 6.78495 4.79468 6.75302C4.80323 6.72109 4.80113 6.68724 4.78871 6.65662C4.77629 6.62601 4.75424 6.60032 4.72591 6.58348V6.58084Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.15497 7.99685L7.11115 7.97133C7.09389 7.96139 7.07485 7.95496 7.05512 7.95241C7.03538 7.94987 7.01534 7.95125 6.99614 7.95648C6.97693 7.96171 6.95894 7.97068 6.94319 7.9829C6.92745 7.99511 6.91425 8.01032 6.90435 8.02765C6.89445 8.04499 6.88805 8.06411 6.88551 8.08393C6.88298 8.10375 6.88435 8.12388 6.88956 8.14317C6.89477 8.16245 6.90371 8.18052 6.91587 8.19634C6.92803 8.21215 6.94317 8.22541 6.96043 8.23535L7.00512 8.26087C7.03998 8.28083 7.08131 8.28606 7.12001 8.27541C7.15871 8.26477 7.19162 8.23912 7.21149 8.20411C7.23136 8.16909 7.23657 8.12759 7.22597 8.08872C7.21537 8.04985 7.18983 8.01681 7.15497 7.99685Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 10.4727C7.52339 10.4725 7.50386 10.4764 7.48562 10.4839C7.46739 10.4914 7.45083 10.5025 7.43689 10.5165C7.42295 10.5305 7.41192 10.5471 7.40443 10.5654C7.39694 10.5837 7.39314 10.6034 7.39326 10.6231V10.6742C7.39168 10.695 7.39439 10.7159 7.40123 10.7356C7.40806 10.7553 7.41887 10.7733 7.43298 10.7886C7.44709 10.8039 7.46419 10.8161 7.48322 10.8244C7.50225 10.8328 7.52278 10.8371 7.54354 10.8371C7.5643 10.8371 7.58484 10.8328 7.60387 10.8244C7.62289 10.8161 7.63999 10.8039 7.6541 10.7886C7.66821 10.7733 7.67903 10.7553 7.68586 10.7356C7.6927 10.7159 7.69541 10.695 7.69383 10.6742V10.6231C7.69383 10.6033 7.68992 10.5837 7.68234 10.5654C7.67475 10.547 7.66364 10.5304 7.64963 10.5164C7.63562 10.5024 7.619 10.4914 7.60072 10.4839C7.58244 10.4763 7.56286 10.4725 7.5431 10.4727Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.54316 9.90625C7.52341 9.90625 7.50385 9.91017 7.48561 9.91779C7.46737 9.92541 7.45082 9.93657 7.43689 9.95064C7.42296 9.96471 7.41195 9.9814 7.40447 9.99976C7.39699 10.0181 7.3932 10.0378 7.39331 10.0576V10.1087C7.39621 10.1467 7.4133 10.1822 7.44116 10.2082C7.46903 10.2341 7.50561 10.2485 7.5436 10.2485C7.58158 10.2485 7.61817 10.2341 7.64603 10.2082C7.6739 10.1822 7.69098 10.1467 7.69388 10.1087V10.0576C7.69388 10.0175 7.678 9.97897 7.64973 9.95059C7.62147 9.9222 7.58313 9.90625 7.54316 9.90625Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 9.34375C7.52335 9.34375 7.5038 9.34767 7.48556 9.35529C7.46732 9.36291 7.45076 9.37407 7.43684 9.38814C7.42291 9.40221 7.41189 9.4189 7.40441 9.43726C7.39694 9.45562 7.39314 9.47528 7.39326 9.49512V9.54616C7.39168 9.56695 7.39439 9.58785 7.40123 9.60754C7.40806 9.62722 7.41887 9.64528 7.43298 9.66057C7.44709 9.67587 7.46419 9.68807 7.48322 9.69642C7.50225 9.70476 7.52278 9.70907 7.54354 9.70907C7.5643 9.70907 7.58484 9.70476 7.60387 9.69642C7.62289 9.68807 7.63999 9.67587 7.6541 9.66057C7.66821 9.64528 7.67903 9.62722 7.68586 9.60754C7.6927 9.58785 7.69541 9.56695 7.69383 9.54616V9.49512C7.69383 9.45497 7.67795 9.41647 7.64968 9.38809C7.62142 9.3597 7.58308 9.34375 7.5431 9.34375Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 11.0313C7.52335 11.0312 7.5038 11.0352 7.48556 11.0428C7.46732 11.0504 7.45076 11.0616 7.43684 11.0756C7.42291 11.0897 7.41189 11.1064 7.40441 11.1248C7.39694 11.1431 7.39314 11.1628 7.39326 11.1826V11.2337C7.39168 11.2545 7.39439 11.2753 7.40123 11.295C7.40806 11.3147 7.41887 11.3328 7.43298 11.3481C7.44709 11.3634 7.46419 11.3756 7.48322 11.3839C7.50225 11.3923 7.52278 11.3966 7.54354 11.3966C7.5643 11.3966 7.58484 11.3923 7.60387 11.3839C7.62289 11.3756 7.63999 11.3634 7.6541 11.3481C7.66821 11.3328 7.67903 11.3147 7.68586 11.295C7.6927 11.2753 7.69541 11.2545 7.69383 11.2337V11.1826C7.69383 11.1425 7.67795 11.104 7.64968 11.0756C7.62142 11.0472 7.58308 11.0313 7.5431 11.0313Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 8.78321C7.52339 8.78309 7.50386 8.7869 7.48562 8.79442C7.46739 8.80194 7.45083 8.81303 7.43689 8.82702C7.42295 8.84102 7.41192 8.85766 7.40443 8.87597C7.39694 8.89428 7.39314 8.9139 7.39326 8.9337V8.98474C7.39168 9.00553 7.39439 9.02642 7.40123 9.04611C7.40806 9.0658 7.41887 9.08386 7.43298 9.09915C7.44709 9.11445 7.46419 9.12665 7.48322 9.13499C7.50225 9.14334 7.52278 9.14765 7.54354 9.14765C7.5643 9.14765 7.58484 9.14334 7.60387 9.13499C7.62289 9.12665 7.63999 9.11445 7.6541 9.09915C7.66821 9.08386 7.67903 9.0658 7.68586 9.04611C7.6927 9.02642 7.69541 9.00553 7.69383 8.98474V8.9337C7.69383 8.91386 7.68992 8.89422 7.68234 8.8759C7.67475 8.85759 7.66364 8.84096 7.64963 8.82697C7.63562 8.81298 7.619 8.80192 7.60072 8.79441C7.58244 8.7869 7.56286 8.78309 7.5431 8.78321Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 12.1563C7.52339 12.1561 7.50386 12.1599 7.48562 12.1675C7.46739 12.175 7.45083 12.1861 7.43689 12.2001C7.42295 12.2141 7.41192 12.2307 7.40443 12.249C7.39694 12.2673 7.39314 12.287 7.39326 12.3067V12.3578C7.39168 12.3786 7.39439 12.3995 7.40123 12.4192C7.40806 12.4388 7.41887 12.4569 7.43298 12.4722C7.44709 12.4875 7.46419 12.4997 7.48322 12.508C7.50225 12.5164 7.52278 12.5207 7.54354 12.5207C7.5643 12.5207 7.58484 12.5164 7.60387 12.508C7.62289 12.4997 7.63999 12.4875 7.6541 12.4722C7.66821 12.4569 7.67903 12.4388 7.68586 12.4192C7.6927 12.3995 7.69541 12.3786 7.69383 12.3578V12.3067C7.69383 12.2869 7.68992 12.2673 7.68234 12.249C7.67475 12.2306 7.66364 12.214 7.64963 12.2C7.63562 12.186 7.619 12.175 7.60072 12.1675C7.58244 12.1599 7.56286 12.1561 7.5431 12.1563Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 14.4023C7.52335 14.4023 7.5038 14.4063 7.48556 14.4139C7.46732 14.4215 7.45076 14.4327 7.43684 14.4467C7.42291 14.4608 7.41189 14.4775 7.40441 14.4959C7.39694 14.5142 7.39314 14.5339 7.39326 14.5537V14.6083C7.39168 14.6291 7.39439 14.65 7.40123 14.6696C7.40806 14.6893 7.41887 14.7074 7.43298 14.7227C7.44709 14.738 7.46419 14.7502 7.48322 14.7585C7.50225 14.7669 7.52278 14.7712 7.54354 14.7712C7.5643 14.7712 7.58484 14.7669 7.60387 14.7585C7.62289 14.7502 7.63999 14.738 7.6541 14.7227C7.66821 14.7074 7.67903 14.6893 7.68586 14.6696C7.6927 14.65 7.69541 14.6291 7.69383 14.6083V14.5572C7.69429 14.5371 7.69074 14.517 7.68337 14.4982C7.67601 14.4795 7.66498 14.4623 7.65094 14.4479C7.6369 14.4335 7.62012 14.422 7.6016 14.4142C7.58309 14.4064 7.5632 14.4023 7.5431 14.4023Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.54316 11.5938C7.50341 11.5938 7.4653 11.6096 7.4372 11.6378C7.4091 11.6661 7.39331 11.7043 7.39331 11.7442V11.7935C7.3962 11.8316 7.41329 11.8671 7.44116 11.893C7.46902 11.919 7.50561 11.9334 7.54359 11.9334C7.58158 11.9334 7.61816 11.919 7.64603 11.893C7.67389 11.8671 7.69098 11.8316 7.69388 11.7935V11.7416C7.69296 11.7021 7.67668 11.6645 7.64851 11.6368C7.62034 11.6092 7.58253 11.5937 7.54316 11.5938Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 13.8418C7.52335 13.8418 7.5038 13.8457 7.48556 13.8533C7.46732 13.861 7.45076 13.8721 7.43684 13.8862C7.42291 13.9003 7.41189 13.9169 7.40441 13.9353C7.39694 13.9537 7.39314 13.9733 7.39326 13.9932V14.0442C7.39168 14.065 7.39439 14.0859 7.40123 14.1056C7.40806 14.1253 7.41887 14.1433 7.43298 14.1586C7.44709 14.1739 7.46419 14.1861 7.48322 14.1945C7.50225 14.2028 7.52278 14.2071 7.54354 14.2071C7.5643 14.2071 7.58484 14.2028 7.60387 14.1945C7.62289 14.1861 7.63999 14.1739 7.6541 14.1586C7.66821 14.1433 7.67903 14.1253 7.68586 14.1056C7.6927 14.0859 7.69541 14.065 7.69383 14.0442V13.9932C7.69383 13.953 7.67795 13.9145 7.64968 13.8861C7.62142 13.8577 7.58308 13.8418 7.5431 13.8418Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.5431 12.7168C7.52335 12.7168 7.5038 12.7207 7.48556 12.7283C7.46732 12.736 7.45076 12.7471 7.43684 12.7612C7.42291 12.7753 7.41189 12.7919 7.40441 12.8103C7.39694 12.8287 7.39314 12.8483 7.39326 12.8682V12.9192C7.39168 12.94 7.39439 12.9609 7.40123 12.9806C7.40806 13.0003 7.41887 13.0183 7.43298 13.0336C7.44709 13.0489 7.46419 13.0611 7.48322 13.0695C7.50225 13.0778 7.52278 13.0821 7.54354 13.0821C7.5643 13.0821 7.58484 13.0778 7.60387 13.0695C7.62289 13.0611 7.63999 13.0489 7.6541 13.0336C7.66821 13.0183 7.67903 13.0003 7.68586 12.9806C7.6927 12.9609 7.69541 12.94 7.69383 12.9192V12.8682C7.69383 12.828 7.67795 12.7895 7.64968 12.7611C7.62142 12.7327 7.58308 12.7168 7.5431 12.7168Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M7.54316 13.2793C7.50341 13.2793 7.4653 13.2952 7.4372 13.3234C7.4091 13.3516 7.39331 13.3899 7.39331 13.4298V13.4817C7.3962 13.5197 7.41329 13.5553 7.44116 13.5812C7.46902 13.6071 7.50561 13.6215 7.54359 13.6215C7.58158 13.6215 7.61816 13.6071 7.64603 13.5812C7.67389 13.5553 7.69098 13.5197 7.69388 13.4817V13.4298C7.69365 13.3898 7.67766 13.3515 7.64942 13.3233C7.62118 13.2951 7.58298 13.2793 7.54316 13.2793Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M13.933 3.31434L12.0051 2.20018L8.75761 0.31596C8.39486 0.10741 7.98384 -0.00155599 7.56586 1.67874e-05C7.10228 0.00172895 6.6479 0.130112 6.25143 0.371404C5.65731 0.725189 1.66495 3.03712 0.864895 3.49739C0.275154 3.83797 0 4.38625 0 5.22055V11.6283C0 12.3455 0.297937 12.8762 0.937627 13.3004C1.13917 13.4307 2.19072 14.0458 3.38071 14.734C3.34633 14.8121 3.33953 14.8997 3.36144 14.9822L3.96607 17.1753C3.98225 17.2374 4.01403 17.2943 4.05837 17.3406C4.10272 17.3868 4.15813 17.4208 4.21932 17.4394C4.24386 17.4464 4.46994 17.5142 4.83272 17.596V20.715C4.83215 20.7949 4.85702 20.8729 4.9037 20.9376L6.35921 22.9345C6.39251 22.982 6.70973 23.4 7.53169 23.4C8.31246 23.4 8.62179 23.0374 8.69101 22.938L10.157 20.935C10.2045 20.8703 10.2297 20.7918 10.2289 20.7114V17.552C10.4699 17.4869 10.6127 17.4358 10.6294 17.4306C10.6806 17.4123 10.7273 17.3831 10.7662 17.345C10.805 17.3068 10.8352 17.2607 10.8546 17.2097L11.6905 15.0165C11.7256 14.9278 11.7256 14.829 11.6905 14.7402L14.032 13.3823C14.7575 12.9616 15.1107 12.335 15.1107 11.4646V5.19239C15.1081 4.40033 14.7111 3.76757 13.933 3.31434ZM8.08375 22.4936C8.06622 22.512 7.92689 22.6449 7.53169 22.6449C7.13648 22.6449 6.98664 22.5094 6.96648 22.4892L6.12174 21.3257C6.59101 21.4059 7.06618 21.4463 7.5422 21.4463C8.00907 21.4464 8.47513 21.4072 8.9355 21.3292L8.08375 22.4936ZM9.47792 20.4351C8.84707 20.6074 8.19597 20.6936 7.5422 20.6912C6.88182 20.6925 6.22416 20.6061 5.58633 20.4342V17.7386C6.23065 17.8475 6.88269 17.904 7.53607 17.9075C8.18877 17.9064 8.83997 17.8448 9.48142 17.7236L9.47792 20.4351ZM10.2184 16.7696C9.3462 17.0212 8.44349 17.15 7.53607 17.1525C6.55771 17.1401 5.58431 17.0107 4.63643 16.767L4.24298 15.3369C5.0071 15.4398 6.39251 15.6009 7.53607 15.6009C7.93565 15.6009 8.36591 15.5807 8.78916 15.5507C9.46477 15.5023 10.1229 15.4284 10.6118 15.365L10.7634 15.3457L10.2184 16.7696ZM14.3562 11.4646C14.3562 11.9882 14.2134 12.4045 13.6552 12.7293L10.3691 14.6346C9.42948 14.7588 8.48363 14.8296 7.53607 14.8467C6.59584 14.8302 5.65729 14.7603 4.72494 14.6372C3.20283 13.7572 1.58958 12.8243 1.35474 12.6685C0.893813 12.3649 0.755359 12.0569 0.755359 11.6283V5.22055C0.746148 4.99347 0.784974 4.76701 0.869277 4.55611C0.880198 4.54629 0.889383 4.53468 0.896441 4.52178C0.905931 4.50523 0.912178 4.48701 0.914843 4.4681C0.994896 4.33513 1.10858 4.22582 1.24433 4.15128C2.54999 3.39354 6.07705 1.35355 6.63612 1.02089C6.91671 0.850408 7.23793 0.75919 7.56586 0.756871C7.85147 0.754787 8.13267 0.82759 8.38168 0.968087L13.5518 3.96646C14.039 4.24896 14.3553 4.61859 14.3553 5.19151L14.3562 11.4646Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M8.17407 8.80441V10.1368L9.29835 9.49878V8.125L8.31428 8.71992L8.17407 8.80441Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M1.53442 6.88253L3.92318 8.27567V7.61739L1.53442 6.20312V6.88253Z",
      "fill": "#060800"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M1.53442 7.91964L3.92318 9.31278V8.6545L1.53442 7.24023V7.91964Z",
      "fill": "#060800"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "header-button-menu",
    on: {
      "click": _vm.activeHamburguer
    }
  }, [_c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div')]), _vm._v(" "), _c('nav', [_c('ul', [_vm._l(_vm.linksRedirected, function (linkRedirect) {
    return _c('li', {
      key: linkRedirect.srcOrpath
    }, [_c('a', {
      class: {
        '--link-selected': _vm.pathOrAncora(linkRedirect)
      },
      on: {
        "click": function ($event) {
          return _vm.redirect(linkRedirect);
        }
      }
    }, [_vm._v("\n                            " + _vm._s(linkRedirect.label) + "\n                        ")])]);
  }), _vm._v(" "), !_vm.linksRedirected ? _vm._t("paths") : _vm._e()], 2)])])])]);
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = function (inject) {
  if (!inject) return;
  inject("data-v-3f7e656b_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.container[data-v-3f7e656b]{width:100%;max-width:1280px;margin:0 auto;padding:0 20px}header[data-v-3f7e656b]{box-shadow:0 1px 1px 0 #f2f2f2}header .header-content[data-v-3f7e656b]{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:87px}header .header-logo[data-v-3f7e656b]{width:auto}header .header-logo .img-logo[data-v-3f7e656b],header .header-logo .svg-logo[data-v-3f7e656b]{width:90px;height:38.2px}header .header-button-menu[data-v-3f7e656b]{height:15px;width:20px;position:relative;display:none}header .header-button-menu div[data-v-3f7e656b]{width:100%;height:2px;background-color:#fbbe2f;border-radius:25%;position:absolute;top:0;left:0}header .header-button-menu div[data-v-3f7e656b]:nth-child(2){top:calc(50% - 1px)}header .header-button-menu div[data-v-3f7e656b]:nth-child(3){top:calc(100% - 2px)}header nav[data-v-3f7e656b]{flex:1}header nav ul[data-v-3f7e656b]{display:flex;justify-content:flex-end;padding:0;margin:0;width:100%}header nav ul li[data-v-3f7e656b]{list-style:none}header nav ul li a[data-v-3f7e656b]{cursor:pointer;padding:35px 25px;display:block;font-family:Montserrat;font-size:14px;font-style:normal;font-weight:400;line-height:17px;color:#757575;text-decoration:none}header nav ul li a.--link-selected[data-v-3f7e656b]{font-weight:700}@media only screen and (max-width:550px){header .header-logo .svg-logo[data-v-3f7e656b]{width:55px;height:23.4px}header .header-button-menu[data-v-3f7e656b]{display:block}header .header-button-menu.is-open-active[data-v-3f7e656b]{transition:transform .3s ease}header .header-button-menu.is-open-active div[data-v-3f7e656b]{transform:rotate(-45deg);top:calc(50% - 1px)}header .header-button-menu.is-open-active div[data-v-3f7e656b]:nth-child(2){display:none}header .header-button-menu.is-open-active div[data-v-3f7e656b]:nth-child(3){transform:rotate(45deg);top:calc(50% - 1px)}header nav[data-v-3f7e656b]{position:absolute;top:88px;right:0;width:0;height:calc(100vh - 88px);background:#fff;z-index:1;overflow:hidden;transition:width .3s ease}header nav.is-active[data-v-3f7e656b]{width:100%}header nav.is-active ul[data-v-3f7e656b]{transform:translateX(0)}header nav ul[data-v-3f7e656b]{flex-direction:column;align-items:center;justify-content:center;height:100%;transform:translateX(100%);transition:transform .3s ease}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$a = "data-v-3f7e656b";
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, createInjector, undefined, undefined);

//
//
//
//
//
var script$9 = {
  name: 'LinkText',
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: false
    },
    // Styles:
    size: {
      type: Number,
      required: false
    },
    weight: {
      type: Number,
      required: false
    }
  }
};

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    style: {
      'fontSize': _vm.size + "px",
      'fontWeight': _vm.weight ? _vm.weight : ''
    },
    attrs: {
      "href": _vm.href
    }
  }, [_vm._v(_vm._s(_vm.title))]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = function (inject) {
  if (!inject) return;
  inject("data-v-dfbfc100_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);a{color:#757575;font-family:Montserrat;font-style:normal;font-weight:400;font-size:14px;line-height:15px}@media only screen and (max-width:550px){a{font-size:12px}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$8 = {
  name: "TextFormField",
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String || Number || Boolean || Array || Object || Function,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    // Disables:
    inputDisabled: {
      type: Boolean,
      required: false
    },
    //SELECT:
    selectMaxWidthNormal: {
      type: Boolean
    },
    // [ { value: [Any], label: [String], disabled: [Boolean] } ]
    items: {
      type: Array,
      required: false
    },
    item: {
      type: Object,
      required: false
    },
    //RADIO:
    // [ { label: String, value: String||Number, disabled: Boolean(default: false) } ]
    options: {
      type: Array,
      required: false
    },
    // { label: String, value: String||Number, disabled: Boolean(default: false) }
    option: {
      type: Object,
      required: false
    },
    // MSG´s:
    messageNotification: {
      type: String,
      required: false
    },
    errorMessage: {
      type: String,
      required: false
    },
    error: {
      type: Boolean,
      default: false
    },
    //Functions:
    filterMethod: {
      type: Function,
      required: false,
      default: () => {}
    },
    // maxLengthInput:
    maxLength6: {
      type: Boolean
    },
    maxLength15: {
      type: Boolean
    },
    maxLength20: {
      type: Boolean
    },
    maxLength60: {
      type: Boolean
    },
    maxLength85: {
      type: Boolean
    },
    filterNumberAddress: {
      type: Boolean
    },
    filterCpf: {
      type: Boolean
    },
    filterCnpj: {
      type: Boolean
    },
    filterRg: {
      type: Boolean
    },
    filterPhone: {
      type: Boolean
    },
    filterCep: {
      type: Boolean
    },
    filterUf: {
      type: Boolean
    },
    fieldMaxWidthNormal: {
      type: Boolean,
      required: false,
      default: false
    },
    verification: {
      type: Boolean
    }
  },

  data() {
    return {
      typeInputMoment: null,
      openSelect: false
    };
  },

  watch: {
    type(newV, oldV) {
      if (newV != oldV) this.typeInputMoment = newV;
    }

  },

  mounted() {
    this.typeInputMoment = this.type;
  },

  computed: {
    msgFieldComputed() {
      if ((this.messageNotification != null || this.messageNotification != '') && (this.errorMessage == '' || this.errorMessage == null)) {
        return this.messageNotification;
      } else if (this.error && (this.errorMessage != '' || this.errorMessage != null)) {
        return this.errorMessage;
      }
    },

    containsError() {
      return this.error && this.msgFieldComputed === this.errorMessage ? true : false;
    },

    checkMaximumSize() {
      if (this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 6;
      } else if (this.maxLength15 && !this.maxLength6 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 15;
      } else if (this.maxLength20 && !this.maxLength6 && !this.maxLength15 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 20;
      } else if (this.maxLength60 && !this.maxLength85 && !this.maxLength20 && !this.maxLength15 && !this.maxLength6 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 60;
      } else if (this.maxLength85 && !this.maxLength60 && !this.maxLength20 && !this.maxLength15 && !this.maxLength6 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 85;
      } else if (this.filterPhone && !this.filterCep && !this.filterCpf && !this.filterUf && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 25;
      } else if (this.filterCep && !this.filterPhone && !this.filterPhone && !this.filterUf && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 13;
      } else if (this.filterUf && !this.filterCep && !this.filterPhone && !this.filterPhone && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 2;
      } else {
        return Infinity;
      }
    }

  },
  methods: {
    changeType() {
      if (this.typeInputMoment === "password") {
        this.typeInputMoment = "text";
      } else if (this.typeInputMoment === "text") {
        this.typeInputMoment = "password";
      }
    },

    searchMethod() {
      this.$emit('searchIconFilterClick');
    },

    sendValue($e) {
      if (this.filterCpf === true && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '###.###.###-##'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = window.event ? event.keyCode : event.which;

        for (let i = 0; i < numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor + 1, cursor + 1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterCnpj === true && !this.filterCpf && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '##.###.###/####-##'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = window.event ? event.keyCode : event.which;

        for (let i = 0; i < numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor + 1, cursor + 1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterRg === true && !this.filterCpf && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '##.###.###-#'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = window.event ? event.keyCode : event.which;

        for (let i = 0; i < numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor + 1, cursor + 1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterPhone === true && !this.filterCpf && !this.filterCep && !this.filterUf) {
        $e.target.value = $e.target.value.replace(/\D/g, "");
        $e.target.value = $e.target.value.replace(/^(\d)/, "+$1");
        $e.target.value = $e.target.value.replace(/(.{3})(\d)/, "$1($2");
        $e.target.value = $e.target.value.replace(/(.{6})(\d)/, "$1)$2");

        if ($e.target.value.length == 12) {
          $e.target.value = $e.target.value.replace(/(.{1})$/, "-$1");
        } else if ($e.target.value.length == 13) {
          $e.target.value = $e.target.value.replace(/(.{2})$/, "-$1");
        } else if ($e.target.value.length == 14) {
          $e.target.value = $e.target.value.replace(/(.{3})$/, "-$1");
        } else if ($e.target.value.length == 15) {
          $e.target.value = $e.target.value.replace(/(.{4})$/, "-$1");
        } else if ($e.target.value.length > 15) {
          $e.target.value = $e.target.value.replace(/(.{4})$/, "-$1");
        }
      } else if (this.filterCep === true && !this.filterCpf && !this.filterPhone && !this.filterUf) {
        $e.target.value = $e.target.value.replace(/\D/g, "");
        $e.target.value = $e.target.value.replace(/(.{5})(\d)/, "$1-$2");
      } else if (this.filterUf === true && !this.filterCpf && !this.filterPhone && !this.filterCep) {
        $e.target.value = $e.target.value.toUpperCase();
      } else if (this.filterNumberAddress === true) {
        $e.target.value = $e.target.value.replace(/\D/g, "");
      }

      this.filterMethod($e.target.value);
      this.$emit("valueInput", $e.target.value);
    },

    // FUNCTIONS OF SELECT:
    selectedElementSelect(value, event) {
      this.closeOptionsSelect(event.target.parentElement);
      this.openSelect = false;
      this.filterMethod(value);
      this.$emit('selectedValue', value);
    },

    selectOpenOrClose($event) {
      this.openSelect = !this.openSelect;

      if (this.openSelect) {
        if ($event.target.id === "select-label") {
          this.openOptionsSelect($event.target.parentElement.nextElementSibling);
        }

        if ($event.target.id === "dropdown") {
          this.openOptionsSelect($event.target.lastElementChild);
        }

        if ($event.target.id === "dropdown-select") {
          this.openOptionsSelect($event.target.nextElementSibling);
        }

        if ($event.target.id === "svg-icon") {
          this.openOptionsSelect($event.target.parentElement.nextElementSibling);
        }
      } else {
        if ($event.target.id === "select-label") {
          this.closeOptionsSelect($event.target.parentElement.nextElementSibling);
        }

        if ($event.target.id === "dropdown") {
          this.closeOptionsSelect($event.target.lastElementChild);
        }

        if ($event.target.id === "dropdown-select") {
          this.closeOptionsSelect($event.target.nextElementSibling);
        }

        if ($event.target.id === "svg-icon") {
          this.closeOptionsSelect($event.target.parentElement.nextElementSibling);
        }
      }
    },

    openOptionsSelect(element) {
      element.classList.add("is-active");
    },

    closeOptionsSelect(element) {
      if (element.classList != null) element.classList.remove("is-active");
    },

    // FUNCTIONS OF RADIO:
    selectedElementRadio(value) {
      this.$emit('selectedValue', value);
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "text-form-field"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.label) + ":")]), _vm._v(" "), _vm.type !== 'select' && _vm.type !== 'radio' ? _c('div', {
    class: {
      '--max-width-normal': _vm.fieldMaxWidthNormal
    },
    attrs: {
      "id": "input-field"
    }
  }, [_c('input', {
    staticClass: "input",
    class: {
      '--disabled': _vm.inputDisabled,
      '--password-type': _vm.type === 'password'
    },
    attrs: {
      "type": _vm.typeInputMoment,
      "placeholder": _vm.placeholder ? _vm.placeholder : '',
      "disabled": _vm.inputDisabled,
      "maxlength": _vm.checkMaximumSize
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.sendValue
    }
  }), _vm._v(" "), _vm.type === 'password' ? _c('svg', {
    staticClass: "icon-field",
    class: {
      '--disabled': _vm.inputDisabled
    },
    attrs: {
      "width": "24",
      "height": "14",
      "viewBox": "0 0 24 14",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.changeType($event);
      }
    }
  }, [_c('path', {
    attrs: {
      "d": "M12 3C9.79403 3 8 4.79403 8 7.00005C8 9.20607 9.79403 11.0001 12 11.0001C14.2061 11.0001 16.0001 9.20607 16.0001 7.00005C16.0001 4.79403 14.2061 3 12 3ZM12 10.0001C10.346 10.0001 9 8.65411 9 7.0001C9 5.34609 10.346 4.00005 12 4.00005C13.6541 4.00005 15.0001 5.34609 15.0001 7.0001C15.0001 8.65411 13.6541 10.0001 12 10.0001Z",
      "fill": "black"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M23.9111 6.71612C23.7221 6.4411 19.18 0 11.9999 0C5.83883 0 0.348744 6.40411 0.11774 6.67712C-0.0392467 6.86312 -0.0392467 7.13613 0.11774 7.32311C0.348744 7.59612 5.83883 14.0002 11.9999 14.0002C18.1611 14.0002 23.6511 7.59612 23.8821 7.32311C24.0271 7.15113 24.0401 6.90212 23.9111 6.71612ZM11.9999 13.0002C7.06088 13.0002 2.36478 8.29016 1.17179 7.00014C2.36281 5.70914 7.05389 1.00005 11.9999 1.00005C17.779 1.00005 21.8581 5.70314 22.8541 6.97314C21.7041 8.22214 16.981 13.0002 11.9999 13.0002Z",
      "fill": "black"
    }
  })]) : _vm._e(), _vm._v(" "), _vm.typeInputMoment === 'text' && _vm.filterCep === true && _vm.verification === true ? _c('svg', {
    staticClass: "icon-field",
    class: {
      '--search': _vm.filterCep,
      '--disabled': _vm.disabled
    },
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "height": "18px",
      "viewBox": "0 0 24 24",
      "width": "18px",
      "fill": "#000000"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.searchMethod($event);
      }
    }
  }, [_c('path', {
    attrs: {
      "d": "M0 0h24v24H0V0z",
      "fill": "none"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    }
  })]) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.type === 'select' ? _c('div', {
    class: {
      '--select-max-width-normal': _vm.fieldMaxWidthNormal
    },
    attrs: {
      "id": "dropdown"
    },
    on: {
      "!click": function ($event) {
        return _vm.selectOpenOrClose($event);
      }
    }
  }, [_c('div', {
    attrs: {
      "id": "dropdown-select"
    }
  }, [_c('span', {
    staticClass: "select",
    attrs: {
      "id": "select-label"
    },
    on: {
      "!click": function ($event) {
        $event.preventDefault();
        return _vm.selectOpenOrClose($event);
      }
    }
  }, [_vm._v(_vm._s(_vm.item.value && _vm.item.label ? _vm.item.label : 'Selecione'))]), _vm._v(" "), _c('svg', {
    attrs: {
      "id": "svg-icon",
      "width": "17",
      "height": "8",
      "viewBox": "0 0 17 8",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.58839 4.51715e-07L0.621093 0.870535L8.51744 8L16.4138 0.870535L15.4465 9.17941e-08L8.51744 6.28571L1.58839 4.51715e-07Z",
      "fill": "#FBBE2F"
    }
  })])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "dropdown-list__element_select"
    }
  }, _vm._l(_vm.items, function (itemMoment, index) {
    return _c('div', {
      key: index,
      staticClass: "dropdown-list__item",
      class: {
        '--selected': itemMoment == _vm.item,
        '--first': index == 0,
        '--last': index == _vm.items.length - 1
      },
      on: {
        "click": function ($event) {
          return _vm.selectedElementSelect(itemMoment, $event);
        }
      }
    }, [_vm._v(_vm._s(itemMoment.label))]);
  }), 0)]) : _vm._e(), _vm._v(" "), _vm.type === 'radio' ? _c('div', {
    staticClass: "container-radio"
  }, _vm._l(_vm.options, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "radio",
      on: {
        "click": function ($event) {
          return _vm.selectedElementRadio(item);
        }
      }
    }, [_c('input', {
      attrs: {
        "id": "id-radio",
        "name": "radio",
        "type": "radio",
        "disabled": _vm.option.disabled
      },
      domProps: {
        "checked": _vm.option.value == item.value,
        "value": _vm.option
      }
    }), _vm._v(" "), _c('label', {
      staticClass: "radio-label",
      attrs: {
        "for": "radio-1"
      }
    }, [_vm._v(_vm._s(item.label))])]);
  }), 0) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "span-msg",
    class: {
      '--error': _vm.containsError
    }
  }, [_vm._v(_vm._s(_vm.msgFieldComputed))])]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = function (inject) {
  if (!inject) return;
  inject("data-v-2757be82_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);#text-form-field[data-v-2757be82]{display:flex;flex-direction:column;margin:16px 0}#text-form-field label[data-v-2757be82]{margin-bottom:8px;font-family:Montserrat;font-style:normal;font-weight:400;font-size:14px;line-height:17px;color:#000}#text-form-field #input-field[data-v-2757be82]{display:flex;width:100%;max-width:425px;position:relative}#text-form-field #input-field.--max-width-normal[data-v-2757be82]{max-width:none}#text-form-field #input-field .input[data-v-2757be82]{position:relative;outline:0;width:100%;min-height:44px;padding:0 24px;background:#fff;box-shadow:0 1px 24px rgba(35,34,39,.1);border-radius:40px;border:none;font-family:Montserrat;font-style:normal;font-weight:400;font-size:14px;line-height:17px;align-items:center;display:flex;justify-content:center;color:#000}#text-form-field #input-field .input.--password-type[data-v-2757be82]{padding:0 70px 0 24px}#text-form-field #input-field .input.--disabled[data-v-2757be82]{cursor:not-allowed;color:#000;background-color:rgba(139,139,139,.089);border:.1px solid rgba(56,56,56,.11)}#text-form-field #input-field .icon-field[data-v-2757be82]{position:absolute;top:50%;right:30px;transform:translateY(-50%)}#text-form-field #input-field .icon-field.--search[data-v-2757be82]{cursor:pointer}#text-form-field #input-field .icon-field.--search[data-v-2757be82]:hover{transition:1s;border-radius:8px;background:rgba(184,184,184,.38)}#text-form-field #input-field .icon-field.--disabled[data-v-2757be82]{display:none}#text-form-field #dropdown[data-v-2757be82]{width:100%;max-width:425px;height:43px;padding:0 31.5px;position:relative;outline:0;cursor:pointer;border-radius:24px;border:1px solid #000;font-family:Montserrat;font-size:14px}#text-form-field #dropdown.--select-max-width-normal[data-v-2757be82]{max-width:none}#text-form-field #dropdown #dropdown-select[data-v-2757be82]{width:100%;height:100%;display:flex;align-items:center;justify-content:space-between}#text-form-field #dropdown #dropdown-select svg[data-v-2757be82]{position:absolute;right:31.5px}#text-form-field #dropdown #dropdown-list__element_select[data-v-2757be82]{position:absolute;right:0;width:0;background:#fff;transition:width .3s ease;z-index:1;border-top:30px solid #fff;border-bottom:30px solid #fff;border-radius:40px;box-shadow:0 1px 24px rgba(35,34,39,.1);background-color:#fff;grid-row:auto;top:102%;display:none;align-items:center}#text-form-field #dropdown #dropdown-list__element_select.is-active[data-v-2757be82]{width:100%;display:flex;flex-direction:column;transition:width .3s ease}#text-form-field #dropdown #dropdown-list__element_select.is-active .dropdown-list__item[data-v-2757be82]{transition:transform .3s ease}#text-form-field #dropdown #dropdown-list__element_select .dropdown-list__item[data-v-2757be82]{padding:9px 43px;display:flex;width:100%;align-items:center;justify-content:center;border-bottom:1px solid #000}#text-form-field #dropdown #dropdown-list__element_select .dropdown-list__item.--selected[data-v-2757be82]{background:#fbbe2f}#text-form-field #dropdown #dropdown-list__element_select .dropdown-list__item.--first[data-v-2757be82]{border-top:1px solid #000;border-top-right-radius:1.8px;border-top-left-radius:1.8px}#text-form-field #dropdown #dropdown-list__element_select .dropdown-list__item.--last[data-v-2757be82]{border-bottom-right-radius:1.8px;border-bottom-left-radius:1.8px}#text-form-field #dropdown #dropdown-list__element_select .dropdown-list__item[data-v-2757be82]:hover{background:#fbbe2f21}#text-form-field .container-radio[data-v-2757be82]{font-family:Montserrat;display:flex}#text-form-field .container-radio .radio[data-v-2757be82]{margin:.5rem}#text-form-field .container-radio .radio input[type=radio][data-v-2757be82]{opacity:0}#text-form-field .container-radio .radio input[type=radio]+.radio-label[data-v-2757be82]:before{content:\"\";background:#f4f4f4;border-radius:100%;border:1px solid #b4b4b4;display:inline-block;width:1em;height:1em;position:relative;margin-right:1em;vertical-align:top;cursor:pointer;text-align:center;transition:all 250ms ease}#text-form-field .container-radio .radio input[type=radio]:checked+.radio-label[data-v-2757be82]:before{background-color:#fbbe2f;box-shadow:inset 0 0 0 4px #f4f4f4}#text-form-field .container-radio .radio input[type=radio]:focus+.radio-label[data-v-2757be82]:before{outline:0;border-color:#fbbe2f}#text-form-field .container-radio .radio input[type=radio]:disabled+.radio-label[data-v-2757be82]:before{box-shadow:inset 0 0 0 4px #f4f4f4;border-color:#b4b4b4;background:#b4b4b4}#text-form-field .container-radio .radio input[type=radio]+.radio-label[data-v-2757be82]:empty:before{margin-right:0}#text-form-field .span-msg[data-v-2757be82]{margin-top:8px;max-width:425px;font-family:Montserrat;font-style:normal;font-weight:400;font-size:12px;line-height:17px;color:#757575}#text-form-field .span-msg.--error[data-v-2757be82]{color:#eb5757;margin-top:10px;font-size:14px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$8 = "data-v-2757be82";
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$7 = {
  name: "InputField",

  data() {
    return {
      type: null
    };
  },

  watch: {
    typeField(newV, oldV) {
      if (newV != oldV) this.type = newV;
    }

  },

  mounted() {
    this.type = this.typeField;
  },

  props: {
    typeField: {
      type: String,
      default: "text"
    },
    value: {
      type: String || Number || Boolean || Array || Object || Function,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    // maxLengthInput:
    maxLength6: {
      type: Boolean
    },
    maxLength15: {
      type: Boolean
    },
    maxLength20: {
      type: Boolean
    },
    maxLength60: {
      type: Boolean
    },
    maxLength85: {
      type: Boolean
    },
    filterNumberAddress: {
      type: Boolean
    },
    filterCpf: {
      type: Boolean
    },
    filterCnpj: {
      type: Boolean
    },
    filterRg: {
      type: Boolean
    },
    filterPhone: {
      type: Boolean
    },
    filterCep: {
      type: Boolean
    },
    filterUf: {
      type: Boolean
    },
    inputMaxWidthNormal: {
      type: Boolean
    },
    verification: {
      type: Boolean
    }
  },
  computed: {
    checkMaximumSize() {
      if (this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 6;
      } else if (this.maxLength15 && !this.maxLength6 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 15;
      } else if (this.maxLength20 && !this.maxLength6 && !this.maxLength15 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 20;
      } else if (this.maxLength60 && !this.maxLength85 && !this.maxLength20 && !this.maxLength15 && !this.maxLength6 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 60;
      } else if (this.maxLength85 && !this.maxLength60 && !this.maxLength20 && !this.maxLength15 && !this.maxLength6 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 85;
      } else if (this.filterPhone && !this.filterCep && !this.filterCpf && !this.filterUf && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 25;
      } else if (this.filterCep && !this.filterPhone && !this.filterPhone && !this.filterUf && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 13;
      } else if (this.filterUf && !this.filterCep && !this.filterPhone && !this.filterPhone && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 2;
      } else {
        return Infinity;
      }
    }

  },
  methods: {
    changeType() {
      if (this.type === "password") {
        this.type = "text";
      } else if (this.type === "text") {
        this.type = "password";
      }
    },

    searchMethod() {
      this.$emit('searchIconFilterClick');
    },

    sendValue($e) {
      if (this.filterCpf === true && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '###.###.###-##'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = window.event ? event.keyCode : event.which;

        for (let i = 0; i < numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor + 1, cursor + 1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterCnpj === true && !this.filterCpf && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '##.###.###/####-##'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = window.event ? event.keyCode : event.which;

        for (let i = 0; i < numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor + 1, cursor + 1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterRg === true && !this.filterCpf && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '##.###.###-#'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = window.event ? event.keyCode : event.which;

        for (let i = 0; i < numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor + 1, cursor + 1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterPhone === true && !this.filterCpf && !this.filterCep && !this.filterUf) {
        $e.target.value = $e.target.value.replace(/\D/g, "");
        $e.target.value = $e.target.value.replace(/^(\d)/, "+$1");
        $e.target.value = $e.target.value.replace(/(.{3})(\d)/, "$1($2");
        $e.target.value = $e.target.value.replace(/(.{6})(\d)/, "$1)$2");

        if ($e.target.value.length == 12) {
          $e.target.value = $e.target.value.replace(/(.{1})$/, "-$1");
        } else if ($e.target.value.length == 13) {
          $e.target.value = $e.target.value.replace(/(.{2})$/, "-$1");
        } else if ($e.target.value.length == 14) {
          $e.target.value = $e.target.value.replace(/(.{3})$/, "-$1");
        } else if ($e.target.value.length == 15) {
          $e.target.value = $e.target.value.replace(/(.{4})$/, "-$1");
        } else if ($e.target.value.length > 15) {
          $e.target.value = $e.target.value.replace(/(.{4})$/, "-$1");
        }
      } else if (this.filterCep === true && !this.filterCpf && !this.filterPhone && !this.filterUf) {
        $e.target.value = $e.target.value.replace(/\D/g, "");
        $e.target.value = $e.target.value.replace(/(.{5})(\d)/, "$1-$2");
      } else if (this.filterUf === true && !this.filterCpf && !this.filterPhone && !this.filterCep) {
        $e.target.value = $e.target.value.toUpperCase();
      } else if (this.filterNumberAddress === true) {
        $e.target.value = $e.target.value.replace(/\D/g, "");
      }

      this.$emit("valueInput", $e.target.value);
    }

  }
};

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "input-field",
    class: {
      '--max-width-normal': _vm.inputMaxWidthNormal
    }
  }, [_c('input', {
    staticClass: "input",
    class: {
      '--disabled': _vm.disabled,
      '--password-type': _vm.typeField === 'password'
    },
    attrs: {
      "type": _vm.type,
      "placeholder": _vm.placeholder ? _vm.placeholder : '',
      "disabled": _vm.disabled,
      "maxlength": _vm.checkMaximumSize
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.sendValue
    }
  }), _vm._v(" "), _vm.typeField === 'password' ? _c('svg', {
    staticClass: "icon-field",
    class: {
      '--disabled': _vm.disabled
    },
    attrs: {
      "width": "24",
      "height": "14",
      "viewBox": "0 0 24 14",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.changeType($event);
      }
    }
  }, [_c('path', {
    attrs: {
      "d": "M12 3C9.79403 3 8 4.79403 8 7.00005C8 9.20607 9.79403 11.0001 12 11.0001C14.2061 11.0001 16.0001 9.20607 16.0001 7.00005C16.0001 4.79403 14.2061 3 12 3ZM12 10.0001C10.346 10.0001 9 8.65411 9 7.0001C9 5.34609 10.346 4.00005 12 4.00005C13.6541 4.00005 15.0001 5.34609 15.0001 7.0001C15.0001 8.65411 13.6541 10.0001 12 10.0001Z",
      "fill": "black"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M23.9111 6.71612C23.7221 6.4411 19.18 0 11.9999 0C5.83883 0 0.348744 6.40411 0.11774 6.67712C-0.0392467 6.86312 -0.0392467 7.13613 0.11774 7.32311C0.348744 7.59612 5.83883 14.0002 11.9999 14.0002C18.1611 14.0002 23.6511 7.59612 23.8821 7.32311C24.0271 7.15113 24.0401 6.90212 23.9111 6.71612ZM11.9999 13.0002C7.06088 13.0002 2.36478 8.29016 1.17179 7.00014C2.36281 5.70914 7.05389 1.00005 11.9999 1.00005C17.779 1.00005 21.8581 5.70314 22.8541 6.97314C21.7041 8.22214 16.981 13.0002 11.9999 13.0002Z",
      "fill": "black"
    }
  })]) : _vm._e(), _vm._v(" "), _vm.typeField === 'text' && _vm.filterCep === true && _vm.verification === true ? _c('svg', {
    staticClass: "icon-field",
    class: {
      '--search': _vm.filterCep,
      '--disabled': _vm.disabled
    },
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "height": "18px",
      "viewBox": "0 0 24 24",
      "width": "18px",
      "fill": "#000000"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.searchMethod($event);
      }
    }
  }, [_c('path', {
    attrs: {
      "d": "M0 0h24v24H0V0z",
      "fill": "none"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    }
  })]) : _vm._e()]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-575b32b7_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.input-field[data-v-575b32b7]{display:flex;width:100%;max-width:425px;position:relative}.input-field.--max-width-normal[data-v-575b32b7]{max-width:none}.input-field .icon-field[data-v-575b32b7]{position:absolute;top:50%;right:30px;transform:translateY(-50%)}.input-field .icon-field.--search[data-v-575b32b7]{cursor:pointer}.input-field .icon-field.--search[data-v-575b32b7]:hover{transition:1s;border-radius:8px;background:rgba(184,184,184,.38)}.input-field .icon-field.--disabled[data-v-575b32b7]{display:none}.input[data-v-575b32b7]{position:relative;outline:0;width:100%;min-height:44px;padding:0 24px;background:#fff;box-shadow:0 1px 24px rgba(35,34,39,.1);border-radius:40px;border:none;font-family:Montserrat;font-style:normal;font-weight:400;font-size:14px;line-height:17px;align-items:center;display:flex;justify-content:center;color:#000}.input.--password-type[data-v-575b32b7]{padding:0 70px 0 24px}.input.--disabled[data-v-575b32b7]{cursor:not-allowed;color:#000;background-color:rgba(139,139,139,.089);border:.1px solid rgba(56,56,56,.11)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$7 = "data-v-575b32b7";
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);

//
//
//
//
var script$6 = {
  name: 'LabelField',
  props: {
    labelField: {
      type: String,
      required: true
    }
  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.labelField) + ":")]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-4afb901c_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.label{margin-bottom:8px;font-family:Montserrat;font-style:normal;font-weight:400;font-size:14px;line-height:17px;color:#000}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$6 = undefined;
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

//
//
//
//
var script$5 = {
  name: 'MsgField',
  props: {
    //the two need to be together:
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: false
    }
  },
  computed: {
    msgFieldComputed() {
      if ((this.message != null || this.message != '') && (this.errorMessage == '' || this.errorMessage == null)) {
        return this.message;
      } else if (this.error && (this.errorMessage != '' || this.errorMessage != null)) {
        return this.errorMessage;
      }
    },

    containsError() {
      return this.error && this.msgFieldComputed === this.errorMessage ? true : false;
    }

  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('span', {
    staticClass: "span-msg",
    class: {
      '--error': _vm.containsError
    }
  }, [_vm._v(_vm._s(_vm.msgFieldComputed))]);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-7c8783d2_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.span-msg{margin-top:8px;max-width:425px;font-family:Montserrat;font-style:normal;font-weight:400;font-size:12px;line-height:17px;color:#757575}.span-msg.--error{color:#eb5757;margin-top:10px;font-size:14px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
var script$4 = {
  name: 'ProgressBarSteps',
  props: {
    currentActive: {
      type: Number,
      default: 1
    },
    quantity: {
      type: Number
    }
  },
  watch: {
    currentActive(newV, oldV) {
      if (newV != oldV) this.updateMethod();
    }

  },
  computed: {
    progress() {
      return document.getElementById("progress");
    },

    prev() {
      return document.getElementById("prev");
    },

    next() {
      return document.getElementById("next");
    },

    circles() {
      return document.querySelectorAll(".circle");
    }

  },
  methods: {
    updateMethod() {
      this.circles.forEach((circle, index) => {
        if (index < this.currentActive) circle.classList.add("active");else circle.classList.remove("active");
      });
      const actives = document.querySelectorAll(".active");
      this.progress.style.width = (actives.length - 1) / (this.circles.length - 1) * 100 + "%";
    }

  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "container-progress-bar-steps"
  }, [_c('div', {
    staticClass: "progress-container"
  }, [_c('div', {
    staticClass: "progress",
    attrs: {
      "id": "progress"
    }
  }), _vm._v(" "), _vm._l(_vm.quantity, function (index) {
    return _c('div', {
      key: index,
      staticClass: "circle",
      class: {
        'active': index <= _vm.currentActive
      }
    }, [_vm._v(_vm._s(index))]);
  })], 2)]);
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-984e2c6e_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.container-progress-bar-steps[data-v-984e2c6e]{text-align:center;font-family:Montserrat;align-items:center}.container-progress-bar-steps .progress-container[data-v-984e2c6e]{display:flex;justify-content:space-between;position:relative;margin-bottom:30px;width:100%}.container-progress-bar-steps .progress-container[data-v-984e2c6e]::before{content:\"\";background-color:#e0e0e0;position:absolute;top:50%;left:0;transform:translateY(-50%);height:4px;width:100%;z-index:-1}.container-progress-bar-steps .progress-container .progress[data-v-984e2c6e]{background-color:#fbbe2f;position:absolute;top:50%;left:0;transform:translateY(-50%);height:5px;width:0%;transition:.4s ease}.container-progress-bar-steps .progress-container .circle[data-v-984e2c6e]{background-color:#fff;color:#999;font-weight:600;border-radius:50%;height:50px;width:50px;display:flex;align-items:center;justify-content:center;border:3px solid #e0e0e0;transition:.4s ease;z-index:1}.container-progress-bar-steps .progress-container .circle.active[data-v-984e2c6e]{border-color:#fbbe2f}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$4 = "data-v-984e2c6e";
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  name: 'Radio',
  props: {
    // [ { label: String, value: String||Number, disabled: Boolean(default: false) } ]
    options: {
      type: Array,
      required: true
    },
    // { label: String, value: String||Number, disabled: Boolean(default: false) }
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    sendSelect(value) {
      this.$emit('onSelect', value);
    }

  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "container-radio"
  }, _vm._l(_vm.options, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "radio",
      on: {
        "click": function ($event) {
          return _vm.sendSelect(item);
        }
      }
    }, [_c('input', {
      attrs: {
        "id": "id-radio",
        "name": "radio",
        "type": "radio",
        "disabled": _vm.value.disabled
      },
      domProps: {
        "checked": _vm.value.value == item.value,
        "value": _vm.value
      }
    }), _vm._v(" "), _c('label', {
      staticClass: "radio-label",
      attrs: {
        "for": "radio-1"
      }
    }, [_vm._v(_vm._s(item.label))])]);
  }), 0);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-553522c8_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);.container-radio[data-v-553522c8]{font-family:Montserrat;display:flex}.container-radio .radio[data-v-553522c8]{margin:.5rem}.container-radio .radio input[type=radio][data-v-553522c8]{opacity:0}.container-radio .radio input[type=radio]+.radio-label[data-v-553522c8]:before{content:\"\";background:#f4f4f4;border-radius:100%;border:1px solid #b4b4b4;display:inline-block;width:1em;height:1em;position:relative;margin-right:1em;vertical-align:top;cursor:pointer;text-align:center;transition:all 250ms ease}.container-radio .radio input[type=radio]:checked+.radio-label[data-v-553522c8]:before{background-color:#fbbe2f;box-shadow:inset 0 0 0 4px #f4f4f4}.container-radio .radio input[type=radio]:focus+.radio-label[data-v-553522c8]:before{outline:0;border-color:#fbbe2f}.container-radio .radio input[type=radio]:disabled+.radio-label[data-v-553522c8]:before{box-shadow:inset 0 0 0 4px #f4f4f4;border-color:#b4b4b4;background:#b4b4b4}.container-radio .radio input[type=radio]+.radio-label[data-v-553522c8]:empty:before{margin-right:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = "data-v-553522c8";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  name: 'Select',
  props: {
    selectMaxWidthNormal: {
      type: Boolean
    },
    // [ { value: [Any], label: [String], disabled: [Boolean] } ]
    items: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      open: false
    };
  },

  computed: {
    select() {
      return document.getElementById('dropdown-list__element_select');
    }

  },
  methods: {
    selecionouMethod(value, event) {
      this.closeOptionsSelect(event.target.parentElement);
      this.open = false;
      this.$emit('selectedValue', value);
    },

    onClickMethod($event) {
      this.open = !this.open;

      if (this.open) {
        if ($event.target.id === "select-label") {
          this.openOptionsSelect($event.target.parentElement.nextElementSibling);
        }

        if ($event.target.id === "dropdown") {
          this.openOptionsSelect($event.target.lastElementChild);
        }

        if ($event.target.id === "dropdown-select") {
          this.openOptionsSelect($event.target.nextElementSibling);
        }

        if ($event.target.id === "svg-icon") {
          this.openOptionsSelect($event.target.parentElement.nextElementSibling);
        }
      } else {
        if ($event.target.id === "select-label") {
          this.closeOptionsSelect($event.target.parentElement.nextElementSibling);
        }

        if ($event.target.id === "dropdown") {
          this.closeOptionsSelect($event.target.lastElementChild);
        }

        if ($event.target.id === "dropdown-select") {
          this.closeOptionsSelect($event.target.nextElementSibling);
        }

        if ($event.target.id === "svg-icon") {
          this.closeOptionsSelect($event.target.parentElement.nextElementSibling);
        }
      }
    },

    openOptionsSelect(element) {
      element.classList.add("is-active");
    },

    closeOptionsSelect(element) {
      if (element.classList != null) element.classList.remove("is-active");
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: {
      '--select-max-width-normal': _vm.selectMaxWidthNormal
    },
    attrs: {
      "id": "dropdown"
    },
    on: {
      "!click": function ($event) {
        return _vm.onClickMethod($event);
      }
    }
  }, [_c('div', {
    attrs: {
      "id": "dropdown-select"
    }
  }, [_c('span', {
    staticClass: "select",
    attrs: {
      "id": "select-label"
    },
    on: {
      "!click": function ($event) {
        $event.preventDefault();
        return _vm.onClickMethod($event);
      }
    }
  }, [_vm._v(_vm._s(_vm.item.value && _vm.item.label ? _vm.item.label : 'Selecione'))]), _vm._v(" "), _c('svg', {
    attrs: {
      "id": "svg-icon",
      "width": "17",
      "height": "8",
      "viewBox": "0 0 17 8",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.58839 4.51715e-07L0.621093 0.870535L8.51744 8L16.4138 0.870535L15.4465 9.17941e-08L8.51744 6.28571L1.58839 4.51715e-07Z",
      "fill": "#FBBE2F"
    }
  })])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "dropdown-list__element_select"
    }
  }, _vm._l(_vm.items, function (itemMoment, index) {
    return _c('div', {
      key: index,
      staticClass: "dropdown-list__item",
      class: {
        '--selected': itemMoment == _vm.item,
        '--first': index == 0,
        '--last': index == _vm.items.length - 1
      },
      on: {
        "click": function ($event) {
          return _vm.selecionouMethod(itemMoment, $event);
        }
      }
    }, [_vm._v(_vm._s(itemMoment.label))]);
  }), 0)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-6fcee97e_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);#dropdown[data-v-6fcee97e]{width:100%;max-width:425px;height:43px;padding:0 31.5px;position:relative;outline:0;cursor:pointer;border-radius:24px;border:1px solid #000;font-family:Montserrat;font-size:14px}#dropdown.--select-max-width-normal[data-v-6fcee97e]{max-width:none}#dropdown #dropdown-select[data-v-6fcee97e]{width:100%;height:100%;display:flex;align-items:center;justify-content:space-between}#dropdown #dropdown-select svg[data-v-6fcee97e]{position:absolute;right:31.5px}#dropdown #dropdown-list__element_select[data-v-6fcee97e]{position:absolute;right:0;width:0;background:#fff;transition:width .3s ease;z-index:1;border-top:30px solid #fff;border-bottom:30px solid #fff;border-radius:40px;box-shadow:0 1px 24px rgba(35,34,39,.1);background-color:#fff;grid-row:auto;top:102%;display:none;align-items:center}#dropdown #dropdown-list__element_select.is-active[data-v-6fcee97e]{width:100%;display:flex;flex-direction:column;transition:width .3s ease}#dropdown #dropdown-list__element_select.is-active .dropdown-list__item[data-v-6fcee97e]{transition:transform .3s ease}#dropdown #dropdown-list__element_select .dropdown-list__item[data-v-6fcee97e]{padding:9px 43px;display:flex;width:100%;align-items:center;justify-content:center;border-bottom:1px solid #000}#dropdown #dropdown-list__element_select .dropdown-list__item.--selected[data-v-6fcee97e]{background:#fbbe2f}#dropdown #dropdown-list__element_select .dropdown-list__item.--first[data-v-6fcee97e]{border-top:1px solid #000;border-top-right-radius:1.8px;border-top-left-radius:1.8px}#dropdown #dropdown-list__element_select .dropdown-list__item.--last[data-v-6fcee97e]{border-bottom-right-radius:1.8px;border-bottom-left-radius:1.8px}#dropdown #dropdown-list__element_select .dropdown-list__item[data-v-6fcee97e]:hover{background:#fbbe2f21}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-6fcee97e";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

//
//
//
//
var script$1 = {
  name: 'H1',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('h1', {
    on: {
      "click": function ($event) {
        return _vm.$emit('onClick');
      }
    }
  }, [_vm._v(_vm._s(_vm.text))]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-7aa7fdfe_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap);h1[data-v-7aa7fdfe]{font-family:Montserrat;font-size:24px;font-style:normal;font-weight:700;line-height:30px;color:#000}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-7aa7fdfe";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
//
//
//
var script = {
  name: 'H2',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('h2', {
    on: {
      "click": function ($event) {
        return _vm.$emit('onClick');
      }
    }
  }, [_vm._v(_vm._s(_vm.text))]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-646471cc_0", {
    source: "@import url(https://fonts.googleapis.com/css2?family=Montserrat&display=swap);h2[data-v-646471cc]{font-family:Montserrat;font-size:16px;font-style:normal;font-weight:400;line-height:19.5px;color:#757575}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-646471cc";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BoxContent: __vue_component__$e,
    Button: __vue_component__$d,
    BoxButtons: __vue_component__$c,
    Footer: __vue_component__$b,
    HeaderMenu: __vue_component__$a,
    LinkText: __vue_component__$9,
    TextFormField: __vue_component__$8,
    InputField: __vue_component__$7,
    LabelField: __vue_component__$6,
    MsgField: __vue_component__$5,
    ProgressBarSteps: __vue_component__$4,
    Radio: __vue_component__$3,
    Select: __vue_component__$2,
    H1: __vue_component__$1,
    H2: __vue_component__
});

// Import vue components

const install = function installShipSmartLibrary(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__$c as BoxButtons, __vue_component__$e as BoxContent, __vue_component__$d as Button, __vue_component__$b as Footer, __vue_component__$1 as H1, __vue_component__ as H2, __vue_component__$a as HeaderMenu, __vue_component__$7 as InputField, __vue_component__$6 as LabelField, __vue_component__$9 as LinkText, __vue_component__$5 as MsgField, __vue_component__$4 as ProgressBarSteps, __vue_component__$3 as Radio, __vue_component__$2 as Select, __vue_component__$8 as TextFormField };
