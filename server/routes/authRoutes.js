const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { 
    test, 
    registerUser, 
    loginUser, 
    getProfile, 
    logout, 
    verifyOTP, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const scrapeController = require('../controllers/scrapeController');

// Middleware for CORS
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);
router.use(bodyParser.json());

// Test route
router.get('/', test);

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

// Profile route - Protected by auth middleware
router.get('/profile', authMiddleware, getProfile);

// Scrape routes
router.post('/api/scrape', scrapeController.scrapeWebsite);  
router.get('/api/scraped-files', scrapeController.getAllScrapedFiles);
router.get('/api/scraped-files/:filename', scrapeController.getScrapedFileContent);

// In server/routes/authRoutes.js or a new file
router.get('/api/dataset', async (req, res) => {
    try {
        const dataset = await qa_data; // Assuming qa_data is accessible here
        res.json(dataset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch dataset' });
    }
});

module.exports = router;