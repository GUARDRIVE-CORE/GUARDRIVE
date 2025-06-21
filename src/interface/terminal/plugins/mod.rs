pub mod plugin_protocol;
pub mod registry;

pub use plugin_protocol::{PluginProtocol, PluginMetadata, PluginState, PluginMessage, PluginContext};
pub use registry::{PluginRegistry, PluginRegistryError};

// Re-export plugins específicos conforme forem implementados
// pub mod performance;
// pub mod vireon;
// pub mod memory;

