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
const ppro = require("mediaencoder") as any;

/**
 * Add project and sequence event listeners
 */
export async function addProjSeqListeners() {
  // * Possibly update with AME Events
  // intialize active project and active sequence name, if any
  // const project = await getActiveProject();
  // if (project) {
  //   document.getElementById("active-project-name").innerText = project.name;
  // }
  // add project event listener
  // ppro.EventManager.addGlobalEventListener(
  //   ppro.Constants.ProjectEvent.ACTIVATED,
  //   onProjectActivated,
  //   true // in capture phase
  // );
}
