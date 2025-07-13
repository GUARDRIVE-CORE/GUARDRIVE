# GUARDRIVE - Quick Start Guide

*Get up and running with GUARDRIVE in 15 minutes*

<div align="center">

[![Platform Status](https://img.shields.io/badge/status-production--ready-brightgreen)](https://github.com/GUARDRIVE-CORE/GUARDRIVE)
[![Python](https://img.shields.io/badge/Python-3.9%2B-blue)](https://python.org)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org)

**🚀 From zero to your first GUARDRIVE integration**

</div>

## 📋 Prerequisites

Before starting, ensure you have:

- **Python 3.9+** - [Download Python](https://python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)
- **A code editor** - VS Code, Cursor, or your favorite IDE

### Quick Version Check
```bash
python --version  # Should be 3.9 or higher
node --version    # Should be 16 or higher
npm --version     # Should be 7 or higher
```

## ⚡ Installation

### 1. Install GUARDRIVE SDK

Choose your preferred method:

#### Option A: Official SDK (Recommended)
```bash
pip install guardrive-sdk
```

#### Option B: Development Version
```bash
git clone https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK.git
cd GUARDRIVE-SDK
pip install -e .
```

### 2. Install MCP Tools

For enhanced development experience with Warp, VS Code, or Cursor:

```bash
npm install -g @guardrive/mcp-servers
```

### 3. Setup MCP Integration

Choose your IDE:

#### For Warp Terminal
```bash
guardrive-mcp setup --client=warp
```

#### For VS Code
```bash
guardrive-mcp setup --client=vscode
```

#### For Cursor
```bash
guardrive-mcp setup --client=cursor
```

## 🎯 Your First Integration

### Step 1: Basic SDK Usage

Create a new file `guardrive_test.py`:

```python
import asyncio
from guardrive import GuarDriveClient

async def main():
    """Basic GUARDRIVE integration example."""
    async with GuarDriveClient() as client:
        # Test connection
        status = await client.system.health_check()
        print(f"✅ GUARDRIVE Status: {status}")
        
        # Example: Monitor a vehicle
        vehicle_id = "DEMO_VEH_001"
        try:
            vehicle_data = await client.monitoring.get_vehicle_status(vehicle_id)
            print(f"🚗 Vehicle {vehicle_id}: {vehicle_data}")
        except Exception as e:
            print(f"ℹ️ Demo data not available: {e}")
        
        # Example: AI prediction
        try:
            prediction = await client.ai.predict_behavior({
                "vehicle_id": vehicle_id,
                "current_speed": 60,
                "route": "highway_A1"
            })
            print(f"🧠 AI Prediction: {prediction}")
        except Exception as e:
            print(f"ℹ️ AI module not configured: {e}")

if __name__ == "__main__":
    print("🚀 Starting GUARDRIVE Quick Start...")
    asyncio.run(main())
    print("✨ Quick Start completed!")
```

### Step 2: Run Your First Integration

```bash
python guardrive_test.py
```

Expected output:
```
🚀 Starting GUARDRIVE Quick Start...
✅ GUARDRIVE Status: healthy
🚗 Vehicle DEMO_VEH_001: {...}
🧠 AI Prediction: {...}
✨ Quick Start completed!
```

### Step 3: MCP Tools in Action

If you installed MCP tools, try these commands in your IDE:

#### In Warp Terminal
```bash
/guardrive help
/guardrive status
/guardrive monitor --vehicle=DEMO_VEH_001
```

#### In VS Code/Cursor
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "GUARDRIVE"
3. Select available GUARDRIVE commands

## 🛠️ SDK Features Overview

### Core Modules

```python
from guardrive import GuarDriveClient

async with GuarDriveClient() as client:
    # System monitoring
    system = client.system
    health = await system.health_check()
    
    # Vehicle monitoring
    monitoring = client.monitoring
    vehicles = await monitoring.list_vehicles()
    
    # AI services
    ai = client.ai
    prediction = await ai.predict_behavior(data)
    
    # Blockchain integration
    blockchain = client.blockchain
    tx_hash = await blockchain.register_event(event)
    
    # ESG calculations
    esg = client.esg
    score = await esg.calculate_score(metrics)
```

### Configuration

Create `guardrive_config.yaml`:

```yaml
guardrive:
  # API Configuration
  api:
    base_url: "https://api.guardrive.dev"
    timeout: 30
    retry_attempts: 3
  
  # Monitoring Settings
  monitoring:
    real_time: true
    update_interval: 5  # seconds
    
  # AI Configuration
  ai:
    model_version: "latest"
    confidence_threshold: 0.8
    
  # Blockchain Settings
  blockchain:
    network: "mainnet"  # or "testnet"
    gas_limit: 21000
```

## 🔌 MCP Integration Examples

### DevOps Automation

```bash
# Start development session
/guardrive session start

# Run quality checks
/guardrive quality check

# Deploy to staging
/guardrive deploy staging

# Monitor deployment
/guardrive monitor deployment
```

### System Monitoring

```bash
# Check system health
/guardrive health

# View metrics
/guardrive metrics --component=all

# Generate report
/guardrive report --type=performance
```

## 🧪 Advanced Examples

### Real-time Vehicle Monitoring

```python
import asyncio
from guardrive import GuarDriveClient, VehicleMonitor

async def monitor_fleet():
    """Monitor multiple vehicles in real-time."""
    async with GuarDriveClient() as client:
        monitor = VehicleMonitor(client)
        
        # Start monitoring
        vehicles = ["VEH_001", "VEH_002", "VEH_003"]
        
        async for event in monitor.stream_events(vehicles):
            print(f"📡 {event.vehicle_id}: {event.event_type}")
            
            # Process alerts
            if event.severity == "high":
                await handle_alert(event)

async def handle_alert(event):
    """Handle high-severity alerts."""
    print(f"🚨 ALERT: {event.message}")
    # Implement your alert logic here
```

### ESG Score Calculation

```python
async def calculate_esg_metrics():
    """Calculate ESG scores for fleet."""
    async with GuarDriveClient() as client:
        # Collect environmental data
        env_data = await client.monitoring.get_environmental_metrics()
        
        # Calculate ESG score
        esg_score = await client.esg.calculate_score({
            "environmental": env_data,
            "social": {"safety_incidents": 0},
            "governance": {"compliance_rate": 0.98}
        })
        
        print(f"🌱 ESG Score: {esg_score}/100")
        return esg_score
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Installation Issues
```bash
# Update pip
pip install --upgrade pip

# Install with verbose output
pip install guardrive-sdk -v
```

#### 2. Connection Issues
```python
# Check network connectivity
import aiohttp

async def test_connection():
    async with aiohttp.ClientSession() as session:
        async with session.get("https://api.guardrive.dev/health") as resp:
            print(f"API Status: {resp.status}")
```

#### 3. MCP Setup Issues
```bash
# Reset MCP configuration
guardrive-mcp reset

# Reinstall MCP servers
npm uninstall -g @guardrive/mcp-servers
npm install -g @guardrive/mcp-servers
```

### Getting Help

1. **📚 Documentation**: Check [API Reference](../sdk/python-sdk/api-reference.md)
2. **🔍 Examples**: Browse [Code Examples](../sdk/python-sdk/examples/)
3. **💬 Community**: Join [Discord](https://discord.gg/guardrive)
4. **🐛 Issues**: Report on [GitHub](https://github.com/GUARDRIVE-CORE/GUARDRIVE/issues)

## 🎯 Next Steps

### Recommended Learning Path

1. **📖 Read Full Documentation**
   - [API Reference](../sdk/python-sdk/api-reference.md)
   - [Architecture Overview](../architecture/overview.md)

2. **🧪 Explore Examples**
   - [SDK Examples](../sdk/python-sdk/examples/)
   - [MCP Integration Examples](../mcp/getting-started.md)

3. **🏗️ Build Your Project**
   - [First Project Guide](first-project.md)
   - [Advanced Usage](../sdk/python-sdk/advanced.md)

4. **🤝 Contribute**
   - [Contributing Guide](../contributing/CONTRIBUTING.md)
   - [Development Setup](../contributing/development-setup.md)

### Related Resources

- **🌐 [Official Website](https://guardrive-core.github.io/GUARDRIVE/)**
- **📚 [Examples Repository](https://github.com/GUARDRIVE-CORE/guardrive-examples)**
- **🔗 [GUARDRIVE-CORE Organization](https://github.com/GUARDRIVE-CORE)**

---

<div align="center">

**🎉 Congratulations!**

You've successfully completed the GUARDRIVE Quick Start guide.

**Ready to build something amazing? [Start your first project →](first-project.md)**

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-purple)](https://discord.gg/guardrive)
[![GitHub](https://img.shields.io/badge/GitHub-GUARDRIVE--CORE-black)](https://github.com/GUARDRIVE-CORE)

</div>
