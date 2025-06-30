@echo off
:: Arquivo de lote para acessar o Gemini CLI
:: Este script ativa o ambiente virtual e executa o script Python

:: Ativar o ambiente virtual
call "%~dp0gemini-env\Scripts\activate.bat"

:: Executar o script Python com os argumentos passados
python "%~dp0gemini_cli.py" %*

:: Desativar o ambiente virtual ao finalizar
call deactivate

:: Pausar apenas se houver erro
if %ERRORLEVEL% neq 0 pause

