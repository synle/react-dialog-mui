import React from "react";
import { test, describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { ActionDialogsContext } from "react-dialog-mui";
import { AlertExample } from "./AlertExample";
import { ChoiceExample } from "./ChoiceExample";
import { ConfirmExample } from "./ConfirmExample";
import {
  ModalExample,
  ModalExampleWithChildComponent,
  ModalExampleWithFormSubmit,
  ModalExampleWithManualDismiss,
} from "./ModalExample";
import { PromptExample } from "./PromptExample";

// Replace the original Dialog with the mock component
vi.mock("@mui/material", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@mui/material")>();
  return {
    ...mod,
    Dialog: (props) => {
      return <div>{props.children}</div>;
    },
  };
});

it("ConfirmExample should render the component", async () => {
  const component = render(
    <ActionDialogsContext>
      <ConfirmExample />
    </ActionDialogsContext>,
  );
  const button = component.container.querySelector("button");
  expect(button?.innerHTML).toMatchInlineSnapshot(`"Delete Query?"`);

  // open modal and test content
  fireEvent.click(button);
  expect(
    component.container.querySelector(".MuiDialogTitle-root")?.textContent,
  ).toMatchInlineSnapshot(`"Confirmation?"`);
  expect(
    component.container.querySelector(".MuiDialogContent-root")?.textContent,
  ).toMatchInlineSnapshot(`"Do you want to delete this query?"`);
});
