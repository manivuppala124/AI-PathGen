const express = require('express');
const router = express.Router();
const axios = require('axios');

// Hugging Face API details
const HF_API_URL = "https://api-inference.huggingface.co/models/pranayvadla17/learning_path_t5_model";
const HF_API_KEY = "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";

router.post("/generate", async (req, res) => {
  console.log("Request received:", req.body); // Log the incoming request

  try {
    const input = req.body.input;
    console.log("Input provided to Hugging Face:", input);

    // Validate input
    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "Invalid input provided" });
    }

    const hfResponse = await axios.post(
      HF_API_URL,
      { inputs: input },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Hugging Face response:", hfResponse.data);

    // Ensure Hugging Face response is valid
    if (hfResponse.data && hfResponse.data.length > 0) {
      const learningPath = hfResponse.data[0].generated_text.split("\n").filter(Boolean);
      console.log("Parsed learning path:", learningPath);
      res.json(learningPath);
    } else {
      console.warn("Empty response from Hugging Face");
      res.status(404).json({ error: "No learning path available" });
    }
  } catch (error) {
    console.error("Error fetching learning path:", error.message);
    res.status(500).json({ 
      error: "Failed to generate learning path", 
      details: error.message 
    });
  }
});

module.exports = router;
