import random
import time
import json
import logging
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("urban_environment.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("urban_environment")

class UrbanEnvironment:
    """
    Simulador de ambiente urbano para o sistema SealSafe.
    
    Esta classe simula condições urbanas como tráfego, semáforos,
    condições climáticas e outros fatores ambientais que afetam
    a operação de veículos e a coleta de dados pelo SealSafe.
    """
    
    def __init__(self, config_file=None):
        """
        Inicializa o simulador de ambiente urbano.
        
        Args:
            config_file (str, optional): Caminho para arquivo de configuração JSON.
                                        Se não fornecido, usa configurações padrão.
        """
        self.config = self._load_config(config_file)
        self.time_factor = self.config.get("time_factor", 1.0)  # Fator de aceleração da simulação
        self.current_time = datetime.now()
        self.traffic_density = self.config.get("initial_traffic_density", 0.5)  # 0.0 a 1.0
        self.weather_conditions = self.config.get("initial_weather", "clear")
        self.traffic_lights = {}
        self.road_segments = {}
        self.events = []
        
        # Inicializa segmentos de via
        self._initialize_road_segments()
        
        # Inicializa semáforos
        self._initialize_traffic_lights()
        
        logger.info(f"Ambiente urbano inicializado com densidade de tráfego {self.traffic_density} e condições climáticas {self.weather_conditions}")
    
    def _load_config(self, config_file):
        """Carrega configuração do arquivo JSON ou usa padrões."""
        default_config = {
            "time_factor": 1.0,
            "initial_traffic_density": 0.5,
            "initial_weather": "clear",
            "road_segments": [
                {"id": "downtown_main", "length": 2000, "lanes": 3, "speed_limit": 40},
                {"id": "highway_north", "length": 5000, "lanes": 4, "speed_limit": 80},
                {"id": "residential_east", "length": 1500, "lanes": 2, "speed_limit": 30}
            ],
            "traffic_lights": [
                {"id": "downtown_1", "location": "downtown_main", "position": 500},
                {"id": "downtown_2", "location": "downtown_main", "position": 1500},
                {"id": "highway_exit", "location": "highway_north", "position": 4500}
            ],
            "weather_patterns": ["clear", "rain", "fog", "snow"],
            "event_probability": 0.05
        }
        
        if config_file:
            try:
                with open(config_file, 'r') as f:
                    loaded_config = json.load(f)
                    # Mescla configurações carregadas com padrões
                    for key, value in loaded_config.items():
                        default_config[key] = value
                logger.info(f"Configuração carregada de {config_file}")
            except Exception as e:
                logger.error(f"Erro ao carregar configuração: {e}")
        
        return default_config
    
    def _initialize_road_segments(self):
        """Inicializa segmentos de via com base na configuração."""
        for segment in self.config.get("road_segments", []):
            self.road_segments[segment["id"]] = {
                "length": segment["length"],
                "lanes": segment["lanes"],
                "speed_limit": segment["speed_limit"],
                "current_traffic": random.uniform(0.3, 0.7) * self.traffic_density,
                "vehicles": []
            }
        logger.info(f"Inicializados {len(self.road_segments)} segmentos de via")
    
    def _initialize_traffic_lights(self):
        """Inicializa semáforos com base na configuração."""
        for light in self.config.get("traffic_lights", []):
            self.traffic_lights[light["id"]] = {
                "location": light["location"],
                "position": light["position"],
                "state": random.choice(["red", "green", "yellow"]),
                "timer": random.randint(0, 30)  # Tempo restante no estado atual
            }
        logger.info(f"Inicializados {len(self.traffic_lights)} semáforos")
    
    def update(self, delta_time):
        """
        Atualiza o estado do ambiente urbano.
        
        Args:
            delta_time (float): Tempo decorrido desde a última atualização em segundos.
        
        Returns:
            dict: Estado atual do ambiente urbano.
        """
        # Aplica fator de aceleração do tempo
        effective_delta = delta_time * self.time_factor
        
        # Atualiza tempo da simulação
        self.current_time = self.current_time.fromtimestamp(
            self.current_time.timestamp() + effective_delta
        )
        
        # Atualiza semáforos
        self._update_traffic_lights(effective_delta)
        
        # Atualiza condições de tráfego
        self._update_traffic(effective_delta)
        
        # Atualiza condições climáticas
        self._update_weather(effective_delta)
        
        # Gera eventos aleatórios
        self._generate_random_events(effective_delta)
        
        # Retorna estado atual do ambiente
        return self.get_state()
    
    def _update_traffic_lights(self, delta_time):
        """Atualiza estado dos semáforos."""
        for light_id, light in self.traffic_lights.items():
            light["timer"] -= delta_time
            
            if light["timer"] <= 0:
                # Muda estado do semáforo
                if light["state"] == "red":
                    light["state"] = "green"
                    light["timer"] = random.uniform(20, 40)  # 20-40 segundos no verde
                elif light["state"] == "green":
                    light["state"] = "yellow"
                    light["timer"] = random.uniform(3, 5)  # 3-5 segundos no amarelo
                else:  # yellow
                    light["state"] = "red"
                    light["timer"] = random.uniform(15, 30)  # 15-30 segundos no vermelho
                
                logger.debug(f"Semáforo {light_id} mudou para {light['state']}")
    
    def _update_traffic(self, delta_time):
        """Atualiza condições de tráfego."""
        # Simula variação natural de tráfego ao longo do dia
        hour = self.current_time.hour
        
        # Fatores de tráfego por hora do dia (picos de manhã e fim da tarde)
        hour_factors = {
            0: 0.2, 1: 0.1, 2: 0.1, 3: 0.1, 4: 0.2, 5: 0.3, 
            6: 0.5, 7: 0.8, 8: 0.9, 9: 0.7, 10: 0.6, 11: 0.6,
            12: 0.7, 13: 0.6, 14: 0.6, 15: 0.7, 16: 0.8, 17: 0.9,
            18: 0.8, 19: 0.7, 20: 0.5, 21: 0.4, 22: 0.3, 23: 0.2
        }
        
        target_density = hour_factors.get(hour, 0.5)
        
        # Ajusta densidade de tráfego gradualmente em direção ao alvo
        adjustment_rate = 0.1 * delta_time / 60  # 10% por minuto
        if self.traffic_density < target_density:
            self.traffic_density = min(self.traffic_density + adjustment_rate, target_density)
        else:
            self.traffic_density = max(self.traffic_density - adjustment_rate, target_density)
        
        # Atualiza tráfego em cada segmento de via
        for segment_id, segment in self.road_segments.items():
            # Adiciona variação aleatória por segmento
            segment["current_traffic"] = min(1.0, max(0.1, 
                self.traffic_density * random.uniform(0.8, 1.2)))
            
            # Ajusta tráfego com base em semáforos
            for light_id, light in self.traffic_lights.items():
                if light["location"] == segment_id and light["state"] == "red":
                    # Semáforo vermelho aumenta congestionamento no segmento
                    segment["current_traffic"] = min(1.0, segment["current_traffic"] * 1.2)
        
        if delta_time > 60:  # Log a cada minuto simulado
            logger.info(f"Densidade de tráfego atualizada para {self.traffic_density:.2f}")
    
    def _update_weather(self, delta_time):
        """Atualiza condições climáticas."""
        # Chance de mudança climática: 5% por hora
        change_probability = 0.05 * (delta_time / 3600)
        
        if random.random() < change_probability:
            old_weather = self.weather_conditions
            weather_patterns = self.config.get("weather_patterns", ["clear", "rain", "fog", "snow"])
            
            # Evita repetir o mesmo clima
            available_patterns = [w for w in weather_patterns if w != old_weather]
            self.weather_conditions = random.choice(available_patterns)
            
            logger.info(f"Condições climáticas mudaram de {old_weather} para {self.weather_conditions}")
    
    def _generate_random_events(self, delta_time):
        """Gera eventos aleatórios como acidentes, obras, etc."""
        # Probabilidade de evento: configurável por minuto
        event_probability = self.config.get("event_probability", 0.05) * (delta_time / 60)
        
        if random.random() < event_probability:
            event_types = ["accident", "construction", "special_event", "road_closure"]
            event_type = random.choice(event_types)
            
            # Seleciona um segmento aleatório
            segment_id = random.choice(list(self.road_segments.keys()))
            segment = self.road_segments[segment_id]
            
            # Posição aleatória no segmento
            position = random.uniform(0, segment["length"])
            
            # Duração do evento (10-60 minutos)
            duration = random.uniform(10, 60) * 60  # em segundos
            
            event = {
                "type": event_type,
                "location": segment_id,
                "position": position,
                "start_time": self.current_time,
                "duration": duration,
                "severity": random.uniform(0.1, 1.0)  # 0.1 = menor, 1.0 = maior
            }
            
            self.events.append(event)
            
            # Ajusta tráfego com base no evento
            if event_type == "accident":
                segment["current_traffic"] = min(1.0, segment["current_traffic"] * (1 + event["severity"]))
            
            logger.info(f"Evento gerado: {event_type} em {segment_id} com severidade {event['severity']:.2f}")
    
    def get_state(self):
        """
        Retorna o estado atual completo do ambiente urbano.
        
        Returns:
            dict: Estado atual do ambiente.
        """
        # Remove eventos expirados
        current_events = []
        for event in self.events:
            event_end_time = event["start_time"].timestamp() + event["duration"]
            if self.current_time.timestamp() < event_end_time:
                current_events.append(event)
        
        self.events = current_events
        
        return {
            "timestamp": self.current_time.isoformat(),
            "traffic_density": self.traffic_density,
            "weather_conditions": self.weather_conditions,
            "road_segments": self.road_segments,
            "traffic_lights": self.traffic_lights,
            "active_events": self.events
        }
    
    def get_conditions_at_location(self, segment_id, position):
        """
        Retorna condições específicas em uma localização.
        
        Args:
            segment_id (str): Identificador do segmento de via.
            position (float): Posição no segmento em metros.
            
        Returns:
            dict: Condições no local especificado.
        """
        if segment_id not in self.road_segments:
            logger.warning(f"Segmento {segment_id} não encontrado")
            return None
        
        segment = self.road_segments[segment_id]
        
        # Verifica se a posição está dentro do segmento
        if position < 0 or position > segment["length"]:
            logger.warning(f"Posição {position} fora dos limites do segmento {segment_id}")
            return None
        
        # Encontra semáforos próximos
        nearby_lights = []
        for light_id, light in self.traffic_lights.items():
            if light["location"] == segment_id:
                distance = abs(light["position"] - position)
                if distance < 100:  # Semáforo a menos de 100m
                    nearby_lights.append({
                        "id": light_id,
                        "distance": distance,
                        "state": light["state"]
                    })
        
        # Encontra eventos ativos na área
        local_events = []
        for event in self.events:
            if event["location"] == segment_id:
                distance = abs(event["position"] - position)
                if distance < 200:  # Evento a menos de 200m
                    local_events.append({
                        "type": event["type"],
                        "distance": distance,
                        "severity": event["severity"]
                    })
        
        # Calcula tráfego local (pode variar ao longo do segmento)
        local_traffic = segment["current_traffic"]
        
        # Ajusta com base em semáforos e eventos próximos
        for light in nearby_lights:
            if light["state"] == "red" and light["distance"] < 50:
                local_traffic = min(1.0, local_traffic * 1.3)  # Mais congestionado perto de semáforo vermelho
        
        for event in local_events:
            if event["distance"] < 100:
                local_traffic = min(1.0, local_traffic * (1 + event["severity"] * 0.5))
        
        return {
            "segment_id": segment_id,
            "position": position,
            "speed_limit": segment["speed_limit"],
            "local_traffic": local_traffic,
            "weather": self.weather_conditions,
            "nearby_lights": nearby_lights,
            "local_events": local_events
        }

    def save_state(self, filename):
        """
        Salva o estado atual do ambiente em um arquivo JSON.
        
        Args:
            filename (str): Nome do arquivo para salvar.
        """
        state = self.get_state()
        
        # Converte datetime para string
        state["timestamp"] = self.current_time.isoformat()
        
        # Converte eventos
        for event in state["active_events"]:
            event["start_time"] = event["start_time"].isoformat()
        
        try:
            with open(filename, 'w') as f:
                json.dump(state, f, indent=2)
            logger.info(f"Estado salvo em {filename}")
        except Exception as e:
            logger.error(f"Erro ao salvar estado: {e}")
    
    def load_state(self, filename):
        """
        Carrega o estado do ambiente de um arquivo JSON.
        
        Args:
            filename (str): Nome do arquivo para carregar.
        """
        try:
            with open(filename, 'r') as f:
                state = json.load(f)
            
            # Converte string para datetime
            self.current_time = datetime.fromisoformat(state["timestamp"])
            self.traffic_density = state["traffic_density"]
            self.weather_conditions = state["weather_conditions"]
            self.road_segments = state["road_segments"]
            self.traffic_lights = state["traffic_lights"]
            
            # Converte eventos
            self.events = []
            for event in state["active_events"]:
                event["start_time"] = datetime.fromisoformat(event["start_time"])
                self.events.append(event)
            
            logger.info(f"Estado carregado de {filename}")
        except Exception as e:
            logger.error(f"Erro ao carregar estado: {
(Content truncated due to size limit. Use line ranges to read in chunks)