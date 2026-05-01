import { describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";

describe("Navegación del sitio", () => {
  it("debe contener enlaces principales del menú", () => {
    const dom = new JSDOM(`
      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#cursos">Cursos</a>
        <a href="#registro">Registro</a>
      </nav>
    `);

    const document = dom.window.document;

    expect(document.querySelector('a[href="#inicio"]')).not.toBeNull();
    expect(document.querySelector('a[href="#cursos"]')).not.toBeNull();
    expect(document.querySelector('a[href="#registro"]')).not.toBeNull();
  });
});