import React, { useEffect } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import {
  ActionDialogsContext,
  useActionDialogs,
  useActionDialogRef,
  _dialogStore,
} from '../components/ActionDialogsContext';

// Mock MUI Dialog to render inline (no portal)
vi.mock('@mui/material', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@mui/material')>();
  return {
    ...mod,
    Dialog: (props: any) => (props.open ? <div data-testid='dialog'>{props.children}</div> : null),
  };
});

afterEach(() => {
  cleanup();
  _dialogStore.setState({ data: [] });
});

// Helper to trigger a dialog from inside the provider
function DialogTrigger({
  onReady,
}: {
  onReady: (hooks: ReturnType<typeof useActionDialogs>) => void;
}) {
  const hooks = useActionDialogs();
  const readyRef = React.useRef(false);
  useEffect(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      onReady(hooks);
    }
  }, []);
  return null;
}

describe('AlertDialog', () => {
  it('should dismiss when close button is clicked', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.alert({ title: 'Test Alert', message: 'Hello' });
    });

    expect(component.container.querySelector('.MuiDialogTitle-root')).not.toBeNull();

    // Close button should dismiss
    const closeBtn = component.container.querySelector('[aria-label="close"]');
    expect(closeBtn).not.toBeNull();
    await act(async () => {
      fireEvent.click(closeBtn!);
    });

    // Dialog should be gone
    expect(component.container.querySelector('[data-testid="dialog"]')).toBeNull();
  });

  it('should resolve when OK is clicked', async () => {
    const onResolved = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.alert({ title: 'Test', message: 'Hello' }).then(onResolved);
    });

    // Find the contained button (OK button)
    const buttons = component.container.querySelectorAll('.MuiDialogActions-root button');
    expect(buttons.length).toBe(1);
    await act(async () => {
      fireEvent.click(buttons[0]);
    });

    expect(onResolved).toHaveBeenCalled();
  });

  it('should use custom yesLabel', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.alert({ title: 'Test', message: 'Hello', yesLabel: 'Got it' });
    });

    const actionButton = component.container.querySelector('.MuiDialogActions-root button');
    expect(actionButton?.textContent).toBe('Got it');
  });
});

describe('ConfirmDialog', () => {
  it('should resolve when Yes is clicked', async () => {
    const onResolved = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.confirm({ title: 'Delete?', message: 'Are you sure?' }).then(onResolved);
    });

    // Confirm should show No and Yes buttons
    const buttons = component.container.querySelectorAll('.MuiDialogActions-root button');
    expect(buttons.length).toBe(2);

    // Click Yes (second button, the variant=contained one)
    const yesButton = component.container.querySelector(
      '.MuiDialogActions-root button.MuiButton-contained',
    );
    await act(async () => {
      fireEvent.click(yesButton!);
    });

    expect(onResolved).toHaveBeenCalled();
  });

  it('should dismiss when No is clicked', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.confirm({ title: 'Delete?', message: 'Are you sure?' }).catch(() => {});
    });

    // Click No (first non-contained button)
    const noButton = component.container.querySelector(
      '.MuiDialogActions-root button:not(.MuiButton-contained)',
    );
    expect(noButton).not.toBeNull();
    await act(async () => {
      fireEvent.click(noButton!);
    });

    expect(component.container.querySelector('[data-testid="dialog"]')).toBeNull();
  });

  it('should use custom yesLabel', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.confirm({ title: 'Delete?', message: 'Sure?', yesLabel: 'Delete' });
    });

    const yesButton = component.container.querySelector(
      '.MuiDialogActions-root button.MuiButton-contained',
    );
    expect(yesButton?.textContent).toBe('Delete');
  });
});

