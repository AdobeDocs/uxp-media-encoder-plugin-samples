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
 * Queue and Export a media file immediately
 */
export async function renderFile() {
  // Select a preset file
  let presetFile = await getFileForOpening("preset file", ["epr"]);
  if (!presetFile) return false;

  // Select a source media file
  let mediaFile = await getFileForOpening("media file", ["mov"]);
  if (!mediaFile) return false;

  // Select an output file for rendering to
  let outFile = await getFileForSaving("output file", "output.mov", ["mov"]);
  if (!outFile) return false;

  const res = await app.RenderQueue.renderFile(mediaFile, presetFile, outFile);
  log("File Queud Successfully. Render Started Immediately");
  log(JSON.stringify(res));

  return true;
}
