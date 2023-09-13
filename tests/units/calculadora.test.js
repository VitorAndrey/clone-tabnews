const calculadora = require("../models/calculadora.js");

test("2 + 2 deveria somar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("5 + 10 deveria somar 15", () => {
  const resultado = calculadora.somar(5, 10);
  expect(resultado).toBe(15);
});

test("'banana' + 10 deveria somar 'erro'", () => {
  const resultado = calculadora.somar("banana", 10);
  expect(resultado).toBe("erro");
});
