import { Application } from 'pixi.js';

import config from './config';

export default async function App() {
  const app = new Application();
  await app.init(config);
  document.getElementById('pixi-container')!.appendChild(app.canvas);

  return app;
}