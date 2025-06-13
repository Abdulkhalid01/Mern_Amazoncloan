const express = require("express");
const router = new express.Router();
const Products = require("../moduls/productSchema");
const USER = require("../moduls/userShcema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    console.log(productsdata);
    res.status(200).json(productsdata);
  } catch (error) {
    console.log("error: " + error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// get individual data

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const indivisuledata = await Products.findOne({ id: id });
    // console.log(indivisuledata + "inhgghhg");

    res.status(201).json(indivisuledata);
  } catch (error) {
    res.status(400).json(indivisuledata);
    console.log("error" + error.message);
  }
});

// register data

router.post("/register", async (req, res) => {
  console.log(req.body);

  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    req.status(422).json({ error: "fill the all data" });
    console.log("no data avialable");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "thhis user is already present" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword is no match" });
    } else {
      const finalUser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      const storedata = await finalUser.save();
      console.log(storedata);

      res.status(201).json(storedata);
    }
  } catch (error) {}
});

// login user api

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const userLogin = await USER.findOne({ email: email });
    if (!userLogin) {
      return res.status(400).json({ error: "Invalid details" });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (isMatch) {
      const token = await userLogin.generateAuthtoken();

      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        sameSite: "None"
      });

      res.status(201).json(userLogin);
    } else {
      res.status(400).json({ error: "Invalid details" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// adding the datainto cart

router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);
      await UserContact.save();
      console.log(cartData);
      res.status(201).json(UserContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});

// get cart details

router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log("error" + error);
  }
});

// get valid user

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log("error" + error);
  }
});

// remove item from cart

router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((curval) => {
      return curval.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item remove");
  } catch (error) {
    console.log("error");
    res.status(400).json(req.rootUser);
  }
});

// for user log out

router.get("/logout", authenticate,(req,res)=>{
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelement)=> {
      return curelement.token !== req.token
    })

    res.clearCookie("Amazonweb",{path:"/"})
    req.rootUser.save()

    res.status(201).json(req.rootUser.tokens)
    console.log("user logout");
    
  } catch (error) {
    console.log("error for user logout");
    
  }
})

module.exports = router;
