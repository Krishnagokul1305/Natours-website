const express = require('express');
const Email = require('../utils/email');
const router = express.Router();
const catchAsync = require('../utils/asyncHandler');

router.get(
  '/send-email',
  catchAsync(async (req, res, next) => {
    const email = new Email();
    await email.sendTestEmail();
    res.status(200).json({ message: 'Test email sent successfully' });
  })
);

module.exports = router;
