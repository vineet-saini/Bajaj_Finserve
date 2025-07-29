module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      is_success: false,
      error: "Method not allowed" 
    });
  }

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

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
};
