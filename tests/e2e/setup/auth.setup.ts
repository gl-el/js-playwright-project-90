import { expect, test } from "@playwright/test";
import { DashboardPage } from "@pages/DashboardPage";
import { LoginPage } from "@pages/LoginPage";

import { makeLoginData, uniqueSuffix } from "tests/utils/factories.ts";

test("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const login = makeLoginData(uniqueSuffix());

  await loginPage.goto();
  await loginPage.login(login);
  await expect(dashboardPage.heading).toBeVisible();

  await page.context().storageState({ path: "playwright/.auth/admin.json" });
});
