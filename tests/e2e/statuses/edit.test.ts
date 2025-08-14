import { expect, test } from "@playwright/test";
import { StatusesListPage } from "@pages/StatusesListPage.ts";
import { CreateEditStatusPage } from "@pages/CreateEditStatusPage.ts";

test("should edit status", async ({ page }) => {
  const statusesPage = new StatusesListPage(page);
  const editPage = new CreateEditStatusPage(page);

  await statusesPage.goto();
  await expect(statusesPage.heading).toBeVisible();

  const cell = statusesPage.getTableCell(0, 2);
  const name = await cell.textContent();
  await cell.click();
  await editPage.saveStatus({ name: "edited name", slug: "edited-slug" });

  await expect(statusesPage.heading).toBeVisible();

  await expect(statusesPage.getRowByName(name)).toBeHidden();
  await expect(statusesPage.getRowByName("edited name")).toBeVisible();
});
