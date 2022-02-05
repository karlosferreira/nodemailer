const index = (req, res) => {
    res.sendFile('index.html', { root: '.' });
};

module.exports = {
    index,
};