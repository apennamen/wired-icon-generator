import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import 'wired-textarea';
import 'wired-button';
import 'wired-checkbox';

import { ExtWiredTextarea } from './ExtWiredTextarea';
import { ConfigCreator } from './ConfigCreator';
import { CodeHighlighter } from './CodeHighlighter';
import { wiredSvg } from './wiredSvg';
import { highlightCss } from './highlightCss';

customElements.define('x-wired-textarea', ExtWiredTextarea);
customElements.define('config-creator', ConfigCreator);
customElements.define('code-highlighter', CodeHighlighter);

export class WiredIconGenerator extends LitElement {
  static get styles() {
    return [
      highlightCss,
      css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 1em;
      }

      wired-button {
        background: var(--primary-color);
      }
      wired-checkbox {
        font-size: 2vmin;
      }

      #input {
        font-family: monospace;
        font-size: 2vmin;
        text-align: left;
        background: #fff;
      }

      #config {
        width: 100%;
        margin-top: 2em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      #svg {
        border: 2px dashed var(--text-color);
        width: 100px;
        height: 100px;
      }

      #svg svg {
        width: 100px;
        height: 100px;
      }

      code-highlighter {
        margin-top: 2em;
      }
    `];
  }
    
  constructor() {
    super();
    this.livereload = true;
    this.inputSvg = '';
    this.outputSvg = `
<svg viewbox="0 0 42 42">
  <text>Grab the converted svg code here!</text>
</svg>
    `;
  }

  render() {
    const placeholder = `Paste your svg here! Like this:

<svg viewbox="0 0 16 16"><path d="M9.5 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path></svg>
    `;
    const handleLoad = () => {
      const textarea = this.renderRoot.querySelector('#input');
      const svgCopy = this.renderRoot.querySelector('#svg');
      svgCopy.innerHTML = textarea.value;
      this.inputSvg = textarea.value;
      return this.requestUpdate();
    }
    const handleConvert = async () => {
      await handleLoad();
      const svgToConvert = this.renderRoot.querySelector('#svg').firstElementChild;
      if (!svgToConvert) return;
      const { config } = this.renderRoot.querySelector('config-creator');
      wiredSvg(svgToConvert, config);
      this.outputSvg = svgToConvert.outerHTML;
      return this.requestUpdate();
    }
    const handleConfChange = () => {
      if (this.livereload) {
        handleConvert();
      }
    }
    const toggleLivereload = (e) => {
      this.livereload = e.detail.checked;
    }
    return html`
        <x-wired-textarea id="input" rows="5" .placeholder=${placeholder}></x-wired-textarea>
        <wired-button elevation="2" @click=${handleLoad}>Load</wired-button>
        <div id="config">
          <config-creator @confchange=${handleConfChange}></config-creator>
          <div id="svg">${unsafeHTML(this.inputSvg)}</div>
        </div>
        <div>
          <wired-button elevation="2" @click=${handleConvert}>Convert</wired-button>
          <wired-checkbox @change=${toggleLivereload} ?checked=${this.livereload}>Live Reload</wired-checkbox>
        </div>
        <code-highlighter .code=${this.outputSvg.trim()}></code-highlighter>
    `;
  }
}
