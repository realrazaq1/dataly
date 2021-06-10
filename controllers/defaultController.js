const fetch = require("node-fetch");
require("dotenv").config();
const Purchase = require("../models/Purchase");

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
    const {
      signature,
      account_name,
      receiver_bank_account_number,
      receiver_bank,
      reusable,
      ...others
    } = authorization;
    // console.log(others);

    // send success status to frontend
    res.status(200).json({ status, reference });

    // save purchase in DB
    await Purchase.create({
      network: metadata.network,
      amount: metadata.amount,
      price: metadata.price,
      phoneNumber: metadata.phoneNumber,
      reference,
      paidAt: paid_at,
      paymentInfo: JSON.stringify(others),
    });
    console.log("new purchase made...", reference);
  },
};
