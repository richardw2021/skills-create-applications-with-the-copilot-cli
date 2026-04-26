"use strict";

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

  test("modulo returns the remainder of two numbers", () => {
    expect(modulo(5, 2)).toBe(1);
    expect(modulo(10, 3)).toBe(1);
    expect(modulo(20, 6)).toBe(2);
  });

  test("modulo throws for modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("power returns a base raised to the exponent", () => {
    expect(power(2, 3)).toBe(8);
    expect(power(5, 0)).toBe(1);
  });

  test("square root returns the positive root for non-negative numbers", () => {
    expect(squareRoot(16)).toBe(4);
    expect(squareRoot(9)).toBe(3);
    expect(squareRoot(2.25)).toBe(1.5);
  });

  test("square root throws for negative numbers", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Square root of a negative number is not allowed."
    );
  });
});

describe("calculate", () => {
  test("supports named operations", () => {
    expect(calculate("add", 2, 3)).toBe(5);
    expect(calculate("subtract", 10, 4)).toBe(6);
    expect(calculate("multiply", 45, 2)).toBe(90);
    expect(calculate("divide", 20, 5)).toBe(4);
    expect(calculate("modulo", 5, 2)).toBe(1);
    expect(calculate("modulo", 10, 3)).toBe(1);
    expect(calculate("power", 2, 3)).toBe(8);
    expect(calculate("sqrt", 16)).toBe(4);
  });

  test("supports symbol operations", () => {
    expect(calculate("+", 2, 3)).toBe(5);
    expect(calculate("-", 10, 4)).toBe(6);
    expect(calculate("*", 45, 2)).toBe(90);
    expect(calculate("/", 20, 5)).toBe(4);
    expect(calculate("%", 10, 3)).toBe(1);
    expect(calculate("^", 2, 3)).toBe(8);
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("cube", 9, 2)).toThrow("Unsupported operation.");
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

    expect(() => runCli(["add"])).toThrow("Expected 2 or 3 arguments.");
    expect(logSpy).toHaveBeenCalledWith(
      "Usage: node src/calculator.js <operation> <number1> [number2]"
    );
    expect(logSpy).toHaveBeenCalledWith(
      "Operations: add (+), subtract (-), multiply (*), divide (/), modulo (%), power (^), sqrt"
    );

    logSpy.mockRestore();
  });

  test("throws when an operand is not a valid number", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(() => runCli(["add", "two", "3"])).toThrow("Invalid number: two");

    logSpy.mockRestore();
  });

  test("supports square root from the command line", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["sqrt", "16"])).toBe(4);
    expect(logSpy).toHaveBeenCalledWith(4);

    logSpy.mockRestore();
  });

  test("supports the extended operation examples from the image", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(runCli(["modulo", "5", "2"])).toBe(1);
    expect(runCli(["power", "2", "3"])).toBe(8);
    expect(runCli(["sqrt", "16"])).toBe(4);
    expect(logSpy).toHaveBeenNthCalledWith(1, 1);
    expect(logSpy).toHaveBeenNthCalledWith(2, 8);
    expect(logSpy).toHaveBeenNthCalledWith(3, 4);

    logSpy.mockRestore();
  });

  test("throws when a binary operation is missing an operand", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(() => runCli(["power", "2"])).toThrow(
      "Operation power requires two operands."
    );

    logSpy.mockRestore();
  });

  test("throws when square root receives too many operands", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    expect(() => runCli(["sqrt", "9", "3"])).toThrow(
      "Operation sqrt accepts only one operand."
    );

    logSpy.mockRestore();
  });
});
