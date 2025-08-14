import { expect, test } from "@playwright/test";
import { UserPage } from "@pages/UserPage";
import { CreateEditUserPage } from "@pages/CreateEditUserPage";

test.describe("delete users", () => {
  test("should delete one user", async ({ page }) => {
    const userPage = new UserPage(page);
    const editPage = new CreateEditUserPage(page);

    await userPage.goto();
    await expect(userPage.heading).toBeVisible();

    const emailCell = userPage.getTableCell(0, 2);
    const email = await emailCell.textContent();
    expect(email, "Email must not be null").not.toBeNull();

    await emailCell.click();
    await expect(editPage.heading).toContainText(email as string);
    await editPage.deleteUser();
    await expect(userPage.getRowByEmail(email)).toBeHidden();
  });

  test("should delete multiple users", async ({ page }) => {
    const userPage = new UserPage(page);

    await userPage.goto();
    await expect(userPage.heading).toBeVisible();

    const firstUserEmail = await userPage.getTableCell(0, 2).textContent();
    const secondUserEmail = await userPage.getTableCell(1, 2).textContent();

    await userPage.getRowByEmail(firstUserEmail).getByRole("checkbox").check();
    await userPage.getRowByEmail(secondUserEmail).getByRole("checkbox").check();

    await userPage.deleteSelected();
    await expect(userPage.getRowByEmail(firstUserEmail)).toBeHidden();
    await expect(userPage.getRowByEmail(secondUserEmail)).toBeHidden();
  });

  test("should mass delete users", async ({ page }) => {
    const userPage = new UserPage(page);
    await userPage.goto();
    await expect(userPage.heading).toBeVisible();

    await userPage.selectAll();
    await userPage.deleteSelected();

    await expect(userPage.emptyText).toBeVisible();
  });
});
