import { test, expect, type Page } from "@playwright/test";
import { descriptors } from "../utils/entityDescriptors.ts";
import { uniqueSuffix } from "../utils/factories.ts";

for (const descriptor of descriptors) {
  test.describe(`${descriptor.key} - common flows`, () => {
    test(`create single ${descriptor.key}`, async ({ page }: { page: Page }) => {
      const listPage = new descriptor.listPageClass(page);

      await listPage.goto();
      await listPage.clickCreateBtn();

      const createdName = await descriptor.createEdit(page, uniqueSuffix());
      await expect(listPage.getRowByName(createdName)).toBeVisible();
    });

    test(`edit single ${descriptor.key}`, async ({ page }: { page: Page }) => {
      const listPage = new descriptor.listPageClass(page);
      const editPage = new descriptor.editPageClass(page);

      await listPage.goto();

      const cell = listPage.getTableCell(0, 2);
      const oldValue = await cell.textContent();
      expect(oldValue, "Cell value must not be null").not.toBeNull();

      await cell.click();
      await expect(editPage.heading).toContainText(oldValue as string);

      const newValue = await descriptor.createEdit(page, uniqueSuffix(), false);

      await expect(listPage.getRowByName(oldValue)).toBeHidden();
      await expect(listPage.getRowByName(newValue)).toBeVisible();
    });

    test(`delete single ${descriptor.key}`, async ({ page }: { page: Page }) => {
      const listPage = new descriptor.listPageClass(page);
      const editPage = new descriptor.editPageClass(page);

      await listPage.goto();

      const nameCell = listPage.getTableCell(0, 2);
      const name = await nameCell.textContent();
      expect(name, "Name must not be null").not.toBeNull();

      await nameCell.click();
      await expect(editPage.heading).toContainText(name as string);
      await editPage.deleteEntity();
      await expect(listPage.getRowByName(name)).toBeHidden();
    });

    test(`delete multiple ${descriptor.key} via checkboxes`, async ({ page }: { page: Page }) => {
      const listPage = new descriptor.listPageClass(page);
      await listPage.goto();

      const first = await listPage.getTableCell(0, 2).textContent();
      const second = await listPage.getTableCell(1, 2).textContent();
      if (!first || !second) throw new Error("Expected at least two rows for multi-delete test");

      await listPage.getCheckboxForRow(first).check();
      await listPage.getCheckboxForRow(second).check();
      await listPage.deleteSelected();

      await expect(listPage.getRowByName(first)).toBeHidden();
      await expect(listPage.getRowByName(second)).toBeHidden();
    });

    test(`mass delete all ${descriptor.key}`, async ({ page }: { page: Page }) => {
      const listPage = new descriptor.listPageClass(page);
      await listPage.goto();

      await listPage.selectAll();
      await listPage.deleteSelected();

      await expect(listPage.emptyText).toBeVisible();
    });
  });
}
