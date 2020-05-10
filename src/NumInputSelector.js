import { LitElement, html, css } from 'lit-element';
import 'wired-input';

const isFloat = (n) => (n === +n && n !== (n|0));
const isInt = (n) => Number.isInteger(n);
const isValidNumber = (n) => !Number.isNaN(n) && (isInt(n) || isFloat(n));
const isValidStrNum = (s) => s && !!s.trim() && isValidNumber(+s);
        

export class NumInputSelector extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            wired-input {
                font-family: inherit;
                width: 4em;
            }
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        const num = this.getAttribute('num');
        this._num = '';
        if (isValidStrNum(num)) {
            this._num = num;
        }
        const step = this.getAttribute('step');
        this._step = '0.1';
        if (isValidStrNum(step)) {
            this._step = step;
        }
        const min = this.getAttribute('min');
        this._min = '0';
        if (isValidStrNum(min)) {
            this._min = min;
        }
        const max = this.getAttribute('max');
        this._max = '10';
        if (isValidStrNum(max)) {
            this._max = max;
        }
    }

    render() {
        return html`
            <span><slot></slot>&nbsp;</span>
            <wired-input
                type="number"
                step="${this._step}"
                min="${this._min}"
                max="${this._max}"
                value="${this._num}"
                @input=${this.handleNumChange}
            ></wired-input>
        `;
    }

    handleNumChange(e) {
        const num = e.detail.sourceEvent.target.value;
        if (isValidStrNum(num)) {
            this.dispatchEvent(new CustomEvent('numchange', {detail: {num}}))
        }
    }
}