// UsersList.jsx
import React, { useEffect, useState } from 'react';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (!response.ok) {
                    // Turn HTTP errors (404, 500, etc.) into rejected Promises
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">
                    Error: Please check your internet connection!
                </div>
            ) : (
                <ul className="list-none flex flex-wrap gap-6 p-8 justify-center">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="text-gray-700 p-2 bg-gray-100 rounded-md mb-2 shadow-md"
                        >
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-sm text-gray-500">
                                Address: {user.address.street}
                            </div>
                            <div className="text-sm text-gray-500">
                                City: {user.address.city}
                            </div>
                            <div className="text-sm text-gray-500">Phone: {user.phone}</div>
                            <div className="text-sm text-gray-500">
                                Website: {user.website}
                            </div>
                            <div className="text-sm text-gray-500">
                                Company: {user.company.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                Catch Phrase: {user.company.catchPhrase}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
