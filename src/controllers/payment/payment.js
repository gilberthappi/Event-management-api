const PaypackJs = require("paypack-js").default;
require('dotenv').config();

const paypack = PaypackJs.config({ 
client_id: process.env.clientId, 
client_secret: process.env.clientSecret, 
});


export const cashIn =(req, res) => {
    paypack.cashin({
        amount: req.body.amount,
        number: req.body.number,
        environment: "production",
      })
        .then((response) => {
          console.log(response.data);
        res.status(200).json(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      
};

export const cashOut =(req, res) => {
    paypack.cashout({
        amount: req.body.amount,
        number: req.body.number,
        environment: "production",
      })
        .then((response) => {
          console.log(response.data);
        res.status(200).json(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
}

export const Transactions =(req, res) => {
paypack.transactions({ offset: 0, limit: 100 })
.then((response) => {
  console.log(response.data);
res.status(200).json(response.data);
})
.catch((err) => {
  console.log(err);
});
}