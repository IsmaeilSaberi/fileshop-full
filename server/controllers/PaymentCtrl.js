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
        // FOR GENERATE RANDOM IDS TO ORDER ID OF PAYMENT PROVIDER
        function generateRandomId(length) {
          let result = "";
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        }
        let orderId = generateRandomId(8);
        let data = {
          api_key: process.env.MERCHANT_CODE,
          amount: req.body.amount,
          callback_uri: "https://ismaeilsaberi.ir/payment-result",
          order_id: orderId,
          payer_desc: "پرداخت فروشگاه فایل اسماعیل",
          // custom_json_fields: req.user.cart,
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
          // LEVEL 1: CREATING NEWPAYMENT
          const newPayment = {
            username: theUser.username,
            email: theUser.email,
            amount: req.body.amount,
            resnumber: response.data.trans_id,
            orderid: orderId,
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

          // LEVEL 2: ADDING PAYMENT ID TO USERS PAYMENTS
          const newUserData = {};
          const thePayment = await Payment.findOne({
            resnumber: newPayment.resnumber,
          });
          const userOldPayments = theUser.payments;
          const thisPayment = [thePayment._id];
          const userNewPayments = [...userOldPayments, ...thisPayment];
          newUserData.payments = userNewPayments;
          await User.findByIdAndUpdate(req.user._id, newUserData, {
            new: true,
          });

          // LEVEL 1 CONTINUE
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

const paymentResultCheck = async (req, res) => {
  try {
    const thePayment = await Payment.findOne({ resnumber: req.body.resnumber });
    if (!thePayment) {
      res.status(401).json({ msg: "پرداخت یافت نشد!" });
    } else {
      let data = {
        api_key: process.env.MERCHANT_CODE,
        trans_id: req.body.trans_id,
        amount: req.body.amount,
      };
      //REQUEST TO PAYMENT PROVIDER
      const response = await axios.post(
        "https://nextpay.org/nx/gateway/verify",
        data
      );

      if (response.data.code == 0) {
        const theUser = await User.findById(req.user._id);
        const newData = {};

        // LEVEL 1: ADDING PRODUCTS TO USERPRODUCTS
        const userOldProducts = theUser.userProducts;
        const userCart = theUser.cart;
        const userNewProducts = [...userOldProducts, ...userCart];
        newData.userProducts = userNewProducts;

        // LEVEL 2: MAKE CART EMPTY
        newData.cart = [];

        // LEVEL 3: UPDATE USER
        await User.findByIdAndUpdate(req.user._id, newData, { new: true });

        // LEVEL 4: ADDING ONE TO PRODUCT BUYNUMBER
        for (let i = 0; i < userCart.length; i++) {
          const theProduct = await Product.findById(userCart[i]);
          const newProduct = {
            buyNumber: theProduct.buyNumber + 1,
          };
          await Product.findByIdAndUpdate(userCart[i]._id, newProduct, {
            new: true,
          });
        }

        // LEVEL 5: UPDATING THE PAYMENT
        const newPaymentData = {
          payed: true,
          viewed: false,
          updatedAt: new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        await Payment.findByIdAndUpdate(thePayment._id, newPaymentData, {
          new: true,
        });
        res.status(200).json({
          msg: "خریدتان موفقیت آموز بود و فایل به محصولات شما اضافه خواهد شد!",
        });
      } else {
        res.status(401).json({ msg: "پرداخت انجام نشده است!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.paymentResultCheck = paymentResultCheck;

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
      const AllPayments = await Payment.find().sort({ _id: -1 });
      // .select({ resnumber: false });
      res.status(200).json(AllPayments);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllPayments = getAllPayments;

const getAllNotViewedPayments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalPayments = await Payment.find({ viewed: false })
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
      const AllPaymentsNumber = await (
        await Payment.find({ viewed: false })
      ).length;
      res.status(200).json({ GoalPayments, AllPaymentsNumber });
    } else {
      const AllPayments = await Payment.find().sort({ _id: -1 });
      // .select({ resnumber: false });
      res.status(200).json(AllPayments);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports.getAllNotViewedPayments = getAllNotViewedPayments;

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
