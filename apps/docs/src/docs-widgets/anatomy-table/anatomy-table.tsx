import { component$ } from "@builder.io/qwik";
import { api } from "~/routes/checkbox/auto-api/api";
import { MainHeading, SubHeading } from "../toc/toc";

export const AnatomyTable = component$(() => {
  return (
    <div class="my-4">
      <SubHeading class="mb-4">Anatomy</SubHeading>
      <div class="rounded-md border-qwik-neutral-900 border">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="border-b border-qwik-neutral-900 bg-qwik-neutral-950">
              <th class="py-4 px-4 text-left font-medium">Part</th>
              <th class="py-4 px-4 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {api.anatomy.map((item) => (
              <tr
                key={item.name}
                class="border-b last-of-type:border-b-0 border-qwik-neutral-900"
              >
                <td class="py-4 px-4 font-mono text-sm">{item.name}</td>
                <td class="py-4 px-4">{item.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
