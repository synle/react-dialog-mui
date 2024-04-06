"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActionDialogs = exports.ActionDialogsContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ActionDialogs_1 = require("../components/ActionDialogs");
let _actionDialogs = [];
let modalId = Date.now();
//
const TargetContext = (0, react_1.createContext)({
    data: _actionDialogs,
    setData: (_newDialogs) => { },
});
function ActionDialogsContext(props) {
    // State to hold the theme value
    const [data, setData] = (0, react_1.useState)(_actionDialogs);
    // Provide the theme value and toggle function to the children components
    return ((0, jsx_runtime_1.jsxs)(TargetContext.Provider, { value: { data, setData }, children: [props.children, (0, jsx_runtime_1.jsx)(ActionDialogs_1.default, {})] }));
}
exports.ActionDialogsContext = ActionDialogsContext;
function useActionDialogs() {
    const { data, setData } = (0, react_1.useContext)(TargetContext);
    /**
     This is a simple text input used to ask user to enter a free form text.
  
      ```tsx
      // then call it in your component
      function MyComponent() {
        const onSubmit = async () => {
          try {
            const newName = await prompt({
              title: 'Rename Query',
              message: 'New Query Name',
              value: query.name,
              saveLabel: 'Save',
            });
            await connectionQueries.onChangeQuery(query.id, {
              name: newName,
            });
          } catch (err) {}
        };
  
        return <button onClick={onSubmit}>Rename Query?</button>;
      }
      ```
  
     * @param props
     * @returns
     */
    const prompt = (props) => {
        return new Promise((resolve, reject) => {
            _actionDialogs.push(Object.assign({ key: `modal.${modalId++}`, type: 'prompt', onSubmit: (yesSelected, newValue) => {
                    yesSelected ? resolve(newValue) : reject();
                } }, props));
            _invalidateQueries();
        });
    };
    /**
     This is a yes/no confimation.
  
      ```tsx
      // then call it in your component
      function MyComponent() {
        const onSubmit = async () => {
          try {
            await confirm(`Do you want to delete this query?`);
  
            // when user selects yes
          } catch (err) {
            // when user selects no
          }
        };
  
        return <button onClick={onSubmit}>Delete Query?</button>;
      }
      ```
     * @param message
     * @param yesLabel
     * @returns
     */
    const confirm = (message, yesLabel) => {
        return new Promise((resolve, reject) => {
            _actionDialogs.push({
                key: `modal.${modalId++}`,
                type: 'confirm',
                message,
                yesLabel,
                onSubmit: (yesSelected) => {
                    yesSelected ? resolve() : reject();
                },
            });
            _invalidateQueries();
        });
    };
    const choice = (title, message, options, required) => {
        return new Promise((resolve, reject) => {
            _actionDialogs.push({
                key: `modal.${modalId++}`,
                type: 'choice',
                title,
                message,
                options,
                onSubmit: (yesSelected, newValue) => {
                    yesSelected && newValue ? resolve(newValue) : reject();
                },
                required,
            });
            _invalidateQueries();
        });
    };
    /**
     *
     This is to alert a simple message.
  
      ```tsx
      // then call it in your component
      function MyComponent() {
        const onSubmit = async () => {
          try {
            await alert(<>Your alert message...</>);
          } catch (err) {}
        };
  
        return <button onClick={onSubmit}>My Action</button>;
      }
      ```
     * @param message
     * @returns
     */
    const alert = (message) => {
        return new Promise((resolve, reject) => {
            _actionDialogs.push({
                key: `modal.${modalId++}`,
                type: 'alert',
                message,
            });
            _invalidateQueries();
        });
    };
    const modal = (props) => {
        return new Promise((resolve, reject) => {
            _actionDialogs.push(Object.assign({ key: `modal.${modalId++}`, type: 'modal', onSubmit: () => { } }, props));
            _invalidateQueries();
        });
    };
    let dialog;
    try {
        if (data) {
            dialog = data[data.length - 1];
        }
    }
    catch (err) {
        dialog = undefined;
    }
    const dismiss = (modalIdToDismiss) => {
        if (modalIdToDismiss) {
            _actionDialogs = _actionDialogs.filter((modal) => modal.key !== modalIdToDismiss);
        }
        else {
            _actionDialogs.pop();
        }
        _invalidateQueries();
    };
    function _invalidateQueries() {
        _actionDialogs = [..._actionDialogs];
        setData(_actionDialogs);
    }
    return {
        dialogs: data,
        dialog,
        alert,
        prompt,
        confirm,
        choice,
        dismiss,
        modal,
    };
}
exports.useActionDialogs = useActionDialogs;
//# sourceMappingURL=ActionDialogs.js.map