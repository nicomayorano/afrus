import { validationResult } from "express-validator";

export default {
  index: (req, res) => {
    res.render('index');
  },

  problem1: (req, res) => {
    res.render('problem1');
  },

  problem2: (req, res) => {
    res.render('problem2');
  },

  problem3: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      res.render('problem5', { valida: true });
    } else {
      res.render('problem5', { invalida: true });
    }    
  },

  problem4: (req, res) => {
    res.render('problem4');
  },

  problem5: (req, res) => {
    res.render('problem5');
  },
}