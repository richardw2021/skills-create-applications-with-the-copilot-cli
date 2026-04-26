"use strict";

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli
} = require("../calculator");

describe("calculator operations", () => {
  test("addition returns the sum of two numbers", () => {
    expect(addition(2, 3)).toBe(5);
    expect(addition(-4, 10)).toBe(6);
  });

  test("subtraction returns the difference of two numbers", () => {
    expect(subtraction(10, 4)).toBe(6);
    expect(subtraction(3, 8)).toBe(-5);
  });

  test("multiplication returns the product of two numbers", () => {
    expect(multiplication(45, 2)).toBe(90);
    expect(multiplication(-3, 4)).toBe(-12);
  });

  test("division returns the quotient of two numbers", () => {
    expect(division(20, 5)).toBe(4);
    expect(division(7.5, 2.5)).toBe(3);
  });

  test("division throws for division by zero", () => {
    expect(() => division(10, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("calculate", () => {
  test("supports named operations", () => {
    expect(calculate("add", 2, 3)).toBe(5);
    expect(calculate("subtract", 10, 4)).toBe(6);
    expect(calculate("multiply", 45, 2)).toBe(90);
    expect(calculate("divide", 20, 5)).toBe(4);
  });

  test("supports symbol operations", () => {
    expect(calculate("+", 2, 3)).toBe(5);
    expect(calculate("-", 10, 4)).toBe(6);
    expect(calculate("*", 45, 2)).toBe(90);
    expect(calculate("/", 20, 5)).toBe(4);
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("%", 9, 2)).toThrow("Unsupported operation.");
  });
});

describe("runCli", () => {
  test("prints the result for a valid operation", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["add", "2", "3"])).toBe(5);
    expect(logSpy).toHaveBeenCalledWith(5);

    logSpy.mockRestore();
  });

  test("accepts symbol operators from the command line", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["*", "45", "2"])).toBe(90);
    expect(logSpy).toHaveBeenCalledWith(90);

    logSpy.mockRestore();
  });

  test("throws when the argument count is incorrect", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(() => runCli(["add", "2"])).toThrow("Expected exactly 3 arguments.");
    expect(logSpy).toHaveBeenCalledWith(
      "Usage: node src/calculator.js <operation> <number1> <number2>"
    );
    expect(logSpy).toHaveBeenCalledWith(
      "Operations: add (+), subtract (-), multiply (*), divide (/)"
    );

    logSpy.mockRestore();
  });

  test("throws when an operand is not a valid number", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(() => runCli(["add", "two", "3"])).toThrow("Invalid number: two");

    logSpy.mockRestore();
  });
});
