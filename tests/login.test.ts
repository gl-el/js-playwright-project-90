import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

test.describe("authorization", () => {
  test("should login with any credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login("testuser", "password123");

    await dashboardPage.isDashboardVisible();
  });

  test("should logout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login("testuser", "password123");

    await dashboardPage.isDashboardVisible();
    await dashboardPage.logout();

    await loginPage.isVisible();
  });
});
