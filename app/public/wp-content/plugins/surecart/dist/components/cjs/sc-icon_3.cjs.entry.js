'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8acc3c89.js');
const library = require('./library-b4e9d7e3.js');
const pageAlign = require('./page-align-5a2ab493.js');

const iconFiles = new Map();
const requestIcon = (url) => {
    if (iconFiles.has(url)) {
        return iconFiles.get(url);
    }
    else {
        const request = fetch(url).then(async (response) => {
            if (response.ok) {
                const div = document.createElement('div');
                div.innerHTML = await response.text();
                const svg = div.firstElementChild;
                return {
                    ok: response.ok,
                    status: response.status,
                    svg: svg && svg.tagName.toLowerCase() === 'svg' ? svg.outerHTML : '',
                };
            }
            else {
                return {
                    ok: response.ok,
                    status: response.status,
                    svg: null,
                };
            }
        });
        iconFiles.set(url, request);
        return request;
    }
};

const scIconCss = ":host{--width:1em;--height:1em;display:inline-block;width:var(--width);height:var(--height);contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%;stroke-width:var(--sc-icon-stroke-width, 2px)}";
const ScIconStyle0 = scIconCss;

/**
 * The icon's label used for accessibility.
 */
const LABEL_MAPPINGS = {
    'chevron-down': wp.i18n.__('Open', 'surecart'),
    'chevron-up': wp.i18n.__('Close', 'surecart'),
    'chevron-right': wp.i18n.__('Next', 'surecart'),
    'chevron-left': wp.i18n.__('Previous', 'surecart'),
    'arrow-right': wp.i18n.__('Next', 'surecart'),
    'arrow-left': wp.i18n.__('Previous', 'surecart'),
    'arrow-down': wp.i18n.__('Down', 'surecart'),
    'arrow-up': wp.i18n.__('Up', 'surecart'),
    'alert-circle': wp.i18n.__('Alert', 'surecart'),
};
const parser = new DOMParser();
const ScIcon = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scLoad = index.createEvent(this, "scLoad", 7);
        this.svg = '';
        this.name = undefined;
        this.src = undefined;
        this.label = undefined;
        this.library = 'default';
    }
    /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
    redraw() {
        this.setIcon();
    }
    componentWillLoad() {
        this.setIcon();
    }
    getLabel() {
        let label = '';
        if (this.label) {
            label = (LABEL_MAPPINGS === null || LABEL_MAPPINGS === void 0 ? void 0 : LABEL_MAPPINGS[this.label]) || this.label;
        }
        else if (this.name) {
            label = ((LABEL_MAPPINGS === null || LABEL_MAPPINGS === void 0 ? void 0 : LABEL_MAPPINGS[this.name]) || this.name).replace(/-/g, ' ');
        }
        else if (this.src) {
            label = this.src.replace(/.*\//, '').replace(/-/g, ' ').replace(/\.svg/i, '');
        }
        return label;
    }
    async setIcon() {
        const library$1 = library.getIconLibrary(this.library);
        const url = this.getUrl();
        if (url) {
            try {
                const file = await requestIcon(url);
                if (url !== this.getUrl()) {
                    // If the url has changed while fetching the icon, ignore this request
                    return;
                }
                else if (file.ok) {
                    const doc = parser.parseFromString(file.svg, 'text/html');
                    const svgEl = doc.body.querySelector('svg');
                    if (svgEl) {
                        if (library$1 && library$1.mutator) {
                            library$1.mutator(svgEl);
                        }
                        this.svg = svgEl.outerHTML;
                        this.scLoad.emit();
                    }
                    else {
                        this.svg = '';
                        console.error({ status: file === null || file === void 0 ? void 0 : file.status });
                    }
                }
                else {
                    this.svg = '';
                    console.error({ status: file === null || file === void 0 ? void 0 : file.status });
                }
            }
            catch {
                console.error({ status: -1 });
            }
        }
        else if (this.svg) {
            // If we can't resolve a URL and an icon was previously set, remove it
            this.svg = '';
        }
    }
    getUrl() {
        const library$1 = library.getIconLibrary(this.library);
        if (this.name && library$1) {
            return library$1.resolver(this.name);
        }
        else {
            return this.src;
        }
    }
    render() {
        return index.h("div", { key: '5dc7bf5d3877bda9b13ebb100aab1369cd6e5fa9', part: "base", class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg });
    }
    static get assetsDirs() { return ["icon-assets"]; }
    static get watchers() { return {
        "name": ["setIcon"],
        "src": ["setIcon"],
        "library": ["setIcon"]
    }; }
};
ScIcon.style = ScIconStyle0;

