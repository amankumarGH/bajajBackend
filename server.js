const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { first_name, last_name, dob, data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    res.status(200).json({
      is_success: true,
      user_id: `${first_name}_${last_name}_${dob}`,
      numbers_array: numbers,
      alphabets_array: alphabets,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));