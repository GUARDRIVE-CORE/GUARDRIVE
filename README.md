clickedItemId, 0);
        }

        viewDiagnosticsButtonClick() {
            this.commercialDiagnosticsUtilities.logInfoEvent(
                "CommercialOOBE_ESPProgress_ViewDiagnostics_Started",
                "BootstrapStatus: View diagnostics button selected");

            this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_VIEW_DIAGNOSTICS_BUTTON).then(() => {
                // Save current CXID and navigate to troubleshooting page
                bridge.invoke("CloudExperienceHost.AutoPilot.AutopilotWrapper.GetCurrentNode").then((currentNode) => {
                    return bridge.invoke("CloudExperienceHost.Storage.SharableData.addValue", this.DIAGNOSTICS_PREVIOUS_CXID_NAME, currentNode.cxid);
                }).then(() => {
                    // Store a flag that provides a hint later when resuming the ESP.
                    return bridge.invoke(
                        "CloudExperienceHost.Storage.SharableData.addValue",
                        this.RETURNED_FROM_DIAGNOSTICS_PAGE_FLAG_NAME,
                        this.RETURNED_FROM_DIAGNOSTICS_PAGE_FLAG_VALUE);
                }).then(() => {
                    return this.sessionUtilities.autopilotApis.getOobeSettingsOverrideAsync(EnterpriseDeviceManagement.Service.AutoPilot.AutoPilotOobeSetting.aadAuthUsingDeviceTicket);
                }).then((isUsingDeviceTicket) => {
                    if (isUsingDeviceTicket) {
                        // Configure to capture TPM logs as well since device authentication requires TPM.
                        return bridge.invoke("CloudExperienceHost.Storage.SharableData.addValue", this.DIAGNOSTICS_LOGS_EXPORT_AREA_NAME, this.DIAGNOSTICS_LOGS_EXPORT_AREA_WITH_TPM_VALUE);
                    }

                    return bridge.invoke("CloudExperienceHost.Storage.SharableData.addValue", this.DIAGNOSTICS_LOGS_EXPORT_AREA_NAME, this.DIAGNOSTICS_LOGS_EXPORT_AREA_VALUE);
                }).then(() => {
                    // Don't clear reboot resumption even though this is navigating away from the ESP.  A reboot
                    // should return the device to the ESP, even if it happens on the diagnostics page.

                    this.autopilotLogger.logAutopilotTelemetryAsync(
                        "DiagnosticAnalysisFramework",
                        "AutopilotESPPage",
                        "PageLaunchedByButton",
                        "Success",
                        0);

                    return bridge.fireEvent(CloudExperienceHost.Events.done, this.PAGE_TRANSITION_DIAGNOSTICS_PAGE);
                }, (e) => {
                    let errorCode = e.number ? e.number : this.E_DIAGNOSTIC_ANALYSIS_FRAMEWORK_GENERIC_ERROR;

                    this.autopilotLogger.logAutopilotTelemetryAsync(
                        "DiagnosticAnalysisFramework",
                        "AutopilotESPPage",
                        "PageLaunchedByButton",
                        "Failure",
                        errorCode);
                });
            });
        }

        continueAnywayButtonClick() {
            this.commercialDiagnosticsUtilities.logInfoEvent(
                "CommercialOOBE_ESPProgress_ContinueAnyway_Started",
                "BootstrapStatus: Continue button selected");

            this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_CONTINUE_ANYWAY_BUTTON).then(() => {
                try {
                    // Update category states for continue anyway.
                    for (let i = 0; i < this.categoryUiContainers.length; i++) {
                        this.categoryUiContainers[i].prepareForContinueAnywayAsync();
                    }

                    this.sessionUtilities.enrollmentApis.setWasContinuedAnyway(this.sessionUtilities.runningInOobe());
                } catch (e) {
                    this.commercialDiagnosticsUtilities.logExceptionEvent(
                        "CommercialOOBE_ESPProgress_ContinueAnyway_Failed",
                        "BootstrapStatus: setWasContinuedAnyway failed",
                        e);
                }

                this.handleFullyExitingEsp();

                return this.transitionToSuccessPageAsync(CloudExperienceHost.Events.done, this.PAGE_TRANSITION_POST_ESP_SUCCESS_PAGE);
            });
        }

        tryAgainButtonClick() {
            this.commercialDiagnosticsUtilities.logInfoEvent(
                "CommercialOOBE_ESPProgress_TryAgain_Started",
                "BootstrapStatus: Try Again button selected");

            this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_TRY_AGAIN_BUTTON).then(() => {
                try {
                    // Reset all categories' states.
                    for (let i = 0; i < this.categoryUiContainers.length; i++) {
                        this.categoryUiContainers[i].resetForTryAgainAsync();
                    }

                    let mdmProgressMode = this.sessionUtilities.getTransientState(this.sessionUtilities.STATE_NAME_GLOBAL_MDM_PROGRESS_MODE);

                    this.sessionUtilities.enrollmentApis.resetProgressTimeout(mdmProgressMode);

                    // Hide all the buttons and hyperlinks at the bottom.
                    this.buttonVisibility(0);
                    this.hyperlinkVisibility(0);
                    this.errorMessage("");
                    this.infoMessage("");

                    this.showContinueAnywayHyperlinkEnabled(false);
                    this.showSignOutHyperlinkEnabled(false);
                    this.showDiagnosticsHyperlinkEnabled(false);

                    if (this.isLiteWhitePersonality()) {
                        this.errorOccurred(false);
                        this.subheaderText(this.resourceStrings["BootstrapPageRebootWarning"]);
                    }

                    // There are no per-category click handlers for the try again button.  In this case,
                    // all categories are rerun.
                    this.runAllCategories(true);
                } catch (e) {
                    this.commercialDiagnosticsUtilities.logExceptionEvent(
                        "CommercialOOBE_ESPProgress_TryAgain_Failed",
                        "BootstrapStatus: Try again failed",
                        e);
                }
            });
        }

        resetDeviceButtonClick() {
            this.commercialDiagnosticsUtilities.logInfoEvent(
                "CommercialOOBE_ESPProgress_DeviceResetInitiation_Started",
                "BootstrapStatus: Reset button selected");

            this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_RESET_BUTTON).then(() => {
                // Disable button so it can't be pressed repeatedly
                this.isResetButtonDisabled(true);

                let pluginManager = new CloudExperienceHostAPI.Provisioning.PluginManager();
                pluginManager.initiateSystemResetAsync().then(() => {
                    this.commercialDiagnosticsUtilities.logInfoEvent(
                        "CommercialOOBE_ESPProgress_DeviceResetInitiation_Succeeded",
                        "BootstrapStatus: Device reset initiated successfully");
                },
                    (e) => {
                        // Error happened, re-enable the button
                        this.isResetButtonDisabled(false);
                        this.commercialDiagnosticsUtilities.logExceptionEvent(
                            "CommercialOOBE_ESPProgress_DeviceResetInitiation_Failed",
                            "BootstrapStatus: Device reset initiation failed",
                            e);
                    });
            });
        }

        collectLogsButtonClick() {
            this.commercialDiagnosticsUtilities.logInfoEvent(
                "CommercialOOBE_ESPProgress_CollectLogs_Started",
                "BootstrapStatus: Collect Logs button selected.");

            this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_COLLECT_LOGS_BUTTON).then(() => {
                bridge.invoke("CloudExperienceHost.showFolderPicker").then((folderPath) => {
                    this.sessionUtilities.enrollmentApis.collectLogs(folderPath).then(() => {
                    },
                        (e) => {
                            this.commercialDiagnosticsUtilities.logExceptionEvent(
                                "CommercialOOBE_ESPProgress_CollectLogs_Failed",
                                "BootstrapStatus: collectLogs failed",
                                e);
                        });
                }, (e) => {
                    this.commercialDiagnosticsUtilities.logExceptionEvent(
                        "CommercialOOBE_ESPProgress_ShowFolderPicker_Failed",
                        "BootstrapStatus: showFolderPicker failed",
                        e);
                });
            });
        }

        // Sign out is required for scenarios where user is expected to be admin, but due to a race condition
        // at initial login adding user to the administrators group, the user must log out and log back in for
        // admin group membership to take affect.
        signOutButtonClick() {
            this.commercialDiagnosticsUtilities.logInfoEvent(
                "CommercialOOBE_ESPProgress_SignOut_Started",
                "BootstrapStatus: Sign out button selected");

            this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_SIGN_OUT_BUTTON).then(() => {
                // Disable button so it can't be pressed repeatedly
                this.isSignOutButtonDisabled(true);

                // Handle if signing out to continue on failure/timeout
                try {
                    if (!this.provisioningCompleted) {
                        this.commercialDiagnosticsUtilities.logInfoEvent(
                            "CommercialOOBE_ESPProgress_SignOutAndWasContinuedAnyway_Started",
                            "BootstrapStatus: Setting WasContinuedAnyway on sign out");
                        this.sessionUtilities.enrollmentApis.setWasContinuedAnyway(this.sessionUtilities.runningInOobe());
                        this.runAllRegisteredClickHandlersAsync(this.sessionUtilities.CLICKABLE_ITEM_ID_CONTINUE_ANYWAY_BUTTON);
                    }
                } catch (e) {
                    this.commercialDiagnosticsUtilities.logExceptionEvent(
                        "CommercialOOBE_ESPProgress_SignOutAndWasContinuedAnyway_Failed",
                        "BootstrapStatus: setWasContinuedAnyway failed",
                        e);
                }

                this.handleFullyExitingEsp();

                // Log out the interactive user
                const windowsSessionHelper = new ModernDeployment.Autopilot.Core.AutopilotWindowsSessionHelpers();
                windowsSessionHelper.logoffInteractiveUserAsync().then(() => {
                    return this.transitionToSuccessPageAsync(CloudExperienceHost.Events.done, this.PAGE_TRANSITION_POST_ESP_SUCCESS_PAGE);
                }, (e) => {
                    this.commercialDiagnosticsUtilities.logExceptionEvent(
                        "CommercialOOBE_ESPProgress_SignOut_Failed",
                        "BootstrapStatus: signOutButton failed",
                        e);

                    // If the sign out button fails for any reason, exit the ESP so the user isn't blocked/stuck.
                    return this.transitionToSuccessPageAsync(CloudExperienceHost.Events.done, this.PAGE_TRANSITION_POST_ESP_SUCCESS_PAGE);
                });
            });
        }

        displayErrorAsync() {
            // Update post OOBE categories' statuses, which don't get updated automatically if we failed in OOBE
            if (this.firstPostOobeCategoryIndex !== -1) {
                for (let i = this.firstPostOobeCategoryIndex; i < this.categoryUiContainers.length; i++) {
                    this.categoryUiContainers[i].showPreviousStepFailedS