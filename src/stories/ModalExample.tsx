import { useActionDialogRef, useActionDialogs } from 'react-mui-action-dialog';

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
