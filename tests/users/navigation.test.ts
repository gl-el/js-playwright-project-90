import { expect, test } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { UserPage } from "../pages/UserPage";

test.describe("navigation", () => {
  test("should navigate to Users page", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UserPage(page);

    await dashboardPage.goto();
    await dashboardPage.waitForLoad();
    await dashboardPage.sidebar.clickMenu("Users");

    await expect(usersPage.heading).toBeVisible();
  });
});
