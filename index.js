const express = require("express");
const app = express();

// Remove PORT as it's not needed for serverless
app.use(express.json());
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    is_success: false,
    error: "Something went wrong!"
  });
});

app.post("/bfhl", (req, res) => {
  try {
  const input = req.body.data;
  const userFullName = "john_doe";
  const dob = "17091999";

  const response = {
    is_success: true,
    user_id: `${userFullName}_${dob}`,
    email: "john@xyz.com",
    roll_number: "ABCD123",
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: "0",
    concat_string: ""
  };

  let sum = 0;
  let alphaChars = [];

  input.forEach((item) => {
    const strItem = String(item).trim();
    
    if (/^\d+$/.test(strItem)) {
      const num = parseInt(strItem);
      if (num % 2 === 0) {
        response.even_numbers.push(strItem);
      } else {
        response.odd_numbers.push(strItem);
      }
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(strItem)) {
      response.alphabets.push(strItem.toUpperCase());
      if (strItem.length > 0) {
        alphaChars.push(...strItem.split(''));
      }
    } else {
      response.special_characters.push(strItem);
    }
  });

  response.sum = String(sum);

  const reversedAlphas = alphaChars.reverse();
  response.concat_string = reversedAlphas
    .map((char, index) => 
      index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    )
    .join('');

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

app.get("/", (req, res) => {
  try {
    res.sendFile('index.html', { root: './public' });
  } catch (error) {
    res.status(500).send('Error loading page');
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ 
    is_success: false,
    error: "Not Found" 
  });
});

// Export for serverless use
module.exports = app;