const scProductLineItemCss = ":host {\n  display: block;\n  font-family: var(--sc-font-sans);\n  --sc-product-line-item-line-gap: 6px;\n}\n\n.item {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  gap: var(--sc-spacing-large);\n  justify-content: space-between;\n  align-items: stretch;\n  width: 100%;\n  border-bottom: none;\n  container-type: inline-size;\n}\n.item__text-container {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sc-product-line-item-line-gap);\n  justify-content: space-between;\n  align-items: stretch;\n  width: 100%;\n  border-bottom: none;\n}\n.item__row {\n  display: flex;\n  gap: 18px;\n  justify-content: space-between;\n  align-items: stretch;\n  width: 100%;\n}\n.item__row.stick-bottom {\n  margin-top: auto;\n}\n.item__scratch-price {\n  text-decoration: line-through;\n  font-size: var(--sc-font-size-small);\n  line-height: 1;\n  color: var(--sc-input-help-text-color);\n  white-space: nowrap;\n}\n.item__remove-container {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  line-height: 1;\n  cursor: pointer;\n  color: var(--sc-input-help-text-color);\n  font-size: var(--sc-input-help-text-font-size-medium);\n}\n\n.item__text {\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  gap: 6px;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n  flex: 1 1 0%;\n}\n\n.item__text-details {\n  display: grid;\n  gap: var(--sc-product-line-item-line-gap);\n}\n\n.item__title {\n  box-sizing: border-box;\n  min-width: 0px;\n  margin: 0;\n  color: var(--sc-line-item-title-color, var(--sc-input-label-color));\n  font-size: var(--sc-font-size-medium);\n  font-weight: var(--sc-font-weight-semibold);\n  line-height: 1;\n  cursor: pointer;\n  display: -webkit-box;\n  display: -moz-box;\n  -webkit-box-orient: vertical;\n  -moz-box-orient: vertical;\n  -webkit-line-clamp: 3;\n  -moz-box-lines: 3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.item__suffix {\n  flex: 1;\n  box-sizing: border-box;\n  margin: 0px;\n  min-width: 0px;\n  display: flex;\n  flex-direction: column;\n  -webkit-box-pack: start;\n  justify-content: space-between;\n  align-items: flex-end;\n  min-width: 100px;\n  margin-left: auto;\n  align-self: center;\n}\n\n.product-line-item__removable .item__suffix {\n  align-self: flex-start;\n}\n\n.product-line-item__editable .item__suffix {\n  align-self: flex-start;\n}\n\n.product-line-item__purchasable-status {\n  font-size: var(--sc-font-size-x-small);\n  color: var(--sc-input-error-text-color);\n}\n\n.item__price {\n  text-align: right;\n  max-width: 100%;\n  display: grid;\n  gap: var(--sc-product-line-item-line-gap);\n}\n\n.item__description {\n  color: var(--sc-price-label-color, var(--sc-input-help-text-color));\n  font-size: var(--sc-price-label-font-size, var(--sc-input-help-text-font-size-medium));\n  line-height: 1;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  gap: var(--sc-product-line-item-line-gap);\n  text-wrap: pretty;\n}\n.item__description:last-child {\n  align-items: flex-end;\n  text-align: right;\n}\n\n.item__image-placeholder {\n  width: var(--sc-product-line-item-image-size, 65px);\n  height: var(--sc-product-line-item-image-size, 65px);\n  background-color: var(--sc-input-border-color, var(--sc-input-border));\n  border-radius: 4px;\n  flex: 0 0 var(--sc-product-line-item-image-size, 65px);\n}\n\n.item__image,\n.attachment-thumbnail {\n  width: var(--sc-product-line-item-image-size, 65px);\n  height: var(--sc-product-line-item-image-size, 65px);\n  object-fit: cover;\n  border-radius: 4px;\n  border: solid 1px var(--sc-input-border-color, var(--sc-input-border));\n  display: block;\n  box-shadow: var(--sc-input-box-shadow);\n  align-self: flex-start;\n}\n\n@container (max-width: 380px) {\n  .item__image,\n  .item__image-placeholder {\n    display: var(--sc-product-line-item-mobile-image-display, none);\n  }\n}\n.product__description {\n  display: flex;\n  gap: 0.5em;\n  align-items: center;\n}\n\n.price {\n  font-size: var(--sc-font-size-medium);\n  font-weight: var(--sc-font-weight-semibold);\n  color: var(--sc-input-label-color);\n  line-height: 1;\n  white-space: nowrap;\n  display: flex;\n  gap: 4px;\n  align-items: baseline;\n}\n\n.price__description {\n  font-size: var(--sc-font-size-small);\n  line-height: 1;\n  color: var(--sc-input-help-text-color);\n  text-align: right;\n  white-space: nowrap;\n}\n\n.item--is-rtl.price {\n  text-align: right;\n}\n.item--is-rtl .item__price {\n  text-align: left;\n}\n\n.base {\n  display: grid;\n  gap: var(--sc-spacing-x-small);\n}\n\n.fee__description {\n  color: var(--sc-input-help-text-color);\n}\n\nsc-quantity-select::part(base) {\n  box-shadow: none;\n  background-color: transparent;\n}\n\nsc-quantity-select::part(base):not(:focus-within) {\n  border-color: transparent;\n}\n\nsc-quantity-select::part(input),\nsc-quantity-select::part(plus),\nsc-quantity-select::part(minus) {\n  background-color: transparent;\n}";
const ScProductLineItemStyle0 = scProductLineItemCss;

const ScProductLineItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scUpdateQuantity = index.createEvent(this, "scUpdateQuantity", 3);
        this.scRemove = index.createEvent(this, "scRemove", 3);
        this.image = undefined;
        this.name = undefined;
        this.amount = undefined;
        this.scratch = undefined;
        this.displayAmount = undefined;
        this.scratchDisplayAmount = undefined;
        this.fees = undefined;
        this.price = undefined;
        this.variant = '';
        this.quantity = undefined;
        this.interval = undefined;
        this.trial = undefined;
        this.removable = undefined;
        this.editable = true;
        this.max = undefined;
        this.sku = '';
        this.purchasableStatus = undefined;
    }
    render() {
        var _a, _b, _c;
        const isImageFallback = ((_a = this.image) === null || _a === void 0 ? void 0 : _a.type) === 'fallback';
        return (index.h("div", { key: 'c0e8437fe3aa49892f113ca6b64913e08253899c', class: "base", part: "base" }, index.h("div", { key: 'eca3f30e7ea708c72215f64ce4f89ec7a1859d72', part: "product-line-item", class: {
                'item': true,
                'item--has-image': !!((_b = this.image) === null || _b === void 0 ? void 0 : _b.src),
                'item--is-rtl': pageAlign.isRtl(),
                'product-line-item__editable': this.editable,
                'product-line-item__removable': this.removable,
            } }, !!((_c = this.image) === null || _c === void 0 ? void 0 : _c.src) ? index.h("img", { ...this.image, part: isImageFallback ? "placeholder__image" : "image", class: isImageFallback ? "item__image-placeholder" : "item__image" }) : index.h("div", { class: "item__image-placeholder", part: "placeholder__image" }), index.h("div", { key: 'bfaef01b0f72de17f1451996b48e8d4b956a44e1', class: "item__text-container" }, index.h("div", { key: 'd6c4d2a7748e09ab03bc0c26883a1ab9856061e2', class: "item__row" }, index.h("div", { key: 'abe2673fdadab37ca2d56c812fd5c4275e6f6204', class: "item__title", part: "title" }, index.h("slot", { key: '1eed90f1d7fc08ddffc8914c937e22496c901367', name: "title" }, this.name)), index.h("div", { key: '6c9ce6789a0d7a10ff36180acd41306bae6d273e', class: "price", part: "price__amount" }, !!this.scratch && this.scratch !== this.amount && index.h("span", { key: 'afad07247317df633ce1fc68c6647e1e71ba107d', class: "item__scratch-price" }, this.scratch), this.amount, index.h("div", { key: '8fc05c42e4f87cf4b2aec4f91ff819d16a8cdaae', class: "price__description", part: "price__description" }, this.interval))), index.h("div", { key: '37b35c9a077bbdd29a75284f500a5b80cddca01a', class: "item__row" }, index.h("div", { key: '20d3359e53ef3ef55f21f282b3d6ecfbfbd9b1cd', class: "item__description", part: "description" }, this.variant && index.h("div", { key: '9f6b0925a2481957e046ae6ebdefc2c9979a8428' }, this.variant), this.price && index.h("div", { key: 'ffa0583790c85e6db813b8a5f8172c24f3847073' }, this.price), this.sku && (index.h("div", { key: 'cb9978e0ddfb90b2e6575d4a723e5b49fe4841fe' }, wp.i18n.__('SKU:', 'surecart'), " ", this.sku)), !!this.purchasableStatus && index.h("div", { key: 'e16d7afb339b780e93ae719a6306e660b17362d2' }, this.purchasableStatus)), index.h("div", { key: '3ff0669a0d35ef0686bed7d0f2bd6fb46ab8d16c', class: "item__description", part: "trial-fees" }, !!this.trial && index.h("div", { key: 'a5b0d2916c586c70bc43418f204c4646ea748895' }, this.trial), (this.fees || []).map(fee => {
            return (index.h("div", null, fee === null || fee === void 0 ? void 0 :
                fee.display_amount, " ", fee === null || fee === void 0 ? void 0 :
                fee.description));
        }))), index.h("div", { key: '95d72cfb62378a7d7d061503646680be1fbec187', class: "item__row stick-bottom" }, this.editable ? (index.h("sc-quantity-select", { max: this.max || Infinity, exportparts: "base:quantity, minus:quantity__minus, minus-icon:quantity__minus-icon, plus:quantity__plus, plus-icon:quantity__plus-icon, input:quantity__input", clickEl: this.el, quantity: this.quantity, size: "small", onScChange: e => e.detail && this.scUpdateQuantity.emit(e.detail), "aria-label": 
            /** translators: %1$s: product name, %2$s: product price name */
            wp.i18n.sprintf(wp.i18n.__('Change Quantity - %1$s %2$s', 'surecart'), this.name, this.price) })) : (index.h("span", { class: "item__description", part: "static-quantity" }, wp.i18n.__('Qty:', 'surecart'), " ", this.quantity)), !!this.removable && (index.h("div", { key: '2b9df78a1a2da4299c19de9fc077b0952f255991', class: "item__remove-container", onClick: () => this.scRemove.emit(), onKeyDown: e => {
                if (e.key === 'Enter') {
                    this.scRemove.emit();
                }
            }, "aria-label": wp.i18n.sprintf(wp.i18n.__('Remove Item - %1$s %2$s', 'surecart'), this.name, this.price), tabIndex: 0 }, index.h("sc-icon", { key: 'c828685a77d67045c416ed144dd0e1057d97fea1', exportparts: "base:remove-icon__base", class: "item__remove", name: "x" }), index.h("span", { key: '55dc387f30e457db34bbaf4b7ff6a1802708dac7', class: "item__remove-text" }, wp.i18n.__('Remove', 'surecart')))))))));
    }
    get el() { return index.getElement(this); }
};
ScProductLineItem.style = ScProductLineItemStyle0;

