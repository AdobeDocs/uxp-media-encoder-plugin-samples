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
 * Queue a media file for render
 */
export async function enqueueFile() {
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

  // Queue the file
  const res = await app.RenderQueue.enqueueFile(mediaFile, presetFile, outFile);
  log("File Queued Successfully.");
  log(JSON.stringify(res));

  return true;
}

/**
 * Queue and Export a media file immediately
 */
export async function renderFile() {
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

  // Queue and render the file
  const res = await app.RenderQueue.renderFile(mediaFile, presetFile, outFile);
  log("File Queued Successfully. Render Started Immediately");
  log(JSON.stringify(res));

  return true;
}

/**
 * Stitch multiple media source files into one render job
 */
export async function stitchFiles() {
  const pluginDir: string = (
    await uxp.storage.localFileSystem.getEntryWithUrl("plugin:/")
  ).nativePath;

  // Path to EPR Preset File
  let presetFile = path.join(pluginDir, "assets", "HD 1080i 25.epr");

  // Path to multiple media files
  let mediaFileA = path.join(pluginDir, "assets", "Sample Media Clip 6.mp4");
  let mediaFileB = path.join(pluginDir, "assets", "Sample Media Clip 16.mp4");

  // Have the user select an output file for rendering to
  let outFile = await getFileForSaving("output file", "stitched.mpg", ["mpg"]);
  if (!outFile) return false;

  // Queue and render the file
  const res = await app.RenderQueue.stitchFiles(
    [mediaFileA, mediaFileB],
    presetFile,
    outFile,
  );
  log("Stitched Files Queued Successfully");
  log(JSON.stringify(res));

  return true;
}
