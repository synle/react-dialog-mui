import { useActionDialogRef, useActionDialogs } from 'react-dialog-mui';

export function ModalExample() {
  const { modal } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Query Details',
        message: (
          <>
            <div>
              <strong>Name:</strong> Sample Mocked Query
            </div>
            <div>
              <strong>Status:</strong> Pending
            </div>
            <div>
              <strong>Created Date:</strong> {new Date().toLocaleDateString()}
            </div>
          </>
        ),
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Details</button>
    </>
  );
}

function MyChildComponent() {
  return (
    <>
      <div>Hello world</div>
    </>
  );
}

export function ModalExampleWithChildComponent() {
  const { modal } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Simple Modal',
        message: <MyChildComponent />,
        modalRef: modalRef,
        size: 'sm',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Modal</button>
    </>
  );
}

export function ModalExampleWithManualDismiss() {
  const { modal } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Manual Dismiss Modal',
        message: (
          <>
            <div>
              <button onClick={() => modalRef.current.dismiss()}>
                Manually dismiss this dialog
              </button>
            </div>
          </>
        ),
        modalRef: modalRef,
        size: 'sm',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Modal</button>
    </>
  );
}

export function ModalExampleWithFormSubmit() {
  const { modal } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Login Modal',
        message: (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              modalRef.current.dismiss();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type='text' placeholder='Username' required />
            <input type='password' placeholder='Password' required />
            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
        ),
        modalRef: modalRef,
        size: 'sm',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Modal</button>
    </>
  );
}
