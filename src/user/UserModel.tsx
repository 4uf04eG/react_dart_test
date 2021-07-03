export class User {
    isAdmin: boolean
    name: string
    login: string
    password: string
    country: string
    age: number

    constructor(isAdmin: boolean,
                name: string,
                login: string,
                password: string,
                country: string,
                age: number) {
        this.isAdmin = isAdmin;
        this.name = name;
        this.login = login;
        this.password = password;
        this.country = country;
        this.age = age;
    }

    static clone = (obj: User) => {
        return Object.create(
            Object.getPrototypeOf(obj),
            Object.getOwnPropertyDescriptors(obj)
        );
    }
}