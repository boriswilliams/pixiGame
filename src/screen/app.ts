import { Application } from "pixi.js";

export default async function App() {
  const app = new Application();
  await app.init({ background: '#1099bb', resizeTo: window });
  document.getElementById('pixi-container')!.appendChild(app.canvas);

  return app;
}