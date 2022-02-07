const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    //  useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '61fbd9dca8cb2ebc9ca46254',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam commodi asperiores quis cupiditate! Officiis omnis aliquam ratione quibusdam nam sed at, distinctio, debitis ut labore facere veritatis? Asperiores, libero quaerat.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfaqog9sp/image/upload/v1644077188/YelpCamp/bj6iffb4sdvj4sne3pum.jpg',
                    filename: 'YelpCamp/bj6iffb4sdvj4sne3pum',

                },
                {
                    url: 'https://res.cloudinary.com/dfaqog9sp/image/upload/v1644077190/YelpCamp/h3itgklvttchrh4hxaud.jpg',
                    filename: 'YelpCamp/h3itgklvttchrh4hxaud',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

