const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'aS98fhsdf89sdfF#234j2@#JKHdfk324df';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Try Admin login first
        const adminRaw = await Admin.findOne({ admin_email: email });
        if (adminRaw) {
            const isMatch = await bcrypt.compare(password, adminRaw.admin_password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }

            const token = jwt.sign(
                { id: adminRaw._id, role: 'admin' },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            const admin = await Admin.findOne({ admin_email: email }).select('-admin_password');
            return res.json({ role: 'admin', user: admin, token, status: 'Login success' });
        }

        const userRaw = await User.findOne({ user_email: email });
        if (!userRaw) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        const isMatch = await bcrypt.compare(password, userRaw.user_password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        const token = jwt.sign(
            { id: userRaw._id, role: 'user' },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const user = await User.findOne({ user_email: email }).select('-user_password');
        return res.json({ role: 'user', user, token, status: 'Login success' });

    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

const handleCredentials = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Try Admin login first
        const adminRaw = await Admin.findOne({ admin_email: email });

        if (adminRaw) {
            const isMatch = await bcrypt.compare(password, adminRaw.admin_password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }
            return res.json({ status: 'ok match cla' });
        }

        const userRaw = await User.findOne({ user_email: email });
        if (!userRaw) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        const isMatch = await bcrypt.compare(password, userRaw.user_password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        return res.json({ status: 'ok match cla' });

    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

const handleEmailVerifiction = async (req, res) => {
    const { email } = req.body;

    try {

        const userRaw = await User.findOne({ user_email: email });
        if (!userRaw) {
            return res.status(401).json({ message: 'Invalid user credentials' });
        }

        return res.json({ status: 'ok match cla' });

    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

const handlePasswordUpdate = async (req, res) => {
    const { password, email } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await User.findOneAndUpdate(
            { user_email: email },
            { user_password: hashedPassword },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user: updatedUser, status: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong updating password', error: err.message
        });
    }
};

module.exports = { login, handleCredentials, handleEmailVerifiction, handlePasswordUpdate };
