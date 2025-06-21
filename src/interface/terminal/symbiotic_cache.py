)]
    HRESULT MessageWaiting(
            [out, retval] VARIANT_BOOL * pfMessageWaiting
            );

    [propput, id(IDISPADDRESS | 15), helpstring("property DoNotDisturb")]
    HRESULT DoNotDisturb(
            [in] VARIANT_BOOL  fDoNotDisturb
            );

    [propget, id(IDISPADDRESS | 15), helpstring("property DoNotDisturb")]
    HRESULT DoNotDisturb(
            [out, retval] VARIANT_BOOL * pfDoNotDisturb
            );

}

///////////////////////////////////////////////////////
//   ITAddress2
///////////////////////////////////////////////////////

[
    uuid( B0AE5D9B-BE51-46c9-B0F7-DFA8A22A8BC4 ),
    helpstring("TAPI 3.1 ITAddress2 interface"),
    dual
]
interface ITAddress2 : ITAddress
{
    //
    // get the phones that can be used on this address
    // returns a collection/enumeration for scripting and c/c++
    //
    [propget, id(IDISPADDRESS | 16), helpstring("property Phones")]
    HRESULT Phones( 
            [out, retval]  VARIANT * pPhones
            );

    [id(IDISPADDRESS | 17), hidden, helpstring("method EnumeratePhones")]
    HRESULT EnumeratePhones(
            [out, retval] IEnumPhone ** ppEnumPhone
            );

    [id(IDISPADDRESS | 18), helpstring("method GetPhoneFromTerminal")]
    HRESULT GetPhoneFromTerminal(
            [in] ITTerminal * pTerminal,
            [out, retval] ITPhone ** ppPhone
            );

    [propget, id(IDISPADDRESS | 20), helpstring("property PreferredPhones")]
    HRESULT PreferredPhones( 
            [out, retval]  VARIANT * pPhones
            );

    [id(IDISPADDRESS | 21), hidden, helpstring("method EnumeratePreferredPhones")]
    HRESULT EnumeratePreferredPhones(
            [out, retval] IEnumPhone ** ppEnumPhone
            );

    //
    // Filtering events
    //

    [propget, id(IDISPADDRESS | 19), helpstring("method EventFilter")]
    HRESULT EventFilter(
            [in] TAPI_EVENT     TapiEvent,
            [in] long           lSubEvent,
            [out,retval] VARIANT_BOOL*   pEnable
            );

    [propput, id(IDISPADDRESS | 19), helpstring("method EventFilter")]
    HRESULT EventFilter(
            [in] TAPI_EVENT     TapiEvent,
            [in] long           lSubEvent,
            [in] VARIANT_BOOL   bEnable
            );


    //
    // device specific methods
    //

    [id(IDISPADDRESS | 22), hidden, helpstring("method DeviceSpecific")]
    HRESULT DeviceSpecific(
	         [in] ITCallInfo *pCall,
	         [in] BYTE *pParams,
	         [in] DWORD dwSize
            );

    [id(IDISPADDRESS | 23), helpstring("method DeviceSpecificVariant")]
    HRESULT DeviceSpecificVariant(
	         [in] ITCallInfo *pCall,
	         [in] VARIANT varDevSpecificByteArray
            );

    [id(IDISPADDRESS | 24), helpstring("method NegotiateExtVersion")]
    HRESULT NegotiateExtVersion (
	         [in]  long lLowVersion,
	         [in]  long lHighVersion,
	         [out, retval] long *plExtVersion
            );

}

[
    uuid( 8DF232F5-821B-11d1-BB5C-00C04FB6809F ),
    helpstring("TAPI 3.0 ITAddressCapabilities interface"),
    dual
]
interface ITAddressCapabilities : IDispatch
{
    [propget, id(IDISPADDRESSCAPABILITIES | 1), helpstring("property AddressCapability")]
    HRESULT AddressCapability( 
            [in] ADDRESS_CAPABILITY AddressCap, 
            [out, retval] long * plCapability
            );

    [propget, id(IDISPADDRESSCAPABILITIES | 2), helpstring("property AddressCapabilityString")]
    HRESULT AddressCapabilityString(
            [in] ADDRESS_CAPABILITY_STRING AddressCapString,
            [out, retval] BSTR * ppCapabilityString
            );

    [propget, id(IDISPADDRESSCAPABILITIES | 3), helpstring("property CallTreatments")]
    HRESULT CallTreatments( [out, retval] VARIANT * pVariant );

    [id(IDISPADDRESSCAPABILITIES | 4), hidden]
    HRESULT EnumerateCallTreatments( [out, retval] IEnumBstr ** ppEnumCallTreatment );

    [propget, id(IDISPADDRESSCAPABILITIES | 5), helpstring("property CompletionMessages")]
    HRESULT CompletionMessages( [out, retval] VARIANT * pVariant );

    [id(IDISPADDRESSCAPABILITIES | 6), hidden]
    HRESULT EnumerateCompletionMessages( [out, retval] IEnumBstr ** ppEnumCompletionMessage );

    [propget, id(IDISPADDRESSCAPABILITIES | 7), helpstring("property DeviceClasses")]
    HRESULT DeviceClasses( [out, retval] VARIANT * pVariant );

