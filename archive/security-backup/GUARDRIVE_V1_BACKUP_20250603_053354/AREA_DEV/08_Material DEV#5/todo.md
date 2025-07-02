f.0.clone())
}
}
unsafe impl ::windows::core::ComInterface for IMiracastReceiverSession {
const IID: ::windows::core::GUID = ::windows::core::GUID::from_u128(0x1d2bcdb4_ef8b_5209_bfc9_c32116504803);
} #[repr(C)] #[doc(hidden)]
pub struct IMiracastReceiverSession_Vtbl {
pub base**: ::windows::core::IInspectable_Vtbl, #[cfg(feature = "Foundation")]
pub ConnectionCreated: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, handler: *mut ::core::ffi::c_void, result**: *mut super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
ConnectionCreated: usize, #[cfg(feature = "Foundation")]
pub RemoveConnectionCreated: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, token: super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
RemoveConnectionCreated: usize, #[cfg(feature = "Foundation")]
pub MediaSourceCreated: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, handler: *mut ::core::ffi::c_void, result**: *mut super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
MediaSourceCreated: usize, #[cfg(feature = "Foundation")]
pub RemoveMediaSourceCreated: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, token: super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
RemoveMediaSourceCreated: usize, #[cfg(feature = "Foundation")]
pub Disconnected: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, handler: *mut ::core::ffi::c_void, result**: *mut super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
Disconnected: usize, #[cfg(feature = "Foundation")]
pub RemoveDisconnected: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, token: super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
RemoveDisconnected: usize,
pub AllowConnectionTakeover: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result\_\_: *mut bool) -> ::windows::core::HRESULT,
pub SetAllowConnectionTakeover: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, value: bool) -> ::windows::core::HRESULT,
pub MaxSimultaneousConnections: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result\_\_: *mut i32) -> ::windows::core::HRESULT,
pub SetMaxSimultaneousConnections: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, value: i32) -> ::windows::core::HRESULT,
pub Start: unsafe extern "system" fn(this: \*mut ::core::f
