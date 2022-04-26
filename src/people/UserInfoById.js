import {useDataSource} from '../hooks/useDataSource';
import axios from 'axios';

const serverResource = (resourceUrl) => {
    return async () => {
        const response = await axios.get(resourceUrl);
        return response.data;
    }
}

const localStorageResource = key => async () => {
    return localStorage.getItem(key);
}

export const UserInfoById = ({ userId }) => {
    const message = useDataSource(localStorageResource('message'));
    console.log('message', message);

    const user = useDataSource(serverResource(`/users/${userId}`));
    const { name, age, hairColor, hobbies } = user || {};

    return user ? (
        <>
            <h3>{name}</h3>
            <p>Age: {age} years</p>
            <p>Hair color: {hairColor}</p>
            <h3>Hobbies:</h3>
            <ul>
                {hobbies.map(hobby => <li key={hobby}>{hobby}</li>)}
            </ul>
        </>
    ) : <p>Loading...</p>;
}
