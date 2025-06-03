_BOOL *pbEnabled);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, put_enabled)
        /* [helpstring][propput][id] */ HRESULT ( STDMETHODCALLTYPE *put_enabled )( 
            IWMPPlayer4 * This,
            /* [in] */ VARIANT_BOOL bEnabled);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, get_fullScreen)
        /* [helpstring][propget][id] */ HRESULT ( STDMETHODCALLTYPE *get_fullScreen )( 
            IWMPPlayer4 * This,
            /* [retval][out] */ VARIANT_BOOL *pbFullScreen);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, put_fullScreen)
        /* [helpstring][propput][id] */ HRESULT ( STDMETHODCALLTYPE *put_fullScreen )( 
            IWMPPlayer4 * This,
            VARIANT_BOOL bFullScreen);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, get_enableContextMenu)
        /* [helpstring][propget][id] */ HRESULT ( STDMETHODCALLTYPE *get_enableContextMenu )( 
            IWMPPlayer4 * This,
            /* [retval][out] */ VARIANT_BOOL *pbEnableContextMenu);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, put_enableContextMenu)
        /* [helpstring][propput][id] */ HRESULT ( STDMETHODCALLTYPE *put_enableContextMenu )( 
            IWMPPlayer4 * This,
            VARIANT_BOOL bEnableContextMenu);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, put_uiMode)
        /* [helpstring][propput][id] */ HRESULT ( STDMETHODCALLTYPE *put_uiMode )( 
            IWMPPlayer4 * This,
            /* [in] */ BSTR bstrMode);
        
        DECLSPEC_XFGVIRT(IWMPPlayer4, get_uiMode)
        /* [helpstring][propget][id] */ HRESULT ( STDMETHODCALLTYPE *g