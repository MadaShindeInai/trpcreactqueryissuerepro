/**
 * This is a Next.js page.
 */
import React from "react";
import { trpc } from "../utils/trpc";

function QueryExample() {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const result = trpc.greeting.useQuery({ name: "client" });

  if (!result.data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      {/**
       * The type is defined and can be autocompleted
       * 💡 Tip: Hover over `data` to see the result type
       * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
       * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
       */}
      <p>{result.data.text}</p>
    </div>
  );
}

export default function IndexPage() {
  return (
    <div>
      <h2>Query</h2>
      <QueryExample />
      <h2>Subscription</h2>
    </div>
  );
}
