import random
import time
import json
import logging
import threading
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("reliability_tester.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("reliability_tester")

class ReliabilityTester:
    """
    Ferramenta para testes de confiabilidade e resiliência do sistema SealSafe.
    
    Esta classe permite avaliar a robustez do sistema em diferentes condições
    de operação, simulando falhas, interrupções de conectividade e outros
    cenários adversos.
    """
    
    def __init__(self, config_file=None):
        """
        Inicializa o testador de confiabilidade.
        
        Args:
            config_file (str, optional): Caminho para arquivo de configuração JSON.
                                        Se não fornecido, usa configurações padrão.
        """
        self.config = self._load_config(config_file)
        self.results = {
            "tests": [],
            "summary": {}
        }
        self.running = False
        self.worker_thread = None
        
        logger.info("Testador de confiabilidade inicializado")
    
    def _load_config(self, config_file):
        """Carrega configuração do arquivo JSON ou usa padrões."""
        default_config = {
            "test_duration": 3600,  # segundos (1 hora)
            "test_scenarios": {
                "normal_operation": {
                    "description": "Operação normal sem falhas induzidas",
                    "failure_rate": 0.0,
                    "connectivity_issues": 0.0,
                    "data_corruption": 0.0
                },
                "intermittent_failures": {
                    "description": "Falhas ocasionais em componentes",
                    "failure_rate": 0.05,
                    "connectivity_issues": 0.02,
                    "data_corruption": 0.01
                },
                "poor_connectivity": {
                    "description": "Problemas frequentes de conectividade",
                    "failure_rate": 0.02,
                    "connectivity_issues": 0.2,
                    "data_corruption": 0.01
                },
                "extreme_conditions": {
                    "description": "Condições extremas de operação",
                    "failure_rate": 0.1,
                    "connectivity_issues": 0.15,
                    "data_corruption": 0.05
                }
            },
            "components": {
                "sensors": {
                    "weight": 0.2,
                    "recovery_time": [5, 30]  # min, max segundos
                },
                "device_firmware": {
                    "weight": 0.15,
                    "recovery_time": [10, 60]
                },
                "communication": {
                    "weight": 0.25,
                    "recovery_time": [5, 120]
                },
                "backend": {
                    "weight": 0.2,
                    "recovery_time": [10, 90]
                },
                "blockchain": {
                    "weight": 0.2,
                    "recovery_time": [30, 300]
                }
            },
            "data_flow": {
                "collection_interval": 1.0,  # segundos
                "transmission_interval": 5.0,  # segundos
                "blockchain_interval": 60.0,  # segundos
                "data_size": 500  # bytes por pacote
            },
            "recovery_strategies": {
                "auto_retry": True,
                "max_retries": 3,
                "exponential_backoff": True,
                "data_buffering": True,
                "buffer_size": 1000  # pacotes
            }
        }
        
        if config_file:
            try:
                with open(config_file, 'r') as f:
                    loaded_config = json.load(f)
                    # Mescla configurações carregadas com padrões
                    for key, value in loaded_config.items():
                        if isinstance(value, dict) and key in default_config and isinstance(default_config[key], dict):
                            default_config[key].update(value)
                        else:
                            default_config[key] = value
                logger.info(f"Configuração carregada de {config_file}")
            except Exception as e:
                logger.error(f"Erro ao carregar configuração: {e}")
        
        return default_config
    
    def start_test(self, scenario_name):
        """
        Inicia um teste de confiabilidade com o cenário especificado.
        
        Args:
            scenario_name (str): Nome do cenário de teste (deve existir em config["test_scenarios"]).
            
        Returns:
            bool: True se o teste foi iniciado com sucesso, False caso contrário.
        """
        if self.running:
            logger.warning("Teste já em andamento. Finalize o teste atual antes de iniciar um novo.")
            return False
        
        if scenario_name not in self.config["test_scenarios"]:
            logger.error(f"Cenário '{scenario_name}' não encontrado na configuração.")
            return False
        
        # Configura o teste
        scenario = self.config["test_scenarios"][scenario_name]
        
        test_config = {
            "scenario_name": scenario_name,
            "scenario": scenario,
            "start_time": datetime.now(),
            "duration": self.config["test_duration"]
        }
        
        # Limpa resultados anteriores
        self.results = {
            "tests": [],
            "summary": {}
        }
        
        # Inicia thread de teste
        self.running = True
        self.worker_thread = threading.Thread(target=self._run_test, args=(test_config,))
        self.worker_thread.daemon = True
        self.worker_thread.start()
        
        logger.info(f"Teste iniciado: cenário '{scenario_name}'")
        return True
    
    def stop_test(self):
        """
        Para o teste em andamento.
        
        Returns:
            bool: True se o teste foi parado com sucesso, False caso contrário.
        """
        if not self.running:
            logger.warning("Nenhum teste em andamento para parar.")
            return False
        
        self.running = False
        if self.worker_thread:
            self.worker_thread.join(timeout=5.0)
        
        logger.info("Teste parado.")
        return True
    
    def _run_test(self, test_config):
        """
        Executa o teste de confiabilidade com a configuração especificada.
        
        Args:
            test_config (dict): Configuração do teste.
        """
        start_time = time.time()
        end_time = start_time + test_config["duration"]
        
        # Estatísticas do teste
        stats = {
            "total_data_points": 0,
            "successful_data_points": 0,
            "failed_data_points": 0,
            "component_failures": {component: 0 for component in self.config["components"]},
            "connectivity_issues": 0,
            "data_corruption": 0,
            "recovery_attempts": 0,
            "successful_recoveries": 0,
            "data_loss": 0,
            "buffer_usage": []
        }
        
        # Buffer simulado para dados
        buffer = []
        buffer_capacity = self.config["recovery_strategies"]["buffer_size"]
        
        # Contadores para intervalos de coleta/transmissão
        last_collection = start_time
        last_transmission = start_time
        last_blockchain = start_time
        
        # Estado dos componentes
        component_status = {component: {"status": "operational", "recovery_until": 0} 
                           for component in self.config["components"]}
        
        logger.info(f"Executando teste por {test_config['duration']} segundos...")
        
        # Loop principal do teste
        while self.running and time.time() < end_time:
            current_time = time.time()
            elapsed = current_time - start_time
            
            # Atualiza estado dos componentes em recuperação
            for component, status in component_status.items():
                if status["status"] == "recovering" and current_time >= status["recovery_until"]:
                    status["status"] = "operational"
                    stats["successful_recoveries"] += 1
                    logger.info(f"Componente {component} recuperado após falha")
            
            # Coleta de dados
            if current_time - last_collection >= self.config["data_flow"]["collection_interval"]:
                last_collection = current_time
                
                # Tenta coletar dados
                collection_success = self._simulate_data_collection(test_config["scenario"], component_status)
                
                if collection_success:
                    # Adiciona ao buffer
                    if len(buffer) < buffer_capacity:
                        buffer.append({
                            "timestamp": current_time,
                            "size": self.config["data_flow"]["data_size"],
                            "corrupted": self._simulate_data_corruption(test_config["scenario"])
                        })
                    else:
                        # Buffer cheio, perda de dados
                        stats["data_loss"] += 1
                
                stats["total_data_points"] += 1
                if collection_success:
                    stats["successful_data_points"] += 1
                else:
                    stats["failed_data_points"] += 1
            
            # Transmissão de dados
            if current_time - last_transmission >= self.config["data_flow"]["transmission_interval"]:
                last_transmission = current_time
                
                # Verifica se há conectividade
                has_connectivity = not self._simulate_connectivity_issue(test_config["scenario"])
                
                if has_connectivity and buffer:
                    # Número de pacotes a transmitir
                    packets_to_send = min(5, len(buffer))  # até 5 pacotes por transmissão
                    
                    # Tenta transmitir dados
                    transmission_success = self._simulate_data_transmission(test_config["scenario"], component_status)
                    
                    if transmission_success:
                        # Remove pacotes transmitidos do buffer
                        for _ in range(packets_to_send):
                            packet = buffer.pop(0)
                            if packet["corrupted"]:
                                stats["data_corruption"] += 1
                    else:
                        stats["connectivity_issues"] += 1
                elif not has_connectivity:
                    stats["connectivity_issues"] += 1
            
            # Registro em blockchain
            if current_time - last_blockchain >= self.config["data_flow"]["blockchain_interval"]:
                last_blockchain = current_time
                
                # Tenta registrar em blockchain
                blockchain_success = self._simulate_blockchain_registration(test_config["scenario"], component_status)
                
                if not blockchain_success:
                    # Falha no registro blockchain
                    logger.warning("Falha no registro em blockchain")
            
            # Simula falhas em componentes
            self._simulate_component_failures(test_config["scenario"], component_status, stats)
            
            # Registra uso do buffer
            if elapsed % 60 < 1:  # a cada minuto aproximadamente
                buffer_usage = len(buffer) / buffer_capacity if buffer_capacity > 0 else 0
                stats["buffer_usage"].append({
                    "timestamp": current_time,
                    "usage": buffer_usage
                })
                
                # Log de progresso
                progress = min(100, (elapsed / test_config["duration"]) * 100)
                logger.info(f"Progresso do teste: {progress:.1f}%, Buffer: {len(buffer)}/{buffer_capacity}")
            
            # Pequena pausa para não sobrecarregar a CPU
            time.sleep(0.1)
        
        # Finaliza o teste
        self.running = False
        
        # Calcula estatísticas finais
        reliability = stats["successful_data_points"] / stats["total_data_points"] if stats["total_data_points"] > 0 else 0
        data_integrity = 1.0 - (stats["data_corruption"] / stats["successful_data_points"]) if stats["successful_data_points"] > 0 else 0
        recovery_rate = stats["successful_recoveries"] / stats["recovery_attempts"] if stats["recovery_attempts"] > 0 else 1.0
        
        summary = {
            "reliability": reliability,
            "data_integrity": data_integrity,
            "recovery_rate": recovery_rate,
            "data_loss_rate": stats["data_loss"] / stats["total_data_points"] if stats["total_data_points"] > 0 else 0,
            "component_failure_rates": {
                component: stats["component_failures"][component] / test_config["duration"] * 3600  # falhas por hora
                for component in self.config["components"]
            }
        }
        
        # Atualiza resultados
        self.results["tests"].append({
            "scenario": test_config["scenario_name"],
            "start_time": test_config["start_time"].isoformat(),
            "duration": test_config["duration"],
            "stats": stats
        })
        
        self.results["summary"] = summary
        
        # Salva resultados
        result_file = f"reliability_test_{test_config['scenario_name']}_{int(time.time())}.json"
        self._save_results(result_file)
        
        logger.info(f"Teste concluído. Resultados salvos em {result_file}")
        logger.info(f"Confiabilidade: {reliability*100:.2f}%, Integridade: {data_integrity*100:.2f}%, " +
                   f"Taxa de recuperação: {recovery_rate*100:.2f}%")
    
    def _simulate_data_collection(self, scenario, component_status):
        """
        Simula a coleta de dados pelos sensores.
        
        Args:
            scenario (dict): Configuração do cenário de teste.
            component_status (dict): Estado atual dos componentes.
            
        Returns:
            bool: True se a coleta foi bem-sucedida, False caso contrário.
        """
        # Verifica se os sensores estão operacionais
        if component_status["sensors"]["status"] != "operational":
            return False
        
        # Verifica se o firmware do dispositivo está operacional
        if component_status["device_firmware"]["status"] != "operational":
            return False
        
        # Sucesso na coleta
        return True
    
    def _simulate_data_transmission(self, scenario, component_status):
        """
        Simula a transmissão de dados do dispositivo para o backend.
        
        Args:
            scenario (dict): Configuração do cenário de teste.
            component_status (dict): Estado atual dos componentes.
            
        Returns:
            bool: True se a transmissão foi bem-sucedida, False caso contrário.
        """
        # Verifica se a comunicação está operacional
        if component_status["communication"]["status"] != "operational":
            return False
        
        # Verifica se o backend está operacional
        if component_status["backend"]["status"] != "operational":
            return False
        
        # Sucesso na transmissão
        return True
    
    def _simulate_blockchain_registration(self, scenario, component_status):
        """
        Simula o registro de dados na blockchain.
        
 
(Content truncated due to size limit. Use line ranges to read in chunks)