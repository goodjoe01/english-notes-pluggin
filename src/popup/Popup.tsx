import React from 'react'
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '../styles/tailwind.css'

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);


root.render(<App/>)

