const db = require('../db/index')


const { User } = require('../db/models/models_index')


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



// seed your database here!
const seed = async () => {
    try {
        await db.sync({ force: true })
        await Promise.all(
            users.map(user => {
                return User.create(user)
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
