import { expect, test } from "@playwright/test";
import { StatusesListPage } from "../pages/StatusesListPage";
import { CreateEditStatusPage } from "../pages/CreateEditStatusPage";

test.describe("delete statuses", () => {
  test("should delete one status", async ({ page }) => {
    const statusesListPage = new StatusesListPage(page);
    const editPage = new CreateEditStatusPage(page);

    await statusesListPage.goto();
    await expect(statusesListPage.heading).toBeVisible();

    const nameCell = statusesListPage.getTableCell(0, 2);
    const name = await nameCell.textContent();

    await nameCell.click();
    await expect(editPage.heading).toContainText(name);
    await editPage.deleteStatus();
    await expect(statusesListPage.getRowByName(name)).not.toBeVisible();
  });

  test("should delete multiple statuses", async ({ page }) => {
    const statusesListPage = new StatusesListPage(page);

    await statusesListPage.goto();
    await expect(statusesListPage.heading).toBeVisible();

    const firstName = await statusesListPage.getTableCell(0, 2).textContent();
    const secondName = await statusesListPage.getTableCell(1, 2).textContent();

    await statusesListPage.getRowByName(firstName).getByRole("checkbox").check();
    await statusesListPage.getRowByName(secondName).getByRole("checkbox").check();

    await statusesListPage.deleteSelected();
    await expect(statusesListPage.getRowByName(firstName)).not.toBeVisible();
    await expect(statusesListPage.getRowByName(firstName)).not.toBeVisible();
  });

  test("should mass delete statuses", async ({ page }) => {
    const statusesListPage = new StatusesListPage(page);
    await statusesListPage.goto();
    await expect(statusesListPage.heading).toBeVisible();

    await statusesListPage.selectAll();
    await statusesListPage.deleteSelected();

    await expect(statusesListPage.emptyText).toBeVisible();
  });
});
