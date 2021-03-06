import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';

import { highlightCss } from './highlightCss';

hljs.registerLanguage('xml', xml);

export class CodeHighlighter extends LitElement {

    static get properties() {
        return {
            code: { type: String },
        }
    }

    static get styles() {
        return [
            highlightCss,
            css`
              :host {
                display: flex;
                flex-direction: column;
                align-items: baseline;
                justify-content: flex-start;
              }
              wired-button {
                background: var(--primary-color);
              }
              code::-webkit-scrollbar {
                width: 30px;
              }
              code {
                scrollbar-width: thin;
                scrollbar-color: var(--thumbBG) var(--scrollbarBG);
                font-size: 14px;
                text-align: left;
                max-width: min(80vw, 800px);
              }
              code::-webkit-scrollbar-track {
                background: var(--scrollbarBG);
              }
              code::-webkit-scrollbar-thumb {
                background-color: var(--thumbBG) ;
                border-radius: 6px;
                border: 1px solid var(--scrollbarBG);
              }
              @media (max-width:640px)  {
                code {
                  max-width: 80vw;
                }
              }
            `,
        ];
    }

    cosntructor() {
        this.code='';
    }

    render() {
        const highlightedCode = hljs.highlight('xml', this.code.trim());
        
        return html`
            <pre><code class="xml hljs">${unsafeHTML(highlightedCode.value)}</code></pre>
            <wired-button elevation="2" @click=${this.handleCopy}>Copy</wired-button>
        `;
    }

    handleCopy() {
      const dummy = document.createElement("textarea");
      this.renderRoot.appendChild(dummy);
      dummy.value = this.code.trim();
      dummy.select();
      document.execCommand("copy");
      this.renderRoot.removeChild(dummy);
  }
}
