import { LitElement, html, css } from 'lit-element';
import 'wired-slider';
        

export class NumSliderSelector extends LitElement {
    static get properties() {
        return {
            min: {type: Number},
            max: {type: Number},
            value: {type: Number},
            factor: {type:Number},
        }
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                align-items: center;
                --wired-slider-knob-color: var(--primary-color);
            }
            wired-slider {
                width: 8em;
            }
        `;
    }

    constructor() {
        super();
        this.min = 0;
        this.max = 100;
        this.value = 50;
        this.factor = 100;
    }

    render() {
        return html`
            <span><slot></slot>:&nbsp;${this.displayValue()}&nbsp;</span>
            <wired-slider
                .min=${this.min}
                .max=${this.max}
                .value=${this.value}
                @change=${this.handleNumChange}
            ></wired-slider>
        `;
    }

    handleNumChange(e) {
        this.value = (+e.detail.value);
        const num = this.displayValue();
        this.dispatchEvent(new CustomEvent('numchange', {detail: {num}}));
    }

    displayValue() {
        return (this.value * this.factor).toFixed(1);
    }
}
