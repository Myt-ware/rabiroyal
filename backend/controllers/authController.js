const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Ensure we have a secret
const JWT_SECRET = process.env.JWT_SECRET || 'rabiroyal_super_secret_key_2026';

// @desc    Request OTP (Login/Register)
// @route   POST /api/auth/request-otp
// @access  Public
exports.requestOtp = async (req, res) => {
  try {
    const { phoneOrEmail } = req.body;

    if (!phoneOrEmail) {
      return res.status(400).json({ message: 'Phone number or email is required' });
    }

    // Generate a 4-digit OTP (for simulation, let's just make it randomly 1000-9999)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Find user or create if doesn't exist
    let user = await User.findOne({ phoneOrEmail });

    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({
        phoneOrEmail,
        otp,
        otpExpires
      });
    }

    // SIMULATION: Print OTP to console
    console.log(`\n========================================`);
    console.log(`[SIMULATED SMS/EMAIL OTP]`);
    console.log(`To: ${phoneOrEmail}`);
    console.log(`Your Raabi Perfumes verification code is: ${otp}`);
    console.log(`========================================\n`);

    // In a real app, do NOT send the OTP in the JSON response to the client.
    // For this prototype, we send it so the frontend can display an alert for easy testing.
    res.status(200).json({ 
      message: 'OTP sent successfully',
      simulatedOtp: otp // Remove this line in production!
    });
  } catch (error) {
    console.error('Error requesting OTP:', error);
    res.status(500).json({ message: 'Server error while requesting OTP' });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
  try {
    const { phoneOrEmail, otp } = req.body;

    if (!phoneOrEmail || !otp) {
      return res.status(400).json({ message: 'Phone/Email and OTP are required' });
    }

    const user = await User.findOne({ phoneOrEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches and hasn't expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, phoneOrEmail: user.phoneOrEmail }, JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        phoneOrEmail: user.phoneOrEmail,
        name: user.name,
        savedAddress: user.savedAddress
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Server error while verifying OTP' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    // Requires middleware to extract user from token (req.user)
    const user = await User.findById(req.user.id).select('-otp -otpExpires');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, savedAddress } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (savedAddress) user.savedAddress = { ...user.savedAddress, ...savedAddress };

    await user.save();

    res.status(200).json({
      message: 'Profile updated',
      user: {
        id: user._id,
        phoneOrEmail: user.phoneOrEmail,
        name: user.name,
        savedAddress: user.savedAddress
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};