describe('PromptDialog', () => {
  it('should resolve with the input value on submit', async () => {
    const onResolved = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'Name', message: 'Enter name', value: '' }).then(onResolved);
    });

    // Type into the input
    const input = component.container.querySelector('input');
    expect(input).not.toBeNull();
    await act(async () => {
      fireEvent.change(input!, { target: { value: 'New Name' } });
    });

    // Submit the form
    const form = component.container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form!);
    });

    expect(onResolved).toHaveBeenCalledWith('New Name');
  });

  it('should dismiss when close button is clicked', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'Name', message: 'Enter name' }).catch(() => {});
    });

    // Click close button
    const closeBtn = component.container.querySelector('[aria-label="close"]');
    await act(async () => {
      fireEvent.click(closeBtn!);
    });

    expect(component.container.querySelector('[data-testid="dialog"]')).toBeNull();
  });

  it('should show save button with custom label', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'Rename', message: 'New name', saveLabel: 'Rename' });
    });

    const submitBtn = component.container.querySelector(
      '.MuiDialogActions-root button[type="submit"]',
    );
    expect(submitBtn?.textContent).toBe('Rename');
  });

  it('should render multiline TextField when isLongPrompt is true', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'Long', message: 'Enter text', isLongPrompt: true });
    });

    // The textarea should be present for multiline
    const textarea = component.container.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });

  it('should hide save button when readonly', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'View', message: 'Value', value: 'readonly', readonly: true });
    });

    const submitBtn = component.container.querySelector(
      '.MuiDialogActions-root button[type="submit"]',
    );
    expect(submitBtn).toBeNull();
  });

  it('should not submit when required and value is empty', async () => {
    const onResolved = vi.fn();
    const onRejected = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!
        .prompt({ title: 'Name', message: 'Enter', required: true })
        .then(onResolved)
        .catch(onRejected);
    });

    // Try to submit empty form
    const form = component.container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form!);
    });

    // Should not have resolved
    expect(onResolved).not.toHaveBeenCalled();
    // Dialog should still be open
    expect(component.container.querySelector('[data-testid="dialog"]')).not.toBeNull();
  });

  it('should disable save button when input is empty', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'Name', message: 'Enter' });
    });

    const submitBtn = component.container.querySelector(
      '.MuiDialogActions-root button[type="submit"]',
    );
    expect(submitBtn).not.toBeNull();
    expect(submitBtn!.classList.contains('Mui-disabled')).toBe(true);
  });

  it('should trim whitespace from submitted value', async () => {
    const onResolved = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.prompt({ title: 'Name', message: 'Enter' }).then(onResolved);
    });

    const input = component.container.querySelector('input');
    await act(async () => {
      fireEvent.change(input!, { target: { value: '  hello  ' } });
    });

    const form = component.container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form!);
    });

    expect(onResolved).toHaveBeenCalledWith('hello');
  });
});

describe('SingleChoiceDialog', () => {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c', disabled: true },
  ];

  it('should resolve with selected option on Apply', async () => {
    const onResolved = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceSingle({ title: 'Pick', message: 'Choose:', options }).then(onResolved);
    });

    // Click on "Option B" list item
    const listItems = component.container.querySelectorAll('.MuiListItem-root');
    expect(listItems.length).toBe(3);
    await act(async () => {
      fireEvent.click(listItems[1]);
    });

    // Click Apply button
    const applyBtn = component.container.querySelector('button.MuiButton-contained');
    await act(async () => {
      fireEvent.click(applyBtn!);
    });

    expect(onResolved).toHaveBeenCalledWith('b');
  });

  it('should not select a disabled option', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceSingle({ title: 'Pick', message: 'Choose:', options }).catch(() => {});
    });

    // Click on disabled "Option C"
    const listItems = component.container.querySelectorAll('.MuiListItem-root');
    await act(async () => {
      fireEvent.click(listItems[2]);
    });

    // The checkbox for Option C should not be checked
    const checkboxInputs = component.container.querySelectorAll(
      '.MuiListItem-root:nth-child(3) input[type="checkbox"]',
    );
    expect(checkboxInputs.length).toBeGreaterThan(0);
    expect((checkboxInputs[0] as HTMLInputElement).checked).toBe(false);
  });

  it('should show Apply button', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceSingle({ title: 'Pick', message: 'Choose:', options, required: true });
    });

    const applyBtn = component.container.querySelector('button.MuiButton-contained');
    expect(applyBtn).not.toBeNull();
    expect(applyBtn?.textContent).toBe('Apply');
  });

  it('should dismiss when close button is clicked', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceSingle({ title: 'Pick', message: 'Choose:', options }).catch(() => {});
    });

    const closeBtn = component.container.querySelector('[aria-label="close"]');
    await act(async () => {
      fireEvent.click(closeBtn!);
    });

    expect(component.container.querySelector('[data-testid="dialog"]')).toBeNull();
  });

  it('should pre-select initial value', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!
        .choiceSingle({ title: 'Pick', message: 'Choose:', options, value: 'a' })
        .catch(() => {});
    });

    // First checkbox should be checked
    const firstCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(1) input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(firstCheckbox?.checked).toBe(true);
  });
});

