import { LitElement, html, css } from 'lit-element';

const COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export class ColorSelector extends LitElement {
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
                width: 6em;
            }
            canvas {
                border: 1px solid var(--text-color);
            }
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        const colorAttr = this.getAttribute('color');
        if (COLOR_REGEX.test(colorAttr)) {
            this._color = colorAttr;
        } else {
            this._color = '#fff';
        }
    }

    render() {
        return html`
            <span>${this.label}&nbsp;</span>
            <wired-input @input=${this.handleColorChange} placeholder="${this._color}"></wired-input>
            <canvas height="45" width="30"></canvas>
        `;
    }

    firstUpdated() {
        this.updatedColor();
    }

    updatedColor() {
        const canvas = this.renderRoot.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = this._color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    handleColorChange(e) {
        const color = e.detail.sourceEvent.target.value;
        if (COLOR_REGEX.test(color)) {
            this._color = color;
            this.updatedColor();
            this.dispatchEvent(new CustomEvent('colorchange', {detail: {color}}))
        }
    }
}
