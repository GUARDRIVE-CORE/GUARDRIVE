"""
GUARDRIVE Configuration Module
Central configuration management for the GUARDRIVE platform
"""

import os
from typing import Optional

from pydantic import Field
from pydantic_settings import BaseSettings


class GuardriveSettings(BaseSettings):
    """Main configuration class for GUARDRIVE platform"""
    
    # Application Settings
    app_name: str = Field(default="GUARDRIVE", description="Application name")
    app_version: str = Field(default="1.0.0", description="Application version")
    debug: bool = Field(default=False, description="Debug mode")
    
    # Server Settings
    host: str = Field(default="0.0.0.0", description="Server host")
    port: int = Field(default=8000, description="Server port")
    workers: int = Field(default=1, description="Number of workers")
    
    # Database Settings
    database_url: str = Field(
        default="sqlite:///./guardrive.db",
        description="Database connection URL"
    )
    
    # Redis Settings
    redis_url: str = Field(
        default="redis://localhost:6379",
        description="Redis connection URL"
    )
    
    # Blockchain Settings
    blockchain_network: str = Field(
        default="ethereum",
        description="Blockchain network"
    )
    web3_provider_url: str = Field(
        default="https://mainnet.infura.io/v3/YOUR_PROJECT_ID",
        description="Web3 provider URL"
    )
    
    # AI/ML Settings
    ai_model_path: str = Field(
        default="./models",
        description="Path to AI models"
    )
    neural_network_config: dict = Field(
        default_factory=lambda: {
            "hidden_layers": [128, 64, 32],
            "activation": "relu",
            "optimizer": "adam",
            "learning_rate": 0.001
        },
        description="Neural network configuration"
    )
    
    # Security Settings
    secret_key: str = Field(
        default="your-secret-key-change-in-production",
        description="Secret key for JWT tokens"
    )
    algorithm: str = Field(default="HS256", description="JWT algorithm")
    access_token_expire_minutes: int = Field(
        default=30,
        description="Access token expiration time in minutes"
    )
    
    # ESG Settings
    esg_scoring_enabled: bool = Field(
        default=True,
        description="Enable ESG scoring"
    )
    esg_blockchain_enabled: bool = Field(
        default=True,
        description="Enable ESG blockchain integration"
    )
    
    # Monitoring Settings
    telemetry_enabled: bool = Field(
        default=True,
        description="Enable telemetry collection"
    )
    metrics_port: int = Field(
        default=9090,
        description="Prometheus metrics port"
    )
    log_level: str = Field(
        default="INFO",
        description="Logging level"
    )
    
    # MCP Settings
    mcp_servers_enabled: bool = Field(
        default=True,
        description="Enable MCP servers"
    )
    mcp_devops_port: int = Field(
        default=3001,
        description="DevOps orchestrator MCP server port"
    )
    mcp_monitor_port: int = Field(
        default=3002,
        description="System monitor MCP server port"
    )
    
    # File Paths
    data_directory: str = Field(
        default="./data",
        description="Data directory path"
    )
    logs_directory: str = Field(
        default="./logs",
        description="Logs directory path"
    )
    cache_directory: str = Field(
        default="./cache",
        description="Cache directory path"
    )
    
    class Config:
        env_file = ".env"
        env_prefix = "GUARDRIVE_"
        case_sensitive = False


# Global configuration instance
settings = GuardriveSettings()


def get_database_url() -> str:
    """Get database URL with proper handling"""
    return settings.database_url


def get_redis_url() -> str:
    """Get Redis URL"""
    return settings.redis_url


def is_debug_mode() -> bool:
    """Check if debug mode is enabled"""
    return settings.debug


def get_ai_config() -> dict:
    """Get AI/ML configuration"""
    return {
        "model_path": settings.ai_model_path,
        "neural_config": settings.neural_network_config
    }


def get_blockchain_config() -> dict:
    """Get blockchain configuration"""
    return {
        "network": settings.blockchain_network,
        "provider_url": settings.web3_provider_url
    }


def get_security_config() -> dict:
    """Get security configuration"""
    return {
        "secret_key": settings.secret_key,
        "algorithm": settings.algorithm,
        "expire_minutes": settings.access_token_expire_minutes
    }


def get_esg_config() -> dict:
    """Get ESG configuration"""
    return {
        "scoring_enabled": settings.esg_scoring_enabled,
        "blockchain_enabled": settings.esg_blockchain_enabled
    }


def get_monitoring_config() -> dict:
    """Get monitoring configuration"""
    return {
        "telemetry_enabled": settings.telemetry_enabled,
        "metrics_port": settings.metrics_port,
        "log_level": settings.log_level
    }


def get_mcp_config() -> dict:
    """Get MCP configuration"""
    return {
        "enabled": settings.mcp_servers_enabled,
        "devops_port": settings.mcp_devops_port,
        "monitor_port": settings.mcp_monitor_port
    }


# Environment-specific configurations
class DevelopmentConfig(GuardriveSettings):
    """Development environment configuration"""
    debug: bool = True
    log_level: str = "DEBUG"
    database_url: str = "sqlite:///./guardrive_dev.db"


class ProductionConfig(GuardriveSettings):
    """Production environment configuration"""
    debug: bool = False
    log_level: str = "WARNING"
    workers: int = 4


class TestingConfig(GuardriveSettings):
    """Testing environment configuration"""
    debug: bool = True
    database_url: str = "sqlite:///./guardrive_test.db"
    telemetry_enabled: bool = False


def get_config_by_env(env: Optional[str] = None) -> GuardriveSettings:
    """Get configuration by environment"""
    env = env or os.getenv("ENVIRONMENT", "development").lower()
    
    config_map = {
        "development": DevelopmentConfig,
        "production": ProductionConfig,
        "testing": TestingConfig
    }
    
    config_class = config_map.get(env, DevelopmentConfig)
    return config_class()


# Export commonly used configurations
__all__ = [
    "settings",
    "GuardriveSettings",
    "get_database_url",
    "get_redis_url",
    "is_debug_mode",
    "get_ai_config",
    "get_blockchain_config",
    "get_security_config",
    "get_esg_config",
    "get_monitoring_config",
    "get_mcp_config",
    "get_config_by_env",
    "DevelopmentConfig",
    "ProductionConfig",
    "TestingConfig"
]

