import React from 'react';
import { ReactNode } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ActionDialogsContext } from 'react-dialog-mui';
import { AlertExample } from './AlertExample';
import { ChoiceExample } from './ChoiceExample';
import { ConfirmExample } from './ConfirmExample';
import {
  ModalExample,
  ModalExampleWithChildComponent,
  ModalExampleWithFormSubmit,
  ModalExampleWithManualDismiss,
} from './ModalExample';
import { PromptExample } from './PromptExample';

describe('AlertExample', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <AlertExample />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"My Action"`,
    );
  });
});

describe('ChoiceExample', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <ChoiceExample />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Switch Session"`,
    );
  });
});

describe('ConfirmExample', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <ConfirmExample />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Delete Query?"`,
    );
  });
});

describe('PromptExample', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <PromptExample />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Rename Query?"`,
    );
  });
});

describe('ModalExample', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <ModalExample />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Show Details"`,
    );
  });
});

describe('ModalExampleWithChildComponent', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <ModalExampleWithChildComponent />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Show Modal"`,
    );
  });
});

describe('ModalExampleWithFormSubmit', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <ModalExampleWithFormSubmit />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Show Modal"`,
    );
  });
});

describe('ModalExampleWithManualDismiss', () => {
  it('should render the component', () => {
    const component = render(
      <ActionDialogsContext>
        <ModalExampleWithManualDismiss />
      </ActionDialogsContext>,
    );
    expect(component.container.querySelectorAll('button').length).toBe(1);
    expect(component.container.querySelector('button')?.innerHTML).toMatchInlineSnapshot(
      `"Show Modal"`,
    );
  });
});
