import json
import logging
import random
import time
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("sensor_simulator.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("sensor_simulator")

class SensorSimulator:
    """
    Simulador de sensores para o sistema SealSafe.
    
    Esta classe simula o comportamento dos diversos sensores embarcados
    no dispositivo SealSafe, incluindo sensores OBD-II/CAN, NDIR CO₂,
    reed switch, giroscópio, acelerômetro e temperatura de freio.
    """
    
    def __init__(self, config_file=None):
        """
        Inicializa o simulador de sensores.
        
        Args:
            config_file (str, optional): Caminho para arquivo de configuração JSON.
                                        Se não fornecido, usa configurações padrão.
        """
        self.config = self._load_config(config_file)
        self.sensors = {}
        self.last_readings = {}
        self.error_states = {}
        
        # Inicializa sensores
        self._initialize_sensors()
        
        logger.info("Simulador de sensores inicializado")
    
    def _load_config(self, config_file):
        """Carrega configuração do arquivo JSON ou usa padrões."""
        default_config = {
            "sampling_rates": {
                "obd": 1.0,  # Hz (1 leitura por segundo)
                "co2": 0.5,  # Hz (1 leitura a cada 2 segundos)
                "reed_switch": 10.0,  # Hz (10 leituras por segundo)
                "imu": 50.0,  # Hz (50 leituras por segundo)
                "temp": 0.2   # Hz (1 leitura a cada 5 segundos)
            },
            "noise_levels": {
                "obd": 0.01,  # 1% de ruído
                "co2": 0.05,  # 5% de ruído
                "reed_switch": 0.001,  # 0.1% de ruído
                "imu": 0.02,  # 2% de ruído
                "temp": 0.03  # 3% de ruído
            },
            "failure_rates": {
                "obd": 0.0001,  # probabilidade de falha por hora
                "co2": 0.0005,
                "reed_switch": 0.0002,
                "imu": 0.0003,
                "temp": 0.0004
            },
            "latency": {
                "obd": 100,  # ms
                "co2": 200,  # ms
                "reed_switch": 5,  # ms
                "imu": 10,  # ms
                "temp": 150  # ms
            },
            "co2_sensor": {
                "range_min": 400,  # ppm
                "range_max": 5000,  # ppm
                "accuracy": 30,  # ppm
                "warmup_time": 30  # segundos
            },
            "temp_sensor": {
                "range_min": -20,  # °C
                "range_max": 800,  # °C
                "accuracy": 2.0  # °C
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
    
    def _initialize_sensors(self):
        """Inicializa todos os sensores simulados."""
        # OBD-II/CAN
        self.sensors["obd"] = {
            "status": "active",
            "last_sample_time": 0,
            "sample_interval": 1.0 / self.config["sampling_rates"]["obd"],
            "noise_level": self.config["noise_levels"]["obd"],
            "failure_rate": self.config["failure_rates"]["obd"],
            "latency": self.config["latency"]["obd"] / 1000.0  # converte para segundos
        }
        
        # Sensor NDIR CO₂
        self.sensors["co2"] = {
            "status": "warming",
            "warmup_start": time.time(),
            "last_sample_time": 0,
            "sample_interval": 1.0 / self.config["sampling_rates"]["co2"],
            "noise_level": self.config["noise_levels"]["co2"],
            "failure_rate": self.config["failure_rates"]["co2"],
            "latency": self.config["latency"]["co2"] / 1000.0,
            "range_min": self.config["co2_sensor"]["range_min"],
            "range_max": self.config["co2_sensor"]["range_max"],
            "accuracy": self.config["co2_sensor"]["accuracy"],
            "warmup_time": self.config["co2_sensor"]["warmup_time"]
        }
        
        # Reed Switch (cinto de segurança)
        self.sensors["reed_switch"] = {
            "status": "active",
            "last_sample_time": 0,
            "sample_interval": 1.0 / self.config["sampling_rates"]["reed_switch"],
            "noise_level": self.config["noise_levels"]["reed_switch"],
            "failure_rate": self.config["failure_rates"]["reed_switch"],
            "latency": self.config["latency"]["reed_switch"] / 1000.0
        }
        
        # IMU (Giroscópio + Acelerômetro)
        self.sensors["imu"] = {
            "status": "active",
            "last_sample_time": 0,
            "sample_interval": 1.0 / self.config["sampling_rates"]["imu"],
            "noise_level": self.config["noise_levels"]["imu"],
            "failure_rate": self.config["failure_rates"]["imu"],
            "latency": self.config["latency"]["imu"] / 1000.0
        }
        
        # Sensor de temperatura de freio
        self.sensors["temp"] = {
            "status": "active",
            "last_sample_time": 0,
            "sample_interval": 1.0 / self.config["sampling_rates"]["temp"],
            "noise_level": self.config["noise_levels"]["temp"],
            "failure_rate": self.config["failure_rates"]["temp"],
            "latency": self.config["latency"]["temp"] / 1000.0,
            "range_min": self.config["temp_sensor"]["range_min"],
            "range_max": self.config["temp_sensor"]["range_max"],
            "accuracy": self.config["temp_sensor"]["accuracy"]
        }
        
        # Inicializa leituras anteriores
        self.last_readings = {
            "obd": {},
            "co2": 400.0,  # ppm (ar ambiente)
            "reed_switch": False,  # cinto desafivelado
            "imu": {
                "accel": {"x": 0.0, "y": 0.0, "z": 9.8},  # m/s² (gravidade em z)
                "gyro": {"x": 0.0, "y": 0.0, "z": 0.0}  # rad/s
            },
            "temp": 25.0  # °C (temperatura ambiente)
        }
        
        # Inicializa estados de erro
        self.error_states = {
            "obd": False,
            "co2": False,
            "reed_switch": False,
            "imu": False,
            "temp": False
        }
    
    def update(self, delta_time, vehicle_state=None):
        """
        Atualiza o estado dos sensores e gera novas leituras.
        
        Args:
            delta_time (float): Tempo decorrido desde a última atualização em segundos.
            vehicle_state (dict, optional): Estado atual do veículo simulado.
            
        Returns:
            dict: Leituras atuais de todos os sensores.
        """
        current_time = time.time()
        
        # Verifica estado do sensor CO₂ (aquecimento)
        if self.sensors["co2"]["status"] == "warming":
            warmup_elapsed = current_time - self.sensors["co2"]["warmup_start"]
            if warmup_elapsed >= self.sensors["co2"]["warmup_time"]:
                self.sensors["co2"]["status"] = "active"
                logger.info("Sensor CO₂ aquecido e pronto")
        
        # Simula falhas aleatórias
        self._simulate_failures(delta_time)
        
        # Atualiza leituras de cada sensor
        readings = {}
        
        # OBD-II/CAN
        if current_time - self.sensors["obd"]["last_sample_time"] >= self.sensors["obd"]["sample_interval"]:
            readings["obd"] = self._read_obd(vehicle_state)
            self.sensors["obd"]["last_sample_time"] = current_time
        
        # CO₂
        if current_time - self.sensors["co2"]["last_sample_time"] >= self.sensors["co2"]["sample_interval"]:
            readings["co2"] = self._read_co2(vehicle_state)
            self.sensors["co2"]["last_sample_time"] = current_time
        
        # Reed Switch
        if current_time - self.sensors["reed_switch"]["last_sample_time"] >= self.sensors["reed_switch"]["sample_interval"]:
            readings["reed_switch"] = self._read_reed_switch(vehicle_state)
            self.sensors["reed_switch"]["last_sample_time"] = current_time
        
        # IMU
        if current_time - self.sensors["imu"]["last_sample_time"] >= self.sensors["imu"]["sample_interval"]:
            readings["imu"] = self._read_imu(vehicle_state)
            self.sensors["imu"]["last_sample_time"] = current_time
        
        # Temperatura
        if current_time - self.sensors["temp"]["last_sample_time"] >= self.sensors["temp"]["sample_interval"]:
            readings["temp"] = self._read_temp(vehicle_state)
            self.sensors["temp"]["last_sample_time"] = current_time
        
        return readings
    
    def _simulate_failures(self, delta_time):
        """Simula falhas aleatórias nos sensores."""
        for sensor_id, sensor in self.sensors.items():
            # Probabilidade de falha por hora
            failure_probability = sensor["failure_rate"] * (delta_time / 3600)
            
            if random.random() < failure_probability and not self.error_states[sensor_id]:
                self.error_states[sensor_id] = True
                sensor["status"] = "error"
                logger.warning(f"Falha simulada no sensor {sensor_id}")
            
            # Probabilidade de recuperação de falha (50% por hora)
            if self.error_states[sensor_id] and random.random() < 0.5 * (delta_time / 3600):
                self.error_states[sensor_id] = False
                sensor["status"] = "active"
                logger.info(f"Sensor {sensor_id} recuperado de falha")
    
    def _add_noise(self, value, noise_level):
        """Adiciona ruído a uma leitura."""
        if isinstance(value, bool):
            # Para valores booleanos, há uma pequena chance de inverter o valor
            if random.random() < noise_level:
                return not value
            return value
        elif isinstance(value, dict):
            # Para dicionários, adiciona ruído a cada valor
            noisy_dict = {}
            for k, v in value.items():
                noisy_dict[k] = self._add_noise(v, noise_level)
            return noisy_dict
        else:
            # Para valores numéricos, adiciona ruído gaussiano
            noise = random.gauss(0, abs(value * noise_level))
            return value + noise
    
    def _read_obd(self, vehicle_state):
        """
        Simula leitura do barramento OBD-II/CAN.
        
        Args:
            vehicle_state (dict): Estado atual do veículo simulado.
            
        Returns:
            dict: Leituras do barramento OBD-II/CAN.
        """
        # Se o sensor estiver com erro, retorna dados inválidos
        if self.error_states["obd"]:
            return {"error": "Communication failure", "timestamp": time.time()}
        
        # Se não houver estado do veículo, usa valores padrão
        if not vehicle_state:
            obd_data = {
                "rpm": 800,
                "speed": 0,
                "throttle_position": 0,
                "engine_load": 20,
                "coolant_temp": 80,
                "intake_temp": 25,
                "fuel_level": 50,
                "dtc_codes": []
            }
        else:
            # Extrai dados relevantes do estado do veículo
            speed_kmh = vehicle_state["movement"]["speed"] * 3.6 if "movement" in vehicle_state else 0
            
            # Simula RPM com base na velocidade (simplificado)
            if speed_kmh == 0:
                rpm = 800  # marcha lenta
            else:
                # Simula uma transmissão de 5 marchas
                if speed_kmh < 20:
                    gear = 1
                    rpm = 800 + (speed_kmh * 100)
                elif speed_kmh < 40:
                    gear = 2
                    rpm = 1200 + ((speed_kmh - 20) * 50)
                elif speed_kmh < 60:
                    gear = 3
                    rpm = 1800 + ((speed_kmh - 40) * 30)
                elif speed_kmh < 90:
                    gear = 4
                    rpm = 2000 + ((speed_kmh - 60) * 20)
                else:
                    gear = 5
                    rpm = 2500 + ((speed_kmh - 90) * 15)
            
            # Simula posição do acelerador com base na aceleração
            accel = vehicle_state.get("movement", {}).get("acceleration", 0)
            if accel > 0:
                throttle = min(100, accel * 20)  # 0-100%
            else:
                throttle = 0
            
            # Extrai nível de combustível
            fuel_level = vehicle_state.get("fuel", {}).get("level", 50)
            
            # Simula temperatura do motor (aquece gradualmente)
            coolant_temp = min(90, 20 + vehicle_state.get("trip", {}).get("duration", 0) / 60)
            
            # Simula códigos de diagnóstico
            dtc_codes = []
            safety_systems = vehicle_state.get("systems", {}).get("safety_systems", {})
            for system, status in safety_systems.items():
                if status == "fault":
                    if system == "abs":
                        dtc_codes.append("C0035")  # Código ABS
                    elif system == "esp":
                        dtc_codes.append("C0061")  # Código ESP
                    elif system == "airbag":
                        dtc_codes.append("B0001")  # Código Airbag
            
            obd_data = {
                "rpm": rpm,
                "speed": speed_kmh,
                "throttle_position": throttle,
                "engine_load": min(100, 20 + (throttle * 0.8)),
                "coolant_temp": coolant_temp,
                "intake_temp": 25 + (coolant_temp - 80) * 0.2,
                "fuel_level": fuel_level,
                "dtc_codes": dtc_codes
            }
        
        # Adiciona ruído às leituras
        noisy_data = {}
        for key, value in obd_data.items():
            if key != "dtc_codes":  # Não adiciona ruído aos códigos de erro
                noisy_data[key] = self._add_noise(value, self.sensors["obd"]["noise_level"])
            else:
                noisy_data[key] = value
        
        # Adiciona timestamp
        noisy_data["timestamp"] = time.time()
        
        # Simula latência
        time.sleep(self.sensors["obd"]["latency"])
        
        # Atualiza última leitura
        self.last_readings["obd"] = noisy_data
        
        return noisy_data
    
    def _read_co2(self, vehicle_state):
        """
        Simula leitura do sensor NDIR de CO₂.
        
        Args:
            vehicle_state (dict): Estado atual do veículo simulado.
            
        Returns:
            float: Concentração de CO₂ em ppm.
        """
        # Se o sensor estiver em aquecimento ou com erro, retorna dados inválidos
        if self.sensors["co2"]["status"] == "warming":
            return {"value": None, "status": "warming", "timestamp": time.time()}
        elif self.error_states["co2"]:
            return {"value": None, "status": "error", "timestamp": time.time()}
        
        # Valor base de CO₂ (ar ambiente)
        base_co2 = 400.0  # ppm
        
        if vehicle_state:
            # Extrai dados relevantes do estado do v
(Content truncated due to size limit. Use line ranges to read in chunks)