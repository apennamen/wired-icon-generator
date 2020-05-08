import { LitElement, html, css } from 'lit-element';
import 'wired-input';
import 'wired-combo';
import 'wired-item';

import { ColorSelector } from './ColorSelector';
customElements.define('color-selector', ColorSelector);

const DEFAULT_CONFIG = {
    fill: '#fff',
    fillStyle: 'zigzag',
    fillWeight: 1.5,
    roughness: 0.1,
    stroke: '#000',
};

export class ConfigCreator extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction:column;
                align-items: flex-end;
                font-size: 2vmin;
                font-family: inherit;
                --wired-item-selected-bg: var(--primary-color);
            }
            wired-combo {
                right: -10px;
            }
        `;
    }

    get config() {
        return {...this._config};
    }

    constructor() {
        super();
        DEFAULT_CONFIG.fill = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color').trim();
        this._config = { ...DEFAULT_CONFIG };
    }

    render() {
        const handleFillColorChange = (e) => {
            this._config = {...this._config, fill: e.detail.color};
        }
        const handleStrokeColorChange = (e) => {
            this._config = {...this._config, stroke: e.detail.color};
        }
        const handleFillStyleChange = (e) => {
            this._config = {...this._config, fillStyle: e.detail.selected};
        }

        return html`
        <div>Fill style</span>
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
        </div>
        <color-selector
            color="${DEFAULT_CONFIG.fill}"
            label="Fill color"
            @colorchange=${handleFillColorChange}>
        </color-selector>
        <color-selector
            color="${DEFAULT_CONFIG.stroke}"
            label="Stroke color"
            @colorchange=${handleStrokeColorChange}>
        </color-selector>
    `;
    }
}
