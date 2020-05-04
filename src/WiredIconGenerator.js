import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import hljs from 'highlight.js';
import xml from 'highlight.js/lib/languages/xml'
import 'wired-textarea';
import 'wired-button';
import 'wired-link';

hljs.registerLanguage('xml', xml);

import { ExtWiredTextarea } from './ExtWiredTextarea';
import { ConfigCreator } from './ConfigCreator';
import { wiredSvg } from './wiredSvg';
import githubLogo from './githubLogo';

customElements.define('x-wired-textarea', ExtWiredTextarea);
customElements.define('config-creator', ConfigCreator);

export class WiredIconGenerator extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        --scrollbarBG: #CFD8DC;
        --thumbBG: #1a2b42;
        --wired-link-decoration-color: #90C1B3;
      }
      code::-webkit-scrollbar {
        width: 30px;
      }
      code {
        scrollbar-width: thin;
        scrollbar-color: var(--thumbBG) var(--scrollbarBG);
      }
      code::-webkit-scrollbar-track {
        background: var(--scrollbarBG);
      }
      code::-webkit-scrollbar-thumb {
        background-color: var(--thumbBG) ;
        border-radius: 6px;
        border: 1px solid var(--scrollbarBG);
      }

      main {
        flex-grow: 1;
      }

      wired-button {
        background: #90C1B3;
      }

      .config,
      .loading {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        padding-bottom: 1em;
      }

      #input {
        font-family: monospace;
        font-size: 2vmin;
        text-align: left;
        background: #fff;
      }

      .output {
        padding-top: 2em;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      code {
        font-size: 2vmin;
        text-align: left;
        max-width: 60vw;
      }

      #svg {
        border: 2px dashed #1a2b42;
        width: 80px;
        height: 80px;
      }
      #svg svg {
        width: 80px;
        max-height: 80px;
      }

      .result {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .app-footer {
        display: flex;
        font-size: calc(12px + 0.5vmin);
        margin-bottom: 1em;
        flex-direction: row;
        justify-content: baseline;
      }

      .app-footer svg {
        height: 2em;
        margin-left: 1em;
      }
    `;
  }
    
  constructor() {
    super();
    this.inputSvg = '';
    this.outputSvg = `
<svg viewbox="0 0 42 42">
  <text>4. Grab the converted svg code here!</text>
</svg>
    `;
    this.highlightedCode = hljs.highlight('xml', this.outputSvg.trim());
  }

  render() {
    const placeholder = `1. Paste your svg here! Like this:

<svg viewbox="0 0 16 16"><path d="M9.5 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path></svg>
    `;
    const handleRefresh = () => {
      const textarea = this.renderRoot.querySelector('#input');
      const svgCopy = this.renderRoot.querySelector('#svg');
      svgCopy.innerHTML = textarea.value;
      this.inputSvg = textarea.value;
      this.requestUpdate();
    }
    const handleConvert = () => {
      const svgToConvert = this.renderRoot.querySelector('#svg').firstElementChild;
      if (!svgToConvert) return;
      const { config } = this.renderRoot.querySelector('config-creator');
      console.log(config);
      wiredSvg(svgToConvert, config);
      this.outputSvg = svgToConvert.outerHTML;
      this.highlightedCode = hljs.highlight('xml', this.outputSvg);
      this.requestUpdate();
    }
    const handleCopy = () => {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = this.outputSvg;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    }
    return html`
      <link href="node_modules/highlight.js/styles/obsidian.css" rel="stylesheet">
      <main>
        <h1>Wired Icon Generator</h1>

        <p>Generate a sketchy version of an SVG Icon</p>

        <div class="loading">
          <x-wired-textarea id="input" rows="8" .placeholder=${placeholder}></x-wired-textarea>
          <wired-button elevation="2" @click=${handleRefresh}>2. Load It</wired-button>
        </div>
        <div class="config">
          <div id="svg">${unsafeHTML(this.inputSvg)}</div>
          <config-creator></config-creator>
          <wired-button elevation="2" @click=${handleConvert}>3. Convert</wired-button>
        </div>

        <div class="result">
          <pre><code class="xml hljs">${unsafeHTML(this.highlightedCode.value)}</code></pre>
          <wired-button style="margin-left: 10px" elevation="2" @click=${handleCopy}>Copy</wired-button>
        </div>
      </main>
      <footer class="app-footer">
        <span>Want more ? See <wired-link elevation="2" href="https://wiredjs.com" target="_blank">Wired Elements</wired-link></span>
        ${githubLogo()}
      </footer>
    `;
  }
}
