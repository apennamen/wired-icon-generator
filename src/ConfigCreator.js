import { LitElement, html, css } from 'lit-element';
import rough from 'roughjs';
import 'wired-input';
import 'wired-combo';
import 'wired-item';

export class ConfigCreator extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction:row;
                align-items: center;
                font-size: 2vmin;
                font-family: inherit;
                --wired-item-selected-bg: #90C1B3;
            }

            wired-input {
                font-family: inherit;
                width: 5em;
            }
        `;
    }

    get config() {
        return this._config;
    }

    constructor() {
        super();
        this._config = {fill: '#90C1B3', fillStyle: 'zigzag', fillWeight: 1.5, roughness: 0.1};
    }

    render() {
        const handleColorChange = (e) => {
            const color = e.detail.sourceEvent.target.value;
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (regex.test(color)) {
                this._config = {...this._config, fill: color};
                this.updateCanvas();
            }
        }
        const handleFillStyleChange = (e) => {
            this._config = {...this._config, fillStyle: e.detail.selected};
            this.updateCanvas();
        }

        return html`
        <wired-combo
            id="fillStyleCombo"
            .selected=${this.config.fillStyle}
            @selected=${handleFillStyleChange}
        >
            <wired-item value="zigzag">ZigZag</wired-item>
            <wired-item value="solid">Solid</wired-item>
            <wired-item value="hachure">Hachure</wired-item>
            <wired-item value="cross-hatch">Cross-Hatch</wired-item>
            <wired-item value="dots">Dots</wired-item>
            <wired-item value="dashed">Dashed</wired-item>
        </wired-combo>
        <wired-input @input=${handleColorChange} placeholder="#90C1B3"></wired-input>
        <canvas height="45" width="30"></canvas>
    `;
    }

    firstUpdated() {
        this.updateCanvas();
    }

    /**
     * Call this function when this._config is changed;
     */
    updateCanvas() {
        const canvas = this.renderRoot.querySelector('canvas');
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const rc = rough.canvas(canvas);
        rc.rectangle(0, 0, canvas.width, canvas.height, this.config);
    }
}