import React from "react";
import { User } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../Login/Login.module.css';
import { updateUser } from "../../services/usersService";

const Update= () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user as User; // Accede al usuario pasado por navigate
    const [originalUser, setOriginalUser] = React.useState<User>(user);
    const [updatedUser, setUpdatedUser] = React.useState<Partial<User>>(user);

    const assignUser = () => {
        setOriginalUser(user);
    }
    const updated: boolean = true;
    
    React.useEffect(() => {
        if (updatedUser !== originalUser) {
            console.log("The user was updated successfully!");
        }
    }, [updatedUser, originalUser]); // Dependencias para el efecto

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         try {
            assignUser();
            if (!originalUser._id) {
                throw new Error("User ID is undefined");
            }
            const credentials = {
                name: updatedUser.name ?? originalUser.name,
                age: updatedUser.age ?? originalUser.age,
                email: updatedUser.email ?? originalUser.email ?? '',
            };
            const user = await updateUser(originalUser._id, credentials); // Llama a la función de actualización            
            console.log('User updated:', user);
            navigate('/', {state: {updated}}); // Redirige a la página de inicio o donde desees
        } catch (error) {
            console.error('Update failed:', error);
            alert('Update failed. Please check your credentials.');
        }
    }
    

    const handleChange = (field: keyof User, value: string) => {
        setUpdatedUser((prev) => ({
            name: prev.name,
            age: prev.age,
            email: prev.email,
            [field]: value,
        }));
    };
    return(
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={updatedUser.email ?? ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="age"
                        id="age"
                        name="age"
                        value={updatedUser.age??''}
                        onChange={(e) => handleChange('age', e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        value={updatedUser.name??''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Update
                </button>
            </form>
        </div>    
    );
}

export default Update;