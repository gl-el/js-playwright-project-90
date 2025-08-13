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
});
