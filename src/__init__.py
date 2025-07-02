"""
GUARDRIVE - Sistema Veicular Inteligente com Blockchain & ESG
Plataforma principal com arquitetura multi-linguagem
"""

__version__ = "1.0.0"
__author__ = "GUARDRIVE-CORE"
__description__ = "Sistema veicular inteligente com blockchain, tokenização ESG e ecosystem MCP universal"

from .config import settings, get_config_by_env

__all__ = [
    "__version__",
    "__author__", 
    "__description__",
    "settings",
    "get_config_by_env"
]

