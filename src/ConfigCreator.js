import { LitElement, html, css } from 'lit-element';
import 'wired-combo';
import 'wired-item';

import { ColorSelector } from './ColorSelector';
import { NumInputSelector } from './NumInputSelector';
import { NumSliderSelector } from './NumSliderSelector';
customElements.define('color-selector', ColorSelector);
customElements.define('num-input-selector', NumInputSelector);
customElements.define('num-slider-selector', NumSliderSelector);

const DEFAULT_CONFIG = {
    fill: '#ec7600',
    fillStyle: 'zigzag',
    fillWeight: 1.5,
    strokeWidth: 1,
    roughness: 0.1,
    stroke: '#000',
    hachureAngle: -41,
    hachureGap: 4,
};

export class ConfigCreator extends LitElement {

    static get styles() {
        return css`
            :host {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                font-size: 2vmin;
                font-family: inherit;
                --wired-item-selected-bg: var(--primary-color);
            }
            .options {
                display: flex;
                flex-direction:column;
                align-items: flex-end;
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
        this._config = { ...DEFAULT_CONFIG };
    }

    render() {
        const handleFillColorChange = (e) => this.updateConf({fill: e.detail.color});
        const handleStrokeColorChange = (e) => this.updateConf({stroke: e.detail.color});
        const handleFillStyleChange = (e) => this.updateConf({fillStyle: e.detail.selected});
        const handleRoughnessChange = (e) => this.updateConf({roughness: e.detail.num});
        const handleStrokeWidthChange = (e) => this.updateConf({strokeWidth: e.detail.num});
        const handleHachureGapChange = (e) => this.updateConf({hachureGap: e.detail.num});
        const handleHachureAngleChange = (e) => this.updateConf({hachureAngle: e.detail.num});
        const handleFillWeightChange = (e) => this.updateConf({fillWeight: e.detail.num});

        return html`
            <div class="options">
                <num-input-selector
                    num="${DEFAULT_CONFIG.strokeWidth}"
                    @numchange=${handleStrokeWidthChange}>
                    Stroke Width
                </num-input-selector>
                <num-input-selector
                    num="${DEFAULT_CONFIG.hachureGap}"
                    @numchange=${handleHachureGapChange}>
                    Hachure Gap
                </num-input-selector>
                <num-input-selector
                    num="${DEFAULT_CONFIG.hachureAngle}"
                    @numchange=${handleHachureAngleChange}>
                    Hachure Angle
                </num-input-selector>
                <num-input-selector
                    num="${DEFAULT_CONFIG.fillWeight}"
                    @numchange=${handleFillWeightChange}>
                    Fill Weight
                </num-input-selector>
            </div>
            <div class="options">
                <num-slider-selector
                    @numchange=${handleRoughnessChange}
                    min="0"
                    max="10"
                    value="1"
                    factor="0.1">
                    Roughness
                </num-slider-selector>
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
                <div><span>Fill style</span>
                    <wired-combo
                        id="fillStyleCombo"
                        .selected=${this.config.fillStyle}
                        @selected=${handleFillStyleChange}>
                        <wired-item value="zigzag">ZigZag</wired-item>
                        <wired-item value="solid">Solid</wired-item>
                        <wired-item value="hachure">Hachure</wired-item>
                        <wired-item value="cross-hatch">Cross-Hatch</wired-item>
                        <wired-item value="dashed">Dashed</wired-item>
                    </wired-combo>
                </div>
            </div>
    `;
    }

    updateConf(prop) {
        this._config = { ...this._config, ...prop};
        this.dispatchEvent(new Event('confchange'));
    }
}
