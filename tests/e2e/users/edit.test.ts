import { expect, test } from "@playwright/test";
import { UserPage } from "@pages/UserPage";
import { CreateEditUserPage } from "@pages/CreateEditUserPage";

test("should edit user", async ({ page }) => {
  const userPage = new UserPage(page);
  const editPage = new CreateEditUserPage(page);

  await userPage.goto();
  await expect(userPage.heading).toBeVisible();

  const emailCell = userPage.getTableCell(0, 2);
  const email = await emailCell.textContent();
  await emailCell.click();
  await editPage.editEmail("edited@example.com");

  await expect(userPage.heading).toBeVisible();

  await expect(userPage.getRowByEmail(email)).toBeHidden();
  await expect(userPage.getRowByEmail("edited@example.com")).toBeVisible();
});
