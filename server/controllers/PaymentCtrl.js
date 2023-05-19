const User = require("../models/User");
const Payment = require("../models/Payment");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const axios = require("axios");
const qs = require("qs");
const nodemailer = require("nodemailer");

const newPayment = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (!theUser) {
      res.status(401).json({ msg: "کاربر یافت نشد!" });
    } else {
      if (req.body.amount && req.body.amount > 0) {
        let data = {
          // api_key: process.env.MERCHANT_CODE,
          api_key: "f626bc04-05dc-4dc1-88c2-b0610050fa74",
          amount: req.body.amount,
          // description: "پرداخت فروشگاه فایل اسماعیل",
          callback_uri: "http://localhost:3000/payment-result",
          custom_json_fields: '{ "productName":"Shoes752" , "id":52 }',
          order_id: theUser.email,
          // metadata: {
          //   email: theUser.email,
          //   username: theUser.username,
          // },
        };
        //REQUEST TO PAYMENT PROVIDER
        const response = await axios.post(
          "https://nextpay.org/nx/gateway/token",
          data
        );
        if (response.data.code == -1) {
          const newPayment = {
            username: theUser.username,
            email: theUser.email,
            amount: req.body.amount,
            resnumber: response.data.trans_id,
            payed: false,
            products: req.body.products,
            viewed: false,
            createdAt: new Date().toLocaleDateString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            updatedAt: new Date().toLocaleDateString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          await Payment.create(newPayment);
          res.status(200).json({
            link: `https://nextpay.org/nx/gateway/payment/${response.data.trans_id}`,
          });
        } else {
          res.status(401).json({ msg: "خطا در ارتباط با درگاه پرداخت!" });
        }
      } else {
        res.status(401).json({ msg: "سبد خرید خالی است!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.newPayment = newPayment;

const getAllPayments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalPayments = await Payment.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          email: 1,
          amount: 1,
          payed: 1,
          viewed: 1,
          updatedAt: 1,
        });
      const AllPaymentsNumber = await (await Payment.find()).length;
      res.status(200).json({ GoalPayments, AllPaymentsNumber });
    } else {
      const AllPayments = await Payment.find()
        .sort({ _id: -1 })
        .select({ resnumber: false });
      res.status(200).json(AllPayments);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllPayments = getAllPayments;

const updatePayment = async (req, res) => {
  try {
    /////EXPRESS VALIDATOR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.username = req.body.username.replace(/\s+/g, "_").toLowerCase();
      data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
      await Payment.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({ msg: "پرداخت با موفقیت آپدیت شد!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updatePayment = updatePayment;

const removePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "پرداخت با موفقیت حذف شد!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.removePayment = removePayment;

const getOnePaymentById = async (req, res) => {
  try {
    const targetPayment = await Payment.findById(req.params.id);

    // FOR ADDING PRODUCTS TO TARGETPAYMENT
    const targetPaymentProducts = await Product.find({
      _id: { $in: targetPayment.products },
    }).select({ title: 1, slug: 1 });
    targetPayment.products = targetPaymentProducts;

    res.status(200).json(targetPayment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getOnePaymentById = getOnePaymentById;
