import time
import json
import logging
import random
import threading
import queue
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("latency_tester.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("latency_tester")

class LatencyTester:
    """
    Ferramenta para testes de latência e desempenho do sistema SealSafe.
    
    Esta classe permite medir e analisar a latência em diferentes componentes
    do sistema, desde a coleta de dados pelos sensores até o registro em blockchain.
    """
    
    def __init__(self, config_file=None):
        """
        Inicializa o testador de latência.
        
        Args:
            config_file (str, optional): Caminho para arquivo de configuração JSON.
                                        Se não fornecido, usa configurações padrão.
        """
        self.config = self._load_config(config_file)
        self.results = {
            "sensor_to_device": [],
            "device_to_backend": [],
            "backend_to_blockchain": [],
            "end_to_end": []
        }
        self.running = False
        self.test_queue = queue.Queue()
        self.worker_thread = None
        
        logger.info("Testador de latência inicializado")
    
    def _load_config(self, config_file):
        """Carrega configuração do arquivo JSON ou usa padrões."""
        default_config = {
            "test_duration": 300,  # segundos
            "sample_interval": 1.0,  # segundos
            "test_scenarios": {
                "urban_normal": {
                    "traffic_density": 0.5,
                    "vehicle_count": 10,
                    "data_rate": "normal"
                },
                "urban_rush_hour": {
                    "traffic_density": 0.9,
                    "vehicle_count": 30,
                    "data_rate": "high"
                },
                "highway_cruise": {
                    "traffic_density": 0.3,
                    "vehicle_count": 5,
                    "data_rate": "low"
                }
            },
            "data_rates": {
                "low": {
                    "sensor_frequency": 0.5,  # Hz
                    "transmission_frequency": 0.1  # Hz
                },
                "normal": {
                    "sensor_frequency": 1.0,
                    "transmission_frequency": 0.2
                },
                "high": {
                    "sensor_frequency": 2.0,
                    "transmission_frequency": 0.5
                }
            },
            "network_conditions": {
                "good": {
                    "packet_loss": 0.01,  # 1%
                    "jitter": 10,  # ms
                    "bandwidth": 1000  # kbps
                },
                "average": {
                    "packet_loss": 0.05,
                    "jitter": 50,
                    "bandwidth": 500
                },
                "poor": {
                    "packet_loss": 0.15,
                    "jitter": 100,
                    "bandwidth": 100
                }
            },
            "blockchain_config": {
                "transaction_size": 500,  # bytes
                "block_time": 5,  # segundos
                "gas_price": 20  # gwei
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
    
    def start_test(self, scenario_name, network_condition="average"):
        """
        Inicia um teste de latência com o cenário e condições de rede especificados.
        
        Args:
            scenario_name (str): Nome do cenário de teste (deve existir em config["test_scenarios"]).
            network_condition (str): Condição de rede a simular ("good", "average", "poor").
            
        Returns:
            bool: True se o teste foi iniciado com sucesso, False caso contrário.
        """
        if self.running:
            logger.warning("Teste já em andamento. Finalize o teste atual antes de iniciar um novo.")
            return False
        
        if scenario_name not in self.config["test_scenarios"]:
            logger.error(f"Cenário '{scenario_name}' não encontrado na configuração.")
            return False
        
        if network_condition not in self.config["network_conditions"]:
            logger.error(f"Condição de rede '{network_condition}' não encontrada na configuração.")
            return False
        
        # Configura o teste
        scenario = self.config["test_scenarios"][scenario_name]
        network = self.config["network_conditions"][network_condition]
        data_rate = self.config["data_rates"][scenario["data_rate"]]
        
        test_config = {
            "scenario_name": scenario_name,
            "network_condition": network_condition,
            "scenario": scenario,
            "network": network,
            "data_rate": data_rate,
            "start_time": datetime.now(),
            "duration": self.config["test_duration"],
            "sample_interval": self.config["sample_interval"]
        }
        
        # Limpa resultados anteriores
        self.results = {
            "sensor_to_device": [],
            "device_to_backend": [],
            "backend_to_blockchain": [],
            "end_to_end": []
        }
        
        # Inicia thread de teste
        self.running = True
        self.worker_thread = threading.Thread(target=self._run_test, args=(test_config,))
        self.worker_thread.daemon = True
        self.worker_thread.start()
        
        logger.info(f"Teste iniciado: cenário '{scenario_name}', rede '{network_condition}'")
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
        Executa o teste de latência com a configuração especificada.
        
        Args:
            test_config (dict): Configuração do teste.
        """
        start_time = time.time()
        end_time = start_time + test_config["duration"]
        sample_interval = test_config["sample_interval"]
        
        logger.info(f"Executando teste por {test_config['duration']} segundos...")
        
        sample_count = 0
        while self.running and time.time() < end_time:
            # Simula uma amostra de dados
            self._simulate_data_flow(test_config)
            
            sample_count += 1
            if sample_count % 10 == 0:
                elapsed = time.time() - start_time
                progress = min(100, (elapsed / test_config["duration"]) * 100)
                logger.info(f"Progresso do teste: {progress:.1f}% ({sample_count} amostras)")
            
            # Aguarda o próximo intervalo de amostragem
            time.sleep(sample_interval)
        
        # Finaliza o teste
        self.running = False
        
        # Calcula estatísticas
        stats = self._calculate_statistics()
        
        # Salva resultados
        result_file = f"latency_test_{test_config['scenario_name']}_{test_config['network_condition']}_{int(time.time())}.json"
        self._save_results(result_file, test_config, stats)
        
        logger.info(f"Teste concluído. Resultados salvos em {result_file}")
    
    def _simulate_data_flow(self, test_config):
        """
        Simula o fluxo de dados através do sistema e mede latências.
        
        Args:
            test_config (dict): Configuração do teste.
        """
        # Timestamp inicial
        start_time = time.time()
        
        # Simula latência de sensores para dispositivo
        sensor_latency = self._simulate_sensor_latency(test_config)
        device_time = start_time + sensor_latency
        
        # Simula latência de dispositivo para backend
        backend_latency = self._simulate_backend_latency(test_config)
        backend_time = device_time + backend_latency
        
        # Simula latência de backend para blockchain
        blockchain_latency = self._simulate_blockchain_latency(test_config)
        blockchain_time = backend_time + blockchain_latency
        
        # Calcula latência total
        total_latency = blockchain_time - start_time
        
        # Registra resultados
        self.results["sensor_to_device"].append({
            "timestamp": start_time,
            "latency": sensor_latency * 1000  # converte para ms
        })
        
        self.results["device_to_backend"].append({
            "timestamp": device_time,
            "latency": backend_latency * 1000
        })
        
        self.results["backend_to_blockchain"].append({
            "timestamp": backend_time,
            "latency": blockchain_latency * 1000
        })
        
        self.results["end_to_end"].append({
            "timestamp": start_time,
            "latency": total_latency * 1000
        })
    
    def _simulate_sensor_latency(self, test_config):
        """
        Simula a latência da coleta de dados pelos sensores.
        
        Args:
            test_config (dict): Configuração do teste.
            
        Returns:
            float: Latência simulada em segundos.
        """
        # Latência base para diferentes sensores (em segundos)
        base_latencies = {
            "obd": 0.1,
            "co2": 0.2,
            "reed_switch": 0.005,
            "imu": 0.01,
            "temp": 0.15
        }
        
        # Seleciona um sensor aleatório para esta amostra
        sensor = random.choice(list(base_latencies.keys()))
        base_latency = base_latencies[sensor]
        
        # Ajusta com base na taxa de dados
        frequency_factor = 1.0 / test_config["data_rate"]["sensor_frequency"]
        
        # Adiciona variação aleatória (±20%)
        variation = random.uniform(-0.2, 0.2)
        
        # Calcula latência final
        latency = base_latency * frequency_factor * (1 + variation)
        
        return max(0.001, latency)  # mínimo de 1ms
    
    def _simulate_backend_latency(self, test_config):
        """
        Simula a latência da transmissão de dados do dispositivo para o backend.
        
        Args:
            test_config (dict): Configuração do teste.
            
        Returns:
            float: Latência simulada em segundos.
        """
        # Latência base de rede (em segundos)
        base_latency = 0.05
        
        # Ajusta com base nas condições de rede
        network = test_config["network"]
        
        # Fator de perda de pacotes (pode causar retransmissões)
        packet_loss_factor = 1.0 + (network["packet_loss"] * 5.0)
        
        # Fator de jitter (variação na latência)
        jitter_factor = network["jitter"] / 1000.0  # converte ms para segundos
        
        # Fator de largura de banda
        bandwidth_factor = 1.0 + (500.0 / network["bandwidth"])
        
        # Tamanho dos dados (varia com a taxa de dados)
        data_size_factor = 1.0 + (test_config["data_rate"]["transmission_frequency"] * 0.5)
        
        # Calcula latência final
        latency = base_latency * packet_loss_factor * bandwidth_factor * data_size_factor
        
        # Adiciona jitter
        latency += random.uniform(-jitter_factor, jitter_factor)
        
        # Simula perda de pacote ocasional (causa latência maior)
        if random.random() < network["packet_loss"]:
            latency *= 3.0  # retransmissão triplica a latência
        
        return max(0.01, latency)  # mínimo de 10ms
    
    def _simulate_blockchain_latency(self, test_config):
        """
        Simula a latência do registro de dados na blockchain.
        
        Args:
            test_config (dict): Configuração do teste.
            
        Returns:
            float: Latência simulada em segundos.
        """
        # Configuração da blockchain
        blockchain_config = self.config["blockchain_config"]
        
        # Tempo médio de bloco
        block_time = blockchain_config["block_time"]
        
        # Latência base (tempo médio até inclusão em um bloco)
        base_latency = block_time / 2.0
        
        # Fator de congestionamento (simulado aleatoriamente)
        congestion_factor = random.uniform(0.5, 3.0)
        
        # Fator de preço de gas (afeta prioridade da transação)
        gas_price_factor = 1.0  # padrão
        
        # Calcula latência final
        latency = base_latency * congestion_factor * gas_price_factor
        
        # Adiciona variação aleatória
        latency *= random.uniform(0.8, 1.2)
        
        return latency
    
    def _calculate_statistics(self):
        """
        Calcula estatísticas dos resultados de latência.
        
        Returns:
            dict: Estatísticas calculadas.
        """
        stats = {}
        
        for category, measurements in self.results.items():
            if not measurements:
                stats[category] = {
                    "count": 0,
                    "min": None,
                    "max": None,
                    "mean": None,
                    "median": None,
                    "p95": None,
                    "p99": None,
                    "std_dev": None
                }
                continue
            
            latencies = [m["latency"] for m in measurements]
            latencies.sort()
            
            count = len(latencies)
            min_val = min(latencies)
            max_val = max(latencies)
            mean = sum(latencies) / count
            
            # Calcula mediana
            if count % 2 == 0:
                median = (latencies[count//2 - 1] + latencies[count//2]) / 2
            else:
                median = latencies[count//2]
            
            # Calcula percentis
            p95_index = int(count * 0.95)
            p99_index = int(count * 0.99)
            p95 = latencies[p95_index] if p95_index < count else latencies[-1]
            p99 = latencies[p99_index] if p99_index < count else latencies[-1]
            
            # Calcula desvio padrão
            variance = sum((x - mean) ** 2 for x in latencies) / count
            std_dev = variance ** 0.5
            
            stats[category] = {
                "count": count,
                "min": min_val,
                "max": max_val,
                "mean": mean,
                "median": median,
                "p95": p95,
                "p99": p99,
                "std_dev": std_dev
            }
        
        return stats
    
    def _save_results(self, filename, test_config, stats):
        """
        Salva os resultados do teste em um arquivo JSON.
        
        Args:
            filename (str): Nome do arquivo para salvar.
            test_config (dict): Configuração do teste.
            st
(Content truncated due to size limit. Use line ranges to read in chunks)