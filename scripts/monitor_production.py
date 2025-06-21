y,
            /* [unique][in] */ __RPC__in_opt const PROPVARIANT *pFilterPropVarValue,
            /* [out] */ __RPC__deref_out_opt IEnumUnknown **ppIdentityEnum);
        
        HRESULT ( STDMETHODCALLTYPE *Create )( 
            __RPC__in IIdentityProvider * This,
            /* [in] */ __RPC__in LPCWSTR lpszUserName,
            /* [out] */ __RPC__deref_out_opt IPropertyStore **ppPropertyStore,
            /* [in] */ __RPC__in const PROPVARIANT *pKeywordsToAdd);
        
        HRESULT ( STDMETHODCALLTYPE *Import )( 
            __RPC__in IIdentityProvider * This,
            /* [in] */ __RPC__in_opt IPropertyStore *pPropertyStore);
        
        HRESULT ( STDMETHODCALLTYPE *Delete )( 
            __RPC__in IIdentityProvider * This,
            /* [in] */ __RPC__in LPCWSTR lpszUniqueID,
            /* [in] */ __RPC__in const PROPVARIANT *pKeywordsToDelete);
        
        HRESULT ( STDMETHODCALLTYPE *FindByUniqueID )( 
            __RPC__in IIdentityProvider * This,
            /* [in] */ __RPC__in LPCWSTR lpszUniqueID,
            /* [out] */ __RPC__deref_out_opt IPropertyStore **ppPropertyStore);
        
        HRESULT ( STDMETHODCALLTYPE *GetProviderPropertyStore )( 
            __RPC__in IIdentityProvider * This,
            /* [out] */ __RPC__deref_out_opt IPropertyStore **ppPropertyStore);
        
        HRESULT ( STDMETHODCALLTYPE *Advise )( 
            __RPC__in IIdentityProvider * This,
            /* [in] */ __RPC__in_opt IIdentityAdvise *pIdentityAdvise,
            /* [in] */ DWORD dwIdentityUpdateEvents,
            /* [out] */ __RPC__out DWORD *pdwCookie);
        
        HRESULT ( STDMETHODCALLTYPE *UnAdvise )( 
            __RPC__in IIdentityProvider * This,
            /* [in] */ const DWORD dwCookie);
        
        END_INTERFACE
    } IIdentityProviderVtbl;

    interface IIdentityProvider
    {
        CONST_VTBL struct IIdentityProviderVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define IIdentityProvider_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define IIdentityProvider_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define IIdentityProvider_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define IIdentityProvider_GetIdentityEnum(This,eIdentityType,pFilterkey,pFilterPropVarValue,ppIdentityEnum)	\
    ( (This)->lpVtbl -> GetIdentityEnum(This,eIdentityType,pFilterkey,pFilterPropVarValue,ppIdentityEnum) ) 

#define IIdentityProvider_Create(This,lpszUserName,ppPropertyStore,pKeywordsToAdd)	\
    ( (This)->lpVtbl -> Create(This,lpszUserName,ppPropertyStore,pKeywordsToAdd) ) 

#define IIdentityProvider_Import(This,pPropertyStore)	\
    ( (This)->lpVtbl -> Import(This,pPropertyStore) ) 

#define IIdentityProvider_Delete(This,lpszUniqueID,pKeywordsToDelete)	\
    ( (This)->lpVtbl -> Delete(This,lpszUniqueID,pKeywordsToDelete) ) 

#define IIdentityProvider_FindByUniqueID(This,lpszUniqueID,ppPropertyStore)	\
    ( (This)->lpVtbl -> FindByUniqueID(This,lpszUniqueID,ppPropertyStore) ) 

#define IIdentityProvider_GetProviderPropertyStore(This,ppPropertyStore)	\
    ( (This)->lpVtbl -> GetProviderPropertyStore(This,ppPropertyStore) ) 

#define IIdentityProvider_Advise(This,pIdentityAdvise,dwIdentityUpdateEvents,pdwCookie)	\
    ( (This)->lpVtbl -> Advise(This,pIdentityAdvise,dwIdentityUpdateEvents,pdwCookie) ) 

#define IIdentityProvider_UnAdvise(This,dwCookie)	\
    ( (This)->lpVtbl -> UnAdvise(This,dwCookie) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __IIdentityProvider_INTERFACE_DEFINED__ */


#ifndef __AsyncIIdentityProvider_INTERFACE_DEFINED__
#define __AsyncIIdentityProvider_INTERFACE_DEFINED__

/* interface AsyncIIdentityProvider */
/* [uuid][unique][object] */ 


EXTERN_C const IID IID_AsyncIIdentityProvider;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("c6fc9901-c433-4646-8f48-4e4687aae2a0")
    AsyncIIdentityProvider : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE Begin_GetIdentityEnum( 
            /* [in] */ const IDENTITY_TYPE eIdentityType,
            /* [unique][in] */ __RPC__in_opt const PROPERTYKEY *pFilterkey,
            /* [unique][in] */ __RPC__in_opt const PROPVARIANT *pFilterPropVarValue) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Finish_GetIdentityEnum( 
            /* [out] */ __RPC__deref_out_opt IEnumUnknown **ppIdentityEnum) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Begin_Create( 
            /* [in] */ __RPC__in LPCWSTR lpszUserName,
            /* [in] */ __RPC__in const PROPVARIANT *pKeywordsToAdd) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Finish_Create( 
            /* [out] */ __RPC__deref_out_opt IPropertyStore **ppPropertyStore) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Begin_Import( 
            /* [in] */ __RPC__in_opt IPropertyStore *pPropertyStore) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Finish_Import( void) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Begin_Delete( 
            /* [in] */ __RPC__in LPCWSTR lpszUniqueID,
            /* [in] */ __RPC__in const PROPVARIANT *pKeywordsToDelete) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Finish_Delete( void) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Begin_FindByUniqueID( 
            /* [in] */ __RPC__in LPCWSTR lpszUniqueID) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Finish_FindByUniqueID( 
            /* [out] */ __RPC__deref_out_opt IPropertyStore **ppPropertyStore) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Begin_GetProviderPropertyStore( void) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Finish_GetProviderPropertyStore( 
            /* [out] */ __RPC__deref_out_opt IPropertyStore **ppPropertyStore) = 0;
        
        virtual HRESULT STDMETHODCALLTYPE Begin_Advise( 
            /* [in] */ __RPC__in_opt IIdentityAdvise *pIdentityAdvise,
            /* [in] */ DWORD dwIdentityUpdateEvents