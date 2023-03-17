import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client';
import { Options } from './Options';

const container = document.createElement('div');
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);


root.render(<Options/>)

