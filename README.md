# Portfolio Backend

A Node.js and Express.js backend for my personal developer portfolio. It provides API endpoints and handles contact form submissions using the Resend email API.

## Features

- REST API built with Express.js
- Contact form submission endpoint
- Email delivery using Resend
- Input validation and HTML escaping
- Environment-based configuration
- JSON request and response handling

## Tech Stack

- Node.js
- Express.js
- Resend
- JavaScript
- dotenv
- CORS

## API Endpoint

### Send a contact message

`POST /api/contact`

**Request body:**

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I would like to connect."
}
```

The API validates the submitted fields and attempts to deliver the message through Resend.

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Vaibhav-Adarsh/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=3000
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO=your_verified_recipient_email
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will run locally on `http://localhost:3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port used by the server |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO` | Email address that receives contact messages |

Never commit your `.env` file or expose API keys publicly.

## Deployment

The backend is deployed on Render.

- **Live API base URL:** `https://my-portfolio-ic2b.onrender.com`
- **Frontend:** [https://vaibhav-adarsh.github.io](https://vaibhav-adarsh.github.io)

## Author

**Vaibhav Adarsh**

- GitHub: [@Vaibhav-Adarsh](https://github.com/Vaibhav-Adarsh)
- Portfolio: [Visit Website](https://vaibhav-adarsh.github.io)

---

This project is part of my personal portfolio and demonstrates backend development, API integration, and email handling.
