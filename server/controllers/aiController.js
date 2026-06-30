const { askAI } = require("../services/aiService");

const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    const answer = await askAI(question);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get AI response.",
    });
  }
};

module.exports = {
  askQuestion,
};