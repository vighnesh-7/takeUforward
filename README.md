
# takeuforward Assignment

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vighnesh-7/takeuforward
   cd takeuforward
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   Copy the `.env.example` file to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit `http://localhost:3000/`


## 🌟 Features

- **User Authentication:** Secure login with Google OAuth.
- **Admin Dashboard:** Create Flash cards, Ai generated Flash cards.

## 📜 Environment Variables

| Variable              | Description                                       
|-----------------------|-------------------------------------
| `DATABASE_URL`        | PostgreSQL connection string                     
| `NEXTAUTH_GOOGLE_ID`  | Google OAuth Client ID                            
| `NEXTAUTH_GOOGLE_SECRET` | Google OAuth Client Secret                     
| `NEXTAUTH_SECRET`     | Secret for NextAuth.js                           
| `NEXTAUTH_URL`        | Base URL for NextAuth.js                          
| `NEXTAUTH_URL_INTERNAL` | Internal URL for NextAuth.js                   
| `GEMINI_API_KEY`      | API key for Gemini                                

