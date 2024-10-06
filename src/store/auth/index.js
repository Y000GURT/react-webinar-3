import StoreModule from "../module";

class AuthState extends StoreModule {
    initState() {
        return {
            user: {
                name: "",
                email: "",
                phone: ''
            },
            token: null,
            isAuth: false,
            errorMessage: ''
        };
    };
    async login(userData) {
        try {
            const response = await fetch("api/v1/users/sign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error.data.issues[0].message);
            }

            this.setState({
                ...this.getState(),
                user: {
                    name: json.result.user.profile.name,
                    email: json.result.user.email,
                    phone: json.result.user.profile.phone,
                },
                token: json.result.token,
                isAuth: true,
                errorMessage: '',
            });

            localStorage.setItem("token", json.result.token);

        } catch (error) {
            this.setState({ ...this.getState(), errorMessage: error.message});
        }
    }
    async autoLogin() {
        const token = localStorage.getItem("token");
        
        if (token) {
            try {
                const response = await fetch("api/v1/users/self?fields=profile(name,phone),email", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Token": token,
                    },
                });
                const json = await response.json();

                if (!response.ok) {
                    throw new Error(json.error.data.issues[0].message);
                }

                this.setState({
                    ...this.getState(),
                    user: {
                        name: json.result.profile.name,
                        email: json.result.email,
                        phone: json.result.profile.phone,
                    },
                    token: token,
                    isAuth: true,
                    errorMessage: '',
                });
            }
            catch (error) {
                alert(error.message)
            }
        }
    }
    async logout() {
        try {
            const response = await fetch("api/v1/users/sign", {
                method: "DELETE",
                headers: {
                    "X-Token": this.getState().token,
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();

            if (!response.ok) { 
                throw new Error(json.error.data.issues[0].message);
            }

            this.setState({
                ...this.initState()
            });

            localStorage.removeItem("token");
        }
        catch (error) {
            alert(error.message)
        }
    }
    clearErrors() {
        this.setState({ ...this.getState(), errorMessage: '' });
    }
}

export default AuthState;