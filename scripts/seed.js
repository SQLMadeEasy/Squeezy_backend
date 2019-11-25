const db = require('../db/index')


const { User } = require('../db/models/models_index')
const { Product } = require('../db/models/models_index')



const users = [
    {
        email: 'Eliot@fsociety.org',
        password: '123456',
        firstName: 'Eliot',
        lastName: 'Thompson',
        phoneNumber: '212-288-1010'
    },
    {
        email: 'Davis@sandshrew.com',
        password: '123456',
        firstName: 'Davis',
        lastName: 'Norway',
        phoneNumber: '347-705-8100'
    },
    {
        email: 'foley@goats.com',
        password: '123456',
        firstName: 'Foley',
        lastName: 'Garfield',
        phoneNumber: '212-777-5314'
    },
]


const products = [
    {
        name: "the greatest product",
        description: "It is it's name", 
        price: 5500
    },
    {
        name: "Lawnmower 5000",
        description: "It'll mow your lawn. What else do you want?'",
        price: 10000
    }
]




// seed your database here!
const seed = async () => {
    try {
        await db.sync({ force: true })
        await Promise.all(
            users.map(user => {
                return User.create(user)
            })
        )
        
        await Promise.all(
            products.map(product => {
                return Product.create(product)
            })
        )

        // console.log(green('Seeding success!'))
        console.log('Seeding success!')
        db.close()
    } catch (err) {
        // console.error(red('Oh noes! Something went wrong!'))
        console.error('Oh noes! Something went wrong!')
        console.error(err)
        db.close()
    }
}

seed()
