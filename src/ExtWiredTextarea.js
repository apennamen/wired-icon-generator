import { css } from 'lit-element';
import { WiredTextarea } from 'wired-textarea';

/**
 * Dummy class to add style on WiredTextarea scrollbar
 */
export class ExtWiredTextarea extends WiredTextarea {
    static get styles() {
        return [
            super.styles,
            css`
            :host {
                width: 60vw;
            }
            textarea {
                scrollbar-width: thin;
                scrollbar-color: var(--thumbBG) transparent;
            }
            textarea::-webkit-scrollbar {
                width: 8px;
                margin-top: 4em;
            }
            textarea::-webkit-scrollbar-track {
                background: transparent;
            }
            textarea::-webkit-scrollbar-thumb {
                background-color: var(--thumbBG) ;
                border-radius: 6px;
                border: 1px solid transparent;
            }
        `];

    }
}
