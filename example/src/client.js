import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import App, { values } from './App';

const app = <App />;

const initAuto = document.getElementById('init-auto');
const initManual = document.getElementById('init-manual');
const htmlTargetDivId = document.getElementById('root');
let autoClicked = false;
let manualClicked = false;

const ids = ['default', 'input'];

function initializeReact(button) {
    button.disabled = false;
    button.innerHTML = 'reload page';
    button.className = 'btn btn-danger';

    render(<App />, htmlTargetDivId);

    if (
        !htmlTargetDivId ||
        !htmlTargetDivId.firstChild ||
        !htmlTargetDivId.firstChild.attributes ||
        !htmlTargetDivId.firstChild.attributes['data-react-checksum']
    ) {
        console.error(
            'Server-side React render was discarded. ' +
                'Make sure that your initial render does not contain any client-side code.',
        );
    }
}

initAuto.onclick = event => {
    if (autoClicked === false) {
        autoClicked = true;

        initAuto.disabled = true;
        initAuto.innerHTML = 'updating values...';
        initAuto.className = 'btn btn-danger';
        initManual.disabled = true;

        Object.keys(values).forEach(id => {
            const matchedId = document.getElementById(id);
            const updatedValue = values[id].updated;
            matchedId.value = updatedValue;

            if (updatedValue === 'checked') {
                matchedId.checked = true;
            }
        });

        setTimeout(() => {
            initializeReact(initAuto);
        }, 1000);

        return;
    }

    window.location.reload();
};

initManual.onclick = event => {
    if (manualClicked === false) {
        manualClicked = true;

        initAuto.disabled = true;
        initManual.innerHTML = 'updating values...';
        initManual.className = 'btn btn-danger';

        initializeReact(initManual);

        return;
    }

    window.location.reload();
};

export default app;
