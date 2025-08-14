import { expect, test } from "@playwright/test";
import { DashboardPage } from "./pages/DashboardPage";
import { UserPage } from "./pages/UserPage";
import { StatusesListPage } from "./pages/StatusesListPage";
import { Menu } from "./enums";

test.describe("navigation", () => {
  test("should navigate to Users page", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UserPage(page);

    await dashboardPage.goto();
    await dashboardPage.waitForLoad();
    await dashboardPage.sidebar.clickMenu(Menu.USERS);

    await expect(usersPage.heading).toBeVisible();
  });
  test("should navigate to Statuses page", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const statusesPage = new StatusesListPage(page);

    await dashboardPage.goto();
    await dashboardPage.waitForLoad();
    await dashboardPage.sidebar.clickMenu(Menu.STATUSES);

    await expect(statusesPage.heading).toBeVisible();
  });
});
