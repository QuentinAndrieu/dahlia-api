module.exports = {
    'secret': 'ultrasecretkey',
    'database': process.env.MONGODB_URI | 'mongodb://localhost/Dahliadb'
};