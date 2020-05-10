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
                width: 6em;
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
        const handleNumChange = (e) => {
            this.value = (+e.detail.value);
            const num = (this.value * this.factor).toFixed(1);
            this.dispatchEvent(new CustomEvent('numchange', {detail: {num}}));
        }
        const displayValue = (this.value * this.factor).toFixed(1);
        return html`
            <span><slot></slot>:&nbsp;${displayValue}&nbsp;</span>
            <wired-slider
                .min=${this.min}
                .max=${this.max}
                .value=${this.value}
                @change=${handleNumChange}
            ></wired-slider>
        `;
    }

    firstUpdated() {

    }
}
