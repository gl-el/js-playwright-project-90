import { expect, test } from "@playwright/test";
import { NEW_LABEL } from "tests/testData";
import { Menu } from "tests/enums";
import { LabelsListPage } from "@pages/LabelsListPage.ts";
import { CreateEditLabelPage } from "@pages/CreateEditLabelPage.ts";

test("should create a new label", async ({ page }) => {
  const labelsPage = new LabelsListPage(page);
  const createPage = new CreateEditLabelPage(page);

  await labelsPage.goto();
  await labelsPage.clickCreateBtn();

  await createPage.saveLabel(NEW_LABEL);
  await expect(createPage.heading).toContainText(NEW_LABEL);
  await createPage.sidebar.clickMenu(Menu.LABELS);

  await expect(labelsPage.getRowByName(NEW_LABEL)).toBeVisible();
});
