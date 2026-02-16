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

it("AlertExample should render the component", async () => {
  const component = render(
    <ActionDialogsContext>
      <AlertExample />
    </ActionDialogsContext>,
  );
  const button = component.container.querySelector("button");
  expect(button?.innerHTML).toMatchInlineSnapshot(`"My Action"`);

  // open modal and test content
  fireEvent.click(button);
  expect(
    component.container.querySelector(".MuiDialogTitle-root")?.textContent,
  ).toMatchInlineSnapshot(`"Query Result"`);
  expect(
    component.container.querySelector(".MuiDialogContent-root")?.textContent,
  ).toMatchInlineSnapshot(
    `"The query has successfully executed, yielding 200 records in 15 seconds."`,
  );
  expect(
    component.container.querySelector(".MuiDialogActions-root")?.textContent,
  ).toMatchInlineSnapshot(`"Acknowledge"`);
});
