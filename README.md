# BFHL API Application

This is a REST API application that processes arrays and returns various computed values.

## API Endpoints

### POST /bfhl

Processes an array of values and returns computed results.

#### Request Format
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

#### Response Format
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /

Serves the HTML interface for testing the API.

## Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The application will run on port 3000 by default or the port specified in the environment variable.
