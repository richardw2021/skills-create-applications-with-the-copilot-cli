#!/usr/bin/env node

"use strict";

// Supported operations: addition, subtraction, multiplication, division,
// modulo, power, and square root.

function parseOperand(value) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return parsedValue;
}

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

const operations = {
  add: { handler: addition, arity: 2 },
  "+": { handler: addition, arity: 2 },
  subtract: { handler: subtraction, arity: 2 },
  "-": { handler: subtraction, arity: 2 },
  multiply: { handler: multiplication, arity: 2 },
  "*": { handler: multiplication, arity: 2 },
  divide: { handler: division, arity: 2 },
  "/": { handler: division, arity: 2 },
  modulo: { handler: modulo, arity: 2 },
  "%": { handler: modulo, arity: 2 },
  power: { handler: power, arity: 2 },
  "^": { handler: power, arity: 2 },
  "**": { handler: power, arity: 2 },
  sqrt: { handler: squareRoot, arity: 1 },
  squareroot: { handler: squareRoot, arity: 1 }
};

function calculate(operation, leftOperand, rightOperand) {
  const normalizedOperation = operation.toLowerCase();
  const operationConfig = operations[normalizedOperation];

  if (!operationConfig) {
    throw new Error(
      "Unsupported operation. Use add (+), subtract (-), multiply (*), divide (/), modulo (%), power (^), or sqrt."
    );
  }

  if (operationConfig.arity === 1) {
    return operationConfig.handler(leftOperand);
  }

  return operationConfig.handler(leftOperand, rightOperand);
}

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <number1> [number2]"
  );
  console.log(
    "Operations: add (+), subtract (-), multiply (*), divide (/), modulo (%), power (^), sqrt"
  );
}

function runCli(argv = process.argv.slice(2)) {
  if (argv.length < 2 || argv.length > 3) {
    printUsage();
    throw new Error("Expected 2 or 3 arguments.");
  }

  const [operation, leftValue, rightValue] = argv;
  const leftOperand = parseOperand(leftValue);
  const normalizedOperation = operation.toLowerCase();
  const operationConfig = operations[normalizedOperation];

  if (!operationConfig) {
    throw new Error(
      "Unsupported operation. Use add (+), subtract (-), multiply (*), divide (/), modulo (%), power (^), or sqrt."
    );
  }

  if (operationConfig.arity === 2 && rightValue === undefined) {
    printUsage();
    throw new Error(`Operation ${operation} requires two operands.`);
  }

  if (operationConfig.arity === 1 && rightValue !== undefined) {
    printUsage();
    throw new Error(`Operation ${operation} accepts only one operand.`);
  }

  const rightOperand =
    operationConfig.arity === 2 ? parseOperand(rightValue) : undefined;
  const result = calculate(operation, leftOperand, rightOperand);

  console.log(result);
  return result;
}

if (require.main === module) {
  try {
    runCli();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli
};
