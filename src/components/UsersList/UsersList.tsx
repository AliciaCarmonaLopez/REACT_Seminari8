import React from "react";
import { User } from '../../types';
// import { useNavigate } from "react-router-dom";
import styles from './UsersList.module.css'; // Import CSS module
import { useNavigate } from "react-router-dom";

interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const navigate = useNavigate();

    const handleClick = (user: User) => {
        navigate('/update', { state: { user } });
    };


    const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li key={user.name} className={styles.listItem}>
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                    <button onClick={() => handleClick(user)} className={styles.button}>Update</button>
                </div>
            </li>
        ));
    };

    return (
        <ul className={styles.list}>
            {renderList()}
        </ul>
    );
};

export default UsersList;