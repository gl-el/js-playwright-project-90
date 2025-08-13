import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { USER } from "../testData/user";

test.describe("authorization", () => {
  test("should login", async ({ browser }) => {
    const context = await browser.newContext({ storageState: undefined });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await expect(loginPage.loginInput).toBeVisible();
    await expect(loginPage.passInput).toBeVisible();
    await expect(loginPage.signInBtn).toBeVisible();

    await loginPage.login(USER.username, USER.password);

    await expect(dashboardPage.heading).toBeVisible();
  });

  test("should logout", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const loginPage = new LoginPage(page);

    await dashboardPage.goto();

    await dashboardPage.logout();

    await expect(dashboardPage.heading).not.toBeVisible();

    await expect(loginPage.loginInput).toBeVisible();
    await expect(loginPage.passInput).toBeVisible();
    await expect(loginPage.signInBtn).toBeVisible();
  });
});
