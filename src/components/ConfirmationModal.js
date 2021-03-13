import {
    createMachine,
    state,
    transition,
    interpret,
    invoke,
    reduce
} from 'robot3';

// const deleteSomething = async () => {
//     // pretend to delete something
//     return new Promise((resolve) => {
//       console.log("Beginning deletion...");
//       setTimeout(() => {
//         console.log("Done deleting");
//         resolve();
//       }, 1000);
//     });
//   };

const ConfirmationModal = createMachine({
  initial: state(
    transition(
        'begin',
        'confirming',
        reduce((context, event) => {
            return {
              ...context,
              onCommit: event.onCommit
            };
          })
    )
  ),
  confirming: state(
    transition('confirm', 'loading'),
    transition('cancel', 'initial')
  ),
  loading: invoke(
    (context, event) => context.onCommit(context, event),
    transition('done', 'initial'),
    transition('error', 'confirming',
      reduce((context, event) => {
        return {
          ...context,
          error: event.error
        }
      })
    )
  )
});

export { ConfirmationModal };