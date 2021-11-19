const express = require("express");
const AddPro = require("../models/product");
const router = express.Router();

router.get("/addpro", (req, res) => { 
    res.render("pages/addpro");
});

// router.get("/edit", (req, res) => { 
//     res.render("pages/edit");
// });

router.post("/addpro", async (req, res) => {
    const imagePath = req.body.imagePath;
    const link = req.body.link;
    const name = req.body.name;
    const price = req.body.price;
    const status = req.body.status;

    const addpro = new AddPro({
        imagePath: imagePath,
        link: link,
        name: name,
        price: price,
        status: status,
    });

    await addpro.save((err, res) => {
        if(err) console.error(err);
        else {
            console.log(err)
        }
    });
    req.flash("message", "Produk berhasil ditambahkan!");
    res.redirect("/dashboard");
});

router.get("/delete/:id", (req, res) => {
    AddPro.findByIdAndDelete(req.params.id, (err) => {
        if(!err) {
            req.flash("message", "Produk berhasil dihapus!");
            res.redirect("/dashboard");
        }
        else {
            console.log(err);
        }
    })
 });

 //show update
router.get("/edit/:id", (req, res) => {
    AddPro.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, data) => {
        res.render("/edit", {products: data});
    })
});

//update
router.post("/edit/:id", (req, res, next) => {
    AddPro.findByIdAndUpdate({_id: req.params.id}, req.body, (err) => {
        if(err) {
            console.log("Update gagal");
            next(err);
        } else {
            res.redirect("/dashboard");
        }
    })
});

module.exports = router;