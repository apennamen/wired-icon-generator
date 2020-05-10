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
import { INPUT_EXAMPLE, PLACEHOLDER, OUTPUT_INIT } from './initTemplate';

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

      #load-example-btn {
        background: var(--secondary-color);
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
    this.outputSvg = OUTPUT_INIT;
  }

  render() {
    const handleLoad = () => {
      const textarea = this.renderRoot.querySelector('#input');
      const svgCopy = this.renderRoot.querySelector('#svg');
      svgCopy.innerHTML = textarea.value;
      this.inputSvg = textarea.value;
      return this.requestUpdate();
    }
    const handleLoadExample = () => {
      const textarea = this.renderRoot.querySelector('#input');
      textarea.value = INPUT_EXAMPLE;
      handleLoad();
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
        <x-wired-textarea id="input" rows="5" .placeholder=${PLACEHOLDER}></x-wired-textarea>
        <div>
          <wired-button elevation="2" @click=${handleLoad}>Load</wired-button>
          <wired-button id="load-example-btn" elevation="2" @click=${handleLoadExample}>Load Example</wired-button>
        </div>
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