const scQuantitySelectCss = ":host{--focus-ring:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary);--border-radius:var(--sc-quantity-border-radius, var(--sc-input-border-radius-small));display:inline-block}.input__control{text-align:center;line-height:1;border:none;flex:1;max-width:var(--sc-quantity-input-max-width, 35px);background-color:var(--sc-input-control-background-color, var(--sc-color-white));color:var(--sc-input-control-color, var(--sc-color-black));-moz-appearance:textfield}.input__control::-webkit-outer-spin-button,.input__control::-webkit-inner-spin-button{-webkit-appearance:none}.input__control::-webkit-search-decoration,.input__control::-webkit-search-cancel-button,.input__control::-webkit-search-results-button,.input__control::-webkit-search-results-decoration{-webkit-appearance:none}.input__control:-webkit-autofill,.input__control:-webkit-autofill:hover,.input__control:-webkit-autofill:focus,.input__control:-webkit-autofill:active{box-shadow:0 0 0 var(--sc-input-height-large) var(--sc-input-background-color-hover) inset !important;-webkit-text-fill-color:var(--sc-input-color)}.input__control::placeholder{color:var(--sc-input-placeholder-color);user-select:none}.input__control:focus{outline:none}.quantity--trigger{cursor:pointer;white-space:nowrap}.quantity{position:relative;display:inline-block;width:var(--sc-quantity-select-width, 100px);height:var(--sc-quantity-control-height, var(--sc-input-height-small));display:flex;align-items:stretch;font-family:var(--sc-input-font-family);font-weight:var(--sc-input-font-weight);letter-spacing:var(--sc-input-letter-spacing);background-color:var(--sc-input-background-color);border:var(--sc-input-border);border-radius:var(--border-radius);vertical-align:middle;box-shadow:var(--sc-input-box-shadow);transition:var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.quantity:hover:not(.quantity--disabled){background-color:var(--sc-input-background-color-hover);border-color:var(--sc-input-border-color-hover)}.quantity:hover:not(.quantity--disabled) .quantity__control{color:var(--sc-input-color-hover)}.quantity.quantity--focused:not(.quantity--disabled){background-color:var(--sc-input-background-color-focus);border-color:var(--sc-input-border-color-focus);box-shadow:var(--focus-ring)}.quantity.quantity--focused:not(.quantity--disabled) .quantity__control{color:var(--sc-input-color-focus)}.quantity.quantity--disabled{background-color:var(--sc-input-background-color-disabled);border-color:var(--sc-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.quantity.quantity--disabled .input__control{color:var(--sc-input-color-disabled)}.quantity.quantity--disabled .input__control::placeholder{color:var(--sc-input-placeholder-color-disabled)}.button__decrease,.button__increase{display:inline-block;text-align:center;vertical-align:middle;line-height:0;height:auto;top:1px;bottom:1px;width:32px;background:var(--sc-input-background-color);color:var(--sc-input-help-text-color);cursor:pointer;font-size:13px;user-select:none;border-width:0;padding:0}.button__decrease:hover:not(.button--disabled) .quantity__control,.button__increase:hover:not(.button--disabled) .quantity__control{color:var(--sc-input-color-hover)}.button__decrease.button--disabled,.button__increase.button--disabled{background-color:var(--sc-input-background-color-disabled);border-color:var(--sc-input-border-color-disabled);opacity:0.5;cursor:not-allowed}.quantity--small{width:var(--sc-quantity-select-width-small, 76px);height:var(--sc-quantity-control-height-small, 26px)}.quantity--small .button__decrease,.quantity--small .button__increase{width:24px;border:none}.quantity--small .input__control{max-width:24px}.button__decrease{left:1px;border-radius:var(--border-radius) 0 0 var(--border-radius);border-right:var(--sc-input-border)}.button__increase{right:1px;border-radius:0 var(--border-radius) var(--border-radius) 0;border-left:var(--sc-input-border)}.quantity--is-rtl .button__decrease{right:1px;border-left:var(--sc-input-border);border-right:0}.quantity--is-rtl .button__increase{left:1px;border-right:var(--sc-input-border);border-left:0}";
const ScQuantitySelectStyle0 = scQuantitySelectCss;

