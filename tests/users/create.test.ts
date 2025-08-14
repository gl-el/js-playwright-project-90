import { expect, test } from "@playwright/test";
import { UserPage } from "../pages/UserPage";
import { CreateEditUserPage } from "../pages/CreateEditUserPage";
import { NEW_USER } from "../testData/newUser";
import { Menu } from "../enums";

test("should create a new user", async ({ page }) => {
  const userPage = new UserPage(page);
  const createPage = new CreateEditUserPage(page);

  await userPage.goto();
  await userPage.clickCreateBtn();

  await createPage.saveUser(NEW_USER);
  await expect(createPage.heading).toContainText(NEW_USER.email);
  await createPage.sidebar.clickMenu(Menu.USERS);

  await expect(userPage.getRowByUser(NEW_USER)).toBeVisible();
});
