const request = require('supertest');
const { makeApp } = require("../../app");

// with dependency injection, we can pass a mock db to the test
const app = makeApp("mock");

describe("GET /users", () => {
   it("should return a non empty array", async () => {
       // fetch the users from db
       const response = await request(app).get("/users");
       const users  = JSON.parse(response.text);

       expect(users.length).toBeGreaterThan(0);
       expect(response.statusCode).toBe(200);
       expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
   });
});

describe("POST /users", () => {
    it("should create a new user", async () => {
        // create a new user
        const newUser = {
            username: "johndoe",
            name: "John Doe",
            password: "123456",
            role: "member"
        }
        // send the new user to the db
        const response = await request(app).post("/users").send(newUser);
        const { user } = JSON.parse(response.text);

        expect(user).toMatchObject(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});


describe("GET /users?username={{username}}", () => {
    it('should find the user with username in the db and return the user object', async () => {
        const response = await request(app).get("/users?username=admin");
        const user = JSON.parse(response.text);

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        expect(user.username).toEqual(expect.stringContaining("admin"));
    });
    it('should return a 404 error if the user is not found', async () => {
        const response = await request(app).get("/users?username=foobar");

        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});

describe("GET /users?role={{role}}", () => {
    it('should find the users with role in the db and return the users array', async () => {
        const response = await request(app).get("/users?role=admin");
        const users = JSON.parse(response.text);

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        expect(users.length).toBeGreaterThan(0);
    });
    it('should return a 404 error if the users are not found', async () => {
        const response = await request(app).get("/users?role=foobar");

        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});