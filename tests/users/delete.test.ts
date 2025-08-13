import { expect, test } from "@playwright/test";
import { UserPage } from "../pages/UserPage";
import { CreateEditPage } from "../pages/CreatePage";

test.describe("delete users", () => {
  test("should delete one user", async ({ page }) => {
    const userPage = new UserPage(page);
    const editPage = new CreateEditPage(page);

    await userPage.goto();
    await expect(userPage.heading).toBeVisible();

    const emailCell = userPage.getTableCell(0, 2);
    const email = await emailCell.textContent();

    await emailCell.click();
    await expect(editPage.heading).toContainText(email);
    await editPage.deleteUser();
    await expect(userPage.getRowByEmail(email)).not.toBeVisible();
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
    await expect(userPage.getRowByEmail(firstUserEmail)).not.toBeVisible();
    await expect(userPage.getRowByEmail(secondUserEmail)).not.toBeVisible();
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
