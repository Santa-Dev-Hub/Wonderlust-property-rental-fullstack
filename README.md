# WonderLust - Airbnb-like Web Application

A full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **EJS** that allows users to list properties for rent/sale and browse available listings with a review system.

---

## 📋 Project Overview

**WonderLust** is a property rental/sales platform where:
- Users can **register and log in** securely
- Hosts can **create, edit, and delete** property listings
- Users can **view all listings** with detailed information
- Users can **leave reviews and ratings** on properties
- Session management ensures users stay logged in

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Passport.js (Local Strategy) |
| **Templating** | EJS with EJS-Mate |
| **File Upload** | Multer + Cloudinary |
| **Validation** | Joi |
| **Session Management** | Express-Session with MongoDB Store |
| **Frontend** | HTML, CSS, JavaScript |

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v20.12.0 or higher)
- **MongoDB Atlas** account (cloud database)
- **Cloudinary** account (for image uploads)

### Step 1: Clone/Download the Project
```bash
cd "pathtoyourfolder\Major Project"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all packages listed in `package.json`:
- express
- mongoose
- ejs & ejs-mate
- passport
- express-session
- multer & cloudinary
- joi (for validation)
- And more...

### Step 3: Create Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
MONGO_ATLAS_CONNECT_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wonderlust
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_KEY_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret_key
```

**Where to find these:**
- **MongoDB Atlas URL**: Get from [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- **Cloudinary Credentials**: Get from [cloudinary.com](https://cloudinary.com)
- **SECRET**: Can be any random string (used for session encryption)

### Step 4: Initialize Sample Data (Optional)
To populate the database with sample listings, run:
```bash
node init/index.js
```

---

## 🚀 Running the Application

### Start the Server
```bash
npm start
```

Or directly with Node:
```bash
node app.js
```

You should see:
```
Listening to port 3000
CONNECTED TO DB
```

### Access the Application
Open your browser and go to:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
├── app.js                      # Main Express server file
├── package.json                # Dependencies and scripts
├── schema.js                   # Joi validation schemas
├── cloudconfig.js              # Cloudinary configuration
├── middlewares.js              # Custom middleware functions
│
├── models/                     # Database schemas
│   ├── listing.js              # Property listing schema
│   ├── reviews.js              # Review schema
│   └── users.js                # User schema with authentication
│
├── controllers/                # Business logic
│   ├── listings.js             # Listing operations
│   ├── reviews.js              # Review operations
│   └── users.js                # User registration & login
│
├── routes/                     # API routes
│   ├── listing.js              # /listings routes
│   ├── reviews.js              # /listings/:id/reviews routes
│   └── user.js                 # User auth routes
│
├── views/                      # EJS templates
│   ├── includes/               # Reusable components
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs     # Base layout template
│   ├── listings/               # Listing pages
│   │   ├── alllistings.ejs     # Browse all listings
│   │   ├── showindividuallisting.ejs  # Single listing detail
│   │   ├── newpost.ejs         # Create new listing
│   │   ├── edit.ejs            # Edit listing
│   │   └── error.ejs           # Error page
│   └── users/                  # Auth pages
│       ├── login.ejs
│       └── signup.ejs
│
├── public/                     # Static files
│   ├── css/
│   │   ├── style.css           # Main styles
│   │   └── rating.css          # Rating component styles
│   └── js/
│       ├── javascript.js       # General scripts
│       └── map.js              # Map integration
│
├── utilities/                  # Helper functions
│   ├── ExpressErrors.js        # Custom error class
│   └── wrapasync.js            # Async error wrapper
│
└── init/                       # Database initialization
    ├── index.js                # Initialization script
    └── data.js                 # Sample data
```

---

## 🔑 Key Features

### 1. **User Authentication**
- Sign up with email and password
- Secure login with Passport.js
- Session management with 12-hour expiration
- Password hashing with passport-local-mongoose

### 2. **Listing Management**
- Create new property listings
- View all listings
- View detailed listing information
- Edit your own listings
- Delete your own listings
- Filter and search functionality

### 3. **Review System**
- Rate properties (1-5 stars)
- Write detailed reviews
- Delete your own reviews
- View all reviews for each property

### 4. **Image Upload**
- Upload listing images
- Store images on Cloudinary (cloud storage)
- Secure and scalable file handling

### 5. **Flash Messages**
- Success messages on login
- Edit confirmation messages
- Delete confirmation messages
- Error messages with proper alerts

---

## 🔐 Security Features

- **Environment Variables**: Sensitive data stored in `.env` (not committed)
- **Session Encryption**: Sessions encrypted using a secret key
- **MongoDB Session Store**: Sessions persist securely in database
- **Authentication**: Passport.js with Local Strategy
- **Password Hashing**: Passwords hashed by passport-local-mongoose
- **Validation**: All data validated with Joi before processing

---

## 📝 Common Routes

### Public Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | View all listings |
| GET | `/listings/:id` | View single listing details |
| GET | `/signup` | Sign up page |
| GET | `/login` | Login page |

### Protected Routes (Login Required)
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/listings` | Create new listing |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |
| GET | `/logout` | Logout user |

---

## ⚙️ Configuration Details

### MongoDB Connection
- Uses Mongoose for database abstraction
- Connects to MongoDB Atlas (cloud database)
- Session store configured in MongoDB for persistence

### Middleware Stack
```
1. Session management (express-session)
2. Flash messages (connect-flash)
3. Static file serving
4. URL encoding parser
5. Passport authentication
6. Method override for PUT/DELETE
7. Local variables for templates
```

### Error Handling
- Custom error class (`ExpressErrors`)
- Centralized error middleware
- Graceful 404 handling
- Async error wrapping

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Verify `MONGO_ATLAS_CONNECT_URL` in `.env`
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure credentials are correct

### "Image upload fails"
- Verify Cloudinary credentials in `.env`
- Check internet connection
- Ensure file format is PNG, JPG, or JPEG

### "Session not persisting"
- Clear browser cookies
- Check `SECRET` environment variable is set
- Verify MongoDB connection is active

### "Passport authentication fails"
- Ensure user is registered in database
- Check password is correct
- Clear sessions and try again

---

## 📖 How to Use

### Creating a Listing
1. Sign up or log in
2. Navigate to "Create Listing"
3. Fill in property details (title, description, price, location)
4. Upload property image
5. Click "Create"

### Leaving a Review
1. View a listing
2. Scroll to reviews section
3. Enter rating (1-5 stars)
4. Write your comment
5. Submit review

### Editing/Deleting
- Only the listing owner can edit/delete their listings
- Only the review author can delete their reviews

---

## 📚 Dependencies Overview

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB object modeling |
| `ejs` | Templating engine |
| `passport` | Authentication |
| `multer` | File upload handling |
| `cloudinary` | Image cloud storage |
| `joi` | Data validation |
| `express-session` | Session management |
| `connect-mongo` | MongoDB session store |
| `dotenv` | Environment variables |

---

## 🎯 Next Steps / Future Enhancements

- [ ] Add image gallery for listings
- [ ] Implement booking system
- [ ] Add payment integration
- [ ] Email notifications
- [ ] Advanced search/filters
- [ ] User profile page
- [ ] Host dashboard

---

## 👨‍💻 Author

**Santanu Pal**

---

## 📄 License

ISC License

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments in `app.js`
3. Check browser console for error messages
4. Review MongoDB Atlas logs
5. Verify `.env` file configuration

---

**Happy Listing! 🏠✨**
