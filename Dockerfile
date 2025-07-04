# ============================================
# GUARDRIVE - Multi-stage Docker Build
# ============================================

# ----------------------------------------
# Stage 1: Build Dependencies
# ----------------------------------------
FROM python:3.11-slim as builder

# Metadados
LABEL maintainer="GUARDRIVE-CORE"
LABEL version="1.0.2"
LABEL description="GUARDRIVE Enterprise AI Orchestration Platform"

# Variáveis de ambiente para build
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Instalar dependências do sistema para compilação
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY requirements.txt .

# Criar virtual environment e instalar dependências
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Instalar dependências Python
RUN pip install --upgrade pip setuptools wheel && \
    pip install -r requirements.txt

# ----------------------------------------
# Stage 2: Production Runtime
# ----------------------------------------
FROM python:3.11-slim as runtime

# Variáveis de ambiente de produção
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/opt/venv/bin:$PATH" \
    ENVIRONMENT=production \
    LOG_LEVEL=info \
    WORKERS=4 \
    HOST=0.0.0.0 \
    PORT=8000

# Instalar dependências de runtime
RUN apt-get update && apt-get install -y \
    curl \
    htop \
    procps \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Criar usuário não-root
RUN groupadd -r guardrive && \
    useradd -r -g guardrive -d /app -s /bin/bash guardrive

# Criar diretórios necessários
RUN mkdir -p /app /app/logs /app/data && \
    chown -R guardrive:guardrive /app

# Copiar virtual environment do stage builder
COPY --from=builder /opt/venv /opt/venv

# Mudar para o usuário não-root
USER guardrive
WORKDIR /app

# Copiar código da aplicação
COPY --chown=guardrive:guardrive . .

# Criar arquivo de versão
RUN echo "1.0.2" > VERSION

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Expor porta
EXPOSE ${PORT}

# ----------------------------------------
# Stage 3: Development Runtime (Optional)
# ----------------------------------------
FROM runtime as development

USER root

# Instalar ferramentas de desenvolvimento
RUN pip install \
    black \
    isort \
    flake8 \
    mypy \
    pytest \
    pytest-asyncio \
    pytest-cov \
    ipython \
    jupyter

USER guardrive

# Override command for development
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ----------------------------------------
# Default Production Stage
# ----------------------------------------
FROM runtime as production

# Comando padrão
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# ----------------------------------------
# Multi-architecture support
# ----------------------------------------
# Para build com: docker buildx build --platform linux/amd64,linux/arm64 -t guardrive:latest .

# ----------------------------------------
# Build Arguments (Optional)
# ----------------------------------------
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=1.0.2

LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0" \
      org.label-schema.name="GUARDRIVE" \
      org.label-schema.description="Enterprise AI Orchestration Platform" \
      org.label-schema.vendor="GUARDRIVE-CORE" \
      org.label-schema.url="https://guardrive-core.github.io/GUARDRIVE/" \
      org.label-schema.vcs-url="https://github.com/GUARDRIVE-CORE/GUARDRIVE"

