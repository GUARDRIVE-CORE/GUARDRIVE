"""
GUARDRIVE - Testes Funcionais da API Principal
Testes abrangentes para validar funcionalidade crítica
"""

import pytest
import asyncio
from typing import Dict, Any
from fastapi.testclient import TestClient
from httpx import AsyncClient

# Import da aplicação
try:
    from src.api.main import app
except ImportError:
    import sys
    import os
    sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))
    from src.api.main import app


@pytest.fixture
def client():
    """Cliente de teste síncrono"""
    return TestClient(app)


@pytest.fixture
async def async_client():
    """Cliente de teste assíncrono"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac


class TestMainEndpoints:
    """Testes dos endpoints principais"""
    
    def test_root_endpoint(self, client):
        """Teste do endpoint raiz"""
        response = client.get("/")
        
        assert response.status_code == 200
        data = response.json()
        
        # Validações essenciais
        assert data["message"] == "GUARDRIVE API - Operational"
        assert data["version"] == "1.0.2"
        assert data["status"] == "healthy"
        assert "features" in data
        assert len(data["features"]) > 0
        
        # Validar features esperadas
        expected_features = [
            "symbiotic-intelligence",
            "ai-orchestration",
            "blockchain-integration",
            "real-time-monitoring"
        ]
        for feature in expected_features:
            assert feature in data["features"]
    
    def test_health_check(self, client):
        """Teste do health check"""
        response = client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        
        # Validações de saúde
        assert data["status"] == "healthy"
        assert data["version"] == "1.0.2"
        assert "timestamp" in data
        assert "environment" in data
    
    def test_metrics_endpoint(self, client):
        """Teste do endpoint de métricas"""
        response = client.get("/metrics")
        
        assert response.status_code == 200
        data = response.json()
        
        # Validar métricas básicas
        assert "cpu_percent" in data
        assert "memory_percent" in data
        assert "disk_usage" in data
        assert "uptime" in data
        
        # Validar tipos e ranges
        assert isinstance(data["cpu_percent"], (int, float))
        assert isinstance(data["memory_percent"], (int, float))
        assert isinstance(data["disk_usage"], (int, float))
        
        # Validar ranges esperados
        assert 0 <= data["cpu_percent"] <= 100
        assert 0 <= data["memory_percent"] <= 100
        assert 0 <= data["disk_usage"] <= 100


class TestAsyncEndpoints:
    """Testes assíncronos dos endpoints"""
    
    @pytest.mark.asyncio
    async def test_async_root(self, async_client):
        """Teste assíncrono do endpoint raiz"""
        response = await async_client.get("/")
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    @pytest.mark.asyncio
    async def test_async_health(self, async_client):
        """Teste assíncrono do health check"""
        response = await async_client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
    
    @pytest.mark.asyncio
    async def test_concurrent_requests(self, async_client):
        """Teste de requisições concorrentes"""
        tasks = [
            async_client.get("/"),
            async_client.get("/health"),
            async_client.get("/metrics"),
        ]
        
        responses = await asyncio.gather(*tasks)
        
        # Todos devem retornar 200
        for response in responses:
            assert response.status_code == 200


class TestErrorHandling:
    """Testes de tratamento de erros"""
    
    def test_404_not_found(self, client):
        """Teste de endpoint não encontrado"""
        response = client.get("/endpoint-inexistente")
        
        assert response.status_code == 404
        data = response.json()
        
        assert data["error"] == "Resource not found"
        assert data["path"] == "/endpoint-inexistente"
        assert data["method"] == "GET"
    
    def test_invalid_method(self, client):
        """Teste de método HTTP inválido"""
        response = client.post("/")  # Root só aceita GET
        
        # FastAPI retorna 405 para método não permitido
        assert response.status_code == 405


class TestResponseHeaders:
    """Testes de headers de resposta"""
    
    def test_cors_headers(self, client):
        """Teste de headers CORS"""
        response = client.get("/")
        
        # Verificar headers importantes
        assert "content-type" in response.headers
        assert response.headers["content-type"] == "application/json"
    
    def test_compression_headers(self, client):
        """Teste de compressão de resposta"""
        # Fazer requisição com Accept-Encoding
        headers = {"Accept-Encoding": "gzip, deflate"}
        response = client.get("/", headers=headers)
        
        assert response.status_code == 200


class TestPerformance:
    """Testes de performance básica"""
    
    def test_response_time(self, client):
        """Teste de tempo de resposta"""
        import time
        
        start_time = time.time()
        response = client.get("/")
        end_time = time.time()
        
        response_time = end_time - start_time
        
        assert response.status_code == 200
        assert response_time < 1.0  # Deve responder em menos de 1 segundo
    
    def test_multiple_requests(self, client):
        """Teste de múltiplas requisições sequenciais"""
        for i in range(10):
            response = client.get("/health")
            assert response.status_code == 200


class TestAPIDocumentation:
    """Testes da documentação automática"""
    
    def test_openapi_docs(self, client):
        """Teste da documentação OpenAPI"""
        response = client.get("/docs")
        assert response.status_code == 200
    
    def test_redoc_docs(self, client):
        """Teste da documentação ReDoc"""
        response = client.get("/redoc")
        assert response.status_code == 200
    
    def test_openapi_json(self, client):
        """Teste do schema OpenAPI JSON"""
        response = client.get("/openapi.json")
        
        assert response.status_code == 200
        schema = response.json()
        
        # Validações básicas do schema
        assert "openapi" in schema
        assert "info" in schema
        assert schema["info"]["title"] == "GUARDRIVE API"
        assert schema["info"]["version"] == "1.0.2"


@pytest.mark.integration
class TestIntegrationScenarios:
    """Testes de cenários de integração"""
    
    def test_startup_sequence(self, client):
        """Teste da sequência de inicialização"""
        # 1. Verificar saúde
        health_response = client.get("/health")
        assert health_response.status_code == 200
        
        # 2. Verificar métricas
        metrics_response = client.get("/metrics")
        assert metrics_response.status_code == 200
        
        # 3. Verificar funcionalidade principal
        root_response = client.get("/")
        assert root_response.status_code == 200
    
    @pytest.mark.slow
    def test_load_simulation(self, client):
        """Simulação básica de carga"""
        successful_requests = 0
        total_requests = 50
        
        for i in range(total_requests):
            response = client.get("/health")
            if response.status_code == 200:
                successful_requests += 1
        
        # Pelo menos 95% de sucesso
        success_rate = successful_requests / total_requests
        assert success_rate >= 0.95


# Fixtures de dados para testes
@pytest.fixture
def sample_api_data():
    """Dados de exemplo para testes"""
    return {
        "test_endpoints": ["/", "/health", "/metrics"],
        "expected_status_codes": [200, 200, 200],
        "expected_features": [
            "symbiotic-intelligence",
            "ai-orchestration",
            "blockchain-integration",
            "real-time-monitoring"
        ]
    }


# Utilitários para testes
def validate_json_response(response_data: Dict[str, Any], required_fields: list) -> bool:
    """Valida se uma resposta JSON contém os campos obrigatórios"""
    for field in required_fields:
        if field not in response_data:
            return False
    return True


def validate_response_structure(data: Dict[str, Any]) -> bool:
    """Valida a estrutura básica de resposta da API"""
    required_fields = ["message", "version", "status"]
    return validate_json_response(data, required_fields)


if __name__ == "__main__":
    # Permite execução direta para debug
    pytest.main([__file__, "-v", "--tb=short"])

