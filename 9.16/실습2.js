import { findUserByUsername, findAddressByUserId } from './api';

const UserInput = () => {
    let value = '';
    let error = '';

    function getValue() {
        return value;
    }

    function getError() {
        return error;
    }

    function setValue(inputValue) {
        value = inputValue;
    }

    function searchAddress() {
        error = '';

        return findUserByUsername(value)
            .then(user => {
                return findAddressByUserId(user.id);
            })
            .catch(e => {
                error = e.message;
            });
    }

    return { getError, getValue, setValue, searchAddress };
};

export default UserInput;
