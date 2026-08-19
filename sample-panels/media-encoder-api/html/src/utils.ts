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
const uxp = require("uxp") as typeof import("uxp");

export const log = (msg: string, color?: string) => {
  const consoleOutput = document.querySelector("#plugin-body");
  if (consoleOutput) {
    consoleOutput.innerHTML += color
      ? `<span style='color:${color}'>${msg}</span><br />`
      : `${msg}<br />`;

    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }
};

export const clearLog = () => {
  const body = document.querySelector("#plugin-body");
  if (body) body.innerHTML = "";
};

export const registerClick = (
  id: string,
  cb: (this: Element, event: Event) => void,
) => {
  document.querySelector(`#${id}`)?.addEventListener("click", cb);
};

export const getFileForOpening = async (title: string, types: string[]) => {
  log(`Please select a ${title} for export`);
  const fileEntry = await uxp.storage.localFileSystem.getFileForOpening({
    types,
  });
  if (fileEntry?.isFile && fileEntry.nativePath) {
    return fileEntry.nativePath as string;
  } else {
    log(`Selection of ${title} failed. Please try again`);
    return false;
  }
};

export const getFileForSaving = async (
  title: string,
  name: string,
  types: string[],
) => {
  log(`Please select a ${title} for export`);
  const fileEntry = await uxp.storage.localFileSystem.getFileForSaving(name, {
    types,
  });
  if (fileEntry?.isFile && fileEntry.nativePath) {
    return fileEntry.nativePath as string;
  } else {
    log(`Selection of ${title} failed. Please try again`);
    return false;
  }
};
