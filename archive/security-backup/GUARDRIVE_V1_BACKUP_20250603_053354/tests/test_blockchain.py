    S  AJ        '  D    >#    _Refs  AK        A  M        �  	K M        }  K
 Z      N N M        �  , M        �  , N N Z   �  �   �                    0A!  h   }  �  �  �  
 :�   O     3  Othis    #   O_Refs  O   �   @           {   �     4       � �,   � �0   � �:   � �_   � ��   �   n F                                �`std::codecvt<wchar_t,char,int>::codecvt<wchar_t,char,int>'::`1'::dtor$0  >3   this  EN  (           EN                                    �"  O   ,   >   0   >  
 �   >   �   >  
 �   >   �   >  
 �   >   �   >  
 �  >   �  >  
 ,  �   0  �  
 �  �   �  �  
 �  �   �  �  
 H��(   �       4   @SH��  H�D$ ����H�    H3�H��$   H��H�L$(H�QH�    H�H�    H�L$P�    H�L$0�     C�H�K �    H�C(H�L$P�    �H��H��$   H3��    H��  [�   �   3   �   =   �   G      Q      g      u      �         �   �  I G            �   $   }   �        �std::ctype<wchar_t>::ctype<wchar_t>  >u   this  D(    AI  '     n  AJ        '  D    >#    _Refs  AK        A  M        ,  K	 M        }  f
 Z      N M        z  
K
 Z   |   N N M        3  , M        �  , N N Z   �  �                      0A!  h   z  }  �  ,  3  
 :   O     u  Othis  (  #   O_Refs  O�   @           �   �     4       � �,   � �0   � �:   � �z   � ��   �   X F                                �`std::ctype<wchar_t>::ctype<wchar_t>'::`1'::dtor$0  >u   this  EN  (           EN                                    �"  O ,   S   0   S  
 v   S   z   S  
 �   S   �   S  
 �   S   �   S  
 �  S   �  S  
 @  �   D  �  
 �  �   �  �  
 �  �   �  �  
 H��(   �       M   H�! H��L�A�Q�   �     ? G                      �        �std::fpos<int>::fpos<int>  >   this  AJ          >t    _State  A           >    _Fileposition  AP                                 H!       Othis     t   O_State        O_Fileposition  O �   0              �     $       6  �    5  �   7  �,   �   0   �  
 d   �   h   �  
 �   �   �   �  
 �   �   �   �  
 $  �   (  �  
 H�a H���a H��   �   �   ? G                      �        �std::fpos<int>::fpos<int>  >   this  AJ          >    _Off  AK                                 H!       Othis        O_Off  O �   0              �     $       1  �    0  �   2  �,   �   0   �  
 d   �   h   �  
 �   �   �   �  
 �   �   �   �  
 H�    L�    L�    HcPH�    J�DPH�    HcPH��B�L�   �   
   �      �      �   (   �      �   �   C G            :       9   ?        �std::_Init_wcerr::_Init_wcerr  >8   this  AJ        :  M          3 N M           N                        H!  h           8  Othis  O �   H           :   �     <       $  �    '  �%   (  �0   )  �3   (  �9   )  �,   �   0   �  
 h   �   l   �  
 �   �   �   �  
 H�L$WH��0H�D$ ����H�\$HH��H��3��    ��   H�G(3�H�O �OH�GPH�OH�O8H�GxH�Op�O`H���   H���   ���   H��H���    �H��H�\$HH��0_�!   �   i         �   q  = G            |      q   �        �std::_Locinfo::_Locinfo  >E   this  AJ          AM       ]  D@    >   _Pch  AI       [  AK          M        �  N M        �  N M        C  U N N N M        �  C M        �  C M        C  G N N N M        �  8 M        �  8 M        C  < N N N M        �  & M        �  &		 M        C  	/ N N N Z   �  �   0                    0@! 6 h       
        )  @  C  O  �  �   @   E  Othis  H     O_Pch  O   �   @           |   �     4       D  �   C  �&   D  �b   E  �n   F  ��   �   L F                         ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define IWCWizardCallback_AddRef(This)	\
    ( (This)->lpVtbl -> AddRef(This) ) 

#define IWCWizardCallback_Release(This)	\
    ( (This)->lpVtbl -> Release(This) ) 


#define IWCWizardCallback_AddWizardPage(This,hpage)	\
    ( (This)->lpVtbl -> AddWizardPage(This,hpage) ) 

#define IWCWizardCallback_EnableNext(This,hpage,bEnable)	\
    ( (This)->lpVtbl -> EnableNext(This,hpage,bEnable) ) 

#endif /* COBJMACROS */


#endif 	/* C style interface */




#endif 	/* __IWCWizardCallback_INTERFACE_DEFINED__ */


#ifndef __IWEExtendWizard_INTERFACE_DEFINED__
#define __IWEExtendWizard_INTERFACE_DEFINED__

/* interface IWEExtendWizard */
/* [unique][helpstring][uuid][object] */ 


EXTERN_C const IID IID_IWEExtendWizard;

#if defined(__cplusplus) && !defined(CINTERFACE)
    
    MIDL_INTERFACE("97DEDE63-FC6B-11CF-B5F5-00A0C90AB505")
    IWEExtendWizard : public IUnknown
    {
    public:
        virtual HRESULT STDMETHODCALLTYPE CreateWizardPages( 
            /* [in] */ __RPC__in_opt IUnknown *piData,
            /* [in] */ __RPC__in_opt IWCWizardCallback *piCallback) = 0;
        
    };
    
    
#else 	/* C style interface */

    typedef struct IWEExtendWizardVtbl
    {
        BEGIN_INTERFACE
        
        HRESULT ( STDMETHODCALLTYPE *QueryInterface )( 
            __RPC__in IWEExtendWizard * This,
            /* [in] */ __RPC__in REFIID riid,
            /* [annotation][iid_is][out] */ 
            _COM_Outptr_  void **ppvObject);
        
        ULONG ( STDMETHODCALLTYPE *AddRef )( 
            __RPC__in IWEExtendWizard * This);
        
        ULONG ( STDMETHODCALLTYPE *Release )( 
            __RPC__in IWEExtendWizard * This);
        
        HRESULT ( STDMETHODCALLTYPE *CreateWizardPages )( 
            __RPC__in IWEExtendWizard * This,
            /* [in] */ __RPC__in_opt IUnknown *piData,
            /* [in] */ __RPC__in_opt IWCWizardCallback *piCallback);
        
        END_INTERFACE
    } IWEExtendWizardVtbl;

    interface IWEExtendWizard
    {
        CONST_VTBL struct IWEExtendWizardVtbl *lpVtbl;
    };

    

#ifdef COBJMACROS


#define IWEExtendWizard_QueryInterface(This,riid,ppvObject)	\
    ( (This)->lpVtbl -> QueryInterface(This,riid,ppvObject) ) 

#define IWEExtendWizard_