describe('MultipleChoiceDialog', () => {
  const options = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3', disabled: true },
  ];

  it('should resolve with selected options on Apply', async () => {
    const onResolved = vi.fn();

    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceMultiple({ title: 'Pick', message: 'Choose:', options }).then(onResolved);
    });

    // Select Item 1 and Item 2
    const listItems = component.container.querySelectorAll('.MuiListItem-root');
    await act(async () => {
      fireEvent.click(listItems[0]);
    });
    await act(async () => {
      fireEvent.click(listItems[1]);
    });

    // Click Apply
    const applyBtn = component.container.querySelector('button.MuiButton-contained');
    await act(async () => {
      fireEvent.click(applyBtn!);
    });

    expect(onResolved).toHaveBeenCalledWith(['1', '2']);
  });

  it('should deselect an already selected option', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceMultiple({ title: 'Pick', message: 'Choose:', options, value: ['1'] });
    });

    // Item 1 should be checked
    let firstCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(1) input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(firstCheckbox?.checked).toBe(true);

    // Click Item 1 to deselect
    const listItems = component.container.querySelectorAll('.MuiListItem-root');
    await act(async () => {
      fireEvent.click(listItems[0]);
    });

    // Item 1 should now be unchecked
    firstCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(1) input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(firstCheckbox?.checked).toBe(false);
  });

  it('should not toggle a disabled option', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceMultiple({ title: 'Pick', message: 'Choose:', options });
    });

    // Click on disabled Item 3
    const listItems = component.container.querySelectorAll('.MuiListItem-root');
    await act(async () => {
      fireEvent.click(listItems[2]);
    });

    const thirdCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(3) input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(thirdCheckbox?.checked).toBe(false);
  });

  it('should pre-select initial values', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.choiceMultiple({ title: 'Pick', message: 'Choose:', options, value: ['1', '2'] });
    });

    const firstCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(1) input[type="checkbox"]',
    ) as HTMLInputElement;
    const secondCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(2) input[type="checkbox"]',
    ) as HTMLInputElement;
    const thirdCheckbox = component.container.querySelector(
      '.MuiListItem-root:nth-child(3) input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(firstCheckbox?.checked).toBe(true);
    expect(secondCheckbox?.checked).toBe(true);
    expect(thirdCheckbox?.checked).toBe(false);
  });
});

describe('ModalDialog', () => {
  it('should render with close button and dismiss on click', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.modal({ title: 'Details', message: <div>Content here</div> });
    });

    expect(component.container.querySelector('.MuiDialogTitle-root')?.textContent).toContain(
      'Details',
    );

    const closeBtn = component.container.querySelector('[aria-label="close"]');
    expect(closeBtn).not.toBeNull();
    await act(async () => {
      fireEvent.click(closeBtn!);
    });

    expect(component.container.querySelector('[data-testid="dialog"]')).toBeNull();
  });

  it('should render without close button when showCloseButton is false', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.modal({
        title: 'No Close',
        message: <div>No close button</div>,
        showCloseButton: false,
      });
    });

    // Title should render
    expect(component.container.querySelector('.MuiDialogTitle-root')?.textContent).toContain(
      'No Close',
    );
    // But no close button
    const closeBtn = component.container.querySelector('[aria-label="close"]');
    expect(closeBtn).toBeNull();
  });

  it('should render message content', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.modal({ title: 'Info', message: <div data-testid='modal-body'>Body text</div> });
    });

    expect(component.container.querySelector('[data-testid="modal-body"]')?.textContent).toBe(
      'Body text',
    );
  });
});

describe('useActionDialogRef', () => {
  it('should allow programmatic dismissal via modalRef', async () => {
    function RefDismissExample() {
      const { modal } = useActionDialogs();
      const modalRef = useActionDialogRef();

      const openModal = async () => {
        try {
          await modal({
            title: 'Ref Modal',
            message: (
              <button data-testid='dismiss-btn' onClick={() => modalRef.current.dismiss()}>
                Dismiss
              </button>
            ),
            modalRef,
          });
        } catch (err) {}
      };

      return (
        <button data-testid='open-btn' onClick={openModal}>
          Open
        </button>
      );
    }

    const component = render(
      <ActionDialogsContext>
        <RefDismissExample />
      </ActionDialogsContext>,
    );

    // Open the modal
    const openBtn = component.container.querySelector('[data-testid="open-btn"]');
    await act(async () => {
      fireEvent.click(openBtn!);
    });

    expect(component.container.querySelector('.MuiDialogTitle-root')?.textContent).toContain(
      'Ref Modal',
    );

    // Dismiss via ref
    const dismissBtn = component.container.querySelector('[data-testid="dismiss-btn"]');
    await act(async () => {
      fireEvent.click(dismissBtn!);
    });

    expect(component.container.querySelector('[data-testid="dialog"]')).toBeNull();
  });
});

describe('Dialog stacking', () => {
  it('should show multiple dialogs when opened sequentially', async () => {
    let hooks: ReturnType<typeof useActionDialogs>;
    const component = render(
      <ActionDialogsContext>
        <DialogTrigger onReady={(h) => (hooks = h)} />
      </ActionDialogsContext>,
    );

    await act(async () => {
      hooks!.alert({ title: 'First', message: 'First dialog' });
    });

    await act(async () => {
      hooks!.alert({ title: 'Second', message: 'Second dialog' });
    });

    // Both dialogs should be rendered (stacked)
    const dialogs = component.container.querySelectorAll('[data-testid="dialog"]');
    expect(dialogs.length).toBe(2);
  });
});
