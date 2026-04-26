#!/usr/bin/env node

"use strict";

// Supported operations: addition, subtraction, multiplication, division.

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

const operations = {
  add: addition,
  "+": addition,
  subtract: subtraction,
  "-": subtraction,
  multiply: multiplication,
  "*": multiplication,
  divide: division,
  "/": division
};

function calculate(operation, leftOperand, rightOperand) {
  const handler = operations[operation];

  if (!handler) {
    throw new Error(
      "Unsupported operation. Use add (+), subtract (-), multiply (*), or divide (/)."
    );
  }

  return handler(leftOperand, rightOperand);
}

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <number1> <number2>");
  console.log("Operations: add (+), subtract (-), multiply (*), divide (/)");
}

function runCli(argv = process.argv.slice(2)) {
  if (argv.length !== 3) {
    printUsage();
    throw new Error("Expected exactly 3 arguments.");
  }

  const [operation, leftValue, rightValue] = argv;
  const leftOperand = parseOperand(leftValue);
  const rightOperand = parseOperand(rightValue);
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
  calculate,
  runCli
};
