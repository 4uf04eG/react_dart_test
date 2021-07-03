import {User} from "./UserModel";
import {generate, verify} from "password-hash";

const Auth = (function () {
    let instance: _Auth;

    return {
        getInstance: function () {
            if (!instance) instance = new _Auth();
            return instance;
        }
    };
})();

class _Auth {
    private static CACHED_USER_KEY = "cashed_user";

    isAuthenticated: boolean;
    currentUser: User | null;

    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    authenticate(login: string, password: string) {
        const key = "U" + login;
        const saved = localStorage.getItem(key);

        if (saved != null) {
            const user: User = JSON.parse(saved);

            if (verify(password, user.password)) {
                this.currentUser = user;
                localStorage.setItem(_Auth.CACHED_USER_KEY, key);
                this.isAuthenticated = true;
            }
        } else {
            this.currentUser = null;
            localStorage.setItem(_Auth.CACHED_USER_KEY, "");
            this.isAuthenticated = false;
        }

        return this.isAuthenticated;
    }

    register(user: User) {
        const key = "U" + user.login;
        const password = user.password;

        if (localStorage.getItem(key) != null) {
            return false;
        }

        user.password = this.hashPassword(password);
        localStorage.setItem(key, JSON.stringify(user));
        this.authenticate(user.login, password);
        return true;
    }

    signOut() {
        this.currentUser = null;
        localStorage.setItem(_Auth.CACHED_USER_KEY, "");
        this.isAuthenticated = false;
    }

    updateUser(user: User, oldUser?: User) {
        oldUser = oldUser || this.currentUser!
        const oldKey = "U" + oldUser.login;
        const newKey = "U" + user.login;

        if (oldKey !== newKey && localStorage.getItem(newKey) != null) return false;

        localStorage.removeItem(oldKey);
        localStorage.setItem(newKey, JSON.stringify(user));
        localStorage.setItem(_Auth.CACHED_USER_KEY, newKey);

        this.init();
        return true;
    }

    addUser(user: User) {
        localStorage.setItem("U" + user.login, JSON.stringify(user));
    }

    deleteUser(login: string) {
        localStorage.removeItem("U" + login);
    }

    isPasswordMatch(password: string) {
        return verify(password, this.currentUser?.password ?? "")
    }

    hashPassword(password: string) {
        return generate(password)
    }

    getAllUsers() {
        if (this.currentUser?.isAdmin ?? false) {
            let users = []

            for (const i in localStorage) {
                if (localStorage.hasOwnProperty(i) && i.match('^U.*$')) {
                    users.push(JSON.parse(localStorage.getItem(i)!));
                }
            }

            return users;
        }

        return [];
    }

    private init() {
        const key = localStorage.getItem(_Auth.CACHED_USER_KEY);

        if (key != null && key.length !== 0) {
            const user = localStorage.getItem(key);

            if (user != null) {
                this.currentUser = JSON.parse(user);
                this.isAuthenticated = true;
            }
        }
    }

}

export default Auth