    [id(IDISPADDRESSCAPABILITIES | 8), hidden]
    HRESULT EnumerateDeviceClasses( [out, retval] IEnumBstr ** ppEnumDeviceClass );
}

///////////////////////////////////////////////////////
//   ITPhone
///////////////////////////////////////////////////////

[
    uuid( 09D48DB4-10CC-4388-9DE7-A8465618975A ),
    helpstring("TAPI 3.1 ITPhone interface"),
    dual
]
interface ITPhone : IDispatch
{
    //
    // opens the phone devices
    //
    [id(IDISPPHONE | 1), helpstring("method Open")]
    HRESULT Open(
            [in] PHONE_PRIVILEGE Privilege
            );

    //
    // closes the phone
    //
    [id(IDISPPHONE | 2), helpstring("method Close")]
    HRESULT Close();

    //
    // returns a collection/enumeration of addresses that the phone
    // can be used on
    //
    [propget, id(IDISPPHONE | 3), helpstring("property Addresses")]
    HRESULT Addresses(
        [out, retval] VARIANT * pAddresses
        );

    [id(IDISPPHONE | 4), hidden, helpstring("method EnumerateAddresses")]
    HRESULT EnumerateAddresses(
            [out, retval] IEnumAddress ** ppEnumAddress
            );

    //
    // gets a DWORD (long) capability of the phone, based on the PHONECAPS_LONG
    // passed in.
    //
    [propget, id(IDISPPHONE | 5), helpstring("property PhoneCapsLong")]
    HRESULT PhoneCapsLong(
        [in] PHONECAPS_LONG pclCap,
        [out, retval] long * plCapability
        );

    //
    // gets a string capability/information about the phone, based on the PHONECAPS_STRING
    // passed in.
    //
    [propget, id(IDISPPHONE | 6), helpstring("property PhoneCapsString")]
    HRESULT PhoneCapsString(
        [in] PHONECAPS_STRING pcsCap,
        [out, retval] BSTR * ppCapability
        );

    //
    // gets a collection/enumerations of terminals that are the terminals that
    // are associated with the phone.
    //
    [propget, id(IDISPPHONE | 7), helpstring("property Terminals")]
    HRESULT Terminals(
        [in]          ITAddress * pAddress,
        [out, retval] VARIANT * pTerminals
        );

    [id(IDISPPHONE | 8), hidden, helpstring("method EnumerateTerminals")]
    HRESULT EnumerateTerminals(
        [in]          ITAddress * pAddress,
        [out, retval] IEnumTerminal ** ppEnumTerminal
        );

    //
    // get the button mode
    //
    [propget, id(IDISPPHONE | 9), helpstring("property ButtonMode")]
    HRESULT ButtonMode(
        [in]          long                lButtonID,
        [out, retval] PHONE_BUTTON_MODE * pButtonMode
        );

    //
    // put the button mode
    //
    [propput, id(IDISPPHONE | 9), helpstring("property ButtonMode")]
    HRESULT ButtonMode(
        [in]          long                lButtonID,
        [in]          PHONE_BUTTON_MODE   ButtonMode
        );

    //
    // get the button function
    //
    [propget, id(IDISPPHONE | 10), helpstring("property ButtonFunction")]
    HRESULT ButtonFunction(
        [in]          long                    lButtonID,
        [out, retval] PHONE_BUTTON_FUNCTION * pButtonFunction
        );

    //
    // put the button function
    //
    [propput, id(IDISPPHONE | 10), helpstring("property ButtonFunction")]
    HRESULT ButtonFunction(
            [in] long                  lButtonID, 
            [in] PHONE_BUTTON_FUNCTION ButtonFunction
            );


    //
    // get the button text
    //
    [propget, id(IDISPPHONE | 11), helpstring("property ButtonText")]
    HRESULT ButtonText(
        [in]          long   lButtonID,
        [out, retval] BSTR * ppButtonText
        );

    //
    // set the button text
    //
    [propput, id(IDISPPHONE | 11), helpstring("property ButtonText")]
    HRESULT ButtonText(
        [in]          long   lButtonID,
        [in]          BSTR   bstrButtonText
        );

    //
    // get the button state
    //
    [propget, id(IDISPPHONE | 12), helpstring("property ButtonState")]
    HRESULT ButtonState(
        [in]          long                 lButtonID,
        [out, retval] PHONE_BUTTON_STATE * pButtonState
        );

    //
    // set the current hookswitch state
    //
    [propget, id(IDISPPHONE | 13), helpstring("property HookSwitchState")]
    HRESULT HookSwitchState(
        [in]          PHONE_HOOK_SWITCH_DEVICE  HookSwitchDevice,
        [out, retval] PHONE_HOOK_SWITCH_STATE * pHookSwitchState
        );

    //
    // set the current hookswitch state
    //
    [propput, id(IDISPPHONE | 13), helpstring("property HookSwitchState")]
    HRESULT HookSwitchState(
        [in] PHONE_HOOK_SWITCH_DEVICE HookSwitchDevice,
        [in] PHONE_HOOK_SWITCH_STATE  HookSwitchState
        );

    //
    // set the ring mode for the phone
    //
    [propput, id(IDISPPHONE | 14), helpstring("property RingMode")]
    HRESULT RingMode(
        [in] long lRingMode
        );
    
    //
    // get the ring mode for the phone
    //
    [propget, id(IDISPPHONE | 14), helpstring("property Ri