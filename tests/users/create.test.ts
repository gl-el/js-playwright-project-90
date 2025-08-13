import { expect, test } from "@playwright/test";
import { UserPage } from "../pages/UserPage";
import { CreateEditPage } from "../pages/CreatePage";
import { NEW_USER } from "../testData/newUser";

test("should create a new user", async ({ page }) => {
  const userPage = new UserPage(page);
  const createPage = new CreateEditPage(page);

  await userPage.goto();
  await userPage.clickCreateBtn();

  await createPage.saveUser(NEW_USER);
  await expect(createPage.heading).toContainText(NEW_USER.email);
  await createPage.sidebar.clickMenu("Users");

  await expect(userPage.getRowByUser(NEW_USER)).toBeVisible();
});
