import { describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";

describe("Interacción del usuario", () => {
  it("debe cambiar de sección al hacer click", () => {
    const dom = new JSDOM(`
      <button id="btn">Ir a registro</button>
      <section id="registro" style="display:none"></section>

      <script>
        document.getElementById("btn").addEventListener("click", () => {
          document.getElementById("registro").style.display = "block";
        });
      </script>
    `, { runScripts: "dangerously" });

    const document = dom.window.document;

    const btn = document.getElementById("btn");
    const registro = document.getElementById("registro");

    // Estado inicial
    expect(registro.style.display).toBe("none");

    // Simular click
    btn.click();

    // Verificar cambio
    expect(registro.style.display).toBe("block");
  });
});