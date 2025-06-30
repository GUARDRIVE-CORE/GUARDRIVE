# SDK Consolidation Plan - GUARDRIVE-CORE

## 🔍 **Análise dos SDKs Duplicados**

### **Descoberta Crítica**
- **GUARDRIVE_SDK** e **GUARDRIVE-SDK** são **IDÊNTICOS**
- Mesmos arquivos, mesma estrutura, mesmo conteúdo
- Representam duplicação desnecessária de recursos

### **Detalhes da Duplicação**
```
GUARDRIVE_SDK/                    GUARDRIVE-SDK/
├── .github/ ✓                   ├── .github/ ✓ (identical)
├── blockchain/ ✓                ├── blockchain/ ✓ (identical)  
├── core/ ✓                      ├── core/ ✓ (identical)
├── guardrive/ ✓                 ├── guardrive/ ✓ (identical)
├── setup.py ✓                   ├── setup.py ✓ (identical)
└── README.md ✓                  └── README.md ✓ (identical)
```

## 🎯 **Estratégia de Consolidação**

### **Decisão Estratégica**
- **Manter**: `GUARDRIVE-SDK` (nome mais claro com hífen)
- **Deprecar**: `GUARDRIVE_SDK` (arquivo após consolidação)

### **Motivos da Escolha**
1. **Nomenclatura**: `GUARDRIVE-SDK` segue convenções GitHub
2. **Clareza**: Hífen é mais legível que underscore
3. **Consistência**: Alinha com `GUARDRIVE-MCP`

## 📋 **Plano de Implementação**

### **Fase 1: Preparação (Imediato)**
1. ✅ Análise confirmada - SDKs são idênticos
2. ✅ Estratégia definida - Consolidar em GUARDRIVE-SDK
3. 🔄 Comunicar mudança nos repositórios
4. 🔄 Atualizar documentação

### **Fase 2: Migração (1 semana)**
1. 📦 Garantir que GUARDRIVE-SDK está atualizado
2. 🔒 Arquivar GUARDRIVE_SDK como read-only
3. 📝 Adicionar notice de deprecação
4. 🔗 Atualizar todos os links de referência

### **Fase 3: Limpeza (2 semanas)**
1. 📊 Monitorar uso do SDK depreciado
2. 📧 Notificar usuários via issues/docs
3. 🗑️ Agendar remoção definitiva (3 meses)

## 🔄 **Ações Imediatas**

### **Para GUARDRIVE_SDK (Deprecar)**
```markdown
# ⚠️ REPOSITÓRIO DEPRECIADO

Este repositório foi consolidado em: **[GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)**

## 🚀 Migração
Para continuar usando o SDK, atualize suas referências:

```bash
# Antes (depreciado)
pip install guardrive_sdk

# Depois (oficial)  
pip install guardrive-sdk
```

**Data de depreciação**: 2025-06-30
**Remoção prevista**: 2025-09-30
```

### **Para GUARDRIVE-SDK (Oficial)**
```markdown
# GUARDRIVE-SDK - Oficial

> ✅ **Repositório oficial consolidado**

Este é o SDK Python oficial da plataforma GUARDRIVE.

## 📦 Instalação
```bash
pip install guardrive-sdk
```

## 🔄 Migração de GUARDRIVE_SDK
Se você estava usando o repositório `GUARDRIVE_SDK`, migre para este:
- Mesma API, mesmas funcionalidades
- Nome mais claro e consistente
- Suporte continuado
```

## 🎯 **Resultado Esperado**

### **Benefícios da Consolidação**
1. **Clareza**: Um único SDK oficial
2. **Manutenção**: Reduz overhead de manutenção
3. **Consistência**: Nomenclatura alinhada
4. **Comunidade**: Evita confusão entre desenvolvedores

### **Métricas de Sucesso**
- [ ] GUARDRIVE-SDK como referência única
- [ ] GUARDRIVE_SDK marcado como deprecated
- [ ] Documentação atualizada
- [ ] Zero confusão para novos usuários

## 📅 **Timeline**

| Data | Ação | Status |
|------|------|--------|
| 2025-06-30 | Análise e decisão | ✅ |
| 2025-06-30 | Adicionar avisos de depreciação | 🔄 |
| 2025-07-07 | Atualizar toda documentação | ⏳ |
| 2025-07-15 | Comunicar à comunidade | ⏳ |
| 2025-09-30 | Remover repositório depreciado | ⏳ |

---

**Status**: 🔄 Em execução  
**Responsável**: Team GUARDRIVE-CORE  
**Próxima revisão**: 2025-07-07

