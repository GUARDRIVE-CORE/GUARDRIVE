import random
import time
import json
import logging
import math
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("vehicle_simulator.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("vehicle_simulator")

class VehicleSimulator:
    """
    Simulador de veículos para o sistema SealSafe.
    
    Esta classe simula o comportamento de veículos em um ambiente urbano,
    incluindo movimento, consumo de combustível, emissões de CO₂ e interação
    com o ambiente e outros veículos.
    """
    
    # Tipos de veículos suportados
    VEHICLE_TYPES = {
        "sedan": {
            "length": 4.5,  # metros
            "width": 1.8,   # metros
            "weight": 1500, # kg
            "max_speed": 180,  # km/h
            "acceleration": 3.0,  # m/s²
            "deceleration": 7.0,  # m/s²
            "fuel_efficiency": 12.0,  # km/l (gasolina)
            "co2_per_liter": 2.31,  # kg CO₂ por litro de gasolina
            "safety_features": ["abs", "airbag", "esp"]
        },
        "suv": {
            "length": 4.8,
            "width": 1.9,
            "weight": 2000,
            "max_speed": 170,
            "acceleration": 2.5,
            "deceleration": 6.5,
            "fuel_efficiency": 9.0,
            "co2_per_liter": 2.31,
            "safety_features": ["abs", "airbag", "esp", "lane_assist"]
        },
        "compact": {
            "length": 3.8,
            "width": 1.7,
            "weight": 1200,
            "max_speed": 160,
            "acceleration": 2.8,
            "deceleration": 6.8,
            "fuel_efficiency": 14.0,
            "co2_per_liter": 2.31,
            "safety_features": ["abs", "airbag"]
        },
        "truck": {
            "length": 12.0,
            "width": 2.5,
            "weight": 12000,
            "max_speed": 120,
            "acceleration": 1.0,
            "deceleration": 5.0,
            "fuel_efficiency": 3.5,
            "co2_per_liter": 2.68,  # diesel
            "safety_features": ["abs", "esp"]
        },
        "bus": {
            "length": 14.0,
            "width": 2.6,
            "weight": 15000,
            "max_speed": 100,
            "acceleration": 0.8,
            "deceleration": 4.5,
            "fuel_efficiency": 2.5,
            "co2_per_liter": 2.68,  # diesel
            "safety_features": ["abs", "esp"]
        },
        "motorcycle": {
            "length": 2.0,
            "width": 0.8,
            "weight": 200,
            "max_speed": 200,
            "acceleration": 4.0,
            "deceleration": 8.0,
            "fuel_efficiency": 25.0,
            "co2_per_liter": 2.31,
            "safety_features": ["abs"]
        },
        "electric_car": {
            "length": 4.6,
            "width": 1.85,
            "weight": 1800,
            "max_speed": 190,
            "acceleration": 4.5,
            "deceleration": 7.0,
            "energy_efficiency": 6.5,  # km/kWh
            "co2_per_kwh": 0.1,  # kg CO₂ por kWh (depende da matriz energética)
            "safety_features": ["abs", "airbag", "esp", "lane_assist", "auto_brake"]
        }
    }
    
    # Estilos de condução
    DRIVING_STYLES = {
        "conservative": {
            "speed_factor": 0.8,  # % do limite de velocidade
            "acceleration_factor": 0.6,  # % da aceleração máxima
            "deceleration_factor": 0.9,  # % da desaceleração máxima
            "following_distance": 3.0,  # segundos
            "lane_change_probability": 0.1,  # probabilidade por minuto
            "reaction_time": 1.0  # segundos
        },
        "normal": {
            "speed_factor": 1.0,
            "acceleration_factor": 0.8,
            "deceleration_factor": 0.8,
            "following_distance": 2.0,
            "lane_change_probability": 0.2,
            "reaction_time": 1.2
        },
        "aggressive": {
            "speed_factor": 1.2,
            "acceleration_factor": 1.0,
            "deceleration_factor": 0.7,
            "following_distance": 1.0,
            "lane_change_probability": 0.4,
            "reaction_time": 1.5
        },
        "eco": {
            "speed_factor": 0.9,
            "acceleration_factor": 0.5,
            "deceleration_factor": 0.5,
            "following_distance": 2.5,
            "lane_change_probability": 0.1,
            "reaction_time": 1.0
        }
    }
    
    def __init__(self, vehicle_id, vehicle_type="sedan", driving_style="normal", config_file=None):
        """
        Inicializa um veículo simulado.
        
        Args:
            vehicle_id (str): Identificador único do veículo.
            vehicle_type (str): Tipo do veículo (sedan, suv, compact, etc.).
            driving_style (str): Estilo de condução (conservative, normal, aggressive, eco).
            config_file (str, optional): Arquivo de configuração JSON para parâmetros adicionais.
        """
        self.vehicle_id = vehicle_id
        
        # Verifica se o tipo de veículo é válido
        if vehicle_type not in self.VEHICLE_TYPES:
            logger.warning(f"Tipo de veículo '{vehicle_type}' não reconhecido. Usando 'sedan' como padrão.")
            vehicle_type = "sedan"
        
        # Verifica se o estilo de condução é válido
        if driving_style not in self.DRIVING_STYLES:
            logger.warning(f"Estilo de condução '{driving_style}' não reconhecido. Usando 'normal' como padrão.")
            driving_style = "normal"
        
        self.vehicle_type = vehicle_type
        self.driving_style = driving_style
        
        # Carrega características do veículo e estilo de condução
        self.characteristics = self.VEHICLE_TYPES[vehicle_type].copy()
        self.style = self.DRIVING_STYLES[driving_style].copy()
        
        # Carrega configurações adicionais
        self.config = self._load_config(config_file)
        
        # Estado atual do veículo
        self.state = {
            "running": False,
            "position": {
                "segment_id": None,
                "position": 0.0,  # metros a partir do início do segmento
                "lane": 0  # faixa de rolamento (0 = faixa da direita)
            },
            "movement": {
                "speed": 0.0,  # m/s
                "acceleration": 0.0,  # m/s²
                "heading": 0.0  # graus (0 = norte, 90 = leste)
            },
            "systems": {
                "engine": "off",
                "lights": "off",
                "wipers": "off",
                "hvac": "off",
                "safety_systems": {}
            },
            "occupants": {
                "driver_present": False,
                "passenger_count": 0,
                "seatbelts": {}
            },
            "fuel": {
                "level": 100.0,  # percentual
                "consumption_rate": 0.0,  # l/km atual
                "total_consumed": 0.0  # litros totais consumidos
            },
            "emissions": {
                "co2_rate": 0.0,  # kg/km atual
                "total_co2": 0.0  # kg totais emitidos
            },
            "trip": {
                "distance": 0.0,  # km percorridos
                "duration": 0.0,  # segundos de viagem
                "start_time": None,
                "eco_score": 100  # pontuação de eco-driving (0-100)
            },
            "events": []
        }
        
        # Inicializa sistemas de segurança
        for feature in self.characteristics.get("safety_features", []):
            self.state["systems"]["safety_systems"][feature] = "inactive"
        
        # Inicializa cintos de segurança
        self.state["occupants"]["seatbelts"]["driver"] = False
        for i in range(1, 5):  # 4 passageiros potenciais
            self.state["occupants"]["seatbelts"][f"passenger_{i}"] = False
        
        logger.info(f"Veículo {vehicle_id} inicializado: {vehicle_type}, estilo {driving_style}")
    
    def _load_config(self, config_file):
        """Carrega configuração do arquivo JSON ou usa padrões."""
        default_config = {
            "random_seed": None,
            "fault_probability": 0.001,  # probabilidade de falha por hora
            "seatbelt_use_probability": 0.9,  # probabilidade de uso do cinto
            "fuel_variation": 0.1,  # variação no consumo de combustível (±10%)
            "eco_driving_factors": {
                "harsh_acceleration_threshold": 3.0,  # m/s²
                "harsh_braking_threshold": 4.0,  # m/s²
                "optimal_speed_range": [50, 80],  # km/h
                "idle_penalty": 2.0  # pontos perdidos por minuto em marcha lenta
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
        
        # Define semente aleatória se especificada
        if default_config["random_seed"] is not None:
            random.seed(default_config["random_seed"])
        
        return default_config
    
    def start_engine(self):
        """Liga o motor do veículo."""
        if not self.state["running"]:
            self.state["running"] = True
            self.state["systems"]["engine"] = "on"
            self.state["trip"]["start_time"] = datetime.now()
            logger.info(f"Veículo {self.vehicle_id}: Motor ligado")
            
            # Simula uso de cinto pelo motorista
            if random.random() < self.config["seatbelt_use_probability"]:
                self.state["occupants"]["seatbelts"]["driver"] = True
                logger.debug(f"Veículo {self.vehicle_id}: Motorista usando cinto")
            else:
                logger.debug(f"Veículo {self.vehicle_id}: Motorista SEM cinto")
            
            # Ativa sistemas de segurança
            for system in self.state["systems"]["safety_systems"]:
                self.state["systems"]["safety_systems"][system] = "active"
            
            return True
        return False
    
    def stop_engine(self):
        """Desliga o motor do veículo."""
        if self.state["running"]:
            self.state["running"] = False
            self.state["systems"]["engine"] = "off"
            self.state["movement"]["speed"] = 0.0
            self.state["movement"]["acceleration"] = 0.0
            
            # Calcula duração da viagem
            if self.state["trip"]["start_time"]:
                duration = (datetime.now() - self.state["trip"]["start_time"]).total_seconds()
                self.state["trip"]["duration"] += duration
                self.state["trip"]["start_time"] = None
            
            logger.info(f"Veículo {self.vehicle_id}: Motor desligado")
            
            # Desativa sistemas
            for system in self.state["systems"]:
                if system != "safety_systems":
                    self.state["systems"][system] = "off"
            
            for system in self.state["systems"]["safety_systems"]:
                self.state["systems"]["safety_systems"][system] = "inactive"
            
            return True
        return False
    
    def set_position(self, segment_id, position, lane=0):
        """
        Define a posição do veículo em um segmento de via.
        
        Args:
            segment_id (str): Identificador do segmento de via.
            position (float): Posição no segmento em metros.
            lane (int, optional): Faixa de rolamento (0 = faixa da direita).
        """
        self.state["position"]["segment_id"] = segment_id
        self.state["position"]["position"] = position
        self.state["position"]["lane"] = lane
        logger.debug(f"Veículo {self.vehicle_id}: Posição definida para {segment_id}:{position}m, faixa {lane}")
    
    def update(self, delta_time, environment_conditions=None):
        """
        Atualiza o estado do veículo com base no tempo decorrido e condições ambientais.
        
        Args:
            delta_time (float): Tempo decorrido desde a última atualização em segundos.
            environment_conditions (dict, optional): Condições do ambiente no local atual.
            
        Returns:
            dict: Estado atual do veículo.
        """
        if not self.state["running"]:
            return self.state
        
        # Atualiza posição e movimento
        self._update_movement(delta_time, environment_conditions)
        
        # Atualiza consumo e emissões
        self._update_consumption(delta_time)
        
        # Atualiza sistemas do veículo
        self._update_systems(environment_conditions)
        
        # Simula eventos aleatórios
        self._simulate_random_events(delta_time)
        
        # Atualiza eco-score
        self._update_eco_score()
        
        return self.state
    
    def _update_movement(self, delta_time, environment_conditions):
        """Atualiza posição e movimento do veículo."""
        if not self.state["running"]:
            return
        
        # Velocidade atual em m/s
        current_speed = self.state["movement"]["speed"]
        
        # Determina velocidade alvo com base nas condições
        target_speed = self._determine_target_speed(environment_conditions)
        
        # Calcula aceleração necessária
        if current_speed < target_speed:
            # Aceleração
            max_accel = self.characteristics["acceleration"] * self.style["acceleration_factor"]
            self.state["movement"]["acceleration"] = min(max_accel, (target_speed - current_speed) / delta_time)
        elif current_speed > target_speed:
            # Desaceleração
            max_decel = self.characteristics["deceleration"] * self.style["deceleration_factor"]
            self.state["movement"]["acceleration"] = max(-max_decel, (target_speed - current_speed) / delta_time)
        else:
            # Mantém velocidade
            self.state["movement"]["acceleration"] = 0.0
        
        # Aplica aceleração para atualizar velocidade
        new_speed = current_speed + self.state["movement"]["acceleration"] * delta_time
        self.state["movement"]["speed"] = max(0.0, new_speed)
        
        # Atualiza posição
        if self.state["position"]["segment_id"]:
            distance_moved = self.state["movement"]["speed"] * delta_time
            new_position = self.state["position"]["position"] + distance_moved
            self.state["position"]["position"] = new_position
            
            # Atualiza distância total percorrida (em km)
            self.state["trip"]["distance"] += distance_moved / 1000.0
            
            # Atualiza duração da viagem
            self.state["trip"]["duration"] += delta_time
            
            logger.debug(f"Veículo {self.vehicle_id}: Velocidade {self.state['movement']['speed']*3.6:.1f} km/h, " +
                        f"Posição {self.state['position']['position']:.1f}m")
    
    def _determine_target_speed(self, environment_conditions):
        """Determina velocidade alvo com base nas condições ambientais e estilo de condução."""
        # Velocidade máxima do veículo em m/s
        vehicle_max_speed = self.characteristics["max_speed"] / 3.6
        
        # Se não há condições ambientais, usa velocidade padrão
        if not environment_conditions:
            return min(50 / 3.
(Content truncated due to size limit. Use line ranges to read in chunks)