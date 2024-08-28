import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox } from '@kunai-consulting/qwik-components';
export default component$(() => {
  const bindChecked = useSignal(false);
  return (
    <Checkbox.Root
      bindChecked={bindChecked}
      id="test"
      class="flex items-center gap-3 border-2 border-black p-2"
    >
      <Checkbox.Indicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
        ✅
      </Checkbox.Indicator>
      I have read the README
    </Checkbox.Root>
  );
});

//     <div class="flex gap-8">
//       <div class="flex flex-col gap-3">
//         <Checkbox.TwoState
//           bind:checked={isChecked}
//           id="test"
//           class="flex items-center gap-3 border-2 border-black p-2 "
//         >
//           <Checkbox.Indicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
//             ✅
//           </Checkbox.Indicator>
//           Toggle Value
//         </Checkbox.TwoState>
//       </div>
//     </div>
