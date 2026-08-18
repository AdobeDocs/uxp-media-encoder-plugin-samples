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

import { log } from "./utils";

/**
 * Export current active sequence as MEPG2 file
 */
export async function renderFile() {
  // let user select preset file

  let presetFile: string;
  log("Please select a preset file for export");
  // @ts-expect-error - uxp.storage.localFileSystem is not typed correctly
  const presetFileEntry = await uxp.storage.localFileSystem.getFileForOpening({
    types: ["epr"],
  });
  if (presetFileEntry?.isFile && presetFileEntry.nativePath) {
    presetFile = presetFileEntry.nativePath;
  } else {
    log("Selection of preset file failed. Please try again");
    return false;
  }

  // let user select media file
  let mediaFile: string;
  log("Please select a media file for export");
  // @ts-expect-error - uxp.storage.localFileSystem is not typed correctly
  const mediaFileEntry = await uxp.storage.localFileSystem.getFileForOpening({
    types: ["mov"],
  });
  if (mediaFileEntry?.isFile && mediaFileEntry.nativePath) {
    mediaFile = mediaFileEntry.nativePath;
  } else {
    log("Selection of preset file failed. Please try again");
    return false;
  }

  log("Please select folder for export");
  // let user choose dir for export output mpg file into
  let outFile: string;
  // @ts-expect-error - uxp.storage.localFileSystem is not typed correctly
  const outFileEntry = await uxp.storage.localFileSystem.getFileForSaving(
    "output.mov",
    {
      tyes: ["mov"],
    },
  );
  if (outFileEntry?.isFile && outFileEntry.nativePath) {
    outFile = outFileEntry.nativePath;
  } else {
    log("Selection of output file failed. Please try again");
    return false;
  }

  const res = await app.RenderQueue.renderFile(mediaFile, presetFile, outFile);
  console.log(res);
}
