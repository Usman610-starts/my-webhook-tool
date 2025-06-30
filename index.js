const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const data = req.body;
  console.log("Webhook received:", data);

  const phone = data.phone;
  const name = data.name;
  const order_id = data.order_id;

  const message = `Hello ${name}, your order ${order_id} has been received!`;

  try {
    const response = await axios.post("https://api.ultramsg.com/instanceYOUR_INSTANCE_ID/messages/chat", {
      token: "YOUR_ULTRAMSG_TOKEN",
      to: phone,
      body: message,
    });
    res.status(200).send("Message sent!");
  } catch (err) {
    console.error("Error sending WhatsApp:", err.message);
    res.status(500).send("Failed to send");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
