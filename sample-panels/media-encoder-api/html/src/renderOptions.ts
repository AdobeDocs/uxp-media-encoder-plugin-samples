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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const app = require("mediaencoder") as any;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const uxp = require("uxp") as typeof import("uxp");

import { getFileForOpening, getFileForSaving, log } from "./utils";

/**
 * Queue and Render File with Custom In / Out Points
 */
export async function customInOutPoints() {
  const pluginDir: string = (
    await uxp.storage.localFileSystem.getEntryWithUrl("plugin:/")
  ).nativePath;

  // Path to EPR Preset File
  let presetFile = path.join(pluginDir, "assets", "HD 1080i 25.epr");

  // Path to any source media file. A Premiere project for this example
  let mediaFile = path.join(pluginDir, "assets", "example.prproj");

  // Have the user select an output file for rendering to
  let outFile = await getFileForSaving("output file", "output.mpg", ["mpg"]);
  if (!outFile) return false;

  // Create RenderOptions With Custom In/Out Points
  const renderOptions = app.RenderOptions();
  const startTime = app.TickTime.createWithSeconds(0);
  const endTime = app.TickTime.createWithSeconds(1);
  renderOptions.setCustomInAndOutPoints(startTime, endTime);

  // Queue and render the file
  const res = await app.RenderQueue.renderFile(
    mediaFile,
    presetFile,
    outFile,
    renderOptions,
  );
  log(
    "File Queued Successfully with Custom In / Out Points. Render Started Immediately",
  );
  log(JSON.stringify(res));

  return true;
}
