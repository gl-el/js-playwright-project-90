import { expect, test } from "@playwright/test";
import { StatusesListPage } from "@pages/StatusesListPage";
import { CreateEditStatusPage } from "@pages/CreateEditStatusPage";
import { NEW_STATUS } from "tests/testData";
import { Menu } from "tests/enums";

test("should create a new status", async ({ page }) => {
  const statusesListPage = new StatusesListPage(page);
  const createPage = new CreateEditStatusPage(page);

  await statusesListPage.goto();
  await statusesListPage.clickCreateBtn();

  await createPage.saveStatus(NEW_STATUS);
  await expect(createPage.heading).toContainText(NEW_STATUS.name);
  await createPage.sidebar.clickMenu(Menu.STATUSES);

  await expect(statusesListPage.getRowByName(NEW_STATUS.name)).toBeVisible();
});
