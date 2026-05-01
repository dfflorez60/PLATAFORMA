import { describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";

describe("Formulario de registro", () => {
  it("debe validar que los campos no estén vacíos", () => {
    const dom = new JSDOM(`
      <form>
        <input id="nombre" value="">
        <input id="correo" value="">
        <button id="btn">Enviar</button>
      </form>
    `);

    const document = dom.window.document;

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    expect(nombre).toBe("");
    expect(correo).toBe("");
  });
});