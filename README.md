# 👗 Hotify — Rent · Slay · Return

Hotify is a premium designer fashion rental platform based in Bhopal. We provide access to luxury outfits for weddings, parties, and special occasions at affordable prices. Rent, slay your look, and return — it's that simple.

![Hotify Hero](https://hotify.in/assets/hero.png)

## ✨ Features

- **500+ Designer Outfits**: Curated collection of premium outfits for all occasions.
- **Smart Filtering**: Filter by occasion, size, and budget to find your perfect match.
- **Seamless Booking**: Simple inquiry and booking process via the integrated contact form.
- **Full-Stack Performance**: Built with React for a snappy frontend and Node.js for reliable backend logic.
- **Responsive Design**: Optimized for everything from mobile phones to high-resolution desktops.
- **Sanitized & Delivered**: High hygiene standards with convenient local delivery in Bhopal.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/), Vanilla CSS
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Notifications**: [Nodemailer](https://nodemailer.com/)
- **Deployment**: [Vercel](https://vercel.com/) (Serverless)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanaygt/hotify.git
   cd hotify
   ```

2. **Install dependencies for both root and client:**
   ```bash
   npm run install:all
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=recipient-email@gmail.com
   ```

4. **Seed the database (Optional):**
   ```bash
   npm run seed
   ```

### Running the App

Start both the backend server and the Vite development server concurrently:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:5173` (Vite)
- **Backend**: `http://localhost:5000` (Express)

## 📁 Project Structure

```text
├── api/                # Serverless functions (Vercel)
├── assets/             # Images and static assets
├── client/             # React frontend (Vite)
│   ├── src/            # Frontend source code
│   └── public/         # Static frontend assets
├── css/                # Global CSS styles
├── js/                 # Root level JS utilities
├── models/             # Mongoose database schemas
├── server/             # Local Express dev server
├── .env.example        # Environment variable template
├── index.html          # Main landing page entry
└── package.json        # Project scripts and dependencies
```

## 📜 Available Scripts

- `npm run dev`: Runs server and client concurrently for development.
- `npm run install:all`: Installs all root and client dependencies.
- `npm run build`: Builds the client application for production.
- `npm run seed`: Populates the database with initial outfit data.
- `npm run dev:server`: Runs only the backend server with watch mode.
- `npm run dev:client`: Runs only the Vite development server.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and for internal use only.

---
Built with ♥ by [Hotify Team](https://hotify.in)
