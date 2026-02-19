const healthCheck = (req, res) => {
  res.status(200).json({ status: 'ShareFare API running' });
};

module.exports = { healthCheck };