const ScQuantitySelect = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scChange = index.createEvent(this, "scChange", 7);
        this.scInput = index.createEvent(this, "scInput", 7);
        this.scFocus = index.createEvent(this, "scFocus", 7);
        this.scBlur = index.createEvent(this, "scBlur", 7);
        this.clickEl = undefined;
        this.disabled = undefined;
        this.max = Infinity;
        this.min = 1;
        this.quantity = 0;
        this.size = 'medium';
        this.hasFocus = undefined;
    }
    decrease() {
        if (this.disabled)
            return;
        this.quantity = Math.max(this.quantity - 1, this.min);
        this.scChange.emit(this.quantity);
        this.scInput.emit(this.quantity);
    }
    increase() {
        if (this.disabled)
            return;
        this.quantity = Math.min(this.quantity + 1, this.max);
        this.scChange.emit(this.quantity);
        this.scInput.emit(this.quantity);
    }
    handleBlur() {
        this.hasFocus = false;
        this.scBlur.emit();
    }
    handleFocus() {
        this.hasFocus = true;
        this.scFocus.emit();
    }
    handleChange() {
        this.quantity = parseInt(this.input.value) > this.max ? this.max : parseInt(this.input.value);
        this.scChange.emit(this.quantity);
    }
    handleInput() {
        this.quantity = parseInt(this.input.value);
        this.scInput.emit(this.quantity);
    }
    render() {
        return (index.h("div", { key: 'f0a5f9b12d7666732dd48011b002c3a74d8c09bc', part: "base", class: {
                'quantity': true,
                // States
                'quantity--focused': this.hasFocus,
                'quantity--disabled': this.disabled,
                'quantity--is-rtl': pageAlign.isRtl(),
                'quantity--small': this.size === 'small',
            } }, index.h("button", { key: '4da7e8cf8c53f0f2776e77064b49f15e85d77370', part: "minus", "aria-label": wp.i18n.__('Decrease quantity by one.', 'surecart'), "aria-disabled": this.disabled || (this.quantity <= this.min && this.min > 1), class: { 'button__decrease': true, 'button--disabled': this.quantity <= this.min && this.min > 1 }, onClick: () => this.quantity > this.min && this.decrease(), disabled: this.disabled || (this.quantity <= this.min && this.min > 1) }, index.h("sc-icon", { key: '7201eb2a3e8accb531a419ea20e8cc2c8cd5723e', name: "minus", exportparts: "base:minus__icon" })), index.h("input", { key: '96767ac4b4912fbaddaea1c5de6d2e82e7b51824', part: "input", class: "input__control", ref: el => (this.input = el), step: "1", type: "number", max: this.max, min: this.min, value: this.quantity, disabled: this.disabled, autocomplete: "off", role: "spinbutton", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": this.quantity, "aria-disabled": this.disabled, onChange: () => this.handleChange(), onInput: () => this.handleInput(), onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur() }), index.h("button", { key: 'cb189fddac98b867d2e645af19cf4890dd9c0119', part: "plus", "aria-label": wp.i18n.__('Increase quantity by one.', 'surecart'), class: { 'button__increase': true, 'button--disabled': this.quantity >= this.max }, onClick: () => this.quantity < this.max && this.increase(), "aria-disabled": this.disabled || this.quantity >= this.max, disabled: this.disabled || this.quantity >= this.max }, index.h("sc-icon", { key: '30290533452898c33a0ac19ed78e82f2852000f1', name: "plus", exportparts: "base:plus__icon" }))));
    }
    get el() { return index.getElement(this); }
};
ScQuantitySelect.style = ScQuantitySelectStyle0;

exports.sc_icon = ScIcon;
exports.sc_product_line_item = ScProductLineItem;
exports.sc_quantity_select = ScQuantitySelect;

//# sourceMappingURL=sc-icon_3.cjs.entry.js.map