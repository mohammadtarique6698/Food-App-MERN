const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    //console.log(global.Food_Items_All);
    res.send([global.Food_Items_All, global.Food_Category]);
  } catch (err) {
    console.error("Problem from Server");
    res.send(err);
  }
});

module.exports = router;
