const User = require("../schema/users")

exports.createUser = async (data) => {
    try {
        const addUser = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,

        });

        return addUser
    } catch (e) {
        console.log({ e })
        return e.message
    }
}