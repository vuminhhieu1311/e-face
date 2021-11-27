import createToken from '../api/createToken';
import { showErrorToast } from '../components/ToastMessage';

const handleLogin = async (email, password, deviceName) => {
    try {
        await createToken(email, password, deviceName)
            .then(([statusCode, data]) => {
                if (statusCode === 200 && data.user) {
                    login(data.user, data.token);
                } else if (statusCode == 422) {
                    showErrorToast(data.errors.email[0]);
                }
            }).catch(error => {
                console.log(error);
                showErrorToast("Login Fail.");
            });
    } catch (error) {
        console.log(error);
        showErrorToast("Login Fail.");
    }
}

export default handleLogin;