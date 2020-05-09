import { LitElement, html, css } from 'lit-element';
import 'wired-input';

const isFloat = n => (n === +n && n !== (n|0));
const isInt = n => Number.isInteger(n);
const isValidNumber = n => !Number.isNaN(n) && (isInt(n) || isFloat(n));
const isValidStrNum = s => !!s.trim() && isValidNumber(+s);
        

export class NumberSelector extends LitElement {
    static get properties() {
        return {
            label: {type: String},
        }
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            wired-input {
                font-family: inherit;
                width: 3em;
            }
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        const num = this.getAttribute('num');
        this._placeholder = '';
        if (isValidStrNum(num)) {
            this._placeholder = num;
        }
    }

    render() {
        const handleNumChange = (e) => {
            const num = e.detail.sourceEvent.target.value;
            if (isValidStrNum(num)) {
                this.dispatchEvent(new CustomEvent('numchange', {detail: {num}}))
            }
        }
        return html`
            <span>${this.label}</span>
            <wired-input @input=${handleNumChange} placeholder="${this._placeholder}"></wired-input>
        `;
    }
}