/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 **************************************************************************/

//module imports
import { log, clearLog, registerClick } from "./src/utils";

import { enqueueFile, renderFile, stitchFiles } from "./src/renderQueue";
import { customInOutPoints, customRotation } from "./src/renderOptions";

import { addProjSeqListeners } from "./src/eventManager";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const uxp = require("uxp") as typeof import("uxp");

const { entrypoints } = uxp;

// Configure entrypoints for use by UXP during different lifecycle events
// for each of the panels or commands defined in the manifest.json file.
entrypoints.setup({
  panels: {
    // for panels and commands.
    // See: https://github.com/adobe/cc-ext-uxp-types/issues/5
    samplepanel: {
      show() {
        // Add custom initialization logic here when the panel is shown.
        log("Ready");
      },
      hide() {
        // Add custom cleanup logic here when the panel is hidden.
      },
      menuItems: [
        {
          id: "open-project",
          label: "Open Project...",
          enabled: true,
          checked: false,
        },
        {
          id: "submenu1",
          label: "Example Submenu",
          enabled: true,
          checked: false,
          submenu: [
            {
              id: "submenu-item1",
              label: "Submenu Item 1",
              enabled: true,
              checked: false,
            },
            {
              id: "submenu-item2",
              label: "Submenu Item 2",
              enabled: false,
              checked: false,
            },
          ],
        },
        { id: "separator", label: "-" },
        {
          id: "reload",
          label: "Reload Panel",
          enabled: true,
          checked: false,
        },
        //@ts-ignore Shorthand for a separator menu item.
        "-",
        {
          id: "toggle-checked",
          label: "Toggle Checked",
          enabled: true,
          checked: false,
        },
      ],
      /** @this {UxpPanelInfo} */
      invokeMenu(id: string) {
        switch (id) {
          case "reload":
            window.location.reload();
            break;

          case "toggle-checked":
            // "this" refers to the (UxpPanelInfo) panel itself, allowing
            // access the panel's menu items and other properties.
            //@ts-ignore
            this.menuItems.getItem(id).checked =
              //@ts-ignore
              !this.menuItems.getItem(id).checked;
            break;

          case "submenu-item1":
            log("Submenu item 1 clicked");
            break;

          case "submenu-item2":
            log("Submenu item 2 clicked");
            break;

          default:
            log(`Unknown menu item invoked: ${id}`, "red");
            break;
        }
      },
    },
  },
});

window.addEventListener("load", async () => {
  // RenderQueue
  registerClick("render-file", renderFile);
  registerClick("enqueue-file", enqueueFile);
  registerClick("stitch-files", stitchFiles);

  // RenderOptions
  registerClick("custom-in-out-points", customInOutPoints);
  registerClick("custom-rotation", customRotation);

  document
    .querySelector(".clear-btn")!
    .addEventListener("click", () => clearLog());
  // add encoder event listeners. Details in eventManager.ts

  await addProjSeqListeners();
});

//Helper functions
document
  .querySelector(".clear-btn")!
  .addEventListener("click", () => clearLog());
