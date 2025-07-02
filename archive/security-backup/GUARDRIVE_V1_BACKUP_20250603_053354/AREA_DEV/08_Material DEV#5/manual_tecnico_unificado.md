iracastReceiverInputDevices_Vtbl {
pub base**: ::windows::core::IInspectable_Vtbl,
pub Keyboard: unsafe extern "system" fn(this: \*mut ::core::ffi::c_void, result**: *mut *mut ::core::ffi::c_void) -> ::windows::core::HRESULT,
pub GameController: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result\_\_: *mut *mut ::core::ffi::c_void) -> ::windows::core::HRESULT,
} #[doc(hidden)] #[repr(transparent)]
pub struct IMiracastReceiverKeyboardDevice(::windows::core::IUnknown);
unsafe impl ::windows::core::Interface for IMiracastReceiverKeyboardDevice {
type Vtable = IMiracastReceiverKeyboardDevice_Vtbl;
}
impl ::core::clone::Clone for IMiracastReceiverKeyboardDevice {
fn clone(&self) -> Self {
Self(self.0.clone())
}
}
unsafe impl ::windows::core::ComInterface for IMiracastReceiverKeyboardDevice {
const IID: ::windows::core::GUID = ::windows::core::GUID::from_u128(0xbeb67272_06c0_54ff_ac96_217464ff2501);
} #[repr(C)] #[doc(hidden)]
pub struct IMiracastReceiverKeyboardDevice_Vtbl {
pub base\_\_: ::windows::core::IInspectable_Vtbl,
pub TransmitInput: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result**: *mut bool) -> ::windows::core::HRESULT,
pub SetTransmitInput: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, value: bool) -> ::windows::core::HRESULT,
pub IsRequestedByTransmitter: unsafe extern "system" fn(this: \*mut ::core::ffi::c_void, result**: *mut bool) -> ::windows::core::HRESULT,
pub IsTransmittingInput: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result**: *mut bool) -> ::windows::core::HRESULT, #[cfg(feature = "Foundation")]
pub Changed: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, handler: \*mut ::core::ffi::c_void, result**: *mut super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
Changed: usize, #[cfg(feature = "Foundation")]
pub RemoveChanged: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, token: super::super::Foundation::EventRegistrationToken) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
RemoveChanged: usize,
} #[doc(hidden)] #[repr(transparent)]
pub struct IMiracastReceiverMediaSourceCreatedEventArgs(::windows::core::IUnknown);
unsafe impl ::windows::core::Interface for IMiracastReceiverMediaSourceCreatedEventArgs {
type Vtable = IMiracastReceiverMediaSourceCreatedEventArgs_Vtbl;
}
impl ::core::clone::Clone for IMiracastReceiverMediaSourceCreatedEventArgs {
fn clone(&self) -> Self {
Self(self.0.clone())
}
}
unsafe impl ::windows::core::ComInterface for IMiracastReceiverMediaSourceCreatedEventArgs {
const IID: ::windows::core::GUID = ::windows::core::GUID::from_u128(0x17cf519e_1246_531d_945a_6b158e39c3aa);
} #[repr(C)] #[doc(hidden)]
pub struct IMiracastReceiverMediaSourceCreatedEventArgs_Vtbl {
pub base**: ::windows::core::IInspectable_Vtbl,
pub Connection: unsafe extern "system" fn(this: \*mut ::core::ffi::c_void, result**: *mut *mut ::core::ffi::c_void) -> ::windows::core::HRESULT, #[cfg(feature = "Media_Core")]
pub MediaSource: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result\_\_: *mut *mut ::core::ffi::c_void) -> ::windows::core::HRESULT, #[cfg(not(feature = "Media_Core"))]
MediaSource: usize,
pub CursorImageChannelSettings: unsafe extern "system" fn(this: *mut ::core::ffi::c_void, result**: *mut *mut ::core::ffi::c_void) -> ::windows::core::HRESULT, #[cfg(feature = "Foundation")]
pub GetDeferral: unsafe extern "system" fn(this: \*mut ::core::ffi::c_void, result**: *mut *mut ::core::ffi::c_void) -> ::windows::core::HRESULT, #[cfg(not(feature = "Foundation"))]
GetDeferral: usize,
} #[doc(hidden)] #[repr(transparent)]
pub struct IMiracastReceiverSession(::windows::core::IUnknown);
unsafe
