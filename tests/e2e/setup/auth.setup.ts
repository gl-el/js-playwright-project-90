import { expect, test } from "@playwright/test";
import { DashboardPage } from "@pages/DashboardPage";
import { LoginPage } from "@pages/LoginPage";
import { USER } from "tests/testData/user";

test("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(USER.username, USER.password);
  await expect(dashboardPage.heading).toBeVisible();

  await page.context().storageState({ path: "playwright/.auth/admin.json" });
});
