<?xml version="1.0" encoding="utf-8"?>
<PowerShellMetadata xmlns="http://schemas.microsoft.com/cmdlets-over-objects/2009/11">
    <Class ClassName="ROOT/Microsoft/Windows/SMB/MSFT_SmbServerConfiguration">
        <Version>1.0</Version>
        
        <DefaultNoun>SmbServerConfiguration</DefaultNoun>
        <StaticCmdlets>
            <!--

            //
            // Get-SmbServer
            //

            -->
            <Cmdlet>
                <CmdletMetadata Verb="Get" ConfirmImpact="Medium" HelpUri="http://go.microsoft.com/fwlink/?LinkID=241950" Aliases="gsmbsc"/>
                <Method MethodName="GetConfiguration">
                    <ReturnValue>
                        <Type PSType="uint32" />
                        <CmdletOutputMetadata>
                            <ErrorCode />
                        </CmdletOutputMetadata>
                    </ReturnValue>
                    <Parameters>
                        <Parameter ParameterName="Output">
                            <Type PSType="Microsoft.Management.Infrastructure.CimInstance" />
                            <CmdletOutputMetadata />
                        </Parameter>
                    </Parameters>
                </Method>
            </Cmdlet>


            <!--

            //
            // Reset-SmbServer
            //

            -->
            <Cmdlet>
                <CmdletMetadata Verb="Reset" ConfirmImpact="High" HelpUri="" Aliases="rsmbsc"/>
                <Method MethodName="ResetConfiguration">
                    <ReturnValue>
                        <Type PSType="uint32" />
                        <CmdletOutputMetadata>
                            <ErrorCode />
                        </CmdletOutputMetadata>
                    </ReturnValue>
                    <Parameters>
                        <Parameter ParameterName="Output">
                            <Type PSType="Microsoft.Management.Infrastructure.CimInstance" />
                            <CmdletOutputMetadata />
                        </Parameter>
                        <Parameter ParameterName="All">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AnnounceComment">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AnnounceServer">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AsynchronousCredits">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditClientCertificateAccess">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditClientDoesNotSupportEncryption">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditClientDoesNotSupportSigning">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditInsecureGuestLogon">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditSmb1Access">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>

                        <Parameter ParameterName="AutoShareServer">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AutoShareWorkstation">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="CachedOpenLimit">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="DisableCompression">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="DisableSmbEncryptionOnSecureConnection">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="DurableHandleV2TimeoutInSeconds">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableAuthRateLimiter">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableDirectoryHandleLeasing">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableDownlevelTimewarp">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableLeasing">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableMailslots">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableMultiChannel">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableOplocks">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableSMB2Protocol">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableSMBQUIC">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableStrictNameChecking">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EncryptData">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EncryptionCiphers">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="IrpStackSize">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="KeepAliveTime">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="MaxChannelPerSession">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="MaxMpxCount">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="MaxSessionPerConnection">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="MaxThreadsPerQueue">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="MaxWorkItems">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="NullSessionShares">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="OplockBreakWait">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="PendingClientTimeoutInSeconds">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="RejectUnencryptedAccess">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="RequestCompression">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="RestrictNamedpipeAccessViaQuic">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="ServerHidden">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="Smb2CreditsMax">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="Smb2CreditsMin">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="Smb2DialectMax">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="Smb2DialectMin">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="SmbServerNameHardeningLevel">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="TreatHostAsStableStorage">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="ValidateAliasNotCircular">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="ValidateShareScope">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="ValidateShareScopeNotAliased">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="ValidateTargetName">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="cim:operationOption:Force">
                            <Type PSType="System.Management.Automation.SwitchParameter" />
                            <CmdletParameterMetadata PSName="Force">
                            </CmdletParameterMetadata>
                        </Parameter>
                    </Parameters>
                </Method>
            </Cmdlet>


            <!--

            //
            // Set-SmbServer
            //

            -->

            <Cmdlet>
                <CmdletMetadata Verb="Set" ConfirmImpact="High" HelpUri="http://go.microsoft.com/fwlink/?LinkID=241962" Aliases="ssmbsc"/>
                <Method MethodName="SetConfiguration">
                    <ReturnValue>
                        <Type PSType="uint32" />
                        <CmdletOutputMetadata>
                            <ErrorCode />
                        </CmdletOutputMetadata>
                    </ReturnValue>
                    <Parameters>
                        <Parameter ParameterName="AnnounceComment">
                            <Type PSType="string" />
                            <CmdletParameterMetadata>
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AnnounceServer">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AsynchronousCredits">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditClientCertificateAccess">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditClientDoesNotSupportEncryption">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditClientDoesNotSupportSigning">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditInsecureGuestLogon">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AuditSmb1Access">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AutoDisconnectTimeoutInMinutesV1">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AutoDisconnectTimeoutInSecondsV2">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AutoShareServer">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="AutoShareWorkstation">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="CachedOpenLimit">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableDirectoryHandleLeasing">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="DisableCompression">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="DisableSmbEncryptionOnSecureConnection">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="DurableHandleV2TimeoutInSeconds">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableAuthenticateUserSharing">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableAuthRateLimiter">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableDownlevelTimewarp">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableForcedLogoff">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableLeasing">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableMailslots">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableMultiChannel">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableOplocks">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableSecuritySignature">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableSMB1Protocol">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableSMB2Protocol">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableSMBQUIC">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EnableStrictNameChecking">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EncryptData">
                            <Type PSType="bool" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="EncryptionCiphers">
                            <Type PSType="string" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="InvalidAuthenticationDelayTimeInMs">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="IrpStackSize">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="KeepAliveTime">
                            <Type PSType="Uint32" />
                            <CmdletParameterMetadata>
                                <ValidateNotNull />
                                <ValidateNotNullOrEmpty />
                            </CmdletParameterMetadata>
                        </Parameter>
                        <Parameter ParameterName="MaxChannelPerSession">
                      MZ�       ��  �       @                                     � �	�!�L�!This program cannot be run in DOS mode.

$       2D��v%هv%هv%ه�؆~%ه]J�q%هv%؇!هv%هw%ه�݆%ه�چs%ه�܆y%ه�نw%ه�цp%ه�$�w%ه�&�w%ه�ۆw%هRichv%ه                PE  d� kA�
        � " & �   p      �        P         
   
   
        0    )j  `A                                    �  �   �  �     �                  8   ��  p                           �  @          P�  �                          .text   D�      �                    `fothk       �      �                 `.rdata  �.   �   0   �              @  @.data   �    �      �              @  �.pdata                         @  @.rsrc   �                     @  @.reloc  �                        @  B                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
