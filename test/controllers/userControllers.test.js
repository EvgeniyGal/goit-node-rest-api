import { loginUser } from "../../controllers/usersControllers.js";

describe("loginUser", () => {
  it("should return user with token", async () => {
    const user = await loginUser({ email: "a@a.com", password: "a" });
    expect(user).toHaveProperty("token");
  });
});
