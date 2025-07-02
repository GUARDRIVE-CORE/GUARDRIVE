"""GUARDRIVE API - Versão Simples e Funcional"""

import os
import psutil
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Criar aplicação FastAPI
app = FastAPI(
    title="GUARDRIVE API",
    description="Enterprise-grade AI orchestration platform",
    version="1.0.2"
)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Endpoint raiz"""
    return {
        "message": "GUARDRIVE API - Operational",
        "version": "1.0.2",
        "status": "healthy",
        "features": [
            "symbiotic-intelligence",
            "ai-orchestration",
            "blockchain-integration",
            "real-time-monitoring"
        ]
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "1.0.2",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/metrics")
async def metrics():
    """Métricas do sistema"""
    return {
        "cpu_percent": psutil.cpu_percent(interval=1),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('C:' if os.name == 'nt' else '/').percent
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

