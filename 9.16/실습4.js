import API from "./api";

function transformUser(user) {
    const email = user.email;
    const name = `${user.name.first} ${user.name.last}`;
    const pictureUrl = user.picture.large;
    const username = user.login.username;
    const location = `${user.location.country}, ${user.location.state}, ${user.location.city}`;
    const age = user.dob.age;

    return {
        email,
        name,
        pictureUrl,
        username,
        location,
        age,
    };
}

const requestUsers = () => {
    return API.fetchUsers().then((users) =>
        users.map(transformUser).filter((user) => user.age > 40)
    );
};

export default requestUsers;