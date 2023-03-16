'use strict';

exports.calculate = function(req, res) {
  req.app.use(function(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(400);
    res.json({ error: err.message });
  });

  // The code below defines a set of functions for performing
  // simple arithmetic operations.
  // The function names are 'add', 'subtract', 'multiply', and 'divide'.
  // Each function takes two arguments, 'a' and 'b'.
  // The functions return the result of adding, subtracting, multiplying,
  // or dividing the arguments, respectively.

  var operations = {
    'add':      function(a,b) { return +a + +b },
    'subtract': function(a,b) { return a - b },
    'multiply': function(a,b) { return a * b },
    'divide':   function(a,b) { return a / b },
  };



  // Determine the operation

  if (! req.query.operation) {
    throw new Error("Unspecified operation");
  }

  var operation = operations[req.query.operation];

  if (! operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  // Validate operands

  if (! req.query.operand1 ||
      ! req.query.operand1.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  if (! req.query.operand2 ||
      ! req.query.operand2.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand2.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand2: " + req.query.operand2);
  }

  res.json({ result: operation(req.query.operand1, req.query.operand2) });
};
