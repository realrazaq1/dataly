const fetch = require("node-fetch");
require("dotenv").config();

module.exports = {
  showHomePage: (req, res) => {
    res.render("index", { cssfile: "index.css" });
  },
  verifyTransaction: async (req, res) => {
    const { ref } = req.query;
    const response = await fetch(
      "https://api.paystack.co/transaction/verify/" + ref,
      {
        headers: {
          Authorization: `Bearer ${process.env.SKEY}`,
        },
        method: "GET",
      }
    );
    const resp = await response.json();
    const { status, reference, paid_at, authorization, metadata } = resp.data;
    console.log(status, reference, paid_at, authorization, metadata);
    // console.log(resp);
    res.status(200).json({ status });
  },
